"""
Service d'intégration avec l'API Claude d'Anthropic.
Utilisé pour le chat pédagogique et la vérification des réponses.
"""
import anthropic
import os
from typing import List, Dict
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

SYSTEM_PROMPT = """Tu es MathAI Coach, un professeur de mathématiques expert et bienveillant.
Tu aides des étudiants tunisiens qui préparent le Bac (section Mathématiques) ou la Licence FST.

Tes règles :
1. Réponds TOUJOURS en français
2. Suis le programme officiel tunisien (Bac 4ème Maths, FST LFM/LMI)
3. Explique étape par étape, comme un vrai professeur
4. Utilise des exemples concrets tirés des examens Bac tunisiens
5. Encourage l'étudiant, sois patient et pédagogique
6. Pour les formules, écris-les clairement (ex: f'(x) = ..., ∫f(x)dx = ...)
7. Si l'étudiant fait une erreur, explique pourquoi c'est faux avant de donner la correction
8. Adapte ton niveau au contexte (Bac ou FST)

Chapitres Bac Tunisie que tu maîtrises parfaitement :
- Trimestre 1 : Limites & Continuité, Nombres Complexes, Suites Réelles
- Trimestre 2 : Dérivabilité, Logarithme Népérien, Fonction Exponentielle, Géométrie dans l'Espace
- Trimestre 3 : Intégrales, Équations Différentielles, Probabilités, Isométries & Coniques

Chapitres FST que tu maîtrises :
- S1 : Analyse 1, Algèbre 1
- S2 : Analyse 2, Algèbre Linéaire
- S3/S4 : Analyse 3, Probabilités & Statistiques"""


def chat(message: str, history: List[Dict] = []) -> str:
    """
    Envoie un message au chat pédagogique.
    history: liste de {role: 'user'|'assistant', content: str}
    """
    messages = []

    # Ajouter l'historique
    for msg in history[-10:]:  # Max 10 messages d'historique
        if msg.get("role") in ("user", "assistant") and msg.get("content"):
            messages.append({
                "role": msg["role"],
                "content": str(msg["content"])
            })

    # Ajouter le message actuel
    messages.append({"role": "user", "content": message})

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1500,
        system=SYSTEM_PROMPT,
        messages=messages,
    )

    return response.content[0].text


def check_answer(question: str, student_answer: str, correct_solution: str, steps: List[Dict] = []) -> Dict:
    """
    Vérifie la réponse d'un étudiant et génère un feedback pédagogique.
    Retourne { score (0-100), feedback, is_correct, hint }
    """
    steps_str = "\n".join([f"- {s['label']}: {s['math']}" for s in steps]) if steps else "Non disponible"

    prompt = f"""Voici un exercice de mathématiques (programme Bac Tunisie) :

QUESTION : {question}

RÉPONSE DE L'ÉTUDIANT : {student_answer}

SOLUTION CORRECTE : {correct_solution}

ÉTAPES DE RÉSOLUTION :
{steps_str}

Analyse la réponse de l'étudiant et réponds UNIQUEMENT en JSON valide avec ce format exact :
{{
  "score": <nombre entre 0 et 100>,
  "is_correct": <true ou false>,
  "feedback": "<explication courte et encourageante en français, max 3 phrases>",
  "hint": "<conseil pour s'améliorer, max 1 phrase>",
  "error_type": "<type d'erreur si applicable : calcul|methode|signe|oubli|correct>"
}}

Sois bienveillant mais précis. Si la réponse est partiellement correcte, accorde des points partiels."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}],
    )

    import json
    text = response.content[0].text.strip()
    # Nettoyer le JSON
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0].strip()
    elif "```" in text:
        text = text.split("```")[1].split("```")[0].strip()

    try:
        return json.loads(text)
    except:
        # Fallback si JSON malformé
        is_correct = student_answer.strip().lower() == correct_solution.strip().lower()
        return {
            "score": 100 if is_correct else 30,
            "is_correct": is_correct,
            "feedback": "Bonne tentative ! Vérifie bien chaque étape de ton raisonnement.",
            "hint": "Reprends la méthode depuis le début.",
            "error_type": "calcul"
        }


def generate_exercise(chapter: str, difficulty: str = "moyen", level: str = "bac") -> Dict:
    """
    Génère un exercice original pour un chapitre donné.
    """
    level_context = "Bac 4ème Maths Tunisie" if level == "bac" else "Licence FST Tunisie (S1-S4)"

    prompt = f"""Génère un exercice de mathématiques pour le programme {level_context}.

Chapitre : {chapter}
Difficulté : {difficulty} (facile=exercice simple, moyen=exercice type bac, difficile=exercice complexe, bac=extrait examen Bac)

Réponds UNIQUEMENT en JSON valide avec ce format exact :
{{
  "title": "<titre court de l'exercice>",
  "question": "<énoncé complet et clair de l'exercice en français>",
  "solution": "<réponse finale concise>",
  "steps": [
    {{"label": "<étape>", "math": "<formule ou calcul>"}},
    {{"label": "<étape>", "math": "<formule ou calcul>"}}
  ],
  "points": <10, 15, ou 20 selon difficulté>,
  "hint": "<indice optionnel pour débuter>"
}}

L'exercice doit être réaliste, pédagogique et conforme au programme officiel tunisien."""

    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=800,
        messages=[{"role": "user", "content": prompt}],
    )

    import json
    text = response.content[0].text.strip()
    if "```json" in text:
        text = text.split("```json")[1].split("```")[0].strip()
    elif "```" in text:
        text = text.split("```")[1].split("```")[0].strip()

    try:
        data = json.loads(text)
        data["chapter"] = chapter
        data["difficulty"] = difficulty
        data["level"] = level
        return data
    except:
        return {
            "title": f"Exercice de {chapter}",
            "question": f"Résoudre un exercice de {chapter} de niveau {difficulty}.",
            "solution": "Voir correction",
            "steps": [],
            "points": 10,
            "chapter": chapter,
            "difficulty": difficulty,
            "level": level,
        }

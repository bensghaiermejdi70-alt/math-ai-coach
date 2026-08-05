import re, sys, os

MARKER = "Indique si ce jeu est réservé aux abonnés"

def strip_premium_block(html):
    # Matches the injected premium flag block, with or without a wrapping
    # <script>...</script> pair around it (both variants seen in the corpus).
    pattern = re.compile(
        r'[ \t]*(?:<script>\s*\r?\n)?'
        r'[ \t]*//\s*Indique si ce jeu est réservé aux abonnés\s*\r?\n'
        r'[ \t]*let isPremium\s*=\s*(?:true|false)\s*;[^\r\n]*\r?\n'
        r'(?:[ \t]*</script>\s*\r?\n?)?',
        re.MULTILINE
    )
    new_html, n = pattern.subn('', html)
    return new_html, n

def strip_cloudflare(html):
    pattern = re.compile(r'<script>\(function\(\)\{function c\(\)\{var b=a\.contentDocument.*?cdn-cgi/challenge-platform/scripts/jsd/main\.js.*?\}\)\(\);</script>\r?\n?')
    new_html, n = pattern.subn('', html)
    return new_html, n

def strip_old_close_scaffolding(html):
    n_total = 0
    # 1) polling "addBackToMenuButton" injector (setInterval every 500ms)
    pattern1 = re.compile(
        r'<script>\r?\n'
        r'function addBackToMenuButton\(\).*?</script>\r?\n?',
        re.DOTALL
    )
    html, n = pattern1.subn('', html); n_total += n
    # 2) "closeToMenuInjected" listener block
    pattern2 = re.compile(
        r'<script>\r?\n'
        r'/\* closeToMenuInjected \*/.*?</script>\r?\n?',
        re.DOTALL
    )
    html, n = pattern2.subn('', html); n_total += n
    # 3) any pre-existing "canonical closePlatform handler inserted by automation" block
    pattern3 = re.compile(
        r'<!-- canonical closePlatform handler inserted by automation -->\r?\n'
        r'<script>.*?window\.closePlatform = closePlatform;\r?\n\s*\}\)\(\);\r?\n</script>\r?\n?',
        re.DOTALL
    )
    html, n = pattern3.subn('', html); n_total += n
    return html, n_total

def fix_fallback_url(html):
    # old standalone-platform fallback -> new MathBacAI hub route
    new_html, n = re.subn(r"window\.location\.href\s*=\s*'/brainova\.html'", "window.location.href = '/detente'", html)
    new_html, n2 = re.subn(r"window\.location\.href\s*=\s*'index\.html'", "window.location.href = '/detente'", new_html)
    return new_html, n + n2

def has_close_button(html):
    return ('global-close-btn' in html) or ('class="close-btn"' in html) or ("class='close-btn'" in html)

CANONICAL_SCRIPT = """
<!-- MathBacAI: gestionnaire de fermeture unique -->
<script>
(function(){
    function closePlatform(){
        try{
            if(window.parent && window.parent !== window){
                window.parent.postMessage({ action: 'close', reason: 'user-initiated', source: '%SLUG%' }, '*');
                return;
            }
        }catch(e){}
        try{ window.location.href = '/detente'; }catch(e){}
    }
    window.closePlatform = closePlatform;
})();
</script>
"""

CLOSE_BUTTON_HTML = """
<button class="global-close-btn mbai-close-btn" title="Quitter" aria-label="Quitter" onclick="closePlatform()"
  style="position:fixed; top:12px; right:12px; z-index:9999; background:rgba(10,20,40,0.75); border:2px solid rgba(255,255,255,0.15); color:#fff; font-size:18px; width:36px; height:36px; border-radius:18px; display:flex; align-items:center; justify-content:center; cursor:pointer;">✕</button>
"""

CANONICAL_MARKER = "MathBacAI: gestionnaire de fermeture unique"

def clean_file(path, slug):
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        html = f.read()

    report = []

    # sécurité anti double-exécution : si ce fichier a déjà été nettoyé
    # par ce script, on ne réinjecte rien une 2e fois.
    already_done = CANONICAL_MARKER in html

    html, n = strip_premium_block(html)
    if n: report.append(f"flag isPremium retiré ({n} occurrence(s))")

    html, n = strip_cloudflare(html)
    if n: report.append(f"script résiduel Cloudflare retiré ({n})")

    html, n = strip_old_close_scaffolding(html)
    if n: report.append(f"ancien(s) mécanisme(s) de fermeture retiré(s) ({n} bloc(s))")

    html, n = fix_fallback_url(html)
    if n: report.append(f"URL de repli mise à jour vers /detente ({n})")

    if already_done:
        report.append("déjà nettoyé précédemment — rien rejouté")
        return html, report

    had_btn = has_close_button(html)
    if not had_btn:
        # inject a minimal close button just before </body>
        html = html.replace('</body>', CLOSE_BUTTON_HTML + '</body>')
        report.append("bouton de fermeture ajouté (absent à l'origine)")

    canonical = CANONICAL_SCRIPT.replace('%SLUG%', slug)
    if '</body>' in html:
        html = html.replace('</body>', canonical + '</body>')
    else:
        html += canonical
    report.append("gestionnaire closePlatform() canonique injecté")

    return html, report

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage : python clean_game.py <dossier_source> <dossier_destination>")
        print(r'Exemple : python clean_game.py "C:\jeux-brise-glace" "C:\math-ai-coach\public\jeux"')
        sys.exit(1)

    src_dir, dst_dir = sys.argv[1], sys.argv[2]
    os.makedirs(dst_dir, exist_ok=True)

    html_files = sorted(
        f for f in os.listdir(src_dir)
        if f.lower().endswith('.html')
    )

    if not html_files:
        print(f"Aucun fichier .html trouvé dans {src_dir}")
        sys.exit(1)

    print(f"{len(html_files)} fichier(s) trouvé(s) dans {src_dir}\n")

    ok, ko = 0, 0
    for fname in html_files:
        slug = os.path.splitext(fname)[0]  # jeux1.html -> jeux1
        src_path = os.path.join(src_dir, fname)
        dst_path = os.path.join(dst_dir, fname)
        try:
            cleaned, report = clean_file(src_path, slug)
            with open(dst_path, 'w', encoding='utf-8', newline='\r\n') as f:
                f.write(cleaned)
            print(f"[OK] {fname}")
            for r in report:
                print(f"      - {r}")
            ok += 1
        except Exception as e:
            print(f"[ERREUR] {fname} : {e}")
            ko += 1

    print(f"\nTerminé : {ok} fichier(s) nettoyé(s) et copié(s) vers {dst_dir}"
          + (f", {ko} en erreur" if ko else ""))
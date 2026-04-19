#!/usr/bin/env python3
import re, sys

filepath = r"src\app\bac-france\maths\seconde\[slug]\page.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix 1: backtick + ] devient backtick + }
content = re.sub(r'`\],', '`},', content)

# Fix 2: double virgule apres fermeture objet
content = re.sub(r'\},\s*,', '},', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

# Verifications
bt = content.count('`')
bad = len(re.findall(r'`\],', content))
double = len(re.findall(r'\},\s*,', content))
print(f"Backticks: {bt} - {'pair OK' if bt%2==0 else 'IMPAIR!'}")
print(f"Bugs backtick+]: {bad}")
print(f"Double virgules: {double}")
print("DONE")
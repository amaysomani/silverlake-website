import re
import os

file_path = r'C:\Users\soman\.gemini\antigravity-ide\brain\ecccf8a8-7cb3-43f3-bb2b-796bdd71fc9a\.system_generated\steps\9\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

indices = [m.start() for m in re.finditer(r'Sector Intelligence', html)]

with open('debug.txt', 'w', encoding='utf-8') as f:
    for i in indices:
        start = max(0, i - 1000)
        end = min(len(html), i + 4000)
        f.write(f"--- MATCH AT {i} ---\n")
        f.write(html[start:end])
        f.write("\n\n")

print(f"Found {len(indices)} matches.")

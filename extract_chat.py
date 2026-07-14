import re
import json

file_path = r'C:\Users\soman\.gemini\antigravity-ide\brain\ecccf8a8-7cb3-43f3-bb2b-796bdd71fc9a\.system_generated\steps\9\content.md'
with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Let's find anything that looks like a role followed by parts
matches = re.finditer(r'\\\"role\\\":\\\"(user|assistant)\\\".*?\\\"parts\\\":\[\\\"(.*?)\\\"\]', html)

with open('chat_output.txt', 'w', encoding='utf-8') as out:
    for m in matches:
        role = m.group(1)
        text = m.group(2)
        # Unescape escaped characters like \\n, \\\", etc.
        # This is a bit hacky but works for basic extraction
        text = text.replace('\\\\n', '\n').replace('\\\\\\"', '"').replace('\\\\', '\\')
        out.write(f"[{role.upper()}]\n{text}\n\n{'-'*40}\n\n")

print("Done parsing.")

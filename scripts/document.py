#!/usr/bin/env python3
"""Regenerate the checked-in effect READMEs and catalogue index."""
from pathlib import Path
from build import ROOT, SHADERS, catalogue

items = catalogue()
index = ['# Effect catalogue', '', 'Each effect has installation notes and links to every compositor variant.', '', '| Effect | Type | Available for |', '| --- | --- | --- |']
for item in items:
    directory = ROOT / 'docs/effects' / item['id']
    directory.mkdir(parents=True, exist_ok=True)
    lines = ['# ' + item['name'], '', item['description'], '', '**Type:** ' + item['category'], '', 'MIT — Barrulus. Preserve the license and third-party notices when sharing.', '']
    for variant in item['variants']:
        lines += ['## ' + variant['runtime'].title() + ' / ' + variant['profile'], '', '```text', variant['install'], '```', '', 'Files:', '']
        lines += [f'- [{name}](../../../shaders/{name})' for name in variant['files']]
        lines += ['']
    (directory / 'README.md').write_text('\n'.join(lines))
    platforms = ', '.join(sorted({v['runtime'] for v in item['variants']}))
    index.append(f'| [{item["name"]}](effects/{item["id"]}/README.md) | {item["category"]} | {platforms} |')
(ROOT / 'docs/CATALOGUE.md').write_text('\n'.join(index) + '\n')
for directory in sorted(p for p in SHADERS.rglob('*') if p.is_dir()):
    existing = directory / 'README.md'
    if existing.exists() and 'Editable shader sources, presets or authoring helpers.' not in existing.read_text():
        continue
    rel = directory.relative_to(SHADERS)
    names = sorted(p.name for p in directory.iterdir() if p.is_file() and p.name != 'README.md')
    text = f'# {str(rel).replace("/", " / ")}\n\n'
    text += 'Editable shader sources, presets or authoring helpers. Keep relative paths intact when installing.\n\n'
    if directory.name == 'bleed':
        text += 'These shared liquid geometry and pigment sources feed `generate-bleed-overlays.py`; use the generated ring and window files in a compositor.\n\n'
    if directory.name == 'scripts':
        text += 'Legacy Biri helpers: see the parent README for their required config-directory layout.\n\n'
    text += '\n'.join(f'- [{name}]({name})' for name in names) + '\n'
    (directory / 'README.md').write_text(text)
print(f'Documented {len(items)} effects.')

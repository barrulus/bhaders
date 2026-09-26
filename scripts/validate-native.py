#!/usr/bin/env python3
"""Optional native parser check; never modifies the user's active configuration."""
import argparse
from pathlib import Path
import shutil
import subprocess
import tempfile

from build import SHADERS, catalogue

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--biri', help='Path/name of a Biri executable')
parser.add_argument('--umbriel', help='Path/name of a compatible Umbriel executable')
args = parser.parse_args()
if not (args.biri or args.umbriel):
    parser.error('specify --biri and/or --umbriel')
failed = []
count = 0
with tempfile.TemporaryDirectory(prefix='bhaders-validation-') as temporary:
    stage = Path(temporary)
    shaders = stage / 'shaders'
    shutil.copytree(SHADERS, shaders)
    # Content paths require an installed location. Remap only the temporary copy.
    for p in (shaders / 'biri').rglob('*.kdl'):
        p.write_text(p.read_text().replace('~/.config/bhaders/', str(shaders) + '/'))
    for item in catalogue():
        for variant in item['variants']:
            binary = getattr(args, variant['runtime'])
            if not binary:
                continue
            entry = shaders / variant['entry']
            if variant['runtime'] == 'biri':
                config = stage / 'config.kdl'
                config.write_text(f'include "{entry}"\n')
            else:
                config = stage / 'config.toml'
                config.write_text(f'[include]\nfiles = ["{entry}"]\n')
            result = subprocess.run([binary, 'validate', '-c', str(config)], capture_output=True, text=True)
            output = result.stdout + result.stderr
            count += 1
            if result.returncode or 'cannot read' in output.lower():
                failed.append((variant['entry'], output))
print(f'Validated {count} variants; {len(failed)} failures.')
for entry, output in failed:
    print(f'\n{entry}\n{output}')
raise SystemExit(bool(failed))

import hashlib
import json
from pathlib import Path
import re
import sys
import tempfile
import unittest
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from build import ROOT, SHADERS, DIST, build, dependencies


class CatalogueTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.items = build()

    def test_every_download_contains_its_transitive_dependencies_and_notices(self):
        names = set()
        for item in self.items:
            self.assertTrue((ROOT / 'docs/effects' / item['id'] / 'README.md').is_file())
            for variant in item['variants']:
                with self.subTest(effect=item['id'], variant=variant['id']):
                    self.assertNotIn(variant['download'], names)
                    names.add(variant['download'])
                    archive = DIST / variant['download']
                    self.assertEqual(hashlib.sha256(archive.read_bytes()).hexdigest(), variant['sha256'])
                    with zipfile.ZipFile(archive) as z:
                        self.assertIsNone(z.testzip())
                        self.assertTrue({'LICENSE', 'LICENSES/Noctalia-MIT.txt', 'THIRD_PARTY_NOTICES.md', 'README.md'} <= set(z.namelist()))
                        self.assertEqual(z.read(variant['entry']), (SHADERS / variant['entry']).read_bytes())
                        for dependency in dependencies(SHADERS / variant['entry']):
                            self.assertEqual(z.read(str(dependency.relative_to(SHADERS))), dependency.read_bytes())
                        for name in z.namelist():
                            self.assertFalse(name.startswith('/'))
                            self.assertNotIn('..', Path(name).parts)

    def test_full_bundles_preserve_every_source_and_helper(self):
        for runtime in ['biri', 'umbriel']:
            with zipfile.ZipFile(DIST / f'downloads/bhaders-{runtime}-all.zip') as z:
                for source in (SHADERS / runtime).rglob('*'):
                    if source.is_file():
                        self.assertEqual(z.read(str(source.relative_to(SHADERS))), source.read_bytes())

    def test_every_import_is_preserved(self):
        for source in json.loads((ROOT / 'provenance.json').read_text())['sources']:
            self.assertTrue((ROOT / source['file']).is_file(), source['file'])

    def test_markdown_local_links_exist(self):
        for document in ROOT.rglob('*.md'):
            if '.git' in document.parts or 'dist' in document.parts:
                continue
            for href in re.findall(r'\]\(([^)]+)\)', document.read_text()):
                if '://' not in href and not href.startswith('#'):
                    self.assertTrue((document.parent / href.split('#')[0]).exists(), f'{document}: {href}')

    def test_downloads_are_reproducible(self):
        before = (DIST / 'downloads/SHA256SUMS').read_bytes()
        build()
        self.assertEqual(before, (DIST / 'downloads/SHA256SUMS').read_bytes())

    def test_missing_dependency_fails_instead_of_producing_broken_download(self):
        with tempfile.NamedTemporaryFile(suffix='.kdl', dir=SHADERS, mode='w') as f:
            f.write('include "missing-shader-file.kdl"\n')
            f.flush()
            with self.assertRaisesRegex(ValueError, 'Missing or unsafe dependency'):
                dependencies(Path(f.name))

    def test_escaping_dependency_is_rejected(self):
        with tempfile.NamedTemporaryFile(suffix='.kdl', dir=SHADERS, mode='w') as f:
            f.write('include "../LICENSE"\n')
            f.flush()
            with self.assertRaisesRegex(ValueError, 'Missing or unsafe dependency'):
                dependencies(Path(f.name))


if __name__ == '__main__':
    unittest.main()

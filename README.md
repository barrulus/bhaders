# bhaders

**Shaders by Barrulus, with a home of their own.**

An independent collection of living window borders, content treatments, cursor
trails, screen filters, lifecycle animations and elastic drag presets for **Biri**
and **Umbriel / bumbriel**. The website lets you browse the collection, preview
supported effects and download one effect with its dependencies or a complete pack.

The shader sources and website are available under the [MIT license](LICENSE).
See [credits and third-party notices](THIRD_PARTY_NOTICES.md) for the Umbriel
palette contributions. No compositor renderer implementation is included.

## Get the effects

- [Biri collection and installation](shaders/biri/README.md)
- [Umbriel collection and installation](shaders/umbriel/README.md)
- [Effect index](docs/CATALOGUE.md), with a README for every effect
- [Compatibility and browser previews](docs/COMPATIBILITY.md)
- [Source provenance](provenance.json)

Download ZIPs from the catalogue website, or copy this checkout's `shaders/biri`
and/or `shaders/umbriel` into `~/.config/bhaders/`. Keep the directory layout:
relative includes and inner/outer shader pairs depend on it. A website download
contains its own README, preset, all referenced shaders and license notices.

These are extensions for shader-capable **Biri** and the named-effect system in
**bumbriel**. Do not assume they work in stock niri or every Umbriel release.

## Build the catalogue

Requires Python **3.11 or newer**. There are no pip packages, npm packages,
third-party fonts, analytics, accounts or server-side services.

```sh
python3 scripts/build.py
python3 -m unittest discover -s tests -v
python3 -m http.server 8080 --directory dist
```

Open `http://localhost:8080`. The build writes the static site, raw sources,
individual dependency-complete ZIPs, two complete collections, a JSON catalogue
and `downloads/SHA256SUMS` to `dist/`. Missing preset dependencies fail the build.
Archive timestamps and file ordering are fixed for reproducible downloads.

If compatible compositor executables are installed, check every individual
preset with their native parsers as well:

```sh
python3 scripts/validate-native.py --biri biri --umbriel /path/to/umbriel
```

This runs against temporary copies, without reloading or editing your desktop.

`tests/browser.cjs` is an optional Playwright smoke test for all 51 Biri shader
previews, search, filters, downloads, dialog keyboard handling and mobile layout.
With Playwright installed in your test environment and the site served on port
8088, run `node tests/browser.cjs`. `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` and
`BHADERS_TEST_URL` can point to an existing test installation, browser and server.
The site and production build do not need Playwright or Node.

### Netlify

Connect this repository to Netlify and use `main` as the production branch.
[`netlify.toml`](netlify.toml) supplies the build command (`python3 scripts/build.py`)
and publish directory (`dist`). Merging to `main` can then trigger the normal
Git-connected deployment. No deployment token belongs in this repository.

The site uses relative asset URLs and also works with a conventional static web
server. Opening `index.html` directly as a `file:` URL will not load the catalogue.

## Maintain the collection

Edit the files under `shaders/`; the build discovers individual KDL/TOML presets.
Add an effect description in `scripts/build.py` and regenerate its documentation
with `python3 scripts/document.py`. New dependencies must live within `shaders/`.
An individual Umbriel preset should define one named effect; collection indexes
register the larger sets. Keep matching overlays with their ring source.

The imported Umbriel collection and examples are preserved separately where they
differ. Palette-aware collection variants are not silently replaced by example
variants. Files that were uncommitted in the source checkout are marked in
`provenance.json`; their hashes identify the imported working-tree versions.

This repository is the independent distribution home. The initial extraction
does not remove files or rewrite history in the compositor repositories.

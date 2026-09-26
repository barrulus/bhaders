# Authorship and license notices

The original shader collection is by **Barrulus** and is published in bhaders
under the root [MIT license](LICENSE), as a separate distribution of the author's
work. Historical copies in compositor repositories retain their historical
licenses. Moving files does not itself change anyone else's licensing rights.

## Umbriel palette contributions

The Umbriel collection includes palette support contributed by **weegs710** in
`barrulus/bumbriel` commits `7ff9ad7cc80f89ba46dcfe7b00aae9bb96b7b89e` and
`4227401e0f19f9c1663f233b9d4806ac02ac0455`, under that project's MIT license.
The source project's copyright notice is retained in
[`LICENSES/Noctalia-MIT.txt`](LICENSES/Noctalia-MIT.txt): Copyright (c) 2026 Noctalia.

Affected collection sources: `rings/lightning.glsl`, `rings/pulse.glsl`,
`rings/rainbow-ripple.glsl`, `window/rainbow-radial.glsl`,
`window/rainbow-smoke.glsl`, `window/rainbow-waves.glsl`,
`window/rgb-border.glsl` and `window/rgb-shimmer.glsl`.

Every generated download carries both MIT notices, including downloads that do
not use these particular files, so extracting or sharing a pack retains the credits.

## Import notes

`provenance.json` records source repositories, revisions, original paths and
SHA-256 hashes. Original author comments remain in the shader sources. Stale
comments referring to a missing Biri GPL license in Barrulus's own shader files
have been updated to identify this MIT distribution. Source hashes retain the
identity of the pre-import files.

Biri preset paths were adapted to `~/.config/bhaders/biri/`. Standalone presets,
the website, documentation and the browser preview host were added for this
distribution. The browser host was written independently; it does not copy the
GPL compositor renderer. The CPU implementations of drag physics are not bundled;
only configuration presets are included.

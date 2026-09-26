# Rainbow Ripple

A glossy, uneven rainbow band flows around the window perimeter.

**Type:** Rings

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/focus-ring/rainbow-ripple.kdl"

This enables a global focus ring. A later per-window focus-ring shader overrides it; copy the focus-ring block into that window rule if needed.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/focus-ring/rainbow-ripple.frag](../../../shaders/biri/focus-ring/rainbow-ripple.frag)
- [biri/focus-ring/rainbow-ripple.kdl](../../../shaders/biri/focus-ring/rainbow-ripple.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/rings/rainbow-ripple.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["rainbow-ripple"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
Paired example overlays use a 6px border and a 10px decorated corner radius unless their source says otherwise. Keep inner and outer speeds equal; regenerate overlays when changing their geometry.
```

Files:

- [umbriel/collection/rings/rainbow-ripple.glsl](../../../shaders/umbriel/collection/rings/rainbow-ripple.glsl)
- [umbriel/collection/rings/rainbow-ripple.toml](../../../shaders/umbriel/collection/rings/rainbow-ripple.toml)

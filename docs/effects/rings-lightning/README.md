# Lightning

Blue-white energy races around the frame with a bright travelling pulse.

**Type:** Rings

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/focus-ring/lightning.kdl"

This enables a global focus ring. A later per-window focus-ring shader overrides it; copy the focus-ring block into that window rule if needed.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/focus-ring/lightning.frag](../../../shaders/biri/focus-ring/lightning.frag)
- [biri/focus-ring/lightning.kdl](../../../shaders/biri/focus-ring/lightning.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/rings/lightning.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["lightning"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
Paired example overlays use a 6px border and a 10px decorated corner radius unless their source says otherwise. Keep inner and outer speeds equal; regenerate overlays when changing their geometry.
```

Files:

- [umbriel/collection/rings/lightning.glsl](../../../shaders/umbriel/collection/rings/lightning.glsl)
- [umbriel/collection/rings/lightning.toml](../../../shaders/umbriel/collection/rings/lightning.toml)

## Umbriel / Examples

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/lightning.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["lightning"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
Paired example overlays use a 6px border and a 10px decorated corner radius unless their source says otherwise. Keep inner and outer speeds equal; regenerate overlays when changing their geometry.
```

Files:

- [umbriel/examples/presets/lightning.toml](../../../shaders/umbriel/examples/presets/lightning.toml)
- [umbriel/examples/shaders/rings/lightning.glsl](../../../shaders/umbriel/examples/shaders/rings/lightning.glsl)

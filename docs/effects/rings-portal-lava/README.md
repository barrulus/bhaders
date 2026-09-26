# Portal Lava

Purple liquid swells, pinches and sheds inward, threaded with green filaments.

**Type:** Rings

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/focus-ring/portal-lava.kdl"

This enables a global focus ring. A later per-window focus-ring shader overrides it; copy the focus-ring block into that window rule if needed.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/focus-ring/portal-lava.frag](../../../shaders/biri/focus-ring/portal-lava.frag)
- [biri/focus-ring/portal-lava.kdl](../../../shaders/biri/focus-ring/portal-lava.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/rings/portal-lava.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["portal-lava"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
Paired example overlays use a 6px border and a 10px decorated corner radius unless their source says otherwise. Keep inner and outer speeds equal; regenerate overlays when changing their geometry.
```

Files:

- [umbriel/collection/rings/portal-lava.glsl](../../../shaders/umbriel/collection/rings/portal-lava.glsl)
- [umbriel/collection/rings/portal-lava.toml](../../../shaders/umbriel/collection/rings/portal-lava.toml)
- [umbriel/collection/window/portal-lava-overlay.glsl](../../../shaders/umbriel/collection/window/portal-lava-overlay.glsl)

## Umbriel / Examples

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/portal-lava.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["portal-lava"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
Paired example overlays use a 6px border and a 10px decorated corner radius unless their source says otherwise. Keep inner and outer speeds equal; regenerate overlays when changing their geometry.
```

Files:

- [umbriel/examples/presets/portal-lava.toml](../../../shaders/umbriel/examples/presets/portal-lava.toml)
- [umbriel/examples/shaders/rings/portal-lava.glsl](../../../shaders/umbriel/examples/shaders/rings/portal-lava.glsl)
- [umbriel/examples/shaders/window/portal-lava-overlay.glsl](../../../shaders/umbriel/examples/shaders/window/portal-lava-overlay.glsl)

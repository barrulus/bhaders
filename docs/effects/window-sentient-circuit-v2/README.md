# Sentient Circuit V2

A second circuit treatment with roaming electronic activity.

**Type:** Window

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/window/sentient-circuit-v2.kdl"

This registers a window-shader preset. Select it with cycle-window-shader; it does not automatically apply it to every window.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/window/sentient-circuit-v2.frag](../../../shaders/biri/window/sentient-circuit-v2.frag)
- [biri/window/sentient-circuit-v2.kdl](../../../shaders/biri/window/sentient-circuit-v2.kdl)

## Umbriel / Examples

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/window.sentient-circuit-v2.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["window.sentient-circuit-v2"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/examples/presets/window.sentient-circuit-v2.toml](../../../shaders/umbriel/examples/presets/window.sentient-circuit-v2.toml)
- [umbriel/examples/shaders/window/sentient-circuit-v2.glsl](../../../shaders/umbriel/examples/shaders/window/sentient-circuit-v2.glsl)

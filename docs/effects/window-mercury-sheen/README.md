# Mercury Sheen

A moving liquid-metal sheen catches the light.

**Type:** Window

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/window/mercury-sheen.kdl"

This registers a window-shader preset. Select it with cycle-window-shader; it does not automatically apply it to every window.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/window/mercury-sheen.frag](../../../shaders/biri/window/mercury-sheen.frag)
- [biri/window/mercury-sheen.kdl](../../../shaders/biri/window/mercury-sheen.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/window/mercury-sheen.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["window.mercury-sheen"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/window/mercury-sheen.glsl](../../../shaders/umbriel/collection/window/mercury-sheen.glsl)
- [umbriel/collection/window/mercury-sheen.toml](../../../shaders/umbriel/collection/window/mercury-sheen.toml)

## Umbriel / Examples

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/window.mercury-sheen.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["window.mercury-sheen"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/examples/presets/window.mercury-sheen.toml](../../../shaders/umbriel/examples/presets/window.mercury-sheen.toml)
- [umbriel/examples/shaders/window/mercury-sheen.glsl](../../../shaders/umbriel/examples/shaders/window/mercury-sheen.glsl)

# Flap Board

A mechanical flap-board treatment animates the window surface.

**Type:** Window

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/window/flap-board.kdl"

This registers a window-shader preset. Select it with cycle-window-shader; it does not automatically apply it to every window.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/window/flap-board.frag](../../../shaders/biri/window/flap-board.frag)
- [biri/window/flap-board.kdl](../../../shaders/biri/window/flap-board.kdl)

## Umbriel / Examples

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/window.flap-board.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["window.flap-board"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/examples/presets/window.flap-board.toml](../../../shaders/umbriel/examples/presets/window.flap-board.toml)
- [umbriel/examples/shaders/window/flap-board.glsl](../../../shaders/umbriel/examples/shaders/window/flap-board.glsl)

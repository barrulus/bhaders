# Wobbly Move

A timeline-driven wobble for window moves; independent of pointer velocity.

**Type:** Animations

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Umbriel / Examples

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/wobbly-move.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["wobbly-move"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/examples/presets/wobbly-move.toml](../../../shaders/umbriel/examples/presets/wobbly-move.toml)
- [umbriel/examples/shaders/animations/wobbly-move.glsl](../../../shaders/umbriel/examples/shaders/animations/wobbly-move.glsl)

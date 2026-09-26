# Reveal

A moving edge reveals or conceals the window.

**Type:** Animations

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/presets/reveal.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["reveal"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/animations/reveal.glsl](../../../shaders/umbriel/collection/animations/reveal.glsl)
- [umbriel/collection/presets/reveal.toml](../../../shaders/umbriel/collection/presets/reveal.toml)

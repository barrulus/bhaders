# Paper

A coordinated content shader and ring preset for Paper.

**Type:** Themes

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/paper.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["paper"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/animations/paper.glsl](../../../shaders/umbriel/collection/animations/paper.glsl)
- [umbriel/collection/paper.toml](../../../shaders/umbriel/collection/paper.toml)
- [umbriel/collection/rings/scribbling-pencils.glsl](../../../shaders/umbriel/collection/rings/scribbling-pencils.glsl)
- [umbriel/collection/window/crumpled-paper.glsl](../../../shaders/umbriel/collection/window/crumpled-paper.glsl)
- [umbriel/collection/window/scribbling-pencils-overlay.glsl](../../../shaders/umbriel/collection/window/scribbling-pencils-overlay.glsl)

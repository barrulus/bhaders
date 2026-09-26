# Squash

The window squashes and stretches during a transition.

**Type:** Animations

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/presets/squash.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["squash"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/animations/squash.glsl](../../../shaders/umbriel/collection/animations/squash.glsl)
- [umbriel/collection/presets/squash.toml](../../../shaders/umbriel/collection/presets/squash.toml)

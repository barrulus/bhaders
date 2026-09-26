# Melt

Windows melt away and form again during lifecycle transitions.

**Type:** Animations

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/close/close-melt.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/close/close-melt.kdl](../../../shaders/biri/close/close-melt.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/animations/melt.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["melt"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/animations/melt-close.glsl](../../../shaders/umbriel/collection/animations/melt-close.glsl)
- [umbriel/collection/animations/melt-open.glsl](../../../shaders/umbriel/collection/animations/melt-open.glsl)
- [umbriel/collection/animations/melt.toml](../../../shaders/umbriel/collection/animations/melt.toml)

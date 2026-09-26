# Taffy

A soft, weighted window stretches and trails behind the pointer.

**Type:** Motion

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/drag/taffy.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
This is a CPU drag-physics preset, not a GLSL shader. It requires compositor support for elastic drag physics.
```

Files:

- [biri/drag/taffy.kdl](../../../shaders/biri/drag/taffy.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/drag.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["taffy"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
This is a CPU drag-physics preset, not a GLSL shader. It requires compositor support for elastic drag physics.
```

Files:

- [umbriel/drag.toml](../../../shaders/umbriel/drag.toml)

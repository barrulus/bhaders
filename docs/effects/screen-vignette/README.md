# Vignette

The edges of the screen gently darken.

**Type:** Screen

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/screen/vignette.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/screen/vignette.kdl](../../../shaders/biri/screen/vignette.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/screen/vignette.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["screen.vignette"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/screen/vignette.glsl](../../../shaders/umbriel/collection/screen/vignette.glsl)
- [umbriel/collection/screen/vignette.toml](../../../shaders/umbriel/collection/screen/vignette.toml)

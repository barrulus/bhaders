# Whirlpool

Windows spiral into and out of a dissolving whirlpool.

**Type:** Animations

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/close/close-whirlpool.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/close/close-whirlpool.kdl](../../../shaders/biri/close/close-whirlpool.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/animations/whirlpool.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["whirlpool"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/animations/whirlpool-close.glsl](../../../shaders/umbriel/collection/animations/whirlpool-close.glsl)
- [umbriel/collection/animations/whirlpool-open.glsl](../../../shaders/umbriel/collection/animations/whirlpool-open.glsl)
- [umbriel/collection/animations/whirlpool.toml](../../../shaders/umbriel/collection/animations/whirlpool.toml)

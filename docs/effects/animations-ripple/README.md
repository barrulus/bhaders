# Ripple

An expanding ripple responds to the cursor or a window transition.

**Type:** Animations

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/close/close-ripple.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/close/close-ripple.kdl](../../../shaders/biri/close/close-ripple.kdl)

## Umbriel / Collection

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add this path to your existing [include].files array (use your actual absolute home path):

[include]
files = ["/home/YOU/.config/bhaders/umbriel/collection/animations/ripple.toml"]

Registering an effect does not activate it. Select it in your config:

[appearance]
effects = ["ripple"]

Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.
Requires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions.
```

Files:

- [umbriel/collection/animations/ripple-close.glsl](../../../shaders/umbriel/collection/animations/ripple-close.glsl)
- [umbriel/collection/animations/ripple-open.glsl](../../../shaders/umbriel/collection/animations/ripple-open.glsl)
- [umbriel/collection/animations/ripple.toml](../../../shaders/umbriel/collection/animations/ripple.toml)

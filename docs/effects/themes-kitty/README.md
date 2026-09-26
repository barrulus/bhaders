# Kitty

A coordinated content shader and ring preset for Kitty.

**Type:** Themes

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/terminals/kitty.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/focus-ring/portal-lava.frag](../../../shaders/biri/focus-ring/portal-lava.frag)
- [biri/terminals/kitty.kdl](../../../shaders/biri/terminals/kitty.kdl)
- [biri/window/rainbow-smoke.frag](../../../shaders/biri/window/rainbow-smoke.frag)

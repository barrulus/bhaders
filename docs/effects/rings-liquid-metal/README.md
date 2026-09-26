# Liquid Metal

Flowing chrome forms downward rivulets and hanging silver drips.

**Type:** Rings

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/focus-ring/liquid-metal.kdl"

This enables a global focus ring. A later per-window focus-ring shader overrides it; copy the focus-ring block into that window rule if needed.

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
```

Files:

- [biri/focus-ring/liquid-metal.frag](../../../shaders/biri/focus-ring/liquid-metal.frag)
- [biri/focus-ring/liquid-metal.kdl](../../../shaders/biri/focus-ring/liquid-metal.kdl)

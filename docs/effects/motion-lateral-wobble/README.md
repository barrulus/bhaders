# Lateral Wobble

Side-to-side elastic motion follows a dragged window.

**Type:** Motion

MIT — Barrulus. Preserve the license and third-party notices when sharing.

## Biri / Biri

```text
Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).

Add to your biri config:

include "~/.config/bhaders/biri/drag/lateral-wobble.kdl"

Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.
Requires biri's custom shader extensions; stock niri is not supported.
This is a CPU drag-physics preset, not a GLSL shader. It requires compositor support for elastic drag physics.
```

Files:

- [biri/drag/lateral-wobble.kdl](../../../shaders/biri/drag/lateral-wobble.kdl)

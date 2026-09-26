# Biri effects

Copy this directory to `~/.config/bhaders/biri/`. Individual website downloads
already contain the `biri/` folder: extract them into `~/.config/bhaders/`.

For a global flowering-vine ring, add to your Biri config:

```kdl
include "~/.config/bhaders/biri/focus-ring/flowering-vine.kdl"
```

Per-window focus-ring shaders take precedence over a global ring. To change one
application, copy the preset's `focus-ring` block into its `window-rule` and use
the full installed shader path. `draw-inside true` lets paired effects paint on
both sides of the client edge. Other shaders remain hollow by default.

For a content shader, either include its generated `window/NAME.kdl` to register
a named preset and select it with `cycle-window-shader`, or apply it directly:

```kdl
window-rule {
    match app-id="^foot$"
    shader { path "~/.config/bhaders/biri/window/rainbow-smoke.frag"; }
}
```

Include a `cursor/*.kdl`, `screen/*.kdl` or `close/*.kdl` to activate that preset.
Global cursor and screen snippets replace the same global-shader setting; they
do not automatically stack. Close presets own both open and close animations.
`terminals/` supplies coordinated Foot, Ghostty and Kitty themes; `all.kdl` also
enables Taffy drag physics globally. `experiments/` contains feedback diagnostics.

```sh
biri validate -c ~/.config/biri/config.kdl
biri msg action load-config-file
```

Substitute your actual config path. A supported Biri build is required; stock
niri and older builds do not recognize every extension. Shader source edits are
watched by Biri. See the source constants for brightness, speed and geometry.

## Optional legacy cycling helpers

The `scripts/` directory preserves the original close/global cycling helpers.
They expect a Biri config layout with `global-shaders/` and `shaders/` directories,
not the catalogue's independent install layout. Use `BIRI_CONFIG_DIR` to point
them at such a layout. Direct includes above do not need these helpers.

`lightning.frag` and `fuse.frag` support 1–4 simultaneous heads via
`LIGHTNING_COUNT` and `EMBER_COUNT`. Light spill is opt-in in their presets.

All downloads carry the root MIT license and third-party notices.

# Umbriel / bumbriel effects

Two source families are preserved:

- `collection/`: the packaged Barrulus shaders, including palette-aware variants
  and the complete paper effect.
- `examples/`: the example shader collection, including flowering vines, faerie
  magic, liquid effects, circuits, glass, flap boards and paired overlays.

Copy this directory to `~/.config/bhaders/umbriel/`. Individual website downloads
already contain `umbriel/`: extract them into `~/.config/bhaders/`.
This requires the **named-effect shader system from bumbriel**; verify that your
Umbriel build supports it. Do not assume compatibility with every upstream release.

## One effect

Add the individual preset to your existing include list, using your actual
absolute home path. Then select its name:

```toml
[include]
files = ["/home/YOU/.config/bhaders/umbriel/examples/presets/flowering-vine.toml"]

[appearance]
effects = ["flowering-vine"]
border_width = 6
outer_border_width = 0
corner_radius = 10
```

Merge fields into existing tables; don't add duplicate `[include]` or
`[appearance]` table headers. Paths inside presets resolve relative to their file.

## Complete collections

`collection/collection.toml` registers its content, cursor, screen and lifecycle
definitions; `collection/choices.toml` supplies borders and choices. The
`examples/effects.toml` file registers the example set. Choose which family you
want rather than including overlapping definitions indiscriminately. Registration
does not select an effect. `appearance.effects` or a matching window rule selects it.

```sh
umbriel validate -c /path/to/config.toml
umbriel msg 'effect:window set flowering-vine --scope border.inner,border.outer'
```

Use your configured reload action after validation. Runtime selections require
the effect to have been registered and may override configured defaults.

## Paper, motion and authoring

`collection/paper.toml` combines crumpled paper content, scribbling pencils and
paper opening/closing. It uses a 6px border, a 12px configured corner radius and
enabled lifecycle animations. Opening is 1350ms and closing is 1150ms. The pencil
passes use `focused_only = false`; change both together to limit them to focus.

Edit `collection/rings/scribbling-pencils.glsl`, then run
`python3 collection/tools/generate-paper-overlay.py`. The matching example
generators live in `examples/shaders/generate-*.py` and resolve paths from their
own location. Keep inner and outer timing and geometry in sync. Most paired
example overlays assume a 6px border and a 10px decorated corner radius.

`drag.toml` registers Jelly and Taffy CPU drag-physics settings. The compositor
supplies the solver; it is not part of this collection.

All downloads carry the root MIT license and the retained Noctalia MIT notice.

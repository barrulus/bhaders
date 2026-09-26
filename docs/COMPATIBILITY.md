# Compatibility

| Format | Target | Notes |
| --- | --- | --- |
| Biri `.kdl` / `.frag` | Biri with custom ring, window and global shaders | Stock niri does not supply these extensions. Inward rings need `draw-inside`; light spill and drag physics need their respective Biri features. |
| Umbriel collection `.toml` / `.glsl` | bumbriel named effects | Includes collection palette variants, lifecycle shaders and the paper set. Check your Umbriel version supports `[effects]` and the relevant scopes. |
| Umbriel example `.toml` / `.glsl` | bumbriel named effects | Preserves the example variants and their paired inner overlays. These may differ from the palette-aware collection. |
| Motion presets | The compositor's elastic drag implementation | These are CPU physics settings, not downloadable GLSL implementations. |

Exact source revisions are in [provenance.json](../provenance.json). Validate
against your installed compositor before reloading. Registering an Umbriel
effect or a Biri window-shader preset does not necessarily activate it.

## Browser studies

Ring and window previews execute the **actual Biri GLSL source** with a sample
window in a small, independent WebGL host. They use a 6px ring, 8px corner radius,
480×300 logical window and the preset's padding. `draw-inside` controls clipping.
These are illustrative studies, not recordings of a running compositor.

The host does not reproduce compositor light spill, output scaling, window
transparency, colour management or all blending behavior. A card can use its
Biri variant as the visual study even when the catalogue is filtered to Umbriel;
the variant-specific detail panel explicitly identifies whether a preview exists.
Umbriel-only variants, cursor feedback, screen effects, lifecycle animations and
CPU drag physics should be tried in the target compositor. Unavailable WebGL or
a compile failure does not prevent downloading an effect.

Animation respects `prefers-reduced-motion` and can be paused. Card studies are
static; the hero and open preview share one WebGL context. Rendering pauses when
the page is hidden and when the hero is off-screen. All preview assets are local.

## Cost and accessibility

Animated full-screen shaders can increase GPU use and inhibit direct scanout.
Feedback effects depend on compositor-provided previous-frame buffers. Ring
padding reserves drawing space; it does not increase layout gaps. Large inward
effects can cover content near a window's edges.

Colour-vision experiments are visual options, not validated medical aids. Try
them on your own content and choose what is useful to you.

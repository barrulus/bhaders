// Flowing chrome with downward rivulets and hanging silver drips.
// Biri file-based decoration shader: vec4 ring_color(vec2 coords).
// Host supplies ring_size, ring_width, ring_padding, ring_distance(coords),
// niri_time and niri_scale. Coordinates are logical pixels from the client
// top-left (y down); return STRAIGHT RGBA. The host clips the client and
// applies opacity / premultiplication. Do not add main() or uniform declarations.
//
// Example inside a window-rule:
// focus-ring {
//     on
//     width 8
//     shader {
//         path "~/.config/biri/focus-ring/liquid-metal.frag"
//         padding 24
//     }
// }
// padding 24 suits width <= 8. For wider rings allow at least
// 2.5 * width + 2 / output_scale logical pixels of shader padding.

// Edit these constants to tune the effect. SPEED=0 freezes it.
const float SPEED = 0.45;
const float STRENGTH = 0.9;
const float BRIGHTNESS = 1.0;
const float RING_OUTSET_MULTIPLIER = 3.5;

// Clockwise coordinate along the rectangle, in logical pixels. Projecting onto
// its perimeter keeps the traveller at a constant speed along straight edges.
float fr_perimeter(vec2 coords, vec2 size) {
    vec2 half_size = max(size * 0.5, vec2(1.0));
    vec2 p = coords - half_size;
    vec2 q = p / max(max(abs(p.x) / half_size.x, abs(p.y) / half_size.y), 0.0001);
    float along;
    if (abs(q.y) / half_size.y >= abs(q.x) / half_size.x) {
        along = q.y < 0.0 ? q.x + half_size.x : size.x + size.y + half_size.x - q.x;
    } else {
        along = q.x > 0.0 ? size.x + q.y + half_size.y : 2.0 * size.x + size.y + half_size.y - q.y;
    }
    return along / (2.0 * (size.x + size.y));
}

// Integer frequencies make the perimeter seam and four-second loop continuous.
float fr_flow(float u, float phase) {
    const float tau = 6.28318530718;
    return 0.46 * sin(tau * (3.0 * u - phase) + 0.7)
        + 0.28 * sin(tau * (7.0 * u + 2.0 * phase) + 2.1)
        + 0.17 * sin(tau * (11.0 * u - 2.0 * phase) + 4.4)
        + 0.09 * sin(tau * (19.0 * u + 3.0 * phase) + 1.3);
}

vec4 ring_color(vec2 coords) {
    if (ring_width <= 0.0 || min(ring_size.x, ring_size.y) <= 0.0) return vec4(0.0);
    const float tau = 6.28318530718;
    float phase = fract(niri_time * SPEED / 4.0);
    float strength = clamp(STRENGTH, 0.0, 1.0);
    float width = ring_width;
    vec2 inner_size = ring_size;
    vec2 local = coords;
    float distance = ring_distance(coords);
    float aa = 0.5 / max(niri_scale, 0.01);
    if (distance <= 0.0 || distance >= RING_OUTSET_MULTIPLIER * width + 2.0 * aa) return vec4(0.0);
    float u = fr_perimeter(local, inner_size);
    float d = distance / width;
    vec3 rgb;
    float coverage;

    // Slow moving chrome pools. Side rivulets move DOWN on both sides;
    // hanging teardrops stretch from the bottom rim under gravity.
    float flow = fr_flow(u + 0.025 * fr_flow(u, phase), phase);
    float fine = fr_flow(u * 2.0 + 0.2, phase);
    float bottom = smoothstep(inner_size.y - width, inner_size.y + width, local.y);
    float side = (1.0 - smoothstep(width, width * 2.0, min(abs(local.x), abs(local.x - inner_size.x))))
        * (1.0 - bottom);
    float fall = pow(0.5 + 0.5 * sin(tau * (local.y / max(inner_size.y, 1.0) * 5.0 - phase * 2.0)), 5.0);
    float drops = pow(0.5 + 0.5 * sin(tau * (local.x / max(inner_size.x, 1.0) * 7.0 + 0.12 * sin(tau * phase))), 10.0);
    float stretch = 0.5 + 0.5 * sin(tau * (phase + local.x / max(inner_size.x, 1.0) * 3.0));
    float inner = strength * (0.12 + 0.10 * flow);
    float thickness = 0.85 + strength * (0.32 * flow + 0.38 * fine + 0.40 * side * fall + 1.5 * bottom * drops * stretch);
    float across = clamp((d - inner) / max(thickness, 0.1), 0.0, 1.0);
    coverage = smoothstep(inner * width - aa, inner * width + aa, distance)
        * (1.0 - smoothstep((inner + thickness) * width - aa, (inner + thickness) * width + aa, distance));
    // A reflected dark horizon and tight white studio lights make this
    // read as chrome, with ridges drifting through the liquid surface.
    float reflection = sin(tau * (across * 0.94 + 0.14 * flow + 0.08 * fine));
    float bright = smoothstep(-0.20, 0.45, reflection);
    rgb = mix(vec3(0.025, 0.04, 0.07), vec3(0.72, 0.83, 0.9), bright);
    float glint = exp(-pow((across - 0.23 - 0.09 * fine) / 0.065, 2.0));
    float rim = exp(-pow((across - 0.88) / 0.045, 2.0));
    rgb = mix(rgb, vec3(0.98, 0.99, 1.0), clamp(glint + rim * 0.75, 0.0, 1.0));

    // Antialias the client boundary and fade before the reserved outer extent.
    float outer_limit = min(RING_OUTSET_MULTIPLIER * width, width + ring_padding);
    float envelope = smoothstep(0.0, 2.0 * aa, distance)
        * (1.0 - smoothstep(outer_limit - 2.0 * aa, outer_limit, distance));
    float alpha = clamp(coverage * envelope, 0.0, 1.0);
    rgb = clamp(rgb * BRIGHTNESS, 0.0, 1.0);
    return vec4(rgb, alpha);
}

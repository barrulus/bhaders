#!/usr/bin/env python3
"""Build the static catalogue and reproducible, dependency-complete ZIPs. Python 3.11+."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re
import shutil
import tomllib
import zipfile

ROOT = Path(__file__).resolve().parents[1]
SHADERS = ROOT / "shaders"
DIST = ROOT / "dist"
CATEGORIES = {"focus-ring": "Rings", "rings": "Rings", "window": "Window", "cursor": "Cursor", "screen": "Screen", "close": "Animations", "animations": "Animations", "drag": "Motion", "terminals": "Themes", "experiments": "Experiments"}
DESCRIPTIONS = {
    "flowering-vine": "Living vines unfurl leaves and flowers along both sides of the window edge.",
    "faerie-magic": "Tiny magical trails and sparkling creatures dance around the window frame.",
    "portal-lava": "Purple liquid swells, pinches and sheds inward, threaded with green filaments.",
    "neon-bleed": "A rainbow wax edge stretches into tongues and sheds droplets into the window.",
    "rainbow-bleed": "Glossy rainbow ripples grow inward as well as around the frame.",
    "rainbow-ripple": "A glossy, uneven rainbow band flows around the window perimeter.",
    "flowing-water": "Layered currents and glints of water flow around the outside of the frame.",
    "sentient-runner": "Green and gold energy packets travel along a circuit-like border.",
    "sentient-spark": "Small, irregular sparks flicker into life around the window edge.",
    "scribbling-pencils": "Four yellow pencils trace graphite strokes on a continuous paper margin.",
    "liquid-metal": "Flowing chrome forms downward rivulets and hanging silver drips.",
    "fuse": "A glowing ember burns around a braided cord, trailing char and flying sparks.",
    "lightning": "Blue-white energy races around the frame with a bright travelling pulse.",
    "pulse": "A clean cyan ring gently brightens and fades.",
    "portal": "A swirling portal traces the window perimeter.",
    "rainbow-smoke": "Coloured smoke boils and rolls over the content with a slowly shifting spectrum.",
    "rainbow-waves": "Moving waves of colour wash over the window.",
    "rainbow-radial": "A radial rainbow moves across the content.",
    "rainfall": "Rain streaks and droplets move across the glass.",
    "snowfall": "Soft falling snow drifts over the window.",
    "autumn-leaves": "Autumn leaves drift across the content.",
    "prairie-wind": "Wind-swept grass moves across the window surface.",
    "rolling-clouds": "Layered cloud fields billow and fold over one another.",
    "fire": "Animated fire rises over the window surface.",
    "fire-tendrils": "Wisps of flame curl and stretch across the glass.",
    "mercury-sheen": "A moving liquid-metal sheen catches the light.",
    "ripple-drops": "Expanding circular ripples spread across the content.",
    "rgb-shimmer": "A subtle moving spectrum adds colour to the window.",
    "rgb-border": "A shifting spectrum colours the content near its edges.",
    "crt": "Scanlines and display distortion recall an old CRT monitor.",
    "parchment": "A warm paper treatment adds grain and texture to the content.",
    "parchment-dark": "A darker parchment treatment for a muted, textured window.",
    "crumpled-paper": "Neutral paper fibres and creases preserve bright and dark content contrast.",
    "paper": "A full paper set: unfurling and scrunching animations, pencils and crumpled stationery.",
    "film-grain": "Fine animated film grain adds texture to the image.",
    "pixel-mosaic": "The content breaks into a patterned mosaic of pixels.",
    "fisheye-rgb": "A fisheye lens bends the image with separated colour channels.",
    "rorschach": "An evolving inkblot pattern spreads across the glass.",
    "rorschach2": "A second variation on animated inkblot patterns.",
    "liquid-glass": "Liquid distortions ripple through the window content.",
    "flap-board": "A mechanical flap-board treatment animates the window surface.",
    "sentient-circuit": "An animated network of circuit paths lights up over the content.",
    "sentient-circuit-v2": "A second circuit treatment with roaming electronic activity.",
    "adaptive-text-v3": "A content treatment designed to improve text legibility on transparent terminals.",
    "adaptive-text-v4": "A revised legibility treatment for text on transparent terminal surfaces.",
    "whirlpool": "Windows spiral into and out of a dissolving whirlpool.",
    "melt": "Windows melt away and form again during lifecycle transitions.",
    "ripple": "An expanding ripple responds to the cursor or a window transition.",
    "lightning-melt": "Lightning drives a matched opening and closing animation.",
    "reveal": "A moving edge reveals or conceals the window.",
    "squash": "The window squashes and stretches during a transition.",
    "wobbly-lifecycle": "A springy sheet expands into view and contracts away.",
    "wobbly-move": "A timeline-driven wobble for window moves; independent of pointer velocity.",
    "jelly": "A springy elastic sheet deforms as you drag a window, then settles.",
    "taffy": "A soft, weighted window stretches and trails behind the pointer.",
    "lateral-wobble": "Side-to-side elastic motion follows a dragged window.",
    "adaptive": "A cursor-following highlight adapts to the content underneath.",
    "blueglow": "A blue halo and soft glow follow the pointer.",
    "comet": "A bright comet trail follows pointer movement.",
    "comet-glow": "A glowing variation of the cursor comet with feedback trails.",
    "rainbow-tunnel": "A colourful tunnel follows the cursor.",
    "rainbow-tunnel-bare": "A stripped-down rainbow tunnel around the pointer.",
    "shockwave": "A cursor-centred shockwave distorts the screen.",
    "spotlight": "A spotlight follows the pointer while the surrounding screen dims.",
    "trail": "A persistent fading trail traces pointer movement.",
    "warmtint": "A warm colour wash softens the display.",
    "grayscale": "A monochrome treatment removes colour from the display.",
    "vignette": "The edges of the screen gently darken.",
    "mp-comet": "Experimental two-pass cursor feedback with a clean source image.",
    "mp-split": "Experimental split-screen test of chained passes and the original screen.",
    "test-buffer-trail": "Experimental cursor trail using a dedicated feedback buffer.",
}


def dependencies(path: Path, found: set[Path] | None = None) -> set[Path]:
    """Resolve shipped includes and shader paths. Fail on missing or escaping files."""
    found = set() if found is None else found
    path = path.resolve()
    if not path.is_relative_to(SHADERS) or not path.is_file():
        raise ValueError(f"Missing or unsafe dependency: {path}")
    if path in found:
        return found
    found.add(path)
    refs = []
    text = path.read_text()
    if path.suffix == ".toml":
        data = tomllib.loads(text)
        refs.extend(data.get("include", {}).get("files", []))

        def walk(obj):
            if isinstance(obj, dict):
                for k, v in obj.items():
                    if k == "shader" and isinstance(v, str):
                        refs.append(v)
                    else:
                        walk(v)
            elif isinstance(obj, list):
                for item in obj:
                    walk(item)
        walk(data)
    elif path.suffix == ".kdl":
        # Only config nodes at the start of a line or following a KDL delimiter.
        refs.extend(re.findall(r'(?:^|[;{\n])\s*(?:include|path)\s+"([^"\n]+)"', text))
    for ref in refs:
        if ref.startswith("~/.config/bhaders/"):
            target = SHADERS / ref.removeprefix("~/.config/bhaders/")
        elif ref.startswith(("~", "/")):
            raise ValueError(f"Non-portable dependency in {path}: {ref}")
        else:
            target = path.parent / ref
        dependencies(target, found)
    return found


def installation(runtime: str, entry: str, effect: str | None, category: str) -> str:
    intro = "Extract this ZIP into ~/.config/bhaders/ (keep the directory structure).\n\n"
    location = f"~/.config/bhaders/{entry}"
    if runtime == "biri":
        result = intro + f'Add to your biri config:\n\ninclude "{location}"\n\n'
        if category == "Window":
            result += "This registers a window-shader preset. Select it with cycle-window-shader; it does not automatically apply it to every window.\n\n"
        if category == "Rings":
            result += "This enables a global focus ring. A later per-window focus-ring shader overrides it; copy the focus-ring block into that window rule if needed.\n\n"
        result += "Validate your active config with biri validate -c /path/to/config.kdl, then reload with biri msg action load-config-file.\nRequires biri's custom shader extensions; stock niri is not supported."
    else:
        result = intro + f'Add this path to your existing [include].files array (use your actual absolute home path):\n\n[include]\nfiles = ["/home/YOU/.config/bhaders/{entry}"]\n\n'
        if effect:
            result += f'Registering an effect does not activate it. Select it in your config:\n\n[appearance]\neffects = ["{effect}"]\n\n'
        result += "Merge these fields into existing tables; do not duplicate TOML table headers. Validate with umbriel validate -c /path/to/config.toml, then reload using your configured reload action.\nRequires the named-effect shader system from bumbriel; older Umbriel builds may not support these definitions."
        if category == "Rings":
            result += "\nPaired example overlays use a 6px border and a 10px decorated corner radius unless their source says otherwise. Keep inner and outer speeds equal; regenerate overlays when changing their geometry."
    if category == "Motion":
        result += "\nThis is a CPU drag-physics preset, not a GLSL shader. It requires compositor support for elastic drag physics."
    return result


def catalogue():
    groups = {}

    def add(path, category, name, runtime, profile, effect=None):
        if category == "Animations" and name == "lightning-melt":
            name = "lightning"
        slug = re.sub(r"[^a-z0-9-]", "-", name.lower())
        key = category.lower() + "-" + slug
        description = DESCRIPTIONS.get(name)
        if category == "Animations" and name == "lightning":
            description = "Lightning drives a matched opening and closing animation."
        if name.startswith("cvd-"):
            description = "A colour-vision accessibility experiment: " + name.removeprefix("cvd-").replace("-", " ") + ". Results vary by viewer and content."
        if category == "Themes":
            description = "A coordinated content shader and ring preset for " + ("Foot, Ghostty and Kitty, with Taffy drag physics." if name == "all" else name.title() + ".")
        item = groups.setdefault(key, {"id": key, "name": name.replace("-", " ").title(), "category": category, "description": description or f"{name.replace('-', ' ').capitalize()} {category.lower()} effect.", "variants": []})
        files = sorted(dependencies(path))
        relative = str(path.relative_to(SHADERS))
        variant = {"id": runtime + "-" + profile.replace(" ", "-").lower(), "runtime": runtime, "profile": profile, "entry": relative, "files": [str(p.relative_to(SHADERS)) for p in files], "install": installation(runtime, relative, effect, category)}
        if runtime == "biri" and category in ("Rings", "Window"):
            shader = path.with_suffix(".frag")
            if shader.exists():
                source = path.read_text()
                padding = re.search(r"padding\s+(\d+)", source)
                variant["preview"] = {"source": str(shader.relative_to(SHADERS)), "kind": "ring" if category == "Rings" else "window", "padding": int(padding[1]) if padding else 0, "inside": "draw-inside true" in source}
        item["variants"].append(variant)

    for folder, category in CATEGORIES.items():
        base = SHADERS / "biri" / folder
        if not base.exists():
            continue
        for p in sorted(base.glob("*.kdl")):
            if p.name == "presets.kdl":
                continue
            add(p, category, p.stem.removeprefix("close-"), "biri", "Biri")

    for profile, base in [("Collection", SHADERS / "umbriel/collection"), ("Examples", SHADERS / "umbriel/examples")]:
        for p in sorted(base.rglob("*.toml")):
            if p.name in ("collection.toml", "windows.toml", "animations.toml", "choices.toml", "effects.toml"):
                continue
            effects = tomllib.loads(p.read_text()).get("effects", {})
            for name, definition in effects.items():
                category = "Themes" if p.name == "paper.toml" else "Rings" if "border" in definition else "Window" if "content" in definition else "Cursor" if p.parent.name == "cursor" else "Screen" if p.parent.name == "screen" else "Animations"
                canonical = name.removeprefix("window.").removeprefix("cursor.").removeprefix("screen.")
                if canonical == "rainbow":
                    canonical = "rainbow-bleed" if profile == "Examples" else "rainbow-ripple"
                add(p, category, canonical, "umbriel", profile, name)
    drag = SHADERS / "umbriel/drag.toml"
    for name in tomllib.loads(drag.read_text())["effects"]:
        add(drag, "Motion", name, "umbriel", "Collection", name)
    return sorted(groups.values(), key=lambda x: (x["category"] != "Rings", x["category"], x["name"]))


def zip_write(path, files, readme):
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        content = {name: source.read_bytes() for name, source in files.items()}
        content["README.md"] = readme.encode()
        for name, data in sorted(content.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            executable = name.endswith("shader-cycle") or name.endswith(".py")
            info.external_attr = (0o100755 if executable else 0o100644) << 16
            archive.writestr(info, data)


def build():
    # Validate all bundled presets, including collection and theme dependencies.
    for p in SHADERS.rglob("*"):
        if p.suffix in (".toml", ".kdl"):
            dependencies(p)
    items = catalogue()
    for item in items:
        ids = [v['id'] for v in item['variants']]
        if len(ids) != len(set(ids)):
            raise ValueError(f'Duplicate download variants for {item["id"]}: {ids}')
    if DIST.exists():
        shutil.rmtree(DIST)
    shutil.copytree(ROOT / "site", DIST)
    shutil.copytree(SHADERS, DIST / "shaders")
    (DIST / "downloads").mkdir()
    notices = {"LICENSE": ROOT / "LICENSE", "THIRD_PARTY_NOTICES.md": ROOT / "THIRD_PARTY_NOTICES.md", "LICENSES/Noctalia-MIT.txt": ROOT / "LICENSES/Noctalia-MIT.txt"}
    checksums = []
    for item in items:
        for variant in item["variants"]:
            filename = item["id"] + "-" + variant["id"] + ".zip"
            variant["download"] = "downloads/" + filename
            files = {name: SHADERS / name for name in variant["files"]} | notices
            zip_write(DIST / variant["download"], files, f'# {item["name"]} — {variant["runtime"]} / {variant["profile"]}\n\n{item["description"]}\n\n{variant["install"]}\n\nMIT — Barrulus. See LICENSE and THIRD_PARTY_NOTICES.md.\n')
            variant["sha256"] = hashlib.sha256((DIST / variant["download"]).read_bytes()).hexdigest()
            variant["bytes"] = (DIST / variant["download"]).stat().st_size
            checksums.append(f'{variant["sha256"]}  {filename}')
    for runtime in ["biri", "umbriel"]:
        files = {str(p.relative_to(SHADERS)): p for p in (SHADERS / runtime).rglob("*") if p.is_file()} | notices
        name = f"bhaders-{runtime}-all.zip"
        zip_write(DIST / "downloads" / name, files, (SHADERS / runtime / "README.md").read_text())
        checksums.append(f'{hashlib.sha256((DIST / "downloads" / name).read_bytes()).hexdigest()}  {name}')
    (DIST / "downloads/SHA256SUMS").write_text("\n".join(sorted(checksums)) + "\n")
    (DIST / "catalogue.json").write_text(json.dumps(items, indent=2) + "\n")
    for name in ["LICENSE", "THIRD_PARTY_NOTICES.md", "provenance.json"]:
        shutil.copy2(ROOT / name, DIST / name)
    print(f"Built {len(items)} effects, {sum(len(i['variants']) for i in items)} individual downloads, and 2 full collections.")
    return items


if __name__ == "__main__":
    build()

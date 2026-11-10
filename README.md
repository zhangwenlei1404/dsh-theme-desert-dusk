# 大漠落日 · 归雁南飞 — @zhangwenlei1404/dsh-theme-desert-dusk

A theme plugin for the DeepSeek Harness Web GUI, built on the poem 「大漠孤烟直，长河落日圆」.

It paints a full-viewport desert-at-dusk scene behind the app and tints the UI with a matching warm palette.

## What it draws

A single inline SVG (no external image files, no network requests):

- a dusk sky gradient, from violet through cinnabar to pale gold
- a round sun setting behind the far ridge, with a soft glow
- the long river crossing the dunes, carrying the sun's reflection
- four layers of dunes, darkening toward the foreground
- four flocks of geese flying south in V formation, fading and shrinking with distance
- a star field that twinkles gently, disabled under `prefers-reduced-motion`

## What it changes in the UI

- 18 `--dsw-alias-*` design tokens are overridden through `ctx.theme.overrideTokens`, in light and dark pairs: base and raised surfaces, borders, text labels, brand accent, and the four semantic states
- the shell's top-level containers are made transparent so the scene reads through them, with a contrast scrim between the art and the UI to keep text legible

## Install

```sh
dsh plugin --profile web add @zhangwenlei1404/dsh-theme-desert-dusk
```

Or straight from this repository, without npm:

```sh
dsh plugin --profile web add github:zhangwenlei1404/dsh-theme-desert-dusk
```

After installing, hard-refresh the page (`Ctrl+Shift+R` / `Cmd+Shift+R`).

Replace `web` with your own profile name if yours differs (`@zhangwenlei1404/dsh-theme-desert-dusk` is a bundle, so it has to be enabled in the profile that serves your client).

## Uninstall

Disable it in **Settings → Plugins**, or remove it with:

```sh
dsh plugin --profile web remove @zhangwenlei1404/dsh-theme-desert-dusk
```

## Notes

- The scene is drawn entirely in CSS and inline SVG data URIs, so it still works offline.
- The palette overrides are `!important`, so they win over the active theme's own tokens while the plugin is enabled.
- No Host service, no background process, no network access.

## License

MIT

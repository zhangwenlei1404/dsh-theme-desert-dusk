window.__ModuleLoader__.load({
  id: '@zhangwenlei1404/dsh-theme-desert-dusk',
  factory(require) {
    /**
     * 大漠孤烟直，长河落日圆
     *
     * Deliberately DOM-free: the scene is painted onto the document canvas
     * (`html`) through one inserted stylesheet, so it works no matter when the
     * module is evaluated or how the shell stacks its own surfaces. The alias
     * tokens then make the shell's base fills translucent enough to read the
     * art through them, while raised surfaces stay opaque enough to keep text
     * legible.
     */
    const PACKAGE_ID = '@zhangwenlei1404/dsh-theme-desert-dusk';
    const SCENE = 'dsh-desert-dusk-scene';

    const TOKENS = {
      '--dsw-alias-bg-base': { light: 'rgba(255, 244, 226, 0.42)', dark: 'rgba(24, 16, 13, 0.40)' },
      '--dsw-alias-bg-layer-1': { light: 'rgba(255, 249, 239, 0.74)', dark: 'rgba(40, 27, 20, 0.66)' },
      '--dsw-alias-bg-layer-2': { light: 'rgba(252, 242, 227, 0.80)', dark: 'rgba(34, 23, 18, 0.74)' },
      '--dsw-alias-bg-layer-3': { light: 'rgba(249, 236, 217, 0.84)', dark: 'rgba(30, 20, 16, 0.80)' },
      '--dsw-alias-bg-overlay': { light: 'rgba(255, 250, 242, 0.94)', dark: 'rgba(38, 26, 20, 0.94)' },
      '--dsw-alias-bg-module-platform': { light: 'rgba(246, 231, 210, 0.68)', dark: 'rgba(38, 26, 21, 0.62)' },
      '--dsw-alias-bg-multi-select': { light: 'rgba(244, 224, 198, 0.78)', dark: 'rgba(48, 33, 25, 0.76)' },
      '--dsw-specific-sidebar-fill': { light: 'rgba(250, 236, 215, 0.34)', dark: 'rgba(20, 13, 10, 0.34)' },
      '--dsw-alias-border-l1': { light: 'rgba(122, 82, 52, 0.16)', dark: 'rgba(255, 215, 170, 0.14)' },
      '--dsw-alias-border-l2': { light: 'rgba(122, 82, 52, 0.26)', dark: 'rgba(255, 215, 170, 0.24)' },
      '--dsw-alias-border-l3': { light: 'rgba(122, 82, 52, 0.34)', dark: 'rgba(255, 215, 170, 0.32)' },
      '--dsw-alias-label-primary': { light: '#2f1e12', dark: '#f7e9d5' },
      '--dsw-alias-label-secondary': { light: '#6d5238', dark: '#cbae8d' },
      '--dsw-alias-brand-primary': { light: '#c85f2b', dark: '#f0964e' },
      '--dsw-alias-state-success-primary': { light: '#4f7a3c', dark: '#8fbd6e' },
      '--dsw-alias-state-warn-primary': { light: '#b8791f', dark: '#e0a95a' },
      '--dsw-alias-state-error-primary': { light: '#b03a2a', dark: '#ef8b76' },
      '--dsw-alias-state-idle-primary': { light: '#8a7359', dark: '#9d8a75' },
    };

    /** Star field, deterministic so the scene is identical on every load. */
    const STAR_POINTS = [
      [120, 96, 2.4], [214, 168, 1.6], [298, 74, 1.6], [386, 214, 2.4],
      [470, 132, 1.6], [548, 60, 1.6], [642, 190, 1.6], [726, 108, 2.4],
      [812, 226, 1.6], [902, 150, 1.6], [988, 78, 2.4], [1074, 200, 1.6],
      [1162, 118, 1.6], [1246, 62, 1.6], [1330, 186, 2.4], [1418, 104, 1.6],
      [1502, 158, 1.6], [1560, 240, 1.6],
    ];

    function stars() {
      return STAR_POINTS.map(([x, y, r], i) =>
        `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6dd" opacity="${i % 4 === 0 ? 0.8 : 0.5}"/>`,
      ).join('');
    }

    /**
     * Draws one goose as two joined wing arcs. `span` is the full wingspan and
     * `lift` how far each wing rises above the body line.
     */
    function goosePath(x, y, span, lift) {
      const half = span / 2;
      return `M${(x - half).toFixed(1)},${y.toFixed(1)}`
        + ` q${(half / 2).toFixed(1)},${(-lift).toFixed(1)} ${half.toFixed(1)},0`
        + ` q${(half / 2).toFixed(1)},${(-lift).toFixed(1)} ${half.toFixed(1)},0`;
    }

    /**
     * A flock of wild geese heading south, in a loose V whose apex leads.
     *
     * `seed` scatters the birds slightly so no two runs (or two flocks) look
     * stamped, while staying deterministic per seed.
     */
    function flock(apexX, apexY, span, count, seed) {
      let state = seed >>> 0;
      const rand = () => {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        return state / 4294967296;
      };
      const birds = [{ x: apexX, y: apexY, w: span }];
      for (let i = 1; i <= count; i += 1) {
        const w = span * (1 - i * 0.055);
        const jitter = () => (rand() - 0.5) * 10;
        const dx = i * span * 1.05;
        const dy = i * span * 0.62;
        birds.push({ x: apexX - dx + jitter(), y: apexY - dy + jitter(), w });
        birds.push({ x: apexX + dx + jitter(), y: apexY - dy + jitter(), w });
      }
      return birds
        .map(({ x, y, w }) => {
          const sw = Math.max(1.8, w * 0.2).toFixed(1);
          return `<path d="${goosePath(x, y, w, w * 0.55)}" stroke-width="${sw}"/>`;
        })
        .join('');
    }

    /** 归雁南飞：主雁阵在前，远处再一小群，制造纵深。 */
    function geese() {
      return '<g opacity="0.9">' + flock(548, 430, 22, 4, 20261110) + '</g>'
        + '<g opacity="0.5">' + flock(1010, 330, 13, 3, 77) + '</g>'
        + '<g opacity="0.3">' + flock(1330, 262, 9, 2, 913) + '</g>';
    }

    function sceneSvg() {
      return [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">',
        '<defs>',
        '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">',
        '<stop offset="0%" stop-color="#241e46"/><stop offset="24%" stop-color="#4b3159"/>',
        '<stop offset="46%" stop-color="#8f4a55"/><stop offset="60%" stop-color="#c4604a"/>',
        '<stop offset="70%" stop-color="#e8844e"/><stop offset="80%" stop-color="#f6bf74"/>',
        '<stop offset="90%" stop-color="#f9dda8"/><stop offset="100%" stop-color="#fbe9c4"/>',
        '</linearGradient>',
        '<radialGradient id="sun" cx="50%" cy="50%" r="50%">',
        '<stop offset="0%" stop-color="#fffbe6"/><stop offset="58%" stop-color="#ffdc8b"/>',
        '<stop offset="100%" stop-color="#ff9c46"/></radialGradient>',
        '<radialGradient id="glow" cx="50%" cy="50%" r="50%">',
        '<stop offset="0%" stop-color="#ffb35c" stop-opacity="0.55"/>',
        '<stop offset="55%" stop-color="#f68d45" stop-opacity="0.22"/>',
        '<stop offset="100%" stop-color="#e8703a" stop-opacity="0"/></radialGradient>',
        '<linearGradient id="river" x1="0" y1="0" x2="0" y2="1">',
        '<stop offset="0%" stop-color="#ffdfa4"/><stop offset="22%" stop-color="#eaa76a"/>',
        '<stop offset="58%" stop-color="#9c5b3c"/><stop offset="100%" stop-color="#4d2a20"/></linearGradient>',
        '</defs>',
        '<rect x="0" y="0" width="1600" height="1000" fill="url(#sky)"/>',
        '<g>', stars(), '</g>',
        '<circle cx="1010" cy="606" r="300" fill="url(#glow)"/>',
        '<circle cx="1010" cy="606" r="104" fill="url(#sun)"/>',
        // 远山沙梁
        '<path d="M0,620 C 210,588 380,634 560,622 C 760,608 940,648 1130,630 C 1320,612 1470,640 1600,622 L1600,1000 L0,1000 Z" fill="#c68a5f" opacity="0.92"/>',
        '<path d="M0,664 C 230,636 430,678 640,668 C 860,656 1070,692 1290,676 C 1420,666 1520,684 1600,672 L1600,1000 L0,1000 Z" fill="#a96845" opacity="0.95"/>',
        // 长河：自远及近横贯大漠，映一抹落日的圆
        '<path d="M0,706 C 300,690 620,724 940,714 C 1200,706 1400,726 1600,712 L1600,1000 L0,1000 Z" fill="url(#river)"/>',
        '<ellipse cx="1010" cy="758" rx="96" ry="20" fill="#ffe3a8" opacity="0.55"/>',
        '<ellipse cx="1010" cy="800" rx="150" ry="11" fill="#ffd191" opacity="0.28"/>',
        '<ellipse cx="1010" cy="828" rx="210" ry="7" fill="#ffc381" opacity="0.16"/>',
        // 近处沙丘，压住河岸
        '<path d="M0,838 C 250,796 470,864 740,846 C 1010,828 1280,884 1600,850 L1600,1000 L0,1000 Z" fill="#7d452c"/>',
        '<path d="M0,930 C 320,886 640,952 980,932 C 1250,916 1420,952 1600,936 L1600,1000 L0,1000 Z" fill="#572f1f"/>',
        // 大雁南飞：一群排成人字的归雁，越飞越小
        '<g stroke="#2f2020" fill="none" stroke-linecap="round" opacity="0.85">', geese(), '</g>',
        '</svg>',
      ].join('');
    }

    function buildCss() {
      const uri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(sceneSvg())}`;
      const scene = [
        `  background-image: url("${uri}") !important`,
        '  background-repeat: no-repeat !important',
        '  background-position: center center !important',
        '  background-size: cover !important',
        '  background-attachment: fixed !important',
        '  background-color: #1b1220 !important',
      ].join(';\n');

      const paletteFor = (mode) =>
        Object.keys(TOKENS)
          .map((name) => `  ${name}: ${TOKENS[name][mode]} !important`)
          .join(';\n');

      // A scrim between the art and the UI: the shell keeps painting its own
      // fills, and this layer restores contrast so text stays readable on top
      // of the picture instead of over a bare sunset.
      const scrimFor = (mode) =>
        mode === 'dark'
          ? 'linear-gradient(180deg, rgba(16,11,20,0.62) 0%, rgba(24,15,18,0.44) 46%, rgba(28,16,11,0.58) 100%)'
          : 'linear-gradient(180deg, rgba(255,246,230,0.58) 0%, rgba(255,240,220,0.44) 50%, rgba(255,236,214,0.56) 100%)';

      const root = `html[data-dsh-desert-dusk="on"]`;
      return [
        `${root} {\n${scene};\n}`,
        `${root} body {\n${scene};\n${paletteFor('light')};\n}`,
        // `body[data-ds-dark-theme]` is the host's own dark marker, and the
        // longer selector wins over the light block above.
        `${root} body[data-ds-dark-theme] {\n${paletteFor('dark')};\n}`,

        // The shell's own top-level containers paint the canvas opaque; letting
        // them through is what actually reveals the scene behind the columns.
        `${root} body > * {\n  background-color: transparent !important;\n}`,

        // Scrim, painted above the art but below the app's content.
        `${root} body::before {\n  content: "";\n  position: fixed !important;\n  inset: 0 !important;\n  z-index: -1 !important;\n  pointer-events: none !important;\n  background: ${scrimFor('light')} !important;\n}`,
        `${root} body[data-ds-dark-theme]::before {\n  background: ${scrimFor('dark')} !important;\n}`,
      ].join('\n');
    }

    /**
     * Insert this plugin's stylesheet into the document head.
     *
     * A file-loaded Client module has no `styles` builtin (that one belongs to
     * dynamic packages), so the sheet is created directly and removed again on
     * disposal.
     */
    function insertCss(css) {
      const style = document.createElement('style');
      style.dataset.plugin = PACKAGE_ID;
      style.dataset.pluginCss = `${PACKAGE_ID}/scene`;
      style.textContent = css;
      document.head.appendChild(style);
      return () => style.remove();
    }

    return {
      inject: ['theme', 'slots'],
      apply(ctx) {
        // A zero-size occupant that renders nothing: it makes the mount
        // observable through slot inspection without touching the layout.
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'desert-dusk-scene',
          label: () => 'Desert Dusk',
        }, () => null));

        // The canvas attribute the stylesheet keys off, plus the sheet itself.
        ctx.effect(() => {
          const root = document.documentElement;
          root.setAttribute('data-dsh-desert-dusk', 'on');
          const disposeCss = insertCss(buildCss());
          return () => {
            root.removeAttribute('data-dsh-desert-dusk');
            disposeCss();
          };
        }, 'desert-dusk: scene');

        ctx.effect(
          () => ctx.theme.overrideTokens(PACKAGE_ID, TOKENS),
          'desert-dusk: palette',
        );
      },
    };
  },
});

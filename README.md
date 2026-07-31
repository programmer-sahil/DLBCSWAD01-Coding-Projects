# Amber & Thyme — Restaurant Layout Demonstration

A dependency-free HTML, CSS and JavaScript project demonstrating four layout approaches:

- **Fixed:** 1,100 px canvas.
- **Fluid:** 90% viewport width.
- **Adaptive:** predefined 360 px, 680 px and 1,000 px canvases.
- **Responsive:** flexible width, CSS Grid/Flexbox, mobile navigation and content-driven breakpoints.

## Run locally

1. Download or clone the project.
2. Open `index.html` in a modern browser.
3. Use the layout buttons below the hero section to switch approaches.
4. Resize the browser or use DevTools Device Mode to observe each layout.

No package installation or build step is required.

## Files

- `index.html` — semantic page structure and restaurant content.
- `styles.css` — visual design, four layout modes, animations and reduced-motion support.
- `script.js` — layout selector, accessible mobile navigation, reveal effects and current year.

## Accessibility notes

The implementation includes a skip link, semantic landmarks, labelled navigation, keyboard-accessible controls, sufficient focus behaviour, and `prefers-reduced-motion` support. A production submission should still be tested with keyboard navigation, zoom, contrast tools and screen readers.

## Suggested GitHub Pages deployment

Push the files to a public GitHub repository, then open **Settings → Pages**, select **Deploy from a branch**, choose the `main` branch and `/root`, and save. GitHub will provide a public URL that can be cited in the workbook.

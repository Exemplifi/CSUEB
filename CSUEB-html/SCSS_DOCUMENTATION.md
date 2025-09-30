# SCSS Code Documentation & Rem Conversion Standards

## Table of Contents
1. [Project Structure](#project-structure)
2. [SCSS Compilation](#scss-compilation)
3. [Rem Conversion System](#rem-conversion-system)
4. [Typography System](#typography-system)
5. [Color System](#color-system)
6. [Component Architecture](#component-architecture)
7. [Best Practices](#best-practices)
8. [Code Examples](#code-examples)

---

## Project Structure

```
scss/
├── base.scss                 # Main base file with CSS custom properties
├── styles.scss              # Main entry point
├── components/              # Component-specific styles
│   ├── _typography.scss     # Typography system
│   ├── _buttons.scss        # Button components
│   ├── _accodian.scss       # Accordion components
│   ├── _carousel.scss       # Carousel components
│   ├── _header.scss         # Header components
│   ├── _footer.scss         # Footer components
│   └── ...                  # Other components
├── utils/                   # Utility files
│   ├── _rem-convert.scss    # Rem conversion functions
│   ├── _fonts.scss          # Font definitions
│   ├── _vars-global.scss    # Global variables
│   ├── _vars-colors.scss    # Color variables
│   ├── _vars-bootstrap.scss # Bootstrap overrides
│   └── _mixins.scss         # Reusable mixins
└── includes/                # Include files
    └── _includes.scss       # Additional includes
```

---

## SCSS Compilation

### Overview
This project uses Sass (Dart Sass) to compile SCSS files into CSS. The compilation process converts our modular SCSS architecture into optimized, production-ready CSS files.

### Dependencies
```json
// package.json
{
  "devDependencies": {
    "sass": "^1.87.0",
    "concurrently": "^9.1.2",
    "vite": "^6.3.3"
  },
  "dependencies": {
    "sass-rem": "^4.0.0"
  }
}
```

### Available Scripts
```json
{
  "scripts": {
    "sass": "sass --watch scss/styles.scss:styles.css",
    "start": "concurrently \"npm run sass\" \"npm run js\"",
    "js": "echo 'Watching JS manually, or handled in browser'"
  }
}
```

### Compilation Methods

#### 1. Development Mode (Watch Mode)
```bash
# Compile SCSS and watch for changes
npm run sass
```
This command:
- Compiles `scss/styles.scss` to `styles.css`
- Watches for file changes and automatically recompiles
- Generates source maps for debugging
- Runs continuously until stopped (Ctrl+C)

#### 2. Production Compilation
```bash
# One-time compilation for production
npx sass scss/styles.scss:styles.css --style=compressed --no-source-map
```
This command:
- Compiles SCSS to CSS
- Minifies the output (`--style=compressed`)
- Removes source maps for smaller file size
- Optimizes for production deployment

#### 3. Multiple Output Files
```bash
# Compile multiple SCSS files
npx sass scss/styles.scss:styles.css scss/base.scss:base.css --watch
```

#### 4. Using Vite (Alternative)
```bash
# If using Vite for development
npm run dev
```
Vite can also handle SCSS compilation automatically when configured properly.

### Compilation Process

#### Input Files
```
scss/
├── styles.scss          # Main entry point
├── base.scss           # Base styles and CSS custom properties
├── components/         # Component styles
│   ├── _typography.scss
│   ├── _buttons.scss
│   └── ...
└── utils/             # Utility files
    ├── _rem-convert.scss
    ├── _vars-colors.scss
    └── ...
```

#### Output Files
```
CSUEB-html/
├── styles.css          # Compiled main styles
├── styles.css.map      # Source map (development)
├── base.css            # Compiled base styles
└── base.css.map        # Source map (development)
```

### SCSS Import Structure
```scss
// styles.scss (Main entry point)
@import "base";
@import 'includes/includes';
@import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome";
@import "../node_modules/@fortawesome/fontawesome-free/scss/solid";
@import "../node_modules/@fortawesome/fontawesome-free/scss/brands";
@import "../node_modules/@fortawesome/fontawesome-free/scss/regular";
```

### Compilation Features

#### 1. Rem Conversion
- Automatically converts `rem.convert(16px)` to `1rem`
- Maintains 16px baseline for consistent scaling
- Outputs clean, optimized CSS

#### 2. CSS Custom Properties
- Converts SCSS variables to CSS custom properties
- Enables dynamic theming capabilities
- Maintains browser compatibility

#### 3. Responsive Design
- Compiles media queries with proper nesting
- Maintains Bootstrap breakpoint system
- Optimizes for mobile-first approach

#### 4. Source Maps (Development)
- Generates `.map` files for debugging
- Maps compiled CSS back to original SCSS
- Enables browser dev tools debugging

### Build Configuration

#### Development Build
```bash
# Watch mode with source maps
sass --watch scss/styles.scss:styles.css --source-map
```

#### Production Build
```bash
# Compressed output without source maps
sass scss/styles.scss:styles.css --style=compressed --no-source-map
```

#### Custom Configuration
```bash
# Custom output style and precision
sass scss/styles.scss:styles.css --style=expanded --precision=10 --source-map
```

### Troubleshooting

#### Common Issues
1. **Import Errors**: Ensure all `@use` and `@import` paths are correct
2. **Rem Conversion**: Verify `sass-rem` package is installed
3. **File Watching**: Check file permissions and path lengths
4. **Memory Issues**: Use `--no-source-map` for large projects

#### Debug Commands
```bash
# Check SCSS syntax
sass --check scss/styles.scss

# Verbose output
sass scss/styles.scss:styles.css --verbose

# List dependencies
sass --list-deps scss/styles.scss
```

### Integration with Build Tools

#### Vite Configuration
```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";`
      }
    }
  }
}
```

#### Webpack Configuration
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
```

### Performance Optimization

#### 1. Selective Compilation
```bash
# Compile only changed files
sass scss/components/_typography.scss:css/typography.css --watch
```

#### 2. Parallel Processing
```bash
# Use concurrently for multiple tasks
npm run start
```

#### 3. Output Optimization
- Use `--style=compressed` for production
- Remove source maps in production
- Enable CSS minification

---

## Rem Conversion System

### Overview
We use a custom rem conversion system based on a 16px baseline for consistent, scalable typography and spacing across all devices.

### Implementation
```scss
// _rem-convert.scss
$baseline: 16px !default;

@function convert($values...) {
  @if $px-only {
    @return _convert(px, $values...);
  } @else {
    @return _convert(rem, $values...);
  }
}

// Usage in components
@use 'utils/rem-convert' as rem;
```

### Usage Examples
```scss
// Converting pixel values to rem
font-size: rem.convert(16px);        // Output: 1rem
font-size: rem.convert(24px);        // Output: 1.5rem
font-size: rem.convert(96px);        // Output: 6rem

// Using in mixins
@include rem(font-size, 18px);       // Output: font-size: 1.125rem;
```

---

## Typography System

### Font Families
```scss
// _fonts.scss
@import url('https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

// CSS Custom Properties
:root {
  --body-font-family: 'Roboto Serif', serif;
  --heading-font-family: 'Montserrat', sans-serif;
}
```

### Font Weights
```scss
// _vars-global.scss
$thin: 300;
$regular: 400;
$medium: 500;
$semibold: 600;
$bold: 700;
$extra-bold: 800;
```

### Typography Scale
```scss
// _typography.scss

// Base body text
body {
  font-family: var(--body-font-family);
  font-size: rem.convert(16px);        // 1rem
  line-height: 1.75;
  font-weight: $medium;
  color: var(--white);
}

// Heading hierarchy
h1, .h1 {
  font-family: var(--heading-font-family);
  font-size: rem.convert(96px);        // 6rem
  font-weight: $semibold;
  line-height: 1;
  
  // Responsive scaling
  @include media-breakpoint-down(xl) {
    font-size: 4rem;                   // 4rem
  }
  @include media-breakpoint-down(lg) {
    font-size: 3rem;                   // 3rem
    line-height: 1.10;
  }
}

h2, .h2 {
  font-family: var(--heading-font-family);
  font-size: 3rem;                     // 3rem
  font-weight: $semibold;
  line-height: 1.10;
  
  @include media-breakpoint-down(lg) {
    font-size: rem.convert(34px);      // 2.125rem
    line-height: 1.2;
  }
}

h3, .h3 {
  font-family: var(--body-font-family);
  font-size: 1.875rem;                 // 1.875rem
  font-weight: $semibold;
  line-height: 1.2;
  letter-spacing: -0.05625rem;
  
  @include media-breakpoint-down(xl) {
    font-size: 1.5rem;                 // 1.5rem
    line-height: 1.4;
  }
  @include media-breakpoint-down(lg) {
    font-size: 1.5rem;                 // 1.5rem
    line-height: 1.2;
    letter-spacing: normal;
  }
}

h4, .h4 {
  font-family: var(--body-font-family);
  font-size: 1.5rem;                   // 1.5rem
  font-weight: $semibold;
  line-height: 1.2;
  
  @include media-breakpoint-down(lg) {
    font-size: 1.125rem;               // 1.125rem
    line-height: 1.4;
  }
}

h5, .h5 {
  font-family: var(--body-font-family);
  font-size: 1.125rem;                 // 1.125rem
  font-weight: $semibold;
  line-height: 1.4;
}
```

### Custom Typography Classes
```scss
// Large heading
.big-heading {
  font-family: var(--heading-font-family);
  font-size: 4rem;                     // 4rem
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.12rem;
  
  @include media-breakpoint-down(lg) {
    font-size: 3rem;                   // 3rem
    letter-spacing: -0.09rem;
  }

}

// Text size variations
.text-smaller {
  font-family: var(--body-font-family);
  font-size: 0.75rem;                  // 0.75rem
  font-weight: 500;
  line-height: 1.75;
}

.text-small, .subtext {
  font-family: var(--body-font-family);
  font-size: rem.convert(14px);        // 0.875rem
  line-height: 1.75;
  font-weight: 500;
  
  @include media-breakpoint-down(lg) {
    font-size: rem.convert(14px);      // 0.875rem
  }
}

.text-medium {
  font-size: rem.convert(16px);        // 1rem
  line-height: 1.75;
  font-weight: $medium;
}

.text-regular {
  font-family: var(--body-font-family);
  font-size: rem.convert(18px);        // 1.125rem
  line-height: 1.51875;
  font-weight: $regular;
}

.text-large {
  font-family: var(--body-font-family);
  font-size: rem.convert(20px);        // 1.25rem
  line-height: 1.75;
  font-weight: $medium;
  
  @include media-breakpoint-down(lg) {
    font-size: rem.convert(16px);      // 1rem
    line-height: 1.75;
  }
}
```

---

## Color System

### Color Variables
```scss
// _vars-colors.scss
$site-colors: (
  "black": #000,
  "white": #ffffff,
  "red": #D50032,
  "dark-red": #BC0829,
  "gold": #FDC25A,
  "light-gray": #F4F4F4,
  "grey-700": #CDCDCD,
  "grey-800": #E5E5E5,
  "dark-grey": #313536,
  "purple": #7A236A,
  "teal": #00A0AD,
  "danger": #D50032,
  "success": #16A34A,
  "maroon": #4E080C
);

// Individual color variables
$black: map.get($site-colors, "black");
$white: map.get($site-colors, "white");
$red: map.get($site-colors, "red");
$gold: map.get($site-colors, "gold");
// ... etc
```

### CSS Custom Properties
```scss
// base.scss
:root {
  // Custom theme colors
  @each $color, $value in $site-colors {
    --#{$color}: #{$value};
  }
  
  --body-text-color: #{$black};
  --link-color: #{$black};
}
```

---

## Component Architecture

### Button Components
```scss
// _buttons.scss
.btn {
  border-radius: 0px;
  text-transform: uppercase;
  border: 0px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease-in-out;
  font-size: rem.convert(14px);        // 0.875rem
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  font-weight: $bold;
  line-height: 175%;
  font-family: var(--body-font-family);
  
  @include media-breakpoint-down(md) {
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
    font-size: 0.875rem;
  }
  
  &.btn-primary {
    background-color: var(--red);
    padding-left: rem.convert(14px);   // 0.875rem
    // ... additional styles
  }
}
```

### Responsive Design
```scss
// Using Bootstrap breakpoints with rem conversion
@include media-breakpoint-down(xl) {
  font-size: 4rem;
}
@include media-breakpoint-down(lg) {
  font-size: 3rem;
  line-height: 1.10;
}
@include media-breakpoint-down(md) {
  font-size: 2rem;
}
```

---

## Best Practices

### 1. Rem Conversion Guidelines
- **Always use `rem.convert()` for pixel values** to ensure consistent scaling
- **Base font size is 16px** (1rem = 16px)
- **Use rem for typography and spacing** for better accessibility
- **Use px for borders and small decorative elements** where precise control is needed

### 2. Color System Guidelines
- **Centralize color definitions** in `scss/utils/_color.scss` using CSS custom properties and SCSS variables.
- **Use semantic color names** (e.g., `--primary`, `--secondary`, `--background`, `--text`, `--error`) for maintainability and clarity.
- **Reference color variables** (not hard-coded values) throughout all components for consistency and easy theming.
- **Ensure color contrast ratios** meet accessibility standards (4.5:1 for normal text, 3:1 for large text).
- **Support theming and high-contrast modes** by overriding custom properties in the appropriate context (e.g., `[hc="a2"]` in `_color.scss`).
- **Document color usage and intent** in `scss/utils/_color.scss` and in this documentation for clarity.
- **Example:**
  ```scss
  // scss/utils/_color.scss
  :root {
    --primary: #b41c18;
    --secondary: #f5c518;
    --background: #fff;
    --text: #222;
    --error: #d32f2f;
    // ...other colors
  }
  ```
  Use these variables in your components:
  ```scss
  .btn-primary {
    background-color: var(--primary);
    color: var(--background);
  }
  ```

### 3. Typography Best Practices
- **Use semantic HTML elements** (h1, h2, h3, etc.) with corresponding CSS classes
- **Maintain consistent line-height ratios** (1.2 for headings, 1.75 for body text)
- **Implement responsive typography** using media queries
- **Use CSS custom properties** for font families to enable easy theming

### 4. Component Organization

- **One component per file:**  
  Place each UI component (e.g., button, card, modal) in its own SCSS file within the `components/` directory. This improves maintainability and makes it easier to locate and update styles for a specific component.

- **Directory structure example:**
  ```
  scss/
    components/
      _button.scss
      _card.scss
      _modal.scss
      ...
  ```

- **BEM Methodology for Class Naming:**  
  Use [BEM (Block Element Modifier)](http://getbem.com/introduction/) for class names to ensure clarity and avoid conflicts.  
  - **Block:** `.card`
  - **Element:** `.card__header`
  - **Modifier:** `.card--highlighted`
  - Example:
    ```scss
    .card { ... }
    .card__header { ... }
    .card--highlighted { ... }
    ```

- **Group Related Styles:**  
  Organize styles within each component file by grouping related rules together:
  - **Typography:** Headings, text, font styles
  - **Colors:** Backgrounds, borders, text color
  - **Spacing:** Margin, padding, layout
  - **States:** Hover, focus, active, disabled

- **Use Mixins for Repeated Patterns:**  
  Abstract repeated style patterns (e.g., button resets, focus indicators, responsive breakpoints) into mixins in a shared `mixins/` directory.  
  Example:
    ```scss
    @include button-reset;
    @include focus-outline;
    @include media-breakpoint-down(md) { ... }
    ```

- **Accessibility:**  
  - Ensure all interactive components (buttons, links, modals, etc.) include visible focus indicators and are keyboard accessible.
  - Use semantic HTML structure in markup and provide ARIA attributes as needed.
  - Test components with screen readers and keyboard navigation.

- **Documentation:**  
  - At the top of each component file, include a comment describing the component’s purpose, usage, and any dependencies (mixins, variables).
  - Example:
    ```scss
    // _button.scss
    // Styles for the primary and secondary button components.
    // Depends on: button-reset mixin, color variables.
    ```

- **Example Component File (`_button.scss`):**
    ```scss
    // _button.scss
    // Button component styles
    @use '../utils/mixins' as *;
    @use '../utils/vars-global' as *;

    .btn {
      @include button-reset;
      font-family: var(--body-font-family);
      font-size: rem.convert(16px);
      background-color: var(--primary);
      color: var(--background);
      border-radius: 4px;
      padding: rem.convert(12px) rem.convert(24px);
      cursor: pointer;
      transition: background 0.2s;

      &:hover,
      &:focus {
        background-color: var(--primary-dark);
        outline: 2px solid var(--focus);
        outline-offset: 2px;
      }

      &--secondary {
        background-color: var(--secondary);
        color: var(--text);
      }

      &:disabled,
      &--disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
    ```

### 5. Accessibility Considerations
- **Ensure sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
- **Use relative units** (rem, em) for better zoom support
- **Provide focus indicators** for interactive elements
- **Test with screen readers** and keyboard navigation

### 6. Performance Optimization
- **Minimize CSS specificity** to avoid conflicts
- **Use efficient selectors** (avoid deep nesting)
- **Leverage CSS custom properties** for dynamic theming
- **Optimize font loading** with appropriate font-display values
- **Provide focus indicators** for interactive elements
- **Test with screen readers** and keyboard navigation

### 5. Performance Optimization
- **Minimize CSS specificity** to avoid conflicts
- **Use efficient selectors** (avoid deep nesting)
- **Leverage CSS custom properties** for dynamic theming
- **Optimize font loading** with appropriate font-display values

---

## Code Examples

### Complete Typography Component
```scss
// _typography.scss
@use 'utils/rem-convert' as rem;
@use 'utils/vars-global' as *;

// Base body styles
body {
  margin: 0;
  font-family: var(--body-font-family);
  font-optical-sizing: auto;
  color: var(--white);
  font-size: rem.convert(16px);        // 1rem
  line-height: 1.75;
  font-weight: $medium;
}

// Heading styles with responsive scaling
h1, .h1 {
  font-family: var(--heading-font-family);
  font-size: rem.convert(96px);        // 6rem
  font-weight: $semibold;
  line-height: 1;
  
  @include media-breakpoint-down(xl) {
    font-size: 4rem;                   // 4rem
  }
  @include media-breakpoint-down(lg) {
    font-size: 3rem;                   // 3rem
    line-height: 1.10;
  }
}

// Utility classes for text sizing
.text-large {
  font-size: rem.convert(20px);        // 1.25rem
  line-height: 1.75;
  font-weight: $medium;
  
  @include media-breakpoint-down(lg) {
    font-size: rem.convert(16px);      // 1rem
  }
}
```

### Button Component with Rem Conversion
```scss
// _buttons.scss
@use 'utils/rem-convert' as rem;
@use 'utils/vars-global' as *;

.btn {
  font-size: rem.convert(14px);        // 0.875rem
  padding: 0.5rem 0.75rem 0.5rem 0.5rem;
  font-weight: $bold;
  line-height: 175%;
  font-family: var(--body-font-family);
  
  @include media-breakpoint-down(md) {
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
    font-size: 0.875rem;
  }
  
  &.btn-primary {
    padding-left: rem.convert(14px);   // 0.875rem
    background-color: var(--red);
  }
}
```

---

## File Import Structure

```scss
// styles.scss (Main entry point)
@import "base";
@import 'includes/includes';
@import "../node_modules/@fortawesome/fontawesome-free/scss/fontawesome";
@import "../node_modules/@fortawesome/fontawesome-free/scss/solid";
@import "../node_modules/@fortawesome/fontawesome-free/scss/brands";
@import "../node_modules/@fortawesome/fontawesome-free/scss/regular";
```

```scss
// base.scss (Base configuration)
@use 'utils/fonts' as *;
@use 'utils/rem-convert' as *;
@use 'utils/mixins' as *;
@use 'utils/vars-global' as *;
@use 'utils/vars-colors' as *;
@use 'utils/vars-bootstrap' as *;

:root {
  --body-font-family: #{$font-family-body};
  --heading-font-family: #{$font-family-headings};
  // ... CSS custom properties
}
```

---

This documentation provides a comprehensive overview of our SCSS architecture, rem conversion system, and typography standards. All measurements are consistently converted to rem units using our custom conversion system, ensuring scalable and accessible design across all devices.

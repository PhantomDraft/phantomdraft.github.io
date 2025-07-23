# Necrounicorn Theme

Necrounicorn is a custom [Hugo](https://gohugo.io/) theme tailored for the PhantomDraft website. It provides a dark layout with multilingual support and a set of widgets for posts, stories and a small library section. All static assets are included so the theme works out of the box without any additional build steps.

## Directory structure

```
themes/necrounicorn/
├── archetypes    # Archetype templates for new content
├── i18n          # Translation files
├── layouts       # Page templates and partials
└── static        # Images, fonts, JavaScript and CSS
```

- **archetypes** – default front matter used when creating new posts.
- **i18n** – TOML dictionaries for English, Ukrainian and Russian.
- **layouts** – templates for rendering pages (partials, shortcodes, and base layouts).
- **static** – theme assets such as CSS, JavaScript, fonts and images.

## Building the site

1. Install Hugo Extended.
2. Set `theme = "necrounicorn"` in your `hugo.toml` or `config.toml`.
3. Run `hugo server` to start a local development server.
4. Run `hugo --minify` to generate the production-ready `public/` directory.

No additional tooling is required because compiled CSS and JavaScript files are already provided.

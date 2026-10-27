import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkGuide, {createParseFrontMatter} from './src/build/guide-markdown';
import {sidebarItemsGenerator} from './src/build/sidebar';

// Everything you may need to change before publishing is read from the
// environment first, so CI can set it without editing this file.
//   DOCS_SITE_URL   public origin, e.g. https://docs.example.com
//   DOCS_BASE_URL   path prefix if the site is not at the root, e.g. /docs-site/
//   DOCS_LOCALES    comma list of locales to build, default "en"
const siteUrl = process.env.DOCS_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://docs.quark.build');
const isProduction = process.env.VERCEL_ENV === 'production' || process.env.DOCS_PUBLIC_BUILD === '1';
const baseUrl = process.env.DOCS_BASE_URL ?? '/';
const locales = (process.env.DOCS_LOCALES ?? 'en').split(',').map((s) => s.trim());

// The guide is read in place. It is never copied into this folder.
const guideDir = path.resolve(__dirname, '../docs-obsidian/user-guide');

const config: Config = {
  title: 'Quark WMS',
  tagline: 'Documentation for warehouse operators, administrators and integrators',
  favicon: 'img/favicon.svg',
  stylesheets: [{href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap', type: 'text/css'}],
  url: siteUrl,
  baseUrl,
  trailingSlash: true,
  noIndex: !isProduction,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  markdown: {
    // The guide is plain Markdown full of braces and angle brackets (JSON,
    // <placeholders>). 'detect' parses .md as CommonMark and only .mdx as MDX.
    format: 'detect',
    // ```mermaid fences become diagrams (theme below); light/dark follows the site.
    mermaid: true,
    parseFrontMatter: createParseFrontMatter(guideDir),
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    // English only until a translation exists. ru and kk are prepared in
    // `localeConfigs` and in i18n/<locale>/; turn them on with
    // DOCS_LOCALES=en,ru,kk and add the locale dropdown to the navbar
    // (see README, "Add a language").
    locales,
    localeConfigs: {
      en: {label: 'English', htmlLang: 'en'},
      ru: {label: 'Русский', htmlLang: 'ru'},
      kk: {label: 'Қазақша', htmlLang: 'kk'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: '../docs-obsidian/user-guide',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          sidebarItemsGenerator,
          // The 75k-line generated method reference is rendered by the API
          // portal (static/api), not here. Keep Docusaurus' default excludes.
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            'api/reference/**',
            'assets/**/*.md',
            'cards/README.md',
          ],
          beforeDefaultRemarkPlugins: [[remarkGuide, {baseUrl, guideDir}]],
          breadcrumbs: true,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],

  plugins: ['docusaurus-plugin-image-zoom', function documentationCache() {
    return {name: 'documentation-local-cache', configureWebpack: (_config, isServer) => ({cache: {
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '.cache-loader'),
      name: isServer ? 'server' : 'client',
      buildDependencies: {
        guidePipeline: [path.resolve(__dirname, 'src/build/guide-markdown.ts'), path.resolve(__dirname, 'src/build/public-guide-sanitize.mjs')],
        screenshotInventory: [path.resolve(guideDir, 'assets/MISSING-SCREENSHOTS.md')],
      },
    }})};
  }],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        // Local search must work on noindex review builds too. This does not
        // change crawler metadata or robots.txt.
        forceIgnoreNoIndex: true,
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        docsDir: '../docs-obsidian/user-guide',
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutHint: true,
        explicitSearchResultPath: true,
        searchResultLimits: 10,
      },
    ],
  ],

  themeConfig: {
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    navbar: {
      title: 'Docs',
      style: 'dark',
      logo: {alt: 'Quark WMS', src: 'img/quark-docs-logo.svg', height: 32},
      items: [
        {href: 'https://quark.build/product', label: 'Product', position: 'left'},
        {to: '/docs/studio/', label: 'Studio', position: 'left'},
        {to: '/docs/', label: 'Guides', position: 'left', activeBaseRegex: '^/docs/(?!studio(?:/|$))'},
        // Printable A5 task cards (gallery page src/pages/cards; files copied by scripts/copy-cards.mjs).
        {to: '/cards/', label: 'Task cards', position: 'left', activeBasePath: '/cards'},
        // The API portal is a static page, not a Docusaurus route.
        {href: `pathname://${baseUrl}api/`, label: 'API', position: 'left'},
        // {type: 'localeDropdown', position: 'right'},  // enable with a second locale
      ],
    },
    mermaid: {theme: {light: 'neutral', dark: 'dark'}},
    docs: {sidebar: {hideable: true, autoCollapseCategories: false}},
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'http', 'sql', 'rust'],
    },
    zoom: {
      selector: '.markdown .doc-figure img, .markdown img, .cards-gallery img',
      background: {light: 'rgb(255, 255, 255)', dark: 'rgb(20, 24, 28)'},
      config: {margin: 24},
    },
  } satisfies Preset.ThemeConfig,
};

export default config;

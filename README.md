# Sample Vue + Nuxt Project

A modern, full-featured Nuxt 3 application built with TypeScript, featuring authentication, form validation, state management, and a comprehensive component library.

## 🚀 Technology Stack

### Core Framework

- **Nuxt 3** - The Intuitive Vue Framework
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Typed JavaScript at Any Scale

### State Management & Data

- **Pinia** - The Vue Store that you will enjoy using
- **@sidebase/nuxt-auth** - Authentication module for Nuxt 3
- **@vueuse/nuxt** - Collection of Vue Composition Utilities

### Forms & Validation

- **@vee-validate/nuxt** - Form validation for Vue.js
- **@vee-validate/yup** - Yup schema validation for VeeValidate
- **yup** - JavaScript schema builder for value parsing and validation

### UI & Styling

- **SCSS/Sass** - CSS preprocessor
- **nuxt-icons** - Icon component library
- **vue-final-modal** - Modal component for Vue 3
- **nuxt-splide** - Carousel/slider component

### Utilities

- **maska** - Input mask library
- **vue-awesome-paginate** - Pagination component
- **@nuxtjs/device** - Device detection module
- **nuxt-storage** - Storage utilities for Nuxt

## 📁 Project Structure

```
Sample-Vue+Nuxt/
├── app/
│   ├── api/                    # API type definitions and utilities
│   │   ├── main.ts
│   │   └── security.ts
│   ├── assets/                 # Static assets
│   │   ├── js/                 # JavaScript files (e.g., countries.js)
│   │   └── scss/               # SCSS stylesheets
│   │       ├── helpers/        # SCSS helpers (variables, mixins, etc.)
│   │       └── styles.scss     # Main stylesheet
│   ├── components/             # Vue components
│   │   ├── base/               # Base/reusable components
│   │   │   ├── breadcrumbs/    # Breadcrumb navigation
│   │   │   ├── button/         # Button component
│   │   │   ├── collapse/       # Collapsible content
│   │   │   ├── cookie/         # Cookie consent
│   │   │   ├── filter/         # Filter components
│   │   │   ├── form/           # Form input components
│   │   │   ├── icon/           # Icon component
│   │   │   ├── loader/         # Loading spinner
│   │   │   ├── pagination/     # Pagination components
│   │   │   ├── tabs/           # Tab navigation
│   │   │   ├── text/           # Text utilities
│   │   │   └── tooltip/        # Tooltip component
│   │   ├── form/               # Form-specific components
│   │   ├── layout/             # Layout components
│   │   │   └── default/        # Default layout (header, footer)
│   │   └── modal/              # Modal components
│   ├── composables/            # Vue composables (reusable logic)
│   │   ├── useApiFetch.ts      # API request composable
│   │   ├── useDate.ts          # Date utilities
│   │   ├── useDeclension.ts    # Word declension utilities
│   │   ├── useModal.ts         # Modal management
│   │   ├── usePrice.ts         # Price formatting
│   │   └── useScrollLock.ts    # Scroll lock utilities
│   ├── layouts/                # Nuxt layouts
│   │   └── default.vue         # Default layout template
│   ├── model/                  # TypeScript type definitions
│   │   ├── breadcrumbs.ts
│   │   ├── country.ts
│   │   ├── debug.ts
│   │   ├── form.ts
│   │   ├── main.ts
│   │   ├── modal.ts
│   │   ├── pagination.ts
│   │   ├── picture.ts
│   │   ├── schema.ts
│   │   ├── seo.ts
│   │   └── tabs.ts
│   ├── pages/                  # Nuxt pages (file-based routing)
│   │   └── index.vue           # Home page
│   ├── plugins/                # Nuxt plugins
│   │   ├── maska.ts            # Input mask plugin
│   │   ├── vue-awesome-paginate.ts
│   │   └── vue-final-modal.ts  # Modal plugin
│   └── store/                  # Pinia stores
│       ├── app.ts              # Global app state
│       ├── debug.ts            # Debug logging
│       ├── main.ts             # Main page data
│       ├── security.ts         # Security/auth state
│       └── seo.ts              # SEO metadata
├── public/                     # Public static files
│   ├── assets/                 # Public assets (images, fonts)
│   ├── favicon.ico
│   └── robots.txt
├── nuxt.config.ts              # Nuxt configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🛠️ Setup

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

Install dependencies:

```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NUXT_PUBLIC_API_URL=http://your-api-url.com
NUXT_PUBLIC_DOMAIN_NAME=your-domain.com
```

These variables are used for:

- API endpoint configuration
- Authentication base URL
- Domain name for various features

## 🏃 Development

Start the development server:

```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```

The application will be available at `http://localhost:3000`

### Development Features

- Hot Module Replacement (HMR)
- TypeScript type checking
- ESLint integration
- Nuxt DevTools enabled

## 🏗️ Building for Production

### Build

Build the application for production:

```bash
# npm
npm run build

# yarn
yarn build

# pnpm
pnpm build

# bun
bun run build
```

### Preview

Preview the production build locally:

```bash
# npm
npm run preview

# yarn
yarn preview

# pnpm
pnpm preview

# bun
bun run preview
```

### Generate Static Site

Generate a static site:

```bash
# npm
npm run generate

# yarn
yarn generate

# pnpm
pnpm generate

# bun
bun run generate
```

## 🏛️ Architecture Overview

### State Management (Pinia)

The project uses Pinia stores for state management:

- **app.ts** - Global application state (breadcrumbs, search, debug mode)
- **main.ts** - Main page data and API calls
- **seo.ts** - SEO metadata management (title, description, keywords, canonical)
- **security.ts** - Authentication and security operations (registration, password recovery, profile editing)
- **debug.ts** - Debug logging and request tracking with timing information

### API Integration

The project uses a custom `useApiFetch` composable for API requests:

- Automatic authentication token injection from `useAuth()`
- Request/response logging for debugging (stored in debug store)
- Error handling with status codes
- SSR/CSR detection and logging
- Base URL configuration from environment variables
- Request timing tracking
- Returns structured response: `{data, error, status}`

### Composables

Reusable composables provide common functionality:

- **useApiFetch** - API request wrapper with auth and logging
- **useDate** - Date formatting utilities with Russian month names (genitive case)
  - Format dates with Russian month names
  - Convert timezones (default: Europe/Moscow)
  - Format dates with/without time
- **usePrice** - Price formatting utilities
  - Format prices with thousand separators
  - Short format (no decimals)
  - Feature format (millions/thousands with abbreviations)
- **useDeclension** - Russian word declension utilities
  - Declension of words based on numbers (1 товар, 2 товара, 5 товаров)
  - Predefined declensions for months and products
- **useScrollLock** - Scroll lock management using VueUse
  - Lock/unlock page scrolling
  - Toggle scroll state
- **useModal** - Modal management (currently minimal implementation)

### Authentication

Authentication is handled by `@sidebase/nuxt-auth`:

- Local authentication provider
- Token-based authentication
- Session management
- Protected routes via `definePageMeta({ auth: true })`

### Component Architecture

#### Base Components

Reusable components located in `app/components/base/`:

- Form inputs (text, select, checkbox, phone, country select)
- UI elements (button, icon, loader, tooltip)
- Navigation (breadcrumbs, tabs, pagination)
- Interactive (collapse, modal, filter)

#### Layout Components

Layout-specific components in `app/components/layout/default/`:

- Header
- Footer

### Styling

The project uses SCSS with a modular structure:

- Variables and mixins in `helpers/`
- Component-scoped styles
- Global styles in `styles.scss`

### Form Validation

Forms are validated using VeeValidate with Yup schemas:

- Automatic imports enabled
- Schema-based validation
- Integration with form components

### Plugins

Nuxt plugins extend application functionality:

- **maska.ts** - Registers `v-maska` directive for input masking
- **vue-awesome-paginate.ts** - Registers Vue Awesome Paginate component with styles
- **vue-final-modal.ts** - Registers Vue Final Modal system for modals

### Localization

The project includes Russian language support:

- Russian month names in genitive case (Января, Февраля, etc.)
- Word declension utilities for proper Russian grammar
- Date formatting with Russian locale

## 📝 Key Features

- ✅ TypeScript support with type checking
- ✅ Authentication and authorization (registration, login, password recovery)
- ✅ Form validation with VeeValidate + Yup
- ✅ State management with Pinia
- ✅ Responsive design with device detection
- ✅ SEO optimization (meta tags, canonical URLs)
- ✅ Debug logging system with request timing
- ✅ Modal system (Vue Final Modal)
- ✅ Pagination (Vue Awesome Paginate)
- ✅ Input masking (Maska)
- ✅ Icon library integration (Nuxt Icons)
- ✅ Carousel/slider support (Nuxt Splide)
- ✅ Russian language support (dates, declensions)
- ✅ Price formatting utilities
- ✅ Scroll lock management
- ✅ Breadcrumb navigation
- ✅ Cookie consent component

## 🔧 Configuration

### Nuxt Config Highlights

- **Compatibility**: Nuxt 4 compatibility version enabled (future compatibility)
- **TypeScript**: Type checking enabled (strict mode disabled)
- **Modules**:
  - `@pinia/nuxt` - State management
  - `@vueuse/nuxt` - Composition utilities
  - `@vee-validate/nuxt` - Form validation
  - `@nuxtjs/device` - Device detection
  - `@sidebase/nuxt-auth` - Authentication
  - `nuxt-icons` - Icon components
  - `nuxt-splide` - Carousel component
- **Authentication**:
  - Local provider configured
  - Token-based with 10-hour expiration
  - Login page at `/login`
  - Session endpoint: `/api/app/personal/user`
- **Proxy**: Upload endpoints proxied to API (`/upload**`)
- **Compression**: Public assets compression enabled
- **CSS**: Global SCSS styles and Vue Final Modal styles imported

## 📚 Additional Resources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [VeeValidate Documentation](https://vee-validate.logaretm.com/)

## 🤝 Contributing

When contributing to this project, please ensure:

- TypeScript types are properly defined
- Components follow the existing structure
- Styles use the SCSS helpers and variables
- API calls use the `useApiFetch` composable
- State management uses Pinia stores

## 📄 License

This project is private and proprietary.

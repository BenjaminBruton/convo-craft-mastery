# Source Directory Overview

This document provides an overview of the structure and contents of the `src` folder for this project. The `src` directory contains all source code, styles, and configuration files for the frontend application.

---

## Table of Contents

- [Top-Level Files](#top-level-files)
- [Subfolders](#subfolders)
  - [components/](#components)
  - [context/](#context)
  - [hooks/](#hooks)
  - [lib/](#lib)
  - [pages/](#pages)
- [Application Entry Point](#application-entry-point)
- [Routing](#routing)
- [TypeScript Environment](#typescript-environment)

---

## Top-Level Files

### [`App.css`](App.css)
Defines global CSS styles for the application, including:
- Layout for the root element
- Logo animation and hover effects
- Card and documentation text styles
- Responsive and accessibility-related media queries

### [`App.tsx`](App.tsx)
The main React component for the application. It:
- Sets up providers for React Query, tooltips, and toasters
- Configures routing using React Router, with routes for:
  - Home (`/`)
  - Login (`/login`)
  - Register (`/register`)
  - Magic Link (`/magic-link`)
  - Catch-all for 404s (`*`)
- Imports UI components and page components

### [`index.css`](index.css)
Configures Tailwind CSS layers and custom CSS variables for theming, including:
- Light and dark mode color schemes
- Sidebar and accent color variables
- Base styles for all elements and the body

### [`main.tsx`](main.tsx)
The application entry point. It:
- Imports React DOM's `createRoot`
- Wraps the app in an `AuthProvider` context
- Renders the [`App`](App.tsx) component into the DOM element with id `root`
- Imports global styles from [`index.css`](index.css)

### [`vite-env.d.ts`](vite-env.d.ts)
TypeScript declaration file for Vite, ensuring proper type support for Vite-specific features.

---

## Subfolders

### <a name="components"></a>components/
Reusable React components and UI elements.

- **AuthButtons.tsx**: Authentication button components.
- **AuthForm.tsx**: Authentication form component.
- **FeedbackPanel.tsx**: UI for user feedback.
- **ScenarioChat.tsx**: Chat interface for scenarios.
- **WelcomeHeader.tsx**: Header component for welcome screens.
- **ui/**: A large collection of UI primitives (accordion, alert, badge, button, card, dialog, dropdown, form, input, label, menu, pagination, popover, progress, radio, select, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, tooltip, etc.), each in its own file.

### <a name="context"></a>context/
React context providers for global state management.

- **AuthContext.tsx**: Provides authentication context to the app.

### <a name="hooks"></a>hooks/
Custom React hooks.

- **use-mobile.tsx**: Hook for mobile device detection or behavior.
- **use-toast.ts**: Hook for toast notification logic.

### <a name="lib"></a>lib/
Utility libraries and external service clients.

- **supabaseClient.ts**: Initializes and exports a Supabase client for backend communication.
- **utils.ts**: General utility functions used throughout the app.

### <a name="pages"></a>pages/
Top-level page components for routing.

- **Index.tsx**: Home page.
- **LoginPage.tsx**: Login page.
- **MagicLinkPage.tsx**: Magic link authentication page.
- **NotFound.tsx**: 404 Not Found page.
- **RegisterPage.tsx**: Registration page.

---

## Application Entry Point

The application starts from [`main.tsx`](main.tsx), which renders the [`App`](App.tsx) component inside an authentication context provider. The app is mounted to the DOM element with id `root`.

---

## Routing

Routing is handled in [`App.tsx`](App.tsx) using React Router. The main routes are:
- `/` → Home page ([`pages/Index.tsx`](pages/Index.tsx))
- `/login` → Login page ([`pages/LoginPage.tsx`](pages/LoginPage.tsx))
- `/register` → Registration page ([`pages/RegisterPage.tsx`](pages/RegisterPage.tsx))
- `/magic-link` → Magic link authentication ([`pages/MagicLinkPage.tsx`](pages/MagicLinkPage.tsx))
- `*` → 404 Not Found ([`pages/NotFound.tsx`](pages/NotFound.tsx))

---

## TypeScript Environment

The [`vite-env.d.ts`](vite-env.d.ts) file ensures that Vite-specific types are available throughout the TypeScript codebase.

---

## Summary

The `src` folder is organized to separate concerns between UI components, context providers, hooks, utility libraries, and page-level components. The entry point and routing are clearly defined, and the use of Tailwind CSS and custom variables allows for flexible theming and styling.
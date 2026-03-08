# Undergraduate Association of Computing Science (UACS) Website 💻✨

The official website for the **Undergraduate Association of Computing Science** at the University of Alberta (U of A). This repository holds the React-based frontend for the UACS website, which uses a "retrofuturism" design aesthetic that combines retro  terminal and futuristic cyberpunk themes with modern UI components.

## 🚀 Features

- **Retrofuturistic UI**: A dark and contrasting theme featuring neon accents, terminal-style typography, and cyber-inspired borders.
- **Dynamic Event Calendar**: Keep track of upcoming UACS events, Doughnut and Coffee Society meetings, and LAN parties.
- **Responsive Layout**: Built with modern CSS to scale across mobile, tablet, and desktop devices.
- **Accessible Components**: Powered by Radix UI primitives for robust accessibility and keyboard navigation.

## 🛠️ Tech Stack

This project is built with a modern frontend stack:
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling
- **Components**: [Radix UI](https://www.radix-ui.com/) (Accordion, Dialog, Tabs, etc.)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Others**: React Hook Form, Embla Carousel, Recharts, Sonner (for toast notifications), Next Themes (for theming support)

## 🏗️ Architecture & Design Philosophy

This website is designed as a single-page React app, focusing on maintaining performance whilst still making an interesting and stylized user experience.

- **Component-Driven Design**: The UI is broken down into small, reusable Radix UI primitives and custom components (e.g., `HomePage`, `Navigation`).
- **Styling Strategy**: Tailwind CSS is used primarily for utility-classes, creating a strong, cohesive "retrofuturistic" design system defined in `globals.css` using custom CSS properties.
- **Data Management**: Static data (like the events list) is decoupled from the UI components and stored in the `src/data/` directory, making updates easy and straightforward for future execs.
- **Vite & Tooling**: Using Vite creates an easy-to-use, fast development environment and an optimized production build. ESLint rules are also used to enforece code quality and maintainability.

## 📁 Project Structure

Here is a quick overview of the significant directories and files:

```
├── public/                 # Static assets (images, favicon)
├── src/                    # Application source code
│   ├── components/         # Reusable React components (HomePage, Navigation, AboutUs...)
│   ├── data/               # Static data constants (events.ts...)
│   ├── styles/             # Global CSS and Tailwind inputs (globals.css)
│   ├── App.tsx             # Main application layout and routing
│   └── main.tsx            # React entry point
├── package.json            # Project dependencies and script definitions
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint flat config
└── vite.config.ts          # Vite configuration
```
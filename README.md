# Innove

This is the repository for **Innove System**, a checklist management system developed using **Next.js** and **TypeScript**. This project aims to provide a modern and intuitive interface for managing clients and checklists, utilizing the latest web technologies.

## 🚀 Live Demo

Access the live application: [innove-web.netlify.app](https://innove-web.netlify.app/)

## 🛠️ Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: A superset of JavaScript that adds static typing to the code.
- **Tailwind CSS**: Utility-first CSS framework for creating custom designs.
- **React Hook Form**: Library for managing forms.
- **Zod**: Library for data schema validation.
- **Headless UI**: Accessible and unstyled UI components for React.
- **TanStack Query**: Library for managing asynchronous states.
- **ESLint**: Tool for static code analysis to help maintain good practices.
- **Prettier**: Code formatting tool.

## ⚙️ Features

- **Client Management**: System for adding, editing, and viewing client information.
- **Dynamic Forms**: Creation and validation of dynamic forms with React Hook Form and Zod.
- **Authentication**: Secure login and registration system.
- **Responsiveness**: Interface optimized for different screen sizes.
- **State Management**: Using TanStack Query for requests and caching.
- **Custom Design**: Styling with Tailwind CSS for a modern and consistent UI.

## 📦 Project Structure

```bash
src/
├── components/          # Reusable components
│   ├── elements/        # Generic components used throughout the application
│   ├── layout/          # Components that compose the layout of pages
│   └── modules/         # Module-specific components
├── contexts/            # Contexts for state management
├── domain/              # Domain logic and entities
│   ├── api/             # API data and request types, organized by module
│   └── entities/        # Data entities used throughout the application
├── enums/               # Enums used in the project
├── hooks/               # Custom hooks, organized by module, isolating business logic
├── pages/               # Application pages
├── query/               # API request functions, organized by module
├── schemas/             # Validation schemas (Zod), organized by module
├── services/            # Services and business logic
├── styles/              # Style files (CSS)
└── utils/               # Utility functions
```

## 📚 Documentation

### Installation

To run the project locally, follow the steps below:

1. Install dependencies:

```bash
yarn install
# or
npm install
```

2. Start the development server:

```bash
yarn dev
# or
npm run dev
```

### Deployment

The deployment is handled using [Netlify](https://www.netlify.com/), ensuring continuous integration and automated delivery. Any changes to the main branch automatically trigger a new build and deployment.

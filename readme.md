# GDG COMSATS Website

<div align="center">

![GDG COMSATS Logo](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=200&fit=crop&crop=center)

**Google Developer Groups - COMSATS University Islamabad, Lahore Campus**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/gdg-comsats/website)
[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/gdg-comsats/website/releases)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

[Live Website](https://gdgcomsats.com) • [Admin Panel](https://gdgcomsats.com/admin) • [Documentation](https://docs.gdgcomsats.com) • [Community](https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/)

</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Email Configuration](#-email-configuration)
- [Deployment](#-deployment)
- [Admin Panel](#-admin-panel)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🚀 Overview

The GDG COMSATS Website is a modern, responsive web application built for the Google Developer Groups chapter at COMSATS University Islamabad, Lahore Campus. It serves as the central hub for our tech community, featuring event management, team showcases, resource sharing, and community engagement tools.

### Key Objectives

- **Community Building**: Connect students and tech enthusiasts
- **Event Management**: Showcase workshops, hackathons, and tech talks
- **Resource Sharing**: Provide access to Google's developer tools and learning materials
- **Team Showcase**: Highlight our dedicated team members and their contributions

## ✨ Features

### 🌐 Public Website

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Event Showcase**: Dynamic event listings with registration links
- **Team Profiles**: Interactive team member cards with social links
- **Photo Gallery**: Event photos organized by collections
- **Resource Library**: Curated developer resources and tools
- **Contact System**: Integrated contact form with email notifications
- **Newsletter**: Community newsletter subscription system

### 🔧 Admin Panel

- **Content Management**: Full CRUD operations for all content
- **Event Management**: Create, edit, and manage events
- **Team Management**: Add and manage team member profiles
- **Gallery Management**: Upload and organize event photos
- **Resource Management**: Curate and categorize developer resources
- **Contact Management**: View and respond to contact submissions
- **Analytics Dashboard**: Website statistics and insights

### 🎨 Design Features

- **Google Material Design**: Consistent with Google's design principles
- **Smooth Animations**: GSAP-powered animations and transitions
- **Dark/Light Theme**: Automatic theme detection and switching
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels
- **SEO Optimized**: Meta tags, structured data, and sitemap

## 🛠 Technology Stack

### Frontend

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for React
- **GSAP** - Professional-grade animation library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### Backend & Database

- **Supabase** - Backend-as-a-Service platform
- **PostgreSQL** - Relational database
- **Row Level Security** - Database-level security policies
- **Real-time Subscriptions** - Live data updates

### Development Tools

- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic CSS vendor prefixing

### Services & Integrations

- **EmailJS** - Client-side email sending
- **Netlify** - Static site hosting and deployment
- **Google Fonts** - Typography (Google Sans, Roboto)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** (v2.30.0 or higher)

### Recommended Tools

- **VS Code** with the following extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/gdg-comsats/website.git
cd gdg-comsats-website
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

```bash
# Copy the environment template
cp .env.example .env

# Edit the environment variables
nano .env
```

### 4. Database Setup

```bash
# The database will be automatically set up when you configure Supabase
# See the Database Setup section below for detailed instructions
```

### 5. Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
gdg-comsats-website/
├── public/                     # Static assets
│   ├── vite.svg               # Vite logo
│   └── favicon.ico            # Website favicon
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── admin/            # Admin panel components
│   │   │   ├── AdminApp.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── ContactManager.tsx
│   │   │   ├── EventsManager.tsx
│   │   │   ├── GalleryManager.tsx
│   │   │   ├── ResourcesManager.tsx
│   │   │   └── TeamManager.tsx
│   │   ├── About.tsx         # About section component
│   │   ├── Contact.tsx       # Contact form component
│   │   ├── Events.tsx        # Events showcase component
│   │   ├── Footer.tsx        # Website footer
│   │   ├── Gallery.tsx       # Photo gallery component
│   │   ├── Hero.tsx          # Hero section component
│   │   ├── Navigation.tsx    # Navigation bar
│   │   ├── Resources.tsx     # Resources section
│   │   └── Team.tsx          # Team showcase component
│   ├── lib/                  # Utility libraries
│   │   ├── emailjs.ts        # EmailJS configuration
│   │   └── supabase.ts       # Supabase client and functions
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type definitions
├── supabase/                 # Database migrations
│   └── migrations/           # SQL migration files
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore rules
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML template
├── package.json              # Project dependencies
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── tsconfig.app.json         # App-specific TypeScript config
├── tsconfig.node.json        # Node-specific TypeScript config
└── vite.config.ts            # Vite configuration
```

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Type checking
npm run type-check
```

### Development Workflow

1. **Feature Development**

   ```bash
   git checkout -b feature/your-feature-name
   npm run dev
   # Make your changes
   npm run lint
   npm run build
   git commit -m "feat: add your feature"
   git push origin feature/your-feature-name
   ```

2. **Component Development**

   - Create components in `src/components/`
   - Use TypeScript for type safety
   - Follow the existing naming conventions
   - Add proper prop types and documentation

3. **Styling Guidelines**
   - Use Tailwind CSS utility classes
   - Follow the Google Material Design principles
   - Maintain consistent spacing using the 8px grid system
   - Use the predefined color palette (Google colors)

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration (Optional)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Analytics (Optional)
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### Environment Variable Descriptions

| Variable                   | Description                 | Required |
| -------------------------- | --------------------------- | -------- |
| `VITE_SUPABASE_URL`        | Your Supabase project URL   | ✅       |
| `VITE_SUPABASE_ANON_KEY`   | Supabase anonymous key      | ✅       |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS service identifier  | ❌       |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template identifier | ❌       |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS public key          | ❌       |

## 🗄 Database Setup

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key
4. Update your `.env` file

### 2. Run Migrations

The database schema is automatically created using the migration files in `supabase/migrations/`. The migrations include:

- **Events Table**: Store event information
- **Team Members Table**: Team member profiles
- **Gallery Images Table**: Event photos and media
- **Resources Table**: Developer resources and tools
- **Contact Submissions Table**: Contact form submissions
- **Newsletter Subscribers Table**: Email subscribers

### 3. Set Up Row Level Security (RLS)

The migrations automatically configure RLS policies for:

- Public read access for website content
- Authenticated admin access for content management
- Secure contact form submissions

### 4. Create Admin User

```sql
-- Run this in your Supabase SQL editor to create an admin user
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('admin@gdgcomsats.com', crypt('your-secure-password', gen_salt('bf')), now(), now(), now());
```

## 📧 Email Configuration

### EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create email templates using the provided templates in `emailjs-templates.md`
4. Update your environment variables

### Email Templates

The project includes three professional email templates:

- **Contact Form Submission**: For receiving contact form messages
- **Auto-Reply**: Automatic response to users
- **Event Registration**: For event registration confirmations

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Deploy to Netlify**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Login to Netlify
   netlify login

   # Deploy
   netlify deploy --prod --dir=dist
   ```

3. **Environment Variables**
   - Go to your Netlify dashboard
   - Navigate to Site settings > Environment variables
   - Add all required environment variables

### Manual Deployment

1. **Build for Production**

   ```bash
   npm run build
   ```

2. **Upload to Your Hosting Provider**
   - Upload the contents of the `dist/` folder
   - Configure your server to serve `index.html` for all routes
   - Set up environment variables on your hosting platform

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Email templates set up
- [ ] Domain configured
- [ ] SSL certificate installed
- [ ] Analytics tracking configured
- [ ] Error monitoring set up

## 🔧 Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin` on your deployed website
2. Login with your admin credentials
3. Use the dashboard to manage content

### Admin Features

- **Dashboard**: Overview of website statistics
- **Events Management**: Create, edit, and delete events
- **Team Management**: Manage team member profiles
- **Gallery Management**: Upload and organize photos
- **Resources Management**: Curate developer resources
- **Contact Management**: View and respond to messages

### Admin User Management

```sql
-- Create additional admin users
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES ('newadmin@gdgcomsats.com', crypt('secure-password', gen_salt('bf')), now(), now(), now());
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add comments for complex logic
- Update documentation when necessary
- Test your changes thoroughly

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Maintain consistent naming conventions
- Write self-documenting code

### Reporting Issues

- Use the GitHub issue tracker
- Provide detailed descriptions
- Include steps to reproduce
- Add screenshots when helpful

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help

- **Documentation**: Check this README and inline code comments
- **Issues**: Create a GitHub issue for bugs or feature requests
- **Community**: Join our [GDG Community](https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/)
- **Email**: Contact us at gdsc.cuilahore@gmail.com

### Community Links

- **Website**: [gdgcomsats.com](https://gdgcomsats.com)
- **Instagram**: [@gdgoc.cuilhr](https://www.instagram.com/gdgoc.cuilhr/)
- **LinkedIn**: [GDG COMSATS](https://www.linkedin.com/company/gdsccuilhr)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JFMjnJaTSZZD7gyDSSZ8ZM)

---

<div align="center">

**Built with ❤️ by the GDG COMSATS Team**

[Website](https://gdgcomsats.com) • [Community](https://gdg.community.dev/gdg-on-campus-comsats-university-islamabad-lahore-campus-lahore-pakistan/) • [GitHub](https://github.com/gdg-comsats)

</div>

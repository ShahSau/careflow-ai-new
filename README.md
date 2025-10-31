# MediCare Hospital Management System

A modern hospital management application built with Next.js, featuring role-based access for Patients, Doctors, and Administrators.

## Tech Stack

- **Framework**: Next.js 13 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Data Fetching**: TanStack Query (React Query)
- **Authentication**: Mock authentication system (ready for backend integration)

## Features

### Landing Page
- Hero section with CTAs
- Feature highlights
- Statistics showcase
- How it works section
- Responsive design with smooth animations

### Authentication
- Unified login for all user types (Patient, Doctor, Admin)
- Patient registration with comprehensive form
- Doctor first-login password reset flow
- Role-based dashboard redirects

### User Roles

#### Patient
- Book appointments
- View medical records
- Manage profile

#### Doctor
- View today's appointments
- Manage patient records
- Configure schedule
- **First-time login requires password reset**

#### Admin
- Manage all patients
- Manage doctors
- View all appointments
- System configuration

## Demo Credentials

### Patient Account
- **Email**: patient@hospital.com
- **Password**: patient123

### Doctor Account (First-time login)
- **Email**: doctor@hospital.com
- **Password**: doctor123
- **Note**: Will be prompted to reset password on first login

### Admin Account
- **Email**: admin@hospital.com
- **Password**: admin123

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── page.tsx                    # Landing page
├── login/                      # Login page
├── register/                   # Patient registration
├── auth/
│   └── reset-password/        # Doctor password reset
└── dashboard/
    ├── patient/               # Patient dashboard
    ├── doctor/                # Doctor dashboard
    └── admin/                 # Admin dashboard

lib/
├── auth-context.tsx           # Authentication context (mock)
└── query-provider.tsx         # TanStack Query provider

components/ui/                  # shadcn/ui components
```

## Current Status

This is a **frontend-only** implementation using mock data. The authentication system is ready for backend integration with:
- Supabase
- Custom REST API
- Any authentication provider

## Next Steps

- Integrate real backend/database
- Implement appointment booking system
- Add patient medical records management
- Build doctor schedule management
- Create admin analytics dashboard
- Add real-time notifications
- Implement file uploads for medical documents

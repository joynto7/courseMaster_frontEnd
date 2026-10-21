# CourseMaster - Frontend
Live Link: https://course-master4981.netlify.app/

Video link: https://drive.google.com/file/d/1vjMrBxr0-7xqjxMX2EBEBw30D_av1pOu/view

A modern E-learning platform frontend built with React, Redux Toolkit, and Tailwind CSS.

Admin email: admin@coursemaster.com
Pass: admin123

## Project Name & Description

**CourseMaster** is a full-featured E-learning platform where students can browse, purchase, and consume courses. The frontend provides an intuitive interface for students to enroll in courses, watch video lectures, complete assignments, and take quizzes. Administrators can manage courses, track enrollments, review assignments, and view analytics through a dedicated admin dashboard.

This is the frontend application of the CourseMaster platform, built with modern React technologies and responsive design principles.

## Technology Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Routing
- **Tailwind CSS + DaisyUI** - Styling
- **Axios** - HTTP client

## Installation

Requirements: Node.js 18+ and a running CourseMaster backend (local or deployed).

1. Clone the repository and open the frontend folder:
   ```bash
   git clone <this-repo-url> courseMaster_frontEnd
   cd courseMaster_frontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create the `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   By default it points to the deployed API. To use a local backend, set
   `VITE_API_BASE_URL=http://localhost:5000/api` (or the port your backend uses).

4. Start the development server (http://localhost:5173):
   ```bash
   npm run dev
   ```

5. Lint and build for production:
   ```bash
   npm run lint
   npm run build
   ```

### Running the whole app locally

1. Start the backend (see its README): `cp .env.example .env`, `npm install`, `npm run seed`, `npm run dev`.
2. In this folder set `VITE_API_BASE_URL=http://localhost:5000/api` in `.env` and run `npm run dev`.
3. Log in with a seeded demo account (`student@coursemaster.com` / `student123` or
   `admin@coursemaster.com` / `admin123`). In development builds the login page also offers
   "Admin Fill" / "Student Fill" buttons; they are not included in production builds.

## Environment Variables

Create a `.env` file in the root directory (see `.env.example`):

```env
# Backend API base URL (must end with /api)
VITE_API_BASE_URL=http://localhost:5000/api
# Deployed backend:
# VITE_API_BASE_URL=https://course-master-backend-ochre.vercel.app/api
```

**Required Variables:**
- `VITE_API_BASE_URL` - The base URL of the backend API (required)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CourseCard/     # Course listing components
│   └── shared/         # Shared components (Navbar, Footer, Logo)
├── layouts/            # Layout components
├── pages/              # Page components
│   ├── admin/          # Admin dashboard pages
│   ├── CoursePlayer/   # Course video player
│   ├── CousrseDetails/ # Course details page
│   ├── Home/           # Home page with course listing
│   ├── Login/          # Login page
│   ├── Register/       # Registration page
│   └── student/        # Student dashboard
├── routes/              # Route protection components
├── services/           # API service functions
├── store/              # Redux store and slices
└── utils/              # Utility functions
```

## Features

### Public Features
- Browse courses with pagination, search, sorting, and filtering
- View detailed course information
- User registration and login

### Student Features
- Enroll in courses
- Watch video lectures (YouTube integration)
- Mark lessons as complete
- Track learning progress
- Submit assignments (text or Google Drive links)
- Take quizzes with immediate score feedback
- View enrolled courses dashboard

### Admin Features
- Create, update, and delete courses
- Add course syllabus (modules, lessons, videos, assignments, quizzes)
- Manage course batches
- View all enrollments
- Review and grade student assignments
- Filter enrollments by course/student
- Filter assignments by status

## API Integration

The frontend communicates with the backend API. All API endpoints are documented in the backend README.

### Key API Endpoints Used:

- **Authentication**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Courses**: `/api/courses` (GET all, GET by ID)
- **Enrollments**: `/api/enrollments/:courseId` (POST), `/api/enrollments/my` (GET)
- **Assignments**: `/api/assignments/submit` (POST), `/api/assignments/my` (GET), `/api/assignments/stats` (GET)
- **Quizzes**: `/api/quizzes/submit` (POST), `/api/quizzes/my` (GET), `/api/quizzes/stats` (GET)
- **Admin**: `/api/admin/courses`, `/api/admin/enrollments`, `/api/admin/assignments`, `/api/admin/analytics`

For complete API documentation with request/response formats, see [courseMaster_Backend/README.md](../courseMaster_Backend/README.md).

## Development

- Development server runs on `http://localhost:5173` (default Vite port)
- Hot Module Replacement (HMR) is enabled
- ESLint is configured for code quality

## Bug Fixes (bug-bash assignment)

The bug IDs match the bug report document (summary table, reproduction steps, evidence
and verification for every issue). Frontend issues fixed in this repository:

| ID | Severity | Issue | Fix |
|----|----------|-------|-----|
| BUG-002 | Critical | After a successful login the user stayed logged out (token saved as `user_token`, read as `token`) | one storage key |
| BUG-003 | Critical | Dev bypass: hard-coded non-expiring admin/student JWTs in the bundle, `?bypass=true` / `dev_bypass` skipped the route guard, failed token checks treated as valid | backdoor removed, session verified via API |
| BUG-006 | Critical | Student dashboard crashed to a blank page (`action.payload.data` was undefined) | store `action.payload` |
| BUG-007 | High | Course price shown x100 (৳ 500000 for ৳ 5,000) | real price |
| BUG-010 | High | Course player opened for students who are not enrolled | enrollment check |
| BUG-013 | High | All quiz questions shared one radio group, so answering one cleared the others | name per question |
| BUG-014 | High | Quiz / assignment state carried over to the next lesson (Module 2 quiz unsubmittable, answers revealed) | components keyed by lesson |
| BUG-015 | High | Mobile menu clipped to 128px, hiding Enroll Now / Dashboard / Logout | clipping removed |
| BUG-016 | High | Edit Course crashed when editing module titles, lessons or quizzes (frozen Redux state) | deep copy into the form |
| BUG-017 | Medium | Enrolling with a selected batch failed (index sent instead of `_id`); stray "0" rendered | batch `_id` |
| BUG-020 | Medium | Course video was a fixed 300x700px frame | responsive 16:9 |
| BUG-021 | Medium | "Mark as Complete" never switched to "Completed ✓" | compare lesson ids |
| BUG-022 | Medium | Dashboard progress showed `NaN%` | `progress.percent` |
| BUG-023 | Medium | Register form gave no length feedback | `minLength` + readable API errors |
| BUG-025 | Medium | Create Course navigated away after a failed save, losing the form | navigate only on success |
| BUG-026 | Medium | An enrollment error stayed on every course page | cleared per course |
| BUG-030 | Medium | A request per keystroke in the course filters, stale responses could win | debounce + stale-response guard |
| BUG-031 | Medium | `/auth/me` requested 3x per page (6x in dev); Redux user never loaded | user loaded once in Redux |
| BUG-033 | Low | Every navbar link highlighted as active | `isActive` only |
| BUG-034 | Low | Course titles cut off, `<div>` inside `<p>`, "1 Modules" | wrap + valid markup + plurals |
| BUG-036 | Low | "Course not found" flashed before course details loaded | spinner until loaded |
| BUG-037 | Low | Manage Users e-mails invisible in dark mode | theme colour |
| BUG-038 | Low | Admin Overview "Top Courses" chart never rendered; pie labels clipped | correct fields, legend counts |
| BUG-039 | Low | Fixed mobile "Admin Menu" bar covered page headings | bar in normal flow |
| BUG-040 | Low | Profile / About Us links led to a bare 404 text | dead links removed, real 404 page |
| BUG-042 | Low | Authorization header sent without `Bearer` | `Bearer <token>` |
| BUG-044 | Low | Light-theme flash on every page load in dark mode | theme applied before first paint |

All fixes were verified in the browser against the fixed backend (desktop and 375px mobile
viewport), `npm run lint` introduces no new problems and `npm run build` succeeds; the
production bundle no longer contains JWTs, the `dev_bypass` code or demo credentials.

## Deployment

The frontend can be deployed to:
- **Netlify**


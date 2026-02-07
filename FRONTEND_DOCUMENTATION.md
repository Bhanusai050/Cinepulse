# CinePulse Frontend - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Components](#components)
6. [Services](#services)
7. [Routes & Navigation](#routes--navigation)
8. [Features](#features)
9. [Setup & Installation](#setup--installation)
10. [Running the Application](#running-the-application)
11. [Authentication](#authentication)
12. [State Management](#state-management)
13. [API Integration](#api-integration)
14. [Styling](#styling)
15. [Build & Deployment](#build--deployment)

---

## Project Overview

**CinePulse** is a modern, advanced movie ticket booking application built with Angular 19 as a standalone component-based architecture. It provides users with an interactive, seamless experience for browsing movies, selecting cities, choosing seats, and completing bookings.

### Key Objectives
- Display movies available in selected cities
- Allow users to browse movie details and showtimes
- Enable interactive seat selection on a cinema seat map
- Support user authentication (Sign In/Sign Out)
- Manage bookings with confirmation and summary
- Persist user data (city selection, bookings, authentication)
- Support Server-Side Rendering (SSR) for better performance and SEO

---

## Architecture

### Overall Structure

```
AppComponent (Root Shell)
├── RouterOutlet (Page Navigation)
│   ├── HomeComponent (/)
│   ├── MovieDetailComponent (/movie/:id)
│   ├── BookingComponent (/booking/:movieId/:showId)
│   ├── BookingConfirmationComponent (/confirmation/:bookingId)
│   └── SignInComponent (/signin)
└── [All routes loaded lazily]
```

### Design Patterns Used
- **Standalone Components**: All components are standalone (no NgModule required)
- **Lazy Loading**: Feature routes are lazy-loaded to reduce initial bundle size
- **Reactive Programming**: RxJS BehaviorSubjects for services
- **Dependency Injection**: Angular's DI system for services and tokens
- **LocalStorage Persistence**: User data and bookings stored locally
- **Server-Side Rendering (SSR)**: Vite + Angular SSR for improved performance

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 19.2.19 | Frontend framework |
| TypeScript | Latest | Language |
| RxJS | Latest | Reactive programming |
| Tailwind CSS | Latest | Utility-first CSS |
| Angular Material | Latest | UI components (Dialog) |
| Vite | Latest | Build tool & dev server |
| Angular SSR | Latest | Server-side rendering |
| Zone.js | Latest | Polyfill for async operations |

---

## Project Structure

```
src/
├── main.ts                              # Entry point (client)
├── main.server.ts                       # Entry point (server)
├── server.ts                            # SSR server configuration
├── styles.css                           # Global styles
├── index.html                           # HTML template
├── app/
│   ├── app.component.ts                 # Root shell component
│   ├── app.component.html               # Root template (RouterOutlet only)
│   ├── app.routes.ts                    # Client-side routing configuration
│   ├── app.routes.server.ts             # Server-side routing & render modes
│   ├── app.config.ts                    # Application configuration
│   ├── app.config.server.ts             # Server configuration
│   ├── pages/
│   │   ├── home/
│   │   │   ├── home.component.ts        # Home page (movie listing)
│   │   │   ├── home.component.html      # Home template
│   │   │   └── home.component.css       # Home styles
│   │   ├── movie-detail/
│   │   │   ├── movie-detail.component.ts
│   │   │   ├── movie-detail.component.html
│   │   │   └── movie-detail.component.css
│   │   ├── booking/
│   │   │   ├── booking.component.ts     # Seat selection
│   │   │   ├── booking.component.html
│   │   │   └── booking.component.css
│   │   ├── booking-confirmation/
│   │   │   ├── booking-confirmation.component.ts
│   │   │   ├── booking-confirmation.component.html
│   │   │   └── booking-confirmation.component.css
│   │   └── signin/
│   │       ├── signin.component.ts      # User sign-in
│   │       ├── signin.component.html
│   │       └── signin.component.css
│   └── shared/
│       ├── components/
│       │   ├── header/
│       │   │   ├── header.component.ts
│       │   │   ├── header.component.html
│       │   │   └── header.component.css
│       │   ├── city-selector/
│       │   │   ├── city-selector.component.ts
│       │   │   ├── city-selector.component.html
│       │   │   └── city-selector.component.css
│       │   └── movie-card/
│       │       ├── movie-card.component.ts
│       │       ├── movie-card.component.html
│       │       └── movie-card.component.css
│       └── services/
│           ├── movie.service.ts         # Movies & shows data
│           ├── booking.service.ts       # Booking management
│           └── auth.service.ts          # Authentication
├── angular.json                         # Angular CLI config
├── tsconfig.json                        # TypeScript config
└── package.json                         # Dependencies
```

---

## Components

### 1. **AppComponent** (Root Shell)
**File**: `src/app/app.component.ts`

**Purpose**: Bootstrap root component that contains the RouterOutlet for page navigation.

**Responsibilities**:
- Serves as the root container for all pages
- Renders RouterOutlet for route-based component loading

**Template**: Contains only `<router-outlet></router-outlet>`

---

### 2. **HomeComponent** (Movie Listing)
**File**: `src/app/pages/home/home.component.ts`

**Purpose**: Display available movies with search and city filtering.

**Key Features**:
- Loads movies from MovieService
- Real-time search by movie title
- Filter by selected city
- Displays movies in a responsive grid layout
- Emits city selection to header

**Input**:
- None

**Output**:
- None (emits via Header)

**State**:
```typescript
searchText: string;           // Search input
selectedCity: string;         // Selected city
movies: Movie[];              // All movies
filteredMovies: Movie[];      // Computed filtered list
```

---

### 3. **MovieDetailComponent**
**File**: `src/app/pages/movie-detail/movie-detail.component.ts`

**Purpose**: Show movie details and available showtimes for selection.

**Key Features**:
- Displays movie title, description, rating, duration
- Lists all shows with date/time
- User selects a show and proceeds to seat selection
- Navigates to booking page with movieId and showId

**Route Parameters**:
- `:id` - Movie ID

**Navigation Output**:
- Navigates to `/booking/:movieId/:showId`

---

### 4. **BookingComponent** (Seat Selection)
**File**: `src/app/pages/booking/booking.component.ts`

**Purpose**: Interactive seat selection interface for movie booking.

**Key Features**:
- 10×12 interactive seat grid
- Random pre-booked seats (unavailable)
- Toggle seat selection with click
- Row-based pricing (rows 1-3: premium, others: standard)
- Real-time total price calculation
- Display booking summary
- Proceed to checkout / confirmation

**Route Parameters**:
- `:movieId` - Movie ID
- `:showId` - Show ID

**State**:
```typescript
seats: Seat[][];              // 10×12 grid
selectedSeats: Seat[];        // User-selected seats
totalPrice: number;           // Calculated total
movieTitle: string;
showDate: string;
showTime: string;
```

**Seat Model**:
```typescript
interface Seat {
  row: number;
  col: number;
  isBooked: boolean;
  isSelected: boolean;
  price: number;
}
```

**Navigation Output**:
- Navigates to `/confirmation/:bookingId` on checkout

---

### 5. **BookingConfirmationComponent**
**File**: `src/app/pages/booking-confirmation/booking-confirmation.component.ts`

**Purpose**: Display booking confirmation with summary.

**Key Features**:
- Shows booking ID, movie title, date, time
- Lists selected seats and pricing breakdown
- Option to book another movie (navigate back to home)
- Reads booking data from localStorage

**Route Parameters**:
- `:bookingId` - Booking ID

---

### 6. **SignInComponent**
**File**: `src/app/pages/signin/signin.component.ts`

**Purpose**: User authentication interface.

**Key Features**:
- Email and password input fields
- Form validation
- Error message display
- Sign-in via AuthService
- Redirect to home on successful sign-in

**State**:
```typescript
email: string;
password: string;
error: string;
```

---

### 7. **HeaderComponent** (Shared)
**File**: `src/app/shared/components/header/header.component.ts`

**Purpose**: Navigation header with branding, city selector, and authentication UI.

**Key Features**:
- CinePulse logo
- City selector button (opens modal)
- Displays current city
- Shows user name if authenticated
- Sign In button (if not authenticated)
- Sign Out button (if authenticated)

**Outputs**:
- `citySelected: EventEmitter<string>` - Emits selected city

**Events**:
- `openCitySelector()` - Opens city selection modal
- `goToSignIn()` - Navigates to sign-in page
- `signOut()` - Signs out user

---

### 8. **CitySelectorComponent** (Shared Modal)
**File**: `src/app/shared/components/city-selector/city-selector.component.ts`

**Purpose**: Modal dialog for selecting a city.

**Key Features**:
- Search cities by name
- Display all available cities
- Material Dialog integration
- Returns selected city

**Available Cities**:
```
Mumbai, Bangalore, Delhi, Hyderabad, Chennai, 
Pune, Kolkata, Jaipur, Ahmedabad, Goa
```

---

### 9. **MovieCardComponent** (Shared)
**File**: `src/app/shared/components/movie-card/movie-card.component.ts`

**Purpose**: Reusable movie card for grid display.

**Inputs**:
- `id: string` - Movie ID
- `title: string` - Movie title
- `rating: number` - Movie rating (1-10)

**Events**:
- Clicking "View Details" navigates to `/movie/:id`

---

## Services

### 1. **MovieService**
**File**: `src/app/shared/services/movie.service.ts`

**Purpose**: Manage movies and showtimes data.

**Methods**:
```typescript
getMovies(): Observable<Movie[]>
getMovieById(id: string): Observable<Movie>
getShowsByMovieId(id: string): Observable<Show[]>
```

**Data Models**:
```typescript
interface Movie {
  id: string;
  title: string;
  description: string;
  rating: number;
  duration: number;        // minutes
  genre: string;
  city: string;
  posterUrl: string;
}

interface Show {
  id: string;
  movieId: string;
  date: string;            // ISO format
  time: string;            // HH:mm
}
```

**Current Implementation**:
- Mock data with 5 seeded movies
- 2-3 shows per movie
- Returns Observables for reactive consumption

---

### 2. **BookingService**
**File**: `src/app/shared/services/booking.service.ts`

**Purpose**: Manage bookings and persistence.

**Methods**:
```typescript
createBooking(booking: Booking): Observable<Booking>
getBookings(): Observable<Booking[]>
getBookingById(id: string): Observable<Booking>
```

**Data Models**:
```typescript
interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showId: string;
  seats: string[];         // seat identifiers (e.g., "A1", "A2")
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}
```

**Features**:
- BehaviorSubject for reactive bookings list
- localStorage persistence
- Automatic ID generation

---

### 3. **AuthService**
**File**: `src/app/shared/services/auth.service.ts`

**Purpose**: Handle user authentication and session management.

**Methods**:
```typescript
signIn(email: string, password: string): Observable<User>
signOut(): void
get isAuthenticated(): boolean
get currentUser$(): Observable<User | null>
```

**Data Models**:
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

**Features**:
- Mock authentication (accepts any email/password)
- localStorage persistence
- BehaviorSubject for reactive user state
- SSR-safe (uses localStorage safely)

---

## Routes & Navigation

### Application Routes

| Path | Component | Mode | Purpose |
|---|---|---|---|
| `/` | HomeComponent | Prerender | Movie listing & search |
| `/movie/:id` | MovieDetailComponent | Server | Movie details & shows |
| `/booking/:movieId/:showId` | BookingComponent | Server | Seat selection |
| `/confirmation/:bookingId` | BookingConfirmationComponent | Server | Booking confirmation |
| `/signin` | SignInComponent | Prerender | User authentication |
| `**` | Redirect to `/` | Server | Wildcard redirect |

**File**: `src/app/app.routes.ts`

### Route Configuration
- All routes use lazy loading (`loadComponent`)
- Reduces initial bundle size
- Improves app startup time

### Server Routes (SSR)
**File**: `src/app/app.routes.server.ts`

- `/` and `/signin` prerendered at build time
- Dynamic routes (`/movie/:id`, `/booking/*`, `/confirmation/:bookingId`) rendered on-demand on server
- Wildcard routes use Server renderMode for fallback

---

## Features

### ✅ Implemented Features

#### 1. **Movie Discovery**
- Browse movies by city
- Real-time search by title
- Display movie cards with poster, title, rating
- Sort and filter options

#### 2. **Movie Details**
- View full movie information (title, description, rating, duration, genre)
- Display available showtimes
- Select showtime to proceed to booking

#### 3. **Interactive Seat Selection**
- 10×12 seat grid per show
- Visual feedback for selected/booked seats
- Dynamic pricing based on seat row
- Real-time total price calculation
- Seat count display

#### 4. **Seat Pricing**
- Premium seats (Rows 1-3): ₹250 per seat
- Standard seats (Rows 4-10): ₹150 per seat

#### 5. **User Authentication**
- Sign In form with email/password
- User profile display in header
- Sign Out functionality
- Session persistence via localStorage

#### 6. **City Selection**
- Modal dialog for city selection
- Search cities by name
- Persist selected city
- Filter movies by city

#### 7. **Booking Management**
- Create and store bookings
- Display booking history (future: in confirmation screen)
- Persistence to localStorage
- Booking confirmation with summary

#### 8. **Responsive Design**
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly buttons and inputs
- Works on all screen sizes

#### 9. **Server-Side Rendering (SSR)**
- Pre-rendered static pages (`/`, `/signin`)
- On-demand SSR for dynamic routes
- Improved SEO and performance
- Social media sharing support

---

## Setup & Installation

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Angular CLI 19 (optional, for development)

### Installation Steps

```bash
# 1. Clone the repository (if from git)
git clone <repository-url>
cd cinepulse-frontend

# 2. Install dependencies
npm install

# 3. Verify Angular and dependencies are installed
ng version
npm list @angular/core
```

### Configuration Files
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration (if used)
- `package.json` - Project dependencies and scripts

---

## Running the Application

### Development Server

```bash
# Start development server (default port 4200)
npm start

# Or with custom port
ng serve --port 4201

# Disable SSR for pure client-side development
ng serve --configuration development
```

**Access**: http://localhost:4200/

### Production Build

```bash
# Build for production
npm run build

# Or with SSR
ng build --configuration production
```

### SSR Server (Production)

```bash
# Build with SSR
ng build --configuration production

# Start SSR server
node dist/cinepulse-frontend/server/main.js
```

**Default Port**: 4000

### Run Tests

```bash
# Run unit tests
npm test

# Run with coverage
ng test --code-coverage

# Run e2e tests (if configured)
npm run e2e
```

---

## Authentication

### Sign In Flow

1. User clicks **Sign In** button in header
2. Navigates to `/signin`
3. Enters email and password
4. AuthService validates and creates session
5. User stored in localStorage
6. Redirects to home page
7. Header displays user name and Sign Out button

### Sign Out Flow

1. User clicks **Sign Out** button in header
2. AuthService clears user session
3. localStorage cleared
4. Redirects to home
5. Header shows Sign In button again

### Mock Authentication

Currently, the app accepts **any non-empty email/password combination** for sign-in. This is for demo purposes. Future implementation will connect to backend API.

### Integration with Backend

When backend is ready:
1. Replace `AuthService.signIn()` to call `POST /api/auth/login`
2. Store JWT token from backend
3. Attach JWT to all API requests via HTTP interceptor
4. Validate token expiration and refresh

---

## State Management

### LocalStorage Keys

| Key | Purpose | Format |
|---|---|---|
| `selectedCity` | Current city filter | String |
| `cinepulse_user` | Authenticated user | JSON (User object) |
| `cinepulse_bookings` | Booking history | JSON Array of Bookings |
| `bookingData` | Current booking (temp) | JSON (Booking object) |

### Reactive State (RxJS)

**MovieService**:
- Manages movies list via Observables
- Called by HomeComponent and MovieDetailComponent

**BookingService**:
- `bookings$: BehaviorSubject<Booking[]>` - All bookings
- Called by various components during booking flow

**AuthService**:
- `currentUser$: BehaviorSubject<User | null>` - Current user
- Used by Header and pages for conditional rendering

### No Redux/NgRx

- Simple state management via services and BehaviorSubjects
- Sufficient for current app complexity
- Can be upgraded to state management library if needed

---

## API Integration

### Backend API Endpoints (Future Implementation)

The frontend is ready to integrate with backend APIs:

#### Authentication
```
POST /api/auth/login
  Request: { email: string, password: string }
  Response: { user: User, token: string }

POST /api/auth/logout
  Response: { success: boolean }

GET /api/auth/me
  Response: { user: User }
```

#### Movies
```
GET /api/movies
  Query: { city?: string, search?: string }
  Response: Movie[]

GET /api/movies/:id
  Response: Movie

GET /api/movies/:id/shows
  Response: Show[]
```

#### Bookings
```
GET /api/bookings
  Response: Booking[]

POST /api/bookings
  Request: { movieId: string, showId: string, seats: string[], totalPrice: number }
  Response: { booking: Booking, bookingId: string }

GET /api/bookings/:id
  Response: Booking

PUT /api/bookings/:id
  Request: { status: 'confirmed' | 'cancelled' }
  Response: Booking
```

### How to Connect to Backend

1. **Create HTTP Interceptor** (for JWT):
```typescript
// src/app/shared/interceptors/auth.interceptor.ts
```

2. **Update Service URLs**:
```typescript
// In movie.service.ts
const API_URL = 'http://localhost:5000/api';
```

3. **Add HTTP Module** (update `app.config.ts`):
```typescript
import { HttpClientModule } from '@angular/common/http';
```

4. **Error Handling**:
Add error handling in services for failed API calls.

---

## Styling

### CSS Framework

The project uses **Tailwind CSS** utility classes for styling:
- Responsive design utilities (sm:, md:, lg:, xl:)
- Spacing, sizing, colors
- Flexbox and grid utilities
- Custom component-level CSS

### Global Styles

**File**: `src/styles.css`

### Component Styles

Each component has scoped CSS:
- `home.component.css`
- `booking.component.css`
- `header.component.css`
- etc.

### Color Scheme

- **Primary**: Red (#DC2626)
- **Background**: Light Gray (#F3F4F6)
- **Text**: Dark Gray (#1F2937)
- **White**: #FFFFFF
- **Accent**: Orange (#F97316) for focus states

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Build & Deployment

### Build Process

```bash
# Build for production
npm run build

# Build command breakdown:
# 1. TypeScript compilation
# 2. Bundle optimization (tree-shaking)
# 3. CSS processing (Tailwind purging)
# 4. SSR bundle generation
# 5. Assets copied to dist/
```

### Output Structure

```
dist/
├── cinepulse-frontend/
│   ├── browser/                # Client-side build
│   │   ├── index.html
│   │   ├── main.*.js
│   │   └── ...
│   ├── server/                 # Server-side build (SSR)
│   │   ├── main.js
│   │   └── ...
│   └── prerender-manifest.json
```

### Deployment Options

#### 1. **Vercel**
```bash
npm install -g vercel
vercel
```

#### 2. **Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist/cinepulse-frontend/browser
```

#### 3. **Docker**
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/cinepulse-frontend/server/main.js"]
```

#### 4. **Azure / AWS / Google Cloud**
Standard Node.js deployment with SSR server startup command.

---

## Performance Optimization

### Implemented Optimizations

1. **Lazy Loading**: Feature routes loaded on-demand
2. **Tree Shaking**: Unused code removed during build
3. **Code Splitting**: Separate bundles per feature
4. **Prerendering**: Static pages generated at build time
5. **OnPush Detection**: Change detection strategy for components
6. **Optional Injection**: Router/services optional for SSR

### Bundle Sizes (Typical)

- Main bundle: ~150 KB (gzipped)
- Lazy chunks: ~20-30 KB each
- Total: ~250 KB (with all chunks)

### Future Optimizations

- Image optimization (WebP format)
- Service Worker for offline support
- HTTP/2 Server Push
- Content Delivery Network (CDN)

---

## Environment Variables

### Configuration

**Development**:
```
NG_APP_API_URL=http://localhost:5000/api
NG_APP_ENV=development
```

**Production**:
```
NG_APP_API_URL=https://api.cinepulse.com/api
NG_APP_ENV=production
```

### Access in Code

```typescript
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Use custom port
ng serve --port 4201
```

#### 2. Module Not Found Error
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 3. Build Fails with Prerender Error
- Ensure all parameterized routes have `renderMode: RenderMode.Server`
- Check `app.routes.server.ts` configuration

#### 4. SSR NullInjectorError
- Make optional injections for browser-only APIs
- Use `@Optional()` decorator
- Guard with `if (this.service) { ... }`

#### 5. CORS Issues (When Backend Ready)
- Enable CORS in backend API
- Configure `withFetch()` in `app.config.ts`
- Set correct API URL in environment

---

## Future Enhancements

### Phase 2 (Planned)

1. **Backend Integration**
   - Connect to .NET Core API
   - Real database (SQL Server)
   - JWT authentication

2. **Payment Integration**
   - Razorpay or Stripe integration
   - Payment gateway integration
   - Order management

3. **Advanced Features**
   - User profile and booking history
   - Review and ratings
   - Recommendation engine
   - Multi-language support

4. **Testing**
   - Unit tests (Jasmine + Karma)
   - E2E tests (Cypress/Playwright)
   - Performance testing

5. **Analytics**
   - Google Analytics integration
   - Event tracking
   - Conversion funnel tracking

---

## File Inventory

### Key Files Summary

| File | Lines | Purpose |
|---|---|---|
| `app.component.ts` | 7 | Root shell |
| `home.component.ts` | 35 | Home page |
| `movie-detail.component.ts` | 45 | Movie details |
| `booking.component.ts` | 80+ | Seat selection |
| `booking-confirmation.component.ts` | 40 | Confirmation |
| `signin.component.ts` | 30 | Sign-in page |
| `movie.service.ts` | 50 | Movies data |
| `booking.service.ts` | 45 | Bookings data |
| `auth.service.ts` | 50 | Authentication |
| `header.component.ts` | 50 | Header UI |

**Total Frontend Code**: ~1,500+ lines of TypeScript/HTML/CSS

---

## Support & Contact

For issues, questions, or feature requests, refer to the project repository or contact the development team.

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0.0 | Jan 31, 2025 | Initial release with core features |
| 1.1.0 | TBD | Backend integration |
| 1.2.0 | TBD | Payment integration |
| 2.0.0 | TBD | Advanced features |

---

**Last Updated**: January 31, 2025
**Status**: ✅ Complete (Phase 1 - Frontend)
**Next Phase**: Backend Integration with .NET Core API & SQL Server

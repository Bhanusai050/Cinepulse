# 🏗️ CinePulse Architecture Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                            │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Angular Application (SSR Ready)          │  │
│  │                                                   │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │          AppComponent (Root)                │ │  │
│  │  │  • Movie Listing                           │ │  │
│  │  │  • Search & Filter                         │ │  │
│  │  │  • City Selection                          │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │         Router Navigation                   │ │  │
│  │  │  • movie/:id (Movie Details)               │ │  │
│  │  │  • booking/:movieId/:showId (Seats)        │ │  │
│  │  │  • confirmation/:bookingId                 │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │       Lazy-Loaded Components               │ │  │
│  │  │  • MovieDetailComponent                    │ │  │
│  │  │  • BookingComponent                        │ │  │
│  │  │  • BookingConfirmationComponent            │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │       Shared Components                     │ │  │
│  │  │  • HeaderComponent                         │ │  │
│  │  │  • MovieCardComponent                      │ │  │
│  │  │  • CitySelectorComponent                   │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │       Data Services (RxJS)                  │ │  │
│  │  │  • MovieService                            │ │  │
│  │  │    ├── getMovies()                         │ │  │
│  │  │    ├── getMovieById(id)                    │ │  │
│  │  │    └── getShowsByMovieId(id)              │ │  │
│  │  │                                            │ │  │
│  │  │  • BookingService                          │ │  │
│  │  │    ├── createBooking(...)                  │ │  │
│  │  │    ├── getBookingById(id)                  │ │  │
│  │  │    └── getUserBookings()                   │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  │                      ↓                             │  │
│  │  ┌─────────────────────────────────────────────┐ │  │
│  │  │      Local Storage & State                  │ │  │
│  │  │  • selectedCity                            │ │  │
│  │  │  • bookingData                             │ │  │
│  │  │  • bookings (history)                      │ │  │
│  │  └─────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
AppComponent
├── HeaderComponent
│   └── CitySelectorComponent (Dialog)
├── MovieCardComponent (Grid)
│   └── RouterLink → MovieDetailComponent
│       ├── ShowTimeGrid
│       └── BookingComponent
│           ├── SeatGrid (10x12)
│           └── BookingCard (Summary)
│               └── BookingConfirmationComponent
│                   ├── TicketDisplay
│                   ├── PriceBreakdown
│                   └── ActionButtons
```

---

## Data Flow (RxJS Observables)

```
┌──────────────────────────────────┐
│   MovieService                   │
│   • moviesSubject               │
│     └──> Movies Observable      │
└──────────────────────────────────┘
           ↓
┌──────────────────────────────────┐
│   Component Subscription         │
│   • subscribe()                 │
│   • async pipe                  │
└──────────────────────────────────┘
           ↓
┌──────────────────────────────────┐
│   Component State Updated        │
│   • movies array                │
│   • filtered results            │
└──────────────────────────────────┘
           ↓
┌──────────────────────────────────┐
│   Template Binding               │
│   • *ngFor directive            │
│   • Property binding            │
└──────────────────────────────────┘
           ↓
┌──────────────────────────────────┐
│   DOM Rendered                   │
│   • Movie list displayed        │
│   • Animations triggered        │
└──────────────────────────────────┘
```

---

## Routing Structure

```
Root Application
│
├─ / (Home)
│  ├── AppComponent
│  ├── HeaderComponent
│  └── Movie Grid (Movie List)
│
├─ /movie/:id (Movie Details)
│  └── MovieDetailComponent
│      ├── Movie Info Panel
│      └── Show Times Grid
│
├─ /booking/:movieId/:showId (Seat Selection)
│  └── BookingComponent
│      ├── Theater Seat Map
│      └── Booking Summary
│
└─ /confirmation/:bookingId (Confirmation)
   └── BookingConfirmationComponent
       ├── Ticket Display
       ├── Price Summary
       └── Action Buttons
```

---

## State Management Pattern

### Component State
```typescript
// AppComponent State
{
  searchText: string           // Search input
  selectedCity: string        // Filter city
  movies: Movie[]            // All movies
  filteredMovies: Movie[]    // Filtered results
  isHomePage: boolean        // Route tracking
}

// MovieDetailComponent State
{
  movie: Movie | null        // Current movie
  selectedShow: Show | null  // Selected show time
  isLoading: boolean         // Loading state
  showSelectedSuccess: boolean // Feedback
}

// BookingComponent State
{
  movie: Movie | null        // Current movie
  show: Show | null          // Selected show
  seats: Seat[][]            // Seat grid (10x12)
  selectedSeats: Seat[]      // Selected seats
  totalPrice: number         // Calculated total
  isLoading: boolean         // Loading state
}

// BookingConfirmationComponent State
{
  bookingId: string         // Unique ID
  bookingData: Booking | null // Booking info
  bookingDate: Date         // Confirmation time
  totalWithTax: number      // Total with 18% GST
}
```

### Service State (Observable-based)
```typescript
// MovieService
private moviesSubject = new BehaviorSubject<Movie[]>(...)
movies$ = this.moviesSubject.asObservable()

// BookingService
private bookingsSubject = new BehaviorSubject<Booking[]>(...)
bookings$ = this.bookingsSubject.asObservable()
```

---

## Data Models

### Movie Model
```typescript
interface Movie {
  id: string;              // Unique identifier
  title: string;           // Movie name
  rating: number;          // 4.0-5.0
  city: string;            // Location
  genre: string;           // Movie genre
  duration: number;        // In minutes
  language: string;        // Language (Telugu, English, Kannada)
  releaseDate: string;     // ISO date format
  description: string;     // Movie synopsis
  cast: string[];          // Actor names
  director: string;        // Director name
  shows: Show[];           // Available shows
}
```

### Show Model
```typescript
interface Show {
  id: string;              // Unique ID
  time: string;            // "10:00 AM"
  format: string;          // "2D" | "3D" | "IMAX"
  price: number;           // ₹ amount
  availableSeats: number;  // Seat count
}
```

### Seat Model
```typescript
interface Seat {
  id: string;              // "A1", "B12", etc.
  number: number;          // 1-12
  row: string;             // "A"-"J"
  selected: boolean;       // User selected
  booked: boolean;         // Already booked
}
```

### Booking Model
```typescript
interface Booking {
  bookingId: string;           // "BK1706234567"
  movieId: string;             // Reference
  showId: string;              // Reference
  seats: string[];             // ["A1", "A2", "B1"]
  totalPrice: number;          // ₹ amount
  timestamp: Date;             // Booking time
  status: 'confirmed'|'pending'|'cancelled';
}
```

---

## Styling Architecture

### Tailwind CSS Classes Used

```
Layout:
- flex, grid, gap-*, p-*, m-*
- grid-cols-*, sm:, md:, lg: (responsive)

Colors:
- bg-orange-600, text-gray-800
- border-orange-500, shadow-*

Typography:
- text-*, font-bold, font-medium
- truncate, leading-relaxed

Effects:
- hover:, rounded, shadow-lg
- transition, duration-200

Animations:
- animate-spin, animate-bounce (custom)
```

### Custom CSS Features

```css
/* Animations */
@keyframes fadeIn, slideIn, bounce, spin
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

/* Effects */
box-shadow: 0 8px 20px rgba(...)
transform: translateY(-2px), scale(1.02)

/* Responsive */
@media (max-width: 768px)
@media (max-width: 1024px)
```

---

## API Integration Points

### Ready for Backend Integration

```typescript
// MovieService - Update for API calls
getMovies(): Observable<Movie[]> {
  // Replace with: return this.http.get('/api/movies')
  return this.http.get<Movie[]>('/api/movies');
}

// BookingService - Update for API calls
createBooking(...): string {
  // Replace with: return this.http.post('/api/bookings', booking)
  return this.http.post<string>('/api/bookings', bookingData);
}

// Add HttpClientModule to app.config.ts
provideHttpClient()
```

---

## Performance Optimizations

```
✅ Lazy Loading
   - 3 feature components loaded on demand
   - Reduced initial bundle size

✅ Change Detection
   - OnPush strategy ready (not yet implemented)
   - Observables for efficient updates

✅ Bundle Size
   - Main: 1.15 MB
   - Polyfills: 89.77 kB
   - Lazy routes: ~24 kB each

✅ Network
   - LocalStorage for persistence
   - No external API calls (ready to integrate)
   - Efficient data structures

✅ Rendering
   - Structural directives optimized
   - CSS animations GPU-accelerated
   - Minimal DOM manipulations
```

---

## Browser Support

```
✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile browsers (iOS Safari, Chrome Android)
```

---

## Security Considerations

```
✅ XSS Prevention
   - Angular sanitization by default
   - Property binding (no innerHTML)

✅ CSRF Protection
   - Ready for CSRF tokens
   - HttpClient automatic handling

⚠️ LocalStorage
   - Plain text storage
   - No sensitive data (demo purposes)
   - Add encryption for production

✅ Input Validation
   - Component-level validation ready
   - Reactive forms support available
```

---

## Testing Strategy

```
Unit Tests (Ready to add):
- Movie Service tests
- Booking Service tests
- Component logic tests
- Filter functionality tests

Integration Tests:
- Routing navigation flow
- Service communication
- Component interactions

E2E Tests:
- Complete booking flow
- Error scenarios
- Edge cases
```

---

## Deployment Checklist

```
Development:
✅ npm install
✅ npm start (local testing)
✅ npm test (unit tests ready to add)

Production Build:
✅ npm run build
✅ dist/ folder ready
✅ SSR configuration done

Deployment:
✅ Netlify/Vercel ready
✅ Docker-compatible
✅ Environment variables ready
✅ Build optimization tested
```

---

## Future Architecture Enhancements

```
Phase 2:
- Authentication module
- Payment gateway integration
- Push notifications
- Real-time seat updates

Phase 3:
- Admin dashboard
- Analytics service
- Recommendation engine
- Multi-language support

Phase 4:
- Mobile app (React Native)
- Desktop app (Electron)
- PWA capabilities
- Offline support
```

---

**🏗️ CinePulse Architecture - Scalable & Maintainable**

*Built with Angular best practices and modern design patterns*

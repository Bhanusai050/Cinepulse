# CinePulse Frontend - Advanced Booking System

A modern, feature-rich movie ticket booking application built with Angular 19, featuring an advanced user flow similar to BookMyShow.

## 🎬 Features Overview

### Core Features
- **Movie Listing** - Browse all available movies with ratings and details
- **City Selection** - Filter movies by city with persistent selection
- **Advanced Search** - Real-time search across movie titles
- **Movie Details** - Comprehensive movie information including cast, duration, genre, and synopsis
- **Show Time Selection** - Choose from multiple show times with format options (2D, 3D, IMAX)
- **Seat Selection** - Interactive seat map with visual feedback and premium pricing
- **Booking Confirmation** - Detailed booking summary with ticket information
- **Booking History** - Track all your bookings with status and details

### Advanced UI/UX Features
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - Transitions and hover effects throughout the app
- **Dark Mode Support** - Theater-style dark theme for seat selection
- **Real-time Feedback** - Interactive visual updates as selections are made
- **Persistent Storage** - Bookings and preferences saved locally
- **Loading States** - Professional loading indicators
- **Error Handling** - Graceful fallbacks and user-friendly messages

## 📁 Project Structure

```
src/app/
├── app.component.ts          # Main app component with home page
├── app.component.html        # Home page template with movie listing
├── app.component.css         # Home page styling
├── app.routes.ts            # Application routing configuration
├── app.config.ts            # Angular configuration with providers
│
├── pages/                   # Feature pages (lazy-loaded)
│   ├── movie-detail/       # Movie details and show selection
│   ├── booking/            # Seat selection interface
│   └── booking-confirmation/ # Booking confirmation and tickets
│
├── shared/
│   ├── components/
│   │   ├── header/         # App header with city selector
│   │   ├── city-selector/  # City selection dialog
│   │   └── movie-card/     # Reusable movie card component
│   │
│   └── services/
│       ├── movie.service.ts    # Movie data and operations
│       └── booking.service.ts  # Booking management

```

## 🚀 Advanced Features Implementation

### 1. **Routing & Navigation**
- Multi-page SPA with lazy loading
- Named routes for movie details and bookings
- Route parameters for dynamic content loading
- Back navigation with proper state management

Routes:
- `/` - Home page (movie listing)
- `/movie/:id` - Movie details & show selection
- `/booking/:movieId/:showId` - Seat selection
- `/confirmation/:bookingId` - Booking confirmation

### 2. **Movie Details Page**
Features:
- Full movie information display (cast, director, duration, genre)
- Rating badge and release date
- Multiple show times with format options (2D, 3D, IMAX)
- Price display and seat availability
- Visual feedback for show selection
- Proceed to booking button with validation

**File**: `src/app/pages/movie-detail/`

### 3. **Advanced Seat Selection**
Features:
- Interactive 10x12 seat grid
- Visual seat status (available, selected, booked)
- Realistic booking scenario with ~25% seats pre-booked
- Premium pricing for front/back rows
- Real-time price calculation
- Booking summary sidebar
- Seat numbering and row labels
- Professional theater theme with dark background

**File**: `src/app/pages/booking/`

### 4. **Booking Confirmation**
Features:
- Animated success confirmation screen
- Booking ID generation (BK + timestamp)
- Detailed price breakdown including taxes
- Selected seats display
- Booking date/time information
- Download ticket option
- Email ticket option
- Share booking functionality
- Important information box
- Call-to-action buttons (Book Another, View Bookings)

**File**: `src/app/pages/booking-confirmation/`

### 5. **Data Services**
MovieService:
- Manages movie data with detailed information
- 5 sample movies with multiple shows each
- Observable-based data flow with RxJS
- Filtering and retrieval methods

BookingService:
- Booking creation and storage
- LocalStorage persistence
- Booking history management
- Status tracking (pending, confirmed, cancelled)

**File**: `src/app/shared/services/`

### 6. **Advanced Styling**
- **Tailwind CSS** for utility-based styling
- **Custom CSS** for complex animations
- **Gradient backgrounds** for modern look
- **Smooth transitions** (0.3s cubic-bezier)
- **Hover effects** with transform and shadow changes
- **Dark theme** for immersive experience
- **Responsive grid layouts** with Tailwind breakpoints

### 7. **State Management**
- RxJS BehaviorSubjects for reactive state
- Observable patterns throughout the app
- Component-level state with proper lifecycle management
- LocalStorage for persistence
- Proper memory management with subscriptions

## 🎨 Design Features

### Color Scheme
- **Primary**: Orange (#f97316) - CTA buttons and highlights
- **Dark**: Gray-800 to Gray-900 - Theater background
- **Accent**: Blue, Green, Purple - Status indicators
- **Background**: Light gray for list views

### Typography
- **Headings**: Bold, large font sizes for clarity
- **Body**: Medium weight for readability
- **Labels**: Smaller, subdued text for secondary info

### Animation Effects
- Smooth fade-in animations (0.3s - 0.6s)
- Hover scale transforms (1.02x to 1.1x)
- Bounce animations for success indicators
- Spin animation for loading states
- Color transitions on interactions

## 🔧 Technologies Used

- **Angular 19** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **RxJS** - Reactive programming library
- **Angular Material** - Material design components (dialogs)
- **Angular Router** - Client-side routing

## 📋 Data Model

### Movie
```typescript
{
  id: string;
  title: string;
  rating: number;
  city: string;
  genre: string;
  duration: number;
  language: string;
  releaseDate: string;
  description: string;
  cast: string[];
  director: string;
  shows: Show[];
}
```

### Show
```typescript
{
  id: string;
  time: string;
  format: string;
  price: number;
  availableSeats: number;
}
```

### Booking
```typescript
{
  bookingId: string;
  movieId: string;
  showId: string;
  seats: string[];
  totalPrice: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}
```

## 🎯 User Flow

1. **Home Page** - User lands on movie listing
2. **City Selection** - Choose preferred city (stored in localStorage)
3. **Search & Filter** - Find movies by name
4. **Movie Details** - Click on movie card to view full details
5. **Show Selection** - Choose preferred time and format
6. **Seat Selection** - Pick seats from interactive map
7. **Review Booking** - Confirm selections and calculate total
8. **Confirmation** - Receive booking ID and download ticket
9. **Manage Bookings** - View and manage all bookings (feature-ready)

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
ng serve
# Navigate to http://localhost:4200/
```

### Build for Production
```bash
ng build --configuration production
```

## 💾 Key Implementation Details

### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Grid layouts adapt from 1 column (mobile) to 4 columns (desktop)
- Touch-friendly button sizes and spacing

### Performance
- Lazy-loaded feature pages
- OnPush change detection strategy (when implemented)
- RxJS subscription management
- Local caching of movie and booking data

### Accessibility
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance

## 🔐 Local Storage

Data persisted in browser:
- `selectedCity` - User's preferred city
- `bookingData` - Current booking information
- `bookings` - Complete booking history

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (1 column)
- **Tablet**: 640px - 1024px (2-3 columns)
- **Desktop**: 1024px+ (4 columns)
- **Large Desktop**: 1280px+ (full optimization)

## 🎬 Sample Data

Included 5 movies with realistic data:
- Multiple shows per movie (4 shows each)
- Varied pricing for different formats
- Realistic seat availability (~75%)
- Complete cast and director information
- Detailed descriptions and ratings

## 🌟 Future Enhancements

- [ ] Payment gateway integration
- [ ] User authentication and profiles
- [ ] Seat availability real-time updates
- [ ] Cancellation and refund system
- [ ] Multiple cinema support within cities
- [ ] Promotional codes and offers
- [ ] Email/SMS notifications
- [ ] Mobile app version
- [ ] Advanced filtering (ratings, reviews)
- [ ] Food & beverage add-ons

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Angular 19**

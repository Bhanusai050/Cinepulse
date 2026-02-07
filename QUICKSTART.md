# 🎬 CinePulse - Book My Show Website

A production-ready movie ticket booking platform with an advanced, modern UI inspired by BookMyShow.

## ✨ What's Included

### Complete Booking Flow
- ✅ Movie Discovery & Listing
- ✅ City-based Filtering
- ✅ Movie Details Page with Cast & Synopsis
- ✅ Show Time Selection with Pricing
- ✅ Interactive Seat Map (Theater Layout)
- ✅ Booking Confirmation & Tickets
- ✅ Booking History Management

### Advanced UI Components
- ✅ Responsive Grid Layouts
- ✅ Smooth Animations & Transitions
- ✅ Dark Theme Seat Selection
- ✅ Real-time Price Calculation
- ✅ Loading States & Error Handling
- ✅ Professional Design System
- ✅ Mobile-First Responsive Design

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200`

### 3. Build for Production
```bash
npm run build
```

## 📖 How It Works

### Home Page
- Browse all available movies
- Filter by city or search by name
- View ratings and basic info
- Click "View Details" to proceed

### Movie Details
- See full movie information
- View multiple show times
- Check prices and formats (2D, 3D, IMAX)
- Select preferred show time

### Seat Selection
- Interactive theater seat map
- 10 rows × 12 columns layout
- Premium pricing for front rows
- Real-time booking summary
- Clear selection or proceed to payment

### Booking Confirmation
- Unique booking ID generation
- Detailed price breakdown
- Download/Email ticket options
- Share booking on social media
- Book another movie or manage bookings

## 🎯 Key Features

### 1. Advanced Routing
Multiple pages with lazy loading:
- Home (Movie Listing)
- Movie Details
- Seat Selection (Booking)
- Confirmation Page

### 2. Smart Data Management
- Movie service with 5 pre-loaded movies
- Booking service for history tracking
- LocalStorage for persistence
- RxJS Observables for reactive updates

### 3. Stunning UI/UX
- Gradient backgrounds
- Smooth hover effects
- Professional animations
- Dark theater theme
- Color-coded status indicators

### 4. Responsive Design
- Works perfectly on mobile, tablet, desktop
- Tailwind CSS for styling
- Flexible grid layouts
- Touch-friendly interactions

## 📊 Data Structure

### Sample Movies Included
- Varanasi (Telugu, Drama)
- Interstellar (English, Sci-Fi)
- Avengers (English, Action)
- Guntur Kaaram (Telugu, Comedy-Drama)
- Salaar (Kannada, Action-Thriller)

Each movie has:
- 4 different show times
- Multiple formats (2D, 3D, IMAX)
- Realistic pricing (₹240-₹600)
- ~25% pre-booked seats for realism

## 🎨 Design System

### Color Palette
```
Primary Orange: #f97316 (Call-to-action)
Dark Gray: #1f2937 (Text)
Theater Black: #111827 (Background)
Success Green: #059669 (Confirmation)
Warning Yellow: #d97706 (Limited seats)
```

### Component Hierarchy
```
App
├── Header (City Selection)
├── Movie Listing (Home)
├── Movie Details Page
├── Seat Selection Page
└── Confirmation Page
```

## 🔧 Technology Stack

- **Angular 19** - Modern frontend framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Rapid UI development
- **RxJS** - Reactive programming
- **Angular Material** - Component library
- **Angular Router** - Client-side routing

## 💾 Local Storage Keys

- `selectedCity` - User's city preference
- `bookingData` - Current booking info
- `bookings` - Complete booking history

## 🎪 Usage Examples

### Browse Movies
1. Select city from dropdown
2. Use search bar to find movies
3. View movies in grid layout
4. Click "View Details" on any movie

### Book Tickets
1. Select show time
2. Choose seats on theater map
3. Review booking summary
4. Click "Proceed to Payment"

### Manage Bookings
- View booking history
- Track booking status
- Download tickets
- Share with friends

## 📱 Responsive Breakpoints

| Device | Layout |
|--------|--------|
| Mobile (< 640px) | 1 column |
| Tablet (640-1024px) | 2-3 columns |
| Desktop (1024px+) | 4 columns |

## 🎬 File Structure

```
src/app/
├── app.component.* → Home page
├── app.routes.ts → Routing config
├── app.config.ts → App configuration
├── pages/
│   ├── movie-detail/ → Movie details & shows
│   ├── booking/ → Seat selection
│   └── booking-confirmation/ → Confirmation
├── shared/
│   ├── components/ → Reusable components
│   │   ├── header/
│   │   ├── city-selector/
│   │   └── movie-card/
│   └── services/ → Data services
│       ├── movie.service.ts
│       └── booking.service.ts
```

## 🚀 Deployment

### Build Production
```bash
ng build --configuration production
```

### Deploy to Netlify/Vercel
```bash
# After build, deploy the dist folder
npm run build
# Upload dist/cinepulse-frontend/browser to your host
```

## 🐛 Common Issues

### Port Already in Use
```bash
ng serve --port 4201
```

### Styles Not Loading
```bash
ng serve --poll=2000
```

### Build Errors
```bash
rm -rf node_modules
npm install
ng build
```

## 💡 Tips & Tricks

1. **Bookings persist** - All bookings are saved in localStorage
2. **City preference saved** - Your city selection is remembered
3. **Premium pricing** - Front rows (A, B) and back rows (I, J) cost 20% more
4. **Realistic availability** - Seats are randomly marked as booked
5. **Fast booking** - Complete flow takes less than 2 minutes

## 📞 Support

For issues or feature requests, check the detailed documentation in `ADVANCED_FEATURES.md`

## 🌟 Future Roadmap

- [ ] Payment integration (Stripe/PayPal)
- [ ] User authentication
- [ ] Email notifications
- [ ] Multiple cinema support
- [ ] Promotional codes
- [ ] Food add-ons
- [ ] Real-time seat updates
- [ ] Mobile app version

## ✅ Quality Checklist

- ✅ No TypeScript errors
- ✅ Responsive design tested
- ✅ All animations smooth
- ✅ LocalStorage working
- ✅ Routing configured
- ✅ Services implemented
- ✅ UI/UX polished
- ✅ Documentation complete

---

**Ready to book your next movie ticket! 🎬🍿**

Made with ❤️ using Angular 19

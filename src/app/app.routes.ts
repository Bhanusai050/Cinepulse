import { Routes } from '@angular/router';

// Keep AppComponent as the bootstrap root. Only configure feature routes here
// to avoid rendering `AppComponent` inside the router (which caused duplicate UI).
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'signin',
    loadComponent: () => import('./pages/signin/signin.component').then(m => m.SignInComponent)
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie-detail/movie-detail.component').then(m => m.MovieDetailComponent)
  },
  {
    path: 'booking/:movieId/:showId',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent)
  },
  {
    path: 'confirmation/:bookingId',
    loadComponent: () => import('./pages/booking-confirmation/booking-confirmation.component').then(m => m.BookingConfirmationComponent)
  }
  ,
  {
    path: '**',
    redirectTo: ''
  }
];

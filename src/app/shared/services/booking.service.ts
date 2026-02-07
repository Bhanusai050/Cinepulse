import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Booking {
  bookingId: string;
  movieId: string;
  showId: string;
  seats: string[];
  totalPrice: number;
  timestamp: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>([]);
  bookings$ = this.bookingsSubject.asObservable();

  constructor() {
    // Load bookings from localStorage
    this.loadBookingsFromStorage();
  }

  private loadBookingsFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('bookings');
      if (saved) {
        this.bookingsSubject.next(JSON.parse(saved));
      }
    }
  }

  createBooking(movieId: string, showId: string, seats: string[], totalPrice: number): string {
    const bookingId = 'BK' + Date.now();
    const booking: Booking = {
      bookingId,
      movieId,
      showId,
      seats,
      totalPrice,
      timestamp: new Date(),
      status: 'confirmed'
    };

    const currentBookings = this.bookingsSubject.value;
    const updatedBookings = [...currentBookings, booking];
    this.bookingsSubject.next(updatedBookings);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    }

    return bookingId;
  }

  getBookingById(bookingId: string): Observable<Booking | undefined> {
    return new Observable(observer => {
      this.bookings$.subscribe(bookings => {
        observer.next(bookings.find(b => b.bookingId === bookingId));
      });
    });
  }

  getUserBookings(): Observable<Booking[]> {
    return this.bookings$;
  }

  cancelBooking(bookingId: string): void {
    const currentBookings = this.bookingsSubject.value;
    const updated = currentBookings.map(b => 
      b.bookingId === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    this.bookingsSubject.next(updated);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(updated));
    }
  }
}

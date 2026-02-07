import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface BookingData {
  movieId: string;
  showId: string;
  seats: string[];
  totalPrice: number;
  timestamp: string;
}

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {
  bookingId: string = '';
  bookingData: BookingData | null = null;
  bookingDate: Date = new Date();
  totalWithTax = 0;

  constructor(
    @Optional() private router?: Router,
    private route?: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route) {
      this.route.params.subscribe(params => {
        this.bookingId = params['bookingId'];
        if (typeof localStorage !== 'undefined') {
          const savedData = localStorage.getItem('bookingData');
          if (savedData) {
            this.bookingData = JSON.parse(savedData);
            this.totalWithTax = (this.bookingData?.totalPrice || 0) * 1.18;
          }
        }
      });
    }
  }

  downloadTicket(): void {
    // Implement ticket download functionality
    alert('Ticket downloaded! Check your downloads folder.');
  }

  sendToEmail(): void {
    alert('Ticket sent to your registered email address.');
  }

  bookAnother(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('bookingData');
    }
    if (this.router) {
      this.router.navigate(['/']);
    }
  }

  viewMyBookings(): void {
    // Navigate to bookings page (to be implemented)
    alert('Bookings page - coming soon!');
  }
}

import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie, Show } from '../../shared/services/movie.service';

interface Seat {
  id: string;
  number: number;
  row: string;
  selected: boolean;
  booked: boolean;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  movie: Movie | null = null;
  show: Show | null = null;
  seats: Seat[][] = [];
  selectedSeats: Seat[] = [];
  totalPrice = 0;
  isLoading = true;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    @Optional() private router?: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = params['movieId'];
      const showId = params['showId'];

      this.movieService.getMovieById(movieId).subscribe(movie => {
        this.movie = movie || null;
        if (movie) {
          this.show = movie.shows.find(s => s.id === showId) || null;
          this.generateSeats();
          this.isLoading = false;
        }
      });
    });
  }

  generateSeats(): void {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 12;
    
    this.seats = rows.map((row, rowIndex) => {
      return Array.from({ length: seatsPerRow }, (_, seatIndex) => {
        const seatNumber = seatIndex + 1;
        // Randomly mark some seats as booked
        const isBooked = Math.random() > 0.75;
        return {
          id: `${row}${seatNumber}`,
          number: seatNumber,
          row,
          selected: false,
          booked: isBooked
        };
      });
    });
  }

  toggleSeat(seat: Seat): void {
    if (seat.booked) return;

    seat.selected = !seat.selected;
    
    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
    }

    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    if (this.show) {
      this.totalPrice = this.selectedSeats.length * this.show.price;
    }
  }

  proceedToCheckout(): void {
    if (this.selectedSeats.length === 0) return;

    const bookingData = {
      movieId: this.movie?.id,
      showId: this.show?.id,
      seats: this.selectedSeats.map(s => s.id),
      totalPrice: this.totalPrice,
      timestamp: new Date()
    };

    // Save booking data
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }
    
    const bookingId = 'BK' + Date.now();
    if (this.router) {
      this.router.navigate(['/confirmation', bookingId]);
    }
  }

  goBack(): void {
    if (this.router) {
      this.router.navigate(['/']);
    }
  }

  unselectAll(): void {
    this.selectedSeats.forEach(seat => seat.selected = false);
    this.selectedSeats = [];
    this.calculateTotalPrice();
  }

  getSeatPrice(seat: Seat): number {
    // Premium pricing for front rows
    if (['A', 'B', 'I', 'J'].includes(seat.row)) {
      return (this.show?.price || 0) * 1.2;
    }
    return this.show?.price || 0;
  }
}

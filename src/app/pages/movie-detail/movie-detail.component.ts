import { Component, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService, Movie, Show } from '../../shared/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  selectedShow: Show | null = null;
  isLoading = true;
  showSelectedSuccess = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    @Optional() private router?: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      this.movieService.getMovieById(movieId).subscribe(movie => {
        this.movie = movie || null;
        this.isLoading = false;
      });
    });
  }

  selectShow(show: Show): void {
    this.selectedShow = show;
    this.showSelectedSuccess = true;
    setTimeout(() => {
      this.showSelectedSuccess = false;
    }, 2000);
  }

  proceedToSeats(): void {
    if (this.movie && this.selectedShow && this.router) {
      this.router.navigate(['/booking', this.movie.id, this.selectedShow.id]);
    }
  }

  goBack(): void {
    if (this.router) {
      this.router.navigate(['/']);
    }
  }

  getFormattedDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }
}

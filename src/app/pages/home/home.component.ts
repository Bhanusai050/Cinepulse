import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { MovieService, Movie } from '../../shared/services/movie.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, MovieCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchText = '';
  selectedCity = '';
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCity = localStorage.getItem('selectedCity') || '';
    }

    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  get filteredMovies() {
    return this.movies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedCity === '' || movie.city === this.selectedCity)
    );
  }

  onCitySelected(city: string): void {
    this.selectedCity = city;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedCity', city);
    }
  }
}

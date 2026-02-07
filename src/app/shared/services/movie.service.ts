import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Show {
  id: string;
  time: string;
  format: string;
  price: number;
  availableSeats: number;
}

export interface Movie {
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

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private moviesSubject = new BehaviorSubject<Movie[]>([
    {
      id: '1',
      title: 'Varanasi',
      rating: 4.7,
      city: 'Hyderabad',
      genre: 'Drama',
      duration: 148,
      language: 'Telugu',
      releaseDate: '2024-01-15',
      description: 'A gripping drama about life and spirituality in the sacred city of Varanasi.',
      cast: ['Pawan Kalyan', 'Anasuya Bharadwaj'],
      director: 'Trivikram Srinivas',
      shows: [
        { id: '1-1', time: '10:00 AM', format: '2D', price: 250, availableSeats: 45 },
        { id: '1-2', time: '1:30 PM', format: '2D', price: 300, availableSeats: 12 },
        { id: '1-3', time: '5:00 PM', format: 'IMAX', price: 450, availableSeats: 67 },
        { id: '1-4', time: '8:30 PM', format: '2D', price: 350, availableSeats: 5 }
      ]
    },
    {
      id: '2',
      title: 'Interstellar',
      rating: 4.8,
      city: 'Bangalore',
      genre: 'Sci-Fi',
      duration: 169,
      language: 'English',
      releaseDate: '2024-02-01',
      description: 'An epic science fiction adventure exploring the limits of space and time.',
      cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
      director: 'Christopher Nolan',
      shows: [
        { id: '2-1', time: '11:00 AM', format: '2D', price: 280, availableSeats: 89 },
        { id: '2-2', time: '2:30 PM', format: 'IMAX 2D', price: 500, availableSeats: 34 },
        { id: '2-3', time: '6:00 PM', format: '3D', price: 450, availableSeats: 2 },
        { id: '2-4', time: '9:30 PM', format: '2D', price: 300, availableSeats: 56 }
      ]
    },
    {
      id: '3',
      title: 'Avengers',
      rating: 4.5,
      city: 'Chennai',
      genre: 'Action',
      duration: 181,
      language: 'English',
      releaseDate: '2024-01-25',
      description: 'The ultimate superhero action film with mind-bending action sequences.',
      cast: ['Robert Downey Jr.', 'Chris Evans', 'Scarlett Johansson'],
      director: 'Russo Brothers',
      shows: [
        { id: '3-1', time: '9:30 AM', format: '2D', price: 300, availableSeats: 76 },
        { id: '3-2', time: '1:00 PM', format: '3D', price: 450, availableSeats: 23 },
        { id: '3-3', time: '4:30 PM', format: '2D', price: 320, availableSeats: 91 },
        { id: '3-4', time: '8:00 PM', format: 'IMAX 3D', price: 600, availableSeats: 8 }
      ]
    },
    {
      id: '4',
      title: 'Guntur Kaaram',
      rating: 4.3,
      city: 'Hyderabad',
      genre: 'Comedy-Drama',
      duration: 135,
      language: 'Telugu',
      releaseDate: '2024-02-05',
      description: 'A heartwarming family comedy with lessons on relationships.',
      cast: ['Mahesh Babu', 'Ramya Krishnan'],
      director: 'Trivikram Srinivas',
      shows: [
        { id: '4-1', time: '10:30 AM', format: '2D', price: 240, availableSeats: 120 },
        { id: '4-2', time: '3:00 PM', format: '2D', price: 280, availableSeats: 45 },
        { id: '4-3', time: '6:30 PM', format: '2D', price: 320, availableSeats: 12 },
        { id: '4-4', time: '9:00 PM', format: '2D', price: 350, availableSeats: 78 }
      ]
    },
    {
      id: '5',
      title: 'Salaar',
      rating: 4.6,
      city: 'Mumbai',
      genre: 'Action-Thriller',
      duration: 156,
      language: 'Kannada',
      releaseDate: '2024-01-30',
      description: 'An intense action thriller with blockbuster entertainment.',
      cast: ['Prabhas', 'Prithviraj Sukumaran'],
      director: 'Prashanth Neel',
      shows: [
        { id: '5-1', time: '10:00 AM', format: '2D', price: 270, availableSeats: 65 },
        { id: '5-2', time: '1:30 PM', format: 'IMAX', price: 480, availableSeats: 31 },
        { id: '5-3', time: '5:00 PM', format: '2D', price: 310, availableSeats: 54 },
        { id: '5-4', time: '8:30 PM', format: '3D', price: 420, availableSeats: 19 }
      ]
    }
  ]);

  movies$ = this.moviesSubject.asObservable();

  constructor() {}

  getMovies(): Observable<Movie[]> {
    return this.movies$;
  }

  getMovieById(id: string): Observable<Movie | undefined> {
    return new Observable(observer => {
      this.moviesSubject.subscribe(movies => {
        observer.next(movies.find(m => m.id === id));
      });
    });
  }

  getShowsByMovieId(movieId: string): Observable<Show[]> {
    return new Observable(observer => {
      this.moviesSubject.subscribe(movies => {
        const movie = movies.find(m => m.id === movieId);
        observer.next(movie?.shows || []);
      });
    });
  }
}

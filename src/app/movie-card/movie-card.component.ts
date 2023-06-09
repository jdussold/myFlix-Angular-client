import {
  Component,
  OnInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

/**
 * Movie Card Component
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  genres: string[] = [];
  favoriteMovies: any[] = [];
  loading: boolean = false;
  featuredMovie: any;

  @ViewChildren('movieListContainer')
  movieListContainers!: QueryList<ElementRef>;
  @ViewChildren('movieList') movieLists!: QueryList<ElementRef>;

  /**
   * Constructor
   * @param fetchApiData - The FetchApiDataService instance
   * @param dialog - The MatDialog instance
   * @param router - The Router instance
   * @param sharedService - The SharedService instance
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    private sharedService: SharedService
  ) {
    this.favoriteMovies = [];
  }

  /**
   * Lifecycle hook that is called after data-bound properties of the component are initialized
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUserFavoriteMovies();
    this.getFeaturedMovies();
    this.rotateFeaturedMovie();
  }

  /**
   * Fetches all movies from the API
   */
  getMovies(): void {
    this.loading = true;
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => {
        this.movies = resp;
        this.genres = this.getGenres();
        this.updateFavoriteStatus();
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Fetches the user's favorite movies from the API
   */
  getUserFavoriteMovies(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      const username = user.Username;

      this.fetchApiData.getFavoriteMovies(username).subscribe({
        next: (movies) => {
          this.favoriteMovies = movies;

          // Set the "isFavorite" property for each movie based on the user's favorite movies
          this.movies.forEach((movie) => {
            const foundMovie = this.favoriteMovies.find(
              (m) => m._id === movie._id
            );
            if (foundMovie) {
              movie.isFavorite = true;
            } else {
              movie.isFavorite = false;
            }
          });

          // Update the favorite status of each movie whenever the user's list of favorite movies changes
          this.updateFavoriteStatus();
        },
        error: (error) => {
          console.log('getFavoriteMovies() error:', error);
        },
      });
    }
  }

  /**
   * Fetches the featured movies from the API
   */
  getFeaturedMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any[]) => {
        const featuredMovies = resp.filter(
          (movie: any) => movie.Featured === true
        );
        if (featuredMovies.length > 0) {
          const randomIndex = Math.floor(Math.random() * featuredMovies.length);
          this.featuredMovie = featuredMovies[randomIndex];
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  /**
   * Rotates the the featured movie at regular intervals
   */
  rotateFeaturedMovie(): void {
    setInterval(() => {
      const featuredMovies = this.movies.filter(
        (movie) => movie.Featured === true
      );
      const currentIndex = featuredMovies.findIndex(
        (movie) => movie === this.featuredMovie
      );
      const nextIndex = (currentIndex + 1) % featuredMovies.length;
      this.featuredMovie = featuredMovies[nextIndex];
    }, 8000);
  }

  /**
   * Scrolls the movie list container to the left
   * @param genre - The genre of the movie list
   */
  scrollLeft(genre: string): void {
    const index = this.genres.indexOf(genre);
    const movieList = this.movieLists.toArray()[index].nativeElement;
    movieList.scrollBy({
      left: -574,
      behavior: 'smooth',
    });
  }

  /**
   * Scrolls the movie list container to the right
   * @param genre - The genre of the movie list
   */
  scrollRight(genre: string): void {
    const index = this.genres.indexOf(genre);
    const movieList = this.movieLists.toArray()[index].nativeElement;
    movieList.scrollBy({
      left: 574,
      behavior: 'smooth',
    });
  }

  /**
   * Toggles the favorite status of a move
   * @param movie - The movie object
   */
  toggleFavorite(movie: any): void {
    this.sharedService.toggleFavorite(movie);
    movie.isFavorite = !movie.isFavorite; // Toggle the favorite status

    if (movie.isFavorite) {
      // Add the movie to the favoriteMovies array
      this.favoriteMovies.push(movie);
    } else {
      // Remove the movie from the favoriteMovies array
      this.favoriteMovies = this.favoriteMovies.filter(
        (favMovie) => favMovie._id !== movie._id
      );
    }
  }

  /**
   * Retrieves the unique genres from the movie list
   * @returns An array of genre names
   */
  private getGenres(): string[] {
    const genresSet = new Set<string>();
    this.movies.forEach((movie) => genresSet.add(movie.Genre.Name));
    return Array.from(genresSet);
  }

  /**
   * Opens a dialog for the movie
   * @param movie - The movie object
   * @param type - The type of dialog
   */
  openDialog(movie: any, type: string): void {
    this.sharedService.openDialog(movie, type, movie.BackdropImage);
  }

  /**
   * Updates the favorite status of each movie
   */
  public updateFavoriteStatus(): void {
    this.movies.forEach((movie) => {
      movie.isFavorite =
        this.favoriteMovies.find((m) => m._id === movie._id) !== undefined;
    });
  }

  /**
   * Logs out the user and navigates to the welcome page
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/welcome']);
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './fetch-api-data.service';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  /**
   * Toggle the favorite status of a movie
   * @param movie - Movie object
   * @param onRollback - Called if the request fails and the status is restored
   */
  toggleFavorite(movie: any, onRollback?: () => void): void {
    movie.isFavorite = !movie.isFavorite;
    const request = movie.isFavorite
      ? this.fetchApiData.addFavoriteMovie(movie._id)
      : this.fetchApiData.removeFavoriteMovie(movie._id);

    request.subscribe({
      error: () => {
        movie.isFavorite = !movie.isFavorite;
        onRollback?.();
        this.snackBar.open(
          'Could not update favorites. Please try again.',
          'OK',
          { duration: 4000 },
        );
      },
    });
  }

  /**
   * Open a movie dialog
   * @param movie - Movie object
   * @param type - Dialog type
   * @param backdropImage - Backdrop image URL
   */
  openDialog(movie: any, type: string, backdropImage: string): void {
    let data: any;
    switch (type) {
      case 'genre':
        data = {
          title: movie.Genre.Name,
          message: movie.Genre.Description,
          backdropImage: backdropImage,
        };
        break;
      case 'director':
        data = {
          title: movie.Director.Name,
          message: movie.Director.Bio,
          backdropImage: backdropImage,
        };
        break;
      case 'synopsis':
        data = {
          title: movie.Title,
          message: movie.Description,
          backdropImage: backdropImage,
        };
        break;
      default:
        break;
    }
    this.dialog.open(MovieDialogComponent, {
      width: '500px',
      data: data,
    });
  }
}

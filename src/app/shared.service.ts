import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from './fetch-api-data.service';
import { MovieDialogComponent } from './movie-dialog/movie-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private fetchApiData: FetchApiDataService,
    private dialog: MatDialog
  ) {}

  toggleFavorite(movie: any): void {
    movie.isFavorite = !movie.isFavorite;
    if (movie.isFavorite) {
      this.fetchApiData.addFavoriteMovie(movie._id).subscribe((response) => {
        console.log(response);
      });
    } else {
      this.fetchApiData.removeFavoriteMovie(movie._id).subscribe((response) => {
        console.log(response);
      });
    }
  }

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

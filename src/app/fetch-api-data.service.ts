// Import the necessary modules
import { Injectable } from '@angular/core';
import { catchError, forkJoin } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// API URL
const apiUrl = 'https://my-flix-db-jd.herokuapp.com';

// Injectable service class
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // User registration method
  userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /// User login method
  userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // Method to fetch all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to fetch a specific movie by title
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/${title}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to fetch movies by director name
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/directors/${directorName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to fetch movies by genre
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/movies/genre/${genreName}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to fetch user details
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .get(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to fetch favorite movies of a user
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(`${apiUrl}/users/${username}/favorites`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // Method to add a movie to user's favorite list
  addFavoriteMovie(movieId: string): Observable<any> {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      console.error('User object not found in local storage');
      return throwError('User object not found in local storage');
    }

    const user = JSON.parse(userJson);
    const username = user.Username;
    const token = localStorage.getItem('token');

    return this.http
      .post(
        `${apiUrl}/users/${username}/movies/${movieId}`,
        { FavoriteMovie: movieId },
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to remove a movie from a user's favorite list
  removeFavoriteMovie(movieId: string): Observable<any> {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      console.error('User object not found in local storage');
      return throwError('User object not found in local storage');
    }

    const user = JSON.parse(userJson);
    const username = user.Username;
    const token = localStorage.getItem('token');

    return this.http
      .delete(`${apiUrl}/users/${username}/movies/${movieId}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to edit a user's details
  editUser(updatedUser: any): Observable<any> {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      // handle the case where the user object is not found in local storage
      return throwError('User object not found in local storage');
    }

    const user = JSON.parse(userJson);
    if (!user || !user.Username) {
      // handle the case where the username property is missing or null
      return throwError('Invalid user object in local storage');
    }

    const username = user.Username;
    const token = localStorage.getItem('token');
    return this.http
      .put(
        `${apiUrl}/users/${username}`,
        {
          Username: updatedUser.Username,
          Password: updatedUser.Password,
          Email: updatedUser.Email,
          Birthday: updatedUser.Birthday,
        },
        {
          headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Method to delete a user
  deleteUser(): Observable<any> {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      console.error('User object not found in local storage');
      return throwError('User object not found in local storage');
    }

    const user = JSON.parse(userJson);
    if (!user || !user.Username) {
      // handle the case where the username property is missing or null
      return throwError('Invalid user object in local storage');
    }

    const username = user.Username;
    const token = localStorage.getItem('token');
    return this.http
      .delete(`${apiUrl}/users/${username}`, {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
        responseType: 'text', // Set responseType to 'text'
        observe: 'response',
      })
      .pipe(
        map((response) => {
          console.log(response.body); // This will log the message from the server
        }),
        catchError(this.handleError)
      );
  }

  // Method to verify a users password during profile updates
  verifyPassword(username: string, password: string): Observable<any> {
    const payload = JSON.stringify({
      username: username,
      password: password,
    });
    return this.http
      .post(`${apiUrl}/verify-password`, payload, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError));
  }

  // Method to extract response data from an API response
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Method to handle HTTP errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later');
  }
}

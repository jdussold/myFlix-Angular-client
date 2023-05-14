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

/**
 * Injectable service class for fetching API data
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * User registration method
   * @param userDetails - User registration details
   * @returns Observable with the API response
   */
  userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User login method
   * @param userDetails - User login details
   * @returns Observable with the API response
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/login`, userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Method to fetch all movies
   * @returns Observable with the API response
   */
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

  /**
   * Method to fetch a specific movie by title
   * @param title - Movie title
   * @returns Observable with the API response
   */
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

  /**
   * Method to fetch movies by director name
   * @param directorName - Director name
   * @returns Observable with the API response
   */
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

  /**
   * Method to fetch movies by genre
   * @param genreName - Genre name
   * @returns Observable with the API response
   */
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

  /**
   * Method to fetch user details
   * @returns Observable with the API response
   */
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

  /**
   * Method to fetch favorite movies of a user
   * @param username - User's username
   * @returns Observable with the API response
   */
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

  /**
   * Method to add a movie to user's favorite list
   * @param movieId - Movie ID
   * @returns Observable with the API response
   */
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

  /**
   * Method to remove a movie from a user's favorite list
   * @param movieId - Movie ID
   * @returns Observable with the API response
   */
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

  /**
   * Method to edit a user's details
   * @param updatedUser - Updated user details
   * @returns Observable with the API response
   */
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

  /**
   * Method to delete a user
   * @returns Observable with the API response
   */
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

  /**
   * Method to verify a user's password during profile updates
   * @param username - User's username
   * @param password - User's password
   * @returns Observable with the API response
   */
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

  /**
   * Method to extract response data from an API response
   * @param res - HTTP response
   * @returns Extracted response data
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Method to handle HTTP errors
   * @param error - HTTP error response
   * @returns Error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later')
    );
  }
}

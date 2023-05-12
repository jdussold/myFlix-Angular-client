MyFlixAngularClient

<img src="../assets/images/movie-card-page.png" alt="Image of my flix app" style="max-width: 700px;">

This project is an Angular client application generated using Angular CLI version 15.2.5. It is designed to work in conjunction with the MyFlix API to provide a user-friendly interface for accessing and interacting with movie data.

Development server
To run the development server, follow these steps:

Install the necessary dependencies by running npm install.
Execute the command ng serve to start the development server.
Open your web browser and navigate to http://localhost:4200/. The application will automatically reload if you make any changes to the source files.

Components

### welcome-page

<img src="../assets/images/welcome-page.png" alt="Image of welcome page" style="max-width: 700px;">

The `welcome-page` component serves as the landing page of the application. It provides a user-friendly interface where users can sign up or log in to access the main features of the application.

#### Usage

To use the `welcome-page` component, follow these steps:

1.  Add the following selector to your template file where you want the welcome page to appear: `<app-welcome-page></app-welcome-page>`.
2.  The component will display the main content of the welcome page, including an image/logo and buttons for signing up and logging in.
3.  Clicking the "Sign Up" button will open a registration dialog, allowing new users to create an account.
4.  Clicking the "Login" button will open a login dialog, enabling existing users to log into their accounts.
5.  While the registration or login dialog is open, the background of the welcome page is blurred to indicate that interaction with the underlying content is disabled.
6.  After the registration or login dialog is closed, the background blur effect is removed, and users can continue interacting with the welcome page.

#### Code Explanation

The `welcome-page` component consists of the following files:

- `welcome-page.component.html`: This file defines the HTML structure of the welcome page. It includes an image/logo and buttons for signing up and logging in. The `[ngClass]` directive is used to conditionally apply the "blur" class to the main element when the registration or login dialog is open.
- `welcome-page.component.scss`: This file contains the styling rules for the welcome page. It defines the styles for the main element, image/logo, and button group. It also includes the "blur" class to apply the blur effect to the background when the dialog is open.
- `welcome-page.component.ts`: This file is the TypeScript code for the component. It handles the logic for opening the registration and login dialogs, as well as managing the `isDialogOpen` flag to control the blur effect on the background.

The component uses Angular Material's `MatDialog` to open the registration and login dialogs. When a dialog is opened, the `isDialogOpen` flag is set to `true`, applying the "blur" class to the main element and blurring the background. When a dialog is closed, the `isDialogOpen` flag is set to `false`, removing the blur effect.

In the `ngOnInit()` method, the component checks if a user and token are present in the local storage. If so, it automatically redirects the user to the movies page to bypass the welcome page and provide a seamless user experience.

### user-registration-form

<img src="../assets/images/registration-form.png" alt="Image of user registration form" style="max-width: 700px;">

The `user-registration-form` component provides a form for users to register new accounts. It allows users to enter their desired username, password, email, and birthday and handles the registration process.

#### Usage

To use the `user-registration-form` component, follow these steps:

1.  Add the following selector to your template file where you want the registration form to appear: `<app-user-registration-form></app-user-registration-form>`.
2.  The component will display a card with a form containing input fields for username, password, email, and birthday.
3.  Users can enter their desired username, password, email, and birthday in the respective input fields.
4.  The form provides validation for each input field, ensuring that they are not empty and meet specific requirements.
5.  If the user submits the form by clicking the "Sign Up" button, the `registerUser()` method is triggered.
6.  The `registerUser()` method sends an HTTP request to the API to register the user with the provided information.
7.  If the registration is successful, the user is automatically logged in by sending another HTTP request to the API with the registered username and password.
8.  If the login after registration is successful, the user's information and authentication token are stored in the local storage. The user is then redirected to the movies page.
9.  If any errors occur during registration or login, error messages are displayed to the user using the `MatSnackBar` component from Angular Material.

#### Code Explanation

The `user-registration-form` component consists of the following files:

- `user-registration-form.component.html`: This file defines the HTML structure of the registration form. It includes a card with a form containing input fields for username, password, email, and birthday. It also displays error messages below each input field based on the form validation status.
- `user-registration-form.component.scss`: This file contains the styling rules for the registration form. It defines the styles for the card, form, input fields, and error messages.
- `user-registration-form.component.ts`: This file is the TypeScript code for the component. It handles the logic for user registration, form validation, API communication, and displaying error messages.

The component uses Angular Reactive Forms (`FormGroup` and `FormControl`) to manage the registration form and handle user input. It sets up validators to ensure that each input field meets specific requirements, such as minimum length and pattern validation for the username field, and required and email validation for the email field. If any input field is invalid, the "Sign Up" button is disabled.

The component interacts with the `FetchApiDataService` service to send registration requests to the API. If the registration is successful, the user is automatically logged in by sending a login request with the registered username and password. The user's information and authentication token are stored in the local storage using the `localStorage` API. If any errors occur during registration or login, error messages are displayed to the user using the `MatSnackBar` component.

### user-login-form

<img src="../assets/images/login-form.png" alt="Image of user login form" style="max-width: 700px;">

The `user-login-form` component provides a form for users to log in to their accounts. It allows users to enter their username and password and handles the authentication process.

#### Usage

To use the `user-login-form` component, follow these steps:

1.  Add the following selector to your template file where you want the login form to appear: `<app-user-login-form></app-user-login-form>`.
2.  The component will display a card with a logo, username and password input fields, and a login button.
3.  Users can enter their username and password in the respective input fields.
4.  The form provides validation for the username and password fields, ensuring that they are not empty.
5.  If the user submits the form by clicking the "Log In" button or pressing the enter key, the `loginUser()` method is triggered.
6.  The `loginUser()` method sends an HTTP request to the API with the provided username and password for authentication.
7.  If the login is successful, the user's information and authentication token are stored in the local storage. The user is then redirected to the movies page.
8.  If the login fails due to an invalid username or password, an error message is displayed below the form.
9.  The component uses Angular Material components, such as `mat-card`, `mat-form-field`, `mat-spinner`, and `mat-error`, to provide a visually appealing and user-friendly interface.

#### Code Explanation

The `user-login-form` component consists of the following files:

- `user-login-form.component.html`: This file defines the HTML structure of the login form. It includes a card with a form containing username and password input fields. It also displays loading spinners and error messages based on the login status.
- `user-login-form.component.scss`: This file contains the styling rules for the login form. It defines the styles for the card, form, input fields, loading spinners, and error messages.
- `user-login-form.component.ts`: This file is the TypeScript code for the component. It handles the logic for user authentication, form validation, and API communication.

The component uses Angular Reactive Forms (`FormGroup` and `FormControl`) to manage the login form and handle user input. It sets up validators to ensure that the username and password fields are not empty. If the form is invalid, the "Log In" button is disabled.

The component interacts with the `FetchApiDataService` service to send login requests to the API. If the login is successful, the user's information and authentication token are stored in the local storage using the `localStorage` API. If the login fails, an error message is displayed to the user.

### movie-card

<img src="../assets/images/movie-card.png" alt="Image of movie card" style="max-width: 700px;">

The `movie-card` component is responsible for displaying a grid of movie cards on the homepage. Each movie card represents a movie and provides options to view additional details, such as the genre, director, and synopsis. Users can also add or remove movies from their favorites list.

#### Usage

To use the `movie-card` component, follow these steps:

1.  Add the following selector to your template file where you want the movie grid to appear: `<app-movie-card></app-movie-card>`.
2.  The component will automatically fetch and display the movies from the API.
3.  The featured movie section will display a randomly selected movie from the featured movies list.
4.  Each movie card includes the movie title, director, and a backdrop image.
5.  Users can click on the genre, director, or synopsis buttons to open a dialog box that displays additional details about the movie.
6.  The heart-shaped icon allows users to add or remove the movie from their favorites list.
7.  Users can navigate between the homepage, profile page, and log out using the navigation buttons at the top.
8.  The movie grid is divided into sections based on genres. Users can scroll left or right within each genre section using the arrow buttons.

#### Code Explanation

The `movie-card` component consists of the following files:

- `movie-card.component.html`: This file defines the HTML structure of the component. It includes the navigation buttons, featured movie section, genre containers, movie cards, and loading spinner.
- `movie-card.component.scss`: This file contains the styling rules for the component. It defines the styles for the navigation buttons, movie cards, genre containers, and loading spinner.
- `movie-card.component.ts`: This file is the TypeScript code for the component. It handles the logic of fetching movies from the API, displaying the featured movie, scrolling within genre sections, toggling favorite status, opening dialog boxes for movie details, and logging out.

The `getMovies()` function fetches all the movies from the API and stores them in the `movies` array. The `getUserFavoriteMovies()` function retrieves the user's favorite movies and updates the favorite status of each movie. The `getFeaturedMovies()` function selects a random movie from the list of featured movies and displays it in the featured movie section. The `rotateFeaturedMovie()` function automatically rotates the featured movie every 8 seconds.

Users can scroll left or right within each genre section using the arrow buttons, which call the `scrollLeft()` and `scrollRight()` functions. The `toggleFavorite()` function allows users to add or remove movies from their favorites list by toggling the favorite status of a movie. The `openDialog()` function opens a dialog box with additional details about a movie when the user clicks on the genre, director, or synopsis button.

### movie-dialog

The `movie-dialog` component is responsible for displaying a dialog box with additional details about a movie. It can be used to show information such as the genre, director, or synopsis of a movie.

#### Usage

To use the `movie-dialog` component, follow these steps:

1.  Add the following selector to your template file where you want the movie dialog to appear: `<app-movie-dialog></app-movie-dialog>`.
2.  When you need to display the dialog, pass the required data to the component using the `data` parameter.
3.  Set the `title` property in the `data` object to specify the title of the dialog.
4.  Set the `backdropImage` property in the `data` object to specify the background image for the dialog.
5.  If you want to display genre-specific information, set the `genre` property in the `data` object to the genre of the movie.
6.  Set the `message` property in the `data` object to the message or content you want to display in the dialog.
7.  The dialog will automatically open and display the provided data.
8.  Users can close the dialog by clicking the close button or anywhere outside the dialog box.

#### Code Explanation

The `movie-dialog` component consists of the following files:

- `movie-dialog.component.html`: This file defines the HTML structure of the dialog box. It includes the dialog title, close button, content area, and an overlay to darken the background.
- `movie-dialog.component.scss`: This file contains the styling rules for the dialog box. It defines the styles for the dialog title, close button, content area, and overlay.
- `movie-dialog.component.ts`: This file is the TypeScript code for the component. It handles the logic of closing the dialog when the close button is clicked.

The `movie-dialog` component receives the necessary data through the `MAT_DIALOG_DATA` injection token. The `data` object contains the properties `title`, `backdropImage`, `genre`, and `message`, which are used to populate the dialog content.

The `onCloseClick()` function is triggered when the close button is clicked. It calls the `close()` method of the `MatDialogRef` to close the dialog.

### profile-page

<img src="../assets/images/profile-page.png" alt="Image of user profile page" style="max-width: 700px;">

The `profile-page` component is responsible for displaying and managing the user's profile information. It allows users to view and edit their profile details, such as username, password, email, and birthday. Users can also delete their account and manage their favorite movies.

#### Usage

To use the `profile-page` component, follow these steps:

1.  Add the following selector to your template file where you want the profile page to appear: `<app-profile-page></app-profile-page>`.
2.  The component will automatically fetch and display the user's profile information, including the username, email, and birthday.
3.  Users can click the "Edit Profile" button to enter edit mode and modify their profile details.
4.  In edit mode, users can change their username, password, email, and birthday.
5.  The component provides validation for username, password, and email fields to ensure they meet the required criteria.
6.  Users can save their changes by clicking the "Save Changes" button, which triggers the `onSubmit()` method.
7.  If users decide not to save their changes, they can click the "Cancel" button to revert to the original profile information.
8.  Users can delete their account by clicking the "Delete Account" button. This action will prompt them to confirm their password.
9.  Users can manage their favorite movies by viewing and interacting with the displayed movie cards. They can click on the movie cards to view additional information, such as genre, director, and synopsis. They can also toggle the favorite status of a movie by clicking the heart icon.
10. The component uses Angular Material components, such as buttons, forms, cards, and dialogs, to provide a user-friendly interface.

#### Code Explanation

The `profile-page` component consists of the following files:

- `profile-page.component.html`: This file defines the HTML structure of the profile page. It includes the top bar section, profile forms for non-editing and editing modes, and a section to display the user's favorite movies.
- `profile-page.component.scss`: This file contains the styling rules for the profile page. It defines the styles for the top bar, forms, buttons, and movie cards.
- `profile-page.component.ts`: This file is the TypeScript code for the component. It handles the logic for fetching and displaying the user's profile information, as well as managing profile editing, deletion, and favorite movie functionality.

The `profile-page` component uses Angular Reactive Forms (`FormGroup` and `FormControl`) to manage the profile form and handle user input. It sets up validators to ensure that the username, password, and email fields meet the required criteria. The component also provides visual feedback to the user by displaying warning messages for invalid input.

The component interacts with the `FetchApiDataService` service to fetch and update user data from the API. It communicates with other components, such as the `ConfirmPasswordDialogComponent` and `SharedService`, to handle password verification, dialog opening, and favorite movie management.

When users submit their changes or delete their account, the component verifies the password by opening a confirmation dialog. If the password is verified, the component performs the corresponding action, such as updating the user's profile or deleting the account.

### confirm-password-dialog

The `confirm-password-dialog` component is responsible for displaying a dialog box to confirm a password or delete an account. It provides the user with the option to enter their current password and perform the corresponding action.

#### Usage

To use the `confirm-password-dialog` component, follow these steps:

1.  Add the following selector to your template file where you want the dialog to appear: `<app-confirm-password-dialog></app-confirm-password-dialog>`.
2.  Configure the component by passing the `deleteClicked` parameter as an input. Set it to `true` if you want to display the delete account confirmation dialog, or `false` for the confirm changes dialog.
3.  The component will display the appropriate title and message based on the `deleteClicked` input.
4.  The user can enter their password in the password input field.
5.  If the password is incorrect or an error occurs during verification, an error message will be displayed.
6.  Clicking the "Cancel" button will close the dialog.
7.  Clicking the "Confirm" button will call the `verifyPassword()` function to verify the entered password.
8.  If the password is successfully verified, the dialog will be closed and the verified password will be returned.

#### Code Explanation

The `confirm-password-dialog` component consists of the following files:

- `confirm-password-dialog.component.html`: This file defines the HTML structure of the dialog box. It includes the dialog title, content, password input field, error message, and action buttons.
- `confirm-password-dialog.component.scss`: This file contains the styling rules for the dialog box. It defines the styles for the dialog title, content, error message, and action buttons.
- `confirm-password-dialog.component.ts`: This file is the TypeScript code for the component. It handles the logic of verifying the password and communicates with the API using the `FetchApiDataService` service.

The `verifyPassword()` function sends a request to the API to verify the user's password. If the password is correct, the dialog is closed, and the verified password is returned. If an error occurs or the password is incorrect, an error message is displayed.

Services

### fetch-api-data.service

The `fetch-api-data.service` component is responsible for handling HTTP requests to the API server. It provides methods for user registration, user login, fetching movies, fetching user details, managing favorite movies, editing user details, and deleting a user.

#### Usage

To use the `fetch-api-data.service` component, follow these steps:

1.  Import the `FetchApiDataService` service into your Angular component or service file.

2.  Inject the `FetchApiDataService` service into your constructor:

    typescriptCopy code

    `constructor(private fetchApiData: FetchApiDataService) {}`

3.  Use the methods provided by the service to interact with the API server.

#### Code Explanation

The `fetch-api-data.service` component consists of the following files:

- `fetch-api-data.service.ts`: This file contains the service class that handles HTTP requests using the Angular `HttpClient` module. It provides methods for user registration, user login, fetching movies, fetching user details, managing favorite movies, editing user details, and deleting a user.

The methods in the service make use of the `HttpClient` module to send HTTP requests to the API server. The API URL is defined as `apiUrl`.

The service methods return `Observable` objects that can be subscribed to in order to receive the API response. The responses are transformed using operators from the RxJS library, such as `pipe`, `map`, and `catchError`.

The service also includes utility methods such as `extractResponseData` and `handleError`:

- `extractResponseData(res: any)`: This method extracts the response body from an API response. It is used as a mapping function in the `map` operator to transform the API response.
- `handleError(error: HttpErrorResponse)`: This method handles HTTP errors that may occur during API requests. It logs the error details to the console and returns an error message as an `Observable`.

To use the service methods, simply call them in your Angular component or service, and subscribe to the returned `Observable` to receive the API response.

### shared-service

The `shared-service` component provides shared functionality and services that can be used across different components in the application. It includes methods for toggling a movie's favorite status and opening a dialog box to display additional movie details.

#### Usage

To use the `shared-service` component, follow these steps:

1.  Import the `SharedService` service into your Angular component or service file.

2.  Inject the `SharedService` service into your constructor:

    typescriptCopy code

    `constructor(private sharedService: SharedService) {}`

3.  Use the methods provided by the service to access the shared functionality.

#### Code Explanation

The `shared-service` component consists of the following files:

- `shared-service.ts`: This file contains the service class that provides shared functionality and services. It is injected with the `FetchApiDataService` and `MatDialog` services.

The `toggleFavorite(movie: any)` method is used to toggle the favorite status of a movie. It takes a movie object as a parameter and updates its `isFavorite` property. If the movie is marked as a favorite, it calls the `addFavoriteMovie` method from the `FetchApiDataService` service to add the movie to the user's favorite list. If the movie is no longer a favorite, it calls the `removeFavoriteMovie` method to remove the movie from the user's favorite list.

The `openDialog(movie: any, type: string, backdropImage: string)` method is used to open a dialog box that displays additional movie details. It takes the movie object, type of information to display (e.g., genre, director, synopsis), and backdrop image URL as parameters. Based on the type of information, it prepares the data object to be passed to the `MovieDialogComponent` dialog component. The dialog is then opened using the `MatDialog` service, and the data object is passed as the dialog's data input.

To use the service methods, simply call them in your Angular component or service, and they will provide the desired functionality.

Further help
To get more help on the Angular CLI, use ng help or refer to the Angular CLI Overview and Command Reference page.

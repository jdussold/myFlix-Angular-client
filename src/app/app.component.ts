import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root component of the Angular application
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}

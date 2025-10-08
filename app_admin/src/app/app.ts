import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TripListing} from './trip-listing/trip-listing';
import {trips} from './data/trips';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TripListing],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Travlr Getaways Admin!';
}

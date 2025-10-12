import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, NgOptimizedImage} from "@angular/common";
import {Trip} from '../models/trip';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-card',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {

  constructor(private router: Router) {}

  @Input() trips!: any[];

  updateTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}

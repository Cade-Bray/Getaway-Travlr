import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, NgOptimizedImage} from "@angular/common";
import {Trip} from '../models/trip';
import {Router} from '@angular/router';
import {Authentication} from '../services/authentication';

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

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  @Input() trips!: any[];

  updateTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }
}

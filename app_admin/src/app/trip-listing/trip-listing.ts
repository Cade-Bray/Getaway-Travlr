import {Component, OnInit} from '@angular/core';
import {TripCard} from '../trip-card/trip-card';
import {Trip} from '../models/trip';
import {TripData} from '../services/trip-data';
import {Router} from '@angular/router';
import {Authentication} from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  imports: [
    TripCard
  ],
  providers: [TripData],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})

export class TripListing implements OnInit{
  constructor(
    private tripDataService: TripData,
    private router: Router,
    private authenticationService: Authentication
  ) {
  }

  message: string = '';
  trips!: Trip[];

  ngOnInit() {
    this.getData();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }

  private getData(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = `There are ${value.length} trips available.`;
          } else {
            this.message = 'There were no trips retrieved from the database.';
          }
        },
        error: (error: any) => {
          console.log(`Error: ${error}`);
        }
      });
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {TripCard} from '../trip-card/trip-card';

@Component({
  selector: 'app-trip-listing',
  imports: [
    TripCard
  ],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})

export class TripListing implements OnInit{
  constructor() {}

  ngOnInit() {}

  @Input() trip!: any[];
}

import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-trip-card',
    imports: [
        CurrencyPipe,
        NgOptimizedImage
    ],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {

  @Input() trip!: any[];
}

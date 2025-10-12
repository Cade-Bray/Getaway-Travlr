import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {formatDate, NgClass, TitleCasePipe} from "@angular/common";
import {Router} from '@angular/router';
import {TripData} from '../services/trip-data';
import {Trip} from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  imports: [
    FormsModule,
    TitleCasePipe,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css'
})
export class EditTrip implements OnInit{
  editForm!: FormGroup;
  submitted = false;
  message: string = '';
  trip!: Trip;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripData
  ) {}

  public deleteTrip(): void {
    // Retrieving the stashed trip ID
    let tripCode = localStorage.getItem('tripCode');

    // Error trapping. No trip id found.
    if (!tripCode) {
      alert('Something went wrong, couldn\'t find where I stashed the trip code!');
      this.router.navigate(['']);
      return;
    }

    this.tripService.deleteTrip(tripCode)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log(`Error: ${error}`);
        }
      });
  }

  ngOnInit() {
    // Retrieving the stashed trip ID
    let tripCode = localStorage.getItem('tripCode');

    // Error trapping. No trip id found.
    if (!tripCode) {
      alert('Something went wrong, couldn\'t find where I stashed the trip code!');
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent::ngOnInit');
    console.log(`tripcode: ${tripCode}`);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // populate our form with the rest of the values with the get trip from the trip service.
    this.tripService.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value[0];

          // Format the date
          const formattedTrip = {
            ...this.trip,
            start: this.trip.start ? formatDate(this.trip.start, 'yyyy-MM-dd', 'en') : ''
          };

          // populate the actual fields now that we've got the data.
          this.editForm.patchValue(formattedTrip);

          // Error Trapping
          if (!this.trip) {
            this.message = 'No Trip Retrieved from database!';
          } else {
            this.message = `Trip: ${tripCode} retrieved`;
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log(`Error: ${error}`);
        }
      });
  }

  public onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log(`Error: ${error}`);
          }
        });
    }
  }

  // Get the form short name to access the form fields
  get f() {return this.editForm.controls;}

  protected readonly Object = Object;
}

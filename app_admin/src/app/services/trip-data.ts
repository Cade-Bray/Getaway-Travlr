import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  constructor(private http: HttpClient) {}
  endpoint = 'http://localhost:3000/api/trips';

  /**
   * This function gathers the trips from the defined endpoint on the express server. Ensure CORS is ok.
   */
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.endpoint);
  }

  addTrip(formData: Trip) {
    return this.http.post<Trip>(this.endpoint, formData);
  }
}

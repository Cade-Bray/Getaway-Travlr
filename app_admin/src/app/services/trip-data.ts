import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  constructor(private http: HttpClient) {}

  /**
   * This function gathers the trips from the defined endpoint on the express server. Ensure CORS is ok.
   */
  getTrips(): Observable<Trip[]> {
    let endpoint = 'http://localhost:3000/api/trips';
    return this.http.get<Trip[]>(endpoint);
  }
}

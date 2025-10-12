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

  /**
   * This function is used to get a single trip code. I admit that I am unsure why the original developer chose to
   * implement it with an array instead of as a single trip to receive as a parameter. I guess it so if multiple trips
   * have the same trip code they'll all be returned but this goes against the business logic we implement on the
   * mongoose model of the trip code being unique.
   * @param tripCode This is a string of a trip code.
   */
  getTrip(tripCode: String): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.endpoint}/${tripCode}`);
  }

  /**
   * This function is used to post a trip to the given endpoint.
   * @param formData Form data is the models/trip object with the information needing to be posted.
   */
  addTrip(formData: Trip) {
    return this.http.post<Trip>(this.endpoint, formData);
  }

  /**
   * This function is used to update a single trip in the database.
   * @param formData Form data is the models/trip object with the information needed to be PUT.
   */
  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(`${this.endpoint}/${formData.code}`, formData);
  }

  /**
   * This function will use the app_api/controllers/trips.js delete call given the endpoint.
   * @param tripCode The given trip code to delete as a string.
   */
  deleteTrip(tripCode: String): Observable<any> {
    return this.http.delete(`${this.endpoint}/${tripCode}`);
  }
}

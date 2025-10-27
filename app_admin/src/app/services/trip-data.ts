import { Inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Trip} from '../models/trip';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {AuthResponse} from '../models/auth-response';
import {BROWSER_STORAGE} from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE)private storage: Storage
    ) {}
  endpoint = 'http://localhost:3000/api/trips';
  baseURL = 'http://localhost:3000/api'

  /**
   * This function handles the Auth API Calls given the provided endpoint.
   * @param endpoint This is a simple string endpoint off of the base /api/ endpoint location.
   * @param user This is the user class object that contains a name and email for registration.
   * @param passwd This is the users password as plain text.
   */
  handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseURL}/${endpoint}`, formData);
  }

  /**
   * This function is a wrap for the API auth handler to the login end point.
   * @param user This is a user class object containing a name and email.
   * @param passwd This is the users plain text password.
   */
  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  /**
   * This function is a wrap for the API auth handler to the register end point.
   * @param user This is a user class object containing a name and email.
   * @param passwd This is the users plain text password.
   */
  register(user: User, passwd: string): Observable<AuthResponse>{
    return this.handleAuthAPICall('register', user, passwd);
  }

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

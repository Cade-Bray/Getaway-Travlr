import { Inject, Injectable } from '@angular/core';
import {BROWSER_STORAGE} from '../storage';
import {User} from '../models/user';
import {AuthResponse} from '../models/auth-response';
import {TripData} from './trip-data';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  // Setup storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripData
  ) {}

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    // Make sure we return a string even if we don't have a token
    if (!out){
      return '';
    }
    return out;
  }

  // Save our token to our Storage provider.
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout of our application and remove the JWT from local storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Boolean to determine if we are logged in and the token is still valid. Even if we have a token we still have to
  // re-authenticate if the token is expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Retrieve the current user. This function should only be called after the calling method has checked to make sure
  // that the user isLoggedIn.
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const {email, name} = JSON.parse(atob(token.split('.')[1]));
    return {email, name} as User;
  }

  // Login method that leverages the login method in the trip data service because that method returns an observable, we
  // subscribe to the result and only process when an observable condition is satisfied.
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value: any) => {
        if(value){
          console.log(value);
          this.authResp = value;
          this.saveToken(this.authResp.token);
        }
      },
      error: (error: any) => {
        console.log(`Error: ${error}`);
      }
    })
  }
}

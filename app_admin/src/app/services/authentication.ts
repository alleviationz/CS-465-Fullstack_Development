import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';

@Injectable({
  providedIn: 'root'
})

export class Authentication {
  // setup storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripData: TripData
  )
    { }

    // var to handle authentication responses
    authResponse: AuthResponse = new AuthResponse();

    // get token from storage provider
    // key name: 'travlr-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    // return a string even if there isn't a token
    if (!out) {
      return '';
    }
    return out;
  }

  // save token to storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // logout and remov JWT from storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // boolean to determine if user is logged in and token is valid & not expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    // token is good
    if (token) {
      // parse JSON token payload and attach the datetime
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    // token failed
    } else {
      return false;
    }
  }

  // retrieve current user, only call after ensuring user is logged in
  public getCurrentUser(): User {
    const token: string = this.getToken();
    // parse the email and name from the JSON token
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }

  // login method using tripData login, subscribe to result, process Observable if form data valid
  public login(user: User, password: string): void {
    // call trip data service's login with the login form's data
    this.tripData.login(user, password)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            // if a value is returned, save the token
            this.authResponse = value;
            this.saveToken(this.authResponse.token);
          }
        },
        // if error -> console log message for now: FIXME need better error handler
        error: (error: any) => {
          console.log(`Error ${error}`);
        }
      })
  }

  // register method using tripData register, subscribe to result, process Observable if form data valid
  public register(user: User, password: string): void {
    // call trip data service's register function with the register form data
    this.tripData.register(user, password)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            // if a value is returned, save the token
            this.authResponse = value;
            this.saveToken(this.authResponse.token);
          }
        },
        // if error -> console log error: FIXME needs better error handler
        error: (error: any) => {
          console.log(`Error ${error}`);
        }
      })
  }
}
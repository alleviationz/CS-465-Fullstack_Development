import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';


import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})

export class TripData {

  constructor(
    private http: HttpClient,
    @Inject (BROWSER_STORAGE) private storage: Storage
  ) {}

  // url paths
  url = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';

  // get trips (plural, return all) endpoint
  getTrips() : Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);
  }

  // add trip endpoint
  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  // get trip (singular, by tripCode) endpoint
  getTrip(tripCode: string) : Observable<Trip[]> {;
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  // update trip endpoint
  updateTrip(formData: Trip) : Observable<Trip> {
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }

  // delete trip endpoint
  deleteTrip(formData: Trip) : Observable<Trip> {
    return this.http.delete<Trip>(this.url + '/' + formData.code);
  }


  // call to login endpoint, returns JWT
  login(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, password);
  }

  // call to register endpoint, returns JWT
  register(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, password);
  }

  // helper method to process login and register methods
  handleAuthAPICall(endpoint: string, user: User, password: string): Observable<AuthResponse> {
    // set the given form data
    let formData = {
      name: user.name,
      email: user.email,
      password: password
    };

    // then call the HTTP to attempt to save the token to local storage
    return this.http
      .post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}
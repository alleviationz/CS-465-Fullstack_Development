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

  url = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';

  getTrips() : Observable<Trip[]> {

    return this.http.get<Trip[]>(this.url);
  }

  addTrip(formData: Trip) : Observable<Trip> {
    return this.http.post<Trip>(this.url, formData);
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // console.log("inside TripDataService::getTrip");
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    //console.log("inside TripDataService::updateTrip");
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }


  // call to login endpoint, returns JWT
  login(user: User, password: string): Observable<AuthResponse> {
    // console.log('Inside TripData::login');
    return this.handleAuthAPICall('login', user, password);
  }

  // call to register endpoint, returns JWT
  register(user: User, password: string): Observable<AuthResponse> {
    // console.log('Inside TripData::register');
    return this.handleAuthAPICall('register', user, password);
  }

  // helper method to process login and register methods
  handleAuthAPICall(endpoint: string, user: User, password: string): Observable<AuthResponse> {
    // console.log('Inside TripData::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: password
    };

    return this.http
      .post<AuthResponse>(this.baseUrl + '/' + endpoint, formData);
  }
}

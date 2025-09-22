import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import {Authentication } from '../services/authentication';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  providers: [TripData]
})

export class TripListing implements OnInit {

  // non-null trips declaration, and a message to log and help debug
  trips! : Trip[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authentication: Authentication
    ) {}


  // get trips data from trips data service
  private getTrips(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          // if at least 1 trip returned, log # of trips returned
          if (value.length > 0) {
            this.message = `There are ${value.length} trips available.`;
          } else {
            // no trips -> log no trips returned
            this.message = "There were no trips retrieved from the database";
          }
          console.log(this.message);
        },
        // if error -> log error for now: FIXME needs better error handler
        error: (error: any) => {
          console.log("Error: ${error}");
        }
      })
  }

  // navigate to add trip form
  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  // ensure user is logged in (admin privledges)
  public isLoggedIn() {
    return this.authentication.isLoggedIn();
  }

  ngOnInit(): void {
    this.getTrips();
  }
}
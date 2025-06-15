import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { trips } from '../data/trips';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import {Authentication } from '../services/authentication';

import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})

export class TripListing implements OnInit {

  trips! : Trip[];
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authentication: Authentication
    ) {
    console.log("trip-listing constructor");
  }

  private getStuff(): void {
    this.tripData.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = `There are ${value.length} trips available.`;
          } else {
            this.message = "There were no trips retrieved from the database";
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log("Error: ${error}");
        }
      })
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn() {
    return this.authentication.isLoggedIn();
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    this.getStuff();
  }
}
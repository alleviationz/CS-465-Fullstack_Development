import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
})
export class TripCard implements OnInit {

  @Input('trip') trip: any;

  constructor(
    private router: Router,
    private authentication: Authentication
  ) {}

  ngOnInit(): void {

  }

  // edit trip HTTP function, uses localstorage
  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  // delete trip HTTP function, uses localstorage
    public deleteTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['delete-trip']);
  }

  // check if user is logged in (authorized with admin privledges)
  public isLoggedIn() {
    return this.authentication.isLoggedIn();
  }
}
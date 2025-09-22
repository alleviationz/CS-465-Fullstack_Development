import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule }
from "@angular/forms";
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-delete-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './delete-trip.html',
})

export class DeleteTrip implements OnInit {

  // non-null declaration for delete trip form and trip
  deleteForm!: FormGroup;
  trip!: Trip;
  submitted = false;

  // logging message for status and debugging
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    // if tripCode is null -> return to index and notify the user
    if (!tripCode) {
      alert("Something wrong, couldn't find where  stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    // set and validate the delete trip form fields
    this.deleteForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
    })

    // get the trip code from the trip data service
    this.tripData.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          // Populate our record into the form if the data exists
          this.deleteForm.patchValue(value[0]);
          if (!value) {
            this.message = "No Trip Retrieved";
          } else {
            this.message = `Trip: ${tripCode} retrieved`;
          }
          console.log(this.message);
        },
        // if error -> log error for now: FIXME needs better error handler
        error: (error: any) => {
          console.log(`Error: ${error}`)
        }
      })
  }

  // on submit delete trip form button function
  public onSubmit() {
    this.submitted = true;
    // ensure form validation and delete trip, then return to homepage
    if (this.deleteForm.valid) {
      this.tripData.deleteTrip(this.deleteForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          // if error -> console log error for now: FIXME needs better error handler
          error: (error: any) => {
            console.log(`Error: ${error}`);
          }
        });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.deleteForm.controls; }
}
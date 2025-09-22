import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule }
from "@angular/forms";
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';


@Component({
  selector: 'app-edit-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
})

export class EditTrip implements OnInit {

  // non-null declaration for edit trip form and trip
  editForm!: FormGroup;
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
    // if tripCode is null, alert and return to homepage
    if (!tripCode) {
      alert("Something wrong, couldn't find where  stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    // validate edit trip form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })

    // get tripCode from trip data service
    this.tripData.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          // Populate our record into the edit trip form
          this.editForm.patchValue(value[0]);
          if (!value) {
            this.message = "No Trip Retrieved";
          } else {
            this.message = `Trip: ${tripCode} retrieved`;
          }
          console.log(this.message);
        },
        // if error -> console log error for now: FIXME needs better error handler
        error: (error: any) => {
          console.log(`Error: ${error}`)
        }
      })
  }

  // edit trip form submit button's function
  public onSubmit() {
    this.submitted = true;
    // if edit trip form was validated successfully, update the trip and navigate back to the homepage
    if (this.editForm.valid) {
      this.tripData.updateTrip(this.editForm.value)
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
  get f() { return this.editForm.controls; }
}
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
  styleUrl: './delete-trip.css'
})

export class DeleteTrip implements OnInit {

  public deleteForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where  stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('DeleteTripComponent::ngOnInit');
    console.log('tripCode: ' + tripCode);

    this.deleteForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
    })

    this.tripData.getTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          // Populate our record into the form
          this.deleteForm.patchValue(value[0]);
          if (!value) {
            this.message = "No Trip Retrieved";
          } else {
            this.message = `Trip: ${tripCode} retrieved`;
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log(`Error: ${error}`)
        }
      })
  }

  public onSubmit() {
    this.submitted = true;
    if (this.deleteForm.valid) {
      this.tripData.deleteTrip(this.deleteForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log(`Error: ${error}`);
          }
        });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.deleteForm.controls; }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';

import { TripData } from '../services/trip-data';

@Component({
  selector: 'app-add-trip',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.html',
})

export class AddTrip implements OnInit {

  // non-null declaration for the add trip form
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripData: TripData
  ) {}


  // trip form validation
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  // add trip button function
  public onSubmit() {
    this.submitted = true;
    // Validation passed? -> add trip to database and return to the homepage
    if (this.addForm.valid) {
      this.tripData.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.router.navigate(['']);
          },
          // if an error occurs, console log for now: FIXME add in better error handling
          error: (error: any) => {
            console.log(`Error: ${error}`);
          }
        });
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
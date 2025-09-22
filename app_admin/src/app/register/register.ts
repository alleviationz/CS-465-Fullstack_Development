import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
})

export class Register implements OnInit {

  // non-null register form delcaration
  registerForm!: FormGroup;
  submitted = false;
  formError: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authentication: Authentication
  ) 
  {}

  // register validation, regex is alphanumeric w/ special characters -  min:12, max: 30
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^.{12,30}$')]],
    })
  }

  // submit register form button
  public onSubmit() {
    this.submitted = true;
    // Validation passed? -> attemp to register
    if (this.registerForm.valid) {
      try {
        this.doRegister();
      } catch (error: any) {
        // if error, log and return home
        console.log(`Error: ${error}`);
        this.router.navigateByUrl('#');
      }
    }
  }

  // set User with form fields for auth service register function
  private doRegister(): void {
    let newUser = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
    } as User;

    // call auth service's register function and navigate to the login page
    this.authentication.register(newUser, this.registerForm.value.password);
    this.router.navigateByUrl('login');
  }

  // already have an account's link function to send user to the login page
  public goToLogin(): void {
    this.router.navigateByUrl("login");
  }

  // get the form short name to access the form fields
  get f() { return this.registerForm.controls; }
}

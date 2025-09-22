import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})

export class Login implements OnInit {

  // non-null login form declaration
  loginForm!: FormGroup;
  submitted = false;
  formError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authentication: Authentication
  ) 
  {}

  // login validation, regex is alphanumeric w/ special characters -  min:12, max: 30
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      _id: [],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^.{12,30}$')]],
    })
  }

  
  // login submit button function
  public onSubmit() {
    this.submitted = true;
    // Validation passed? -> add trip to database and return to the homepage
    if (this.loginForm.valid) {
      try {
        this.doLogin();
      } catch (error: any) {
        // if error, log and return home
        console.log(`Error: ${error}`);
        this.router.navigateByUrl('#');
      }
    }
  }

    // set a user to send to auth service's login function
  private doLogin(): void {
    let newUser = {
      email: this.loginForm.value.email,
    } as User;

    // call auth service's login with the form fields and navigate back to the homepage
    this.authentication.login(newUser, this.loginForm.value.password);
    if (this.authentication.isLoggedIn()) {
      this.router.navigate(['']);
    } else {
      // no response in 3s -> navigate back to homepage
      var timer = setTimeout(() => {
        if (this.authentication.isLoggedIn()) {
          this.router.navigate(['']);
        }}, 3000);
    }
  }

  // new account's link function to send user to login page
  public goToRegister(): void {
    this.router.navigateByUrl("register");
  }

  // get the form short name to access the form fields
  get f() { return this.loginForm.controls; }
}
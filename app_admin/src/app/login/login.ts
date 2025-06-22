import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {
  public formError: string = '';
  submitted = false;

  credentials = {
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private authentication: Authentication
  ) 
  {}

  ngOnInit(): void {
    
  }

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = "All fields are required";
      this.router.navigateByUrl("#"); // return to login
    } else {
      this.doLogin();
    }
  }

  private doLogin(): void {
    let newUser = {
      email: this.credentials.email,
    } as User;

    // console.log('LoginComponent::doLogin');
    // console.log(this.credentials);
    this.authentication.login(newUser, this.credentials.password);
    if (this.authentication.isLoggedIn()) {
      // console.log('Router::Direct');
      this.router.navigate(['']);
    } else {
      var timer = setTimeout(() => {
        if (this.authentication.isLoggedIn()) {
          // console.log('Router::Pause');
          this.router.navigate(['']);
        }}, 3000);
    }
  }

}
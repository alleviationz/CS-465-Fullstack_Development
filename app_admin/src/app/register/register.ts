import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authentication: Authentication
  ) { }

  ngOnInit(): void {

  }

  public onRegisterSubmit(): void {
    this.formError = '';
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
        let newUser = {
          name: this.credentials.name,
          email: this.credentials.email,
        } as User;
        
    this.authentication.register(newUser, this.credentials.password);
    this.router.navigateByUrl('login');
  };
}

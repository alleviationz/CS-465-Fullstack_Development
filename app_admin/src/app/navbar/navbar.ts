import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Authentication } from '../services/authentication';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
})

export class Navbar implements OnInit {

  constructor(
    private authentication: Authentication
  ) {}

  ngOnInit(): void {}

  // check if user is already logged in by checking their token
  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }

  // call logout and delete user token
  public onLogout(): void {
    return this.authentication.logout();
  }
}
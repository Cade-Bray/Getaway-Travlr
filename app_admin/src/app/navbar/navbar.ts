import { Component, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {Authentication} from '../services/authentication';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit{
  constructor(
    private authenticationService: Authentication
  ) {}

  ngOnInit() {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public onLogout(): void {
    return this.authenticationService.logout();
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() { }

  isActive = (path: string): string =>{
    return this.router.url?.endsWith(path)? 'active': '';
  }

  isLogin = () => {
    return this.authService.isAuthenticated();
  }

  logout = () => {
    this.authService.logout();
  }
}


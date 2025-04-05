import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-client',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit {


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


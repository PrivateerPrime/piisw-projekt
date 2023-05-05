import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user?: string;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.currentMessage$.subscribe((sub) => {
      this.user = sub;
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.user = undefined;
    this.authService.sendMessage('');
  }
}

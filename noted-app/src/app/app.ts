import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar/navbar';
import { Login } from './features/auth/login/login';
import { AuthService } from './core/services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('noted-app');
  protected readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.checkSession().subscribe();
  }
}

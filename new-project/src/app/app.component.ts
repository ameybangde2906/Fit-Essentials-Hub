import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountsComponent } from './Account-section/accounts/accounts.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterModule,HeaderComponent,FooterComponent,HomeComponent,HttpClientModule, AccountsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'new-project';
  isLoginPage=false

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if the navigation starts to the login page
        this.isLoginPage = event.url === '/login' || event.url === '/admin-login' || event.url === '/forget-password' || event.url === '/registration';
      } else if (event instanceof NavigationEnd) {
        // Optionally, you can add additional logic after navigation ends
      }
    });
  }
}
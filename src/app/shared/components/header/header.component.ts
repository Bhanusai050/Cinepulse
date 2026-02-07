import { Component, OnInit, Inject, PLATFORM_ID, Output, EventEmitter, Optional } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CitySelectorComponent } from '../city-selector/city-selector.component';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  selectedCity: string = 'Select City'; // safe default
  @Output() citySelected = new EventEmitter<string>();
  currentUser: User | null = null;

  constructor(
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
    , @Optional() private router?: Router
    , private auth?: AuthService
  ) {}

  ngOnInit(): void {
    // Only access localStorage in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.selectedCity = localStorage.getItem('selectedCity') || 'Select City';
    }

    // Subscribe to auth state if available
    if (this.auth) {
      this.auth.currentUser$.subscribe(u => this.currentUser = u);
    }
  }

  openCitySelector() {
    const dialogRef = this.dialog.open(CitySelectorComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(city => {
      if (city) {
        this.selectedCity = city;
        this.citySelected.emit(city);

        // Save selection to localStorage safely
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('selectedCity', city);
        }
      }
    });
  }

  goToSignIn() {
    if (this.router) {
      this.router.navigate(['/signin']);
    }
  }

  signOut() {
    if (this.auth) {
      this.auth.signOut();
      if (this.router) this.router.navigate(['/']);
    }
  }
}

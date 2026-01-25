import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CitySelectorComponent } from '../city-selector/city-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  selectedCity = localStorage.getItem('selectedCity') || 'Select City';

  constructor(private dialog: MatDialog) {}

  openCitySelector() {
    const dialogRef = this.dialog.open(CitySelectorComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(city => {
      if (city) {
        this.selectedCity = city;
      }
    });
  }
}

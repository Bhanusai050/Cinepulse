import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './city-selector.component.html'
})
export class CitySelectorComponent {

  searchText = '';

  cities = [
    'Hyderabad',
    'Bangalore',
    'Chennai',
    'Mumbai',
    'Delhi',
    'Pune',
    'Kolkata',
    'Vijayawada',
    'Guntur'
  ];

  constructor(private dialogRef: MatDialogRef<CitySelectorComponent>) {}

  filteredCities() {
    return this.cities.filter(c =>
      c.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  selectCity(city: string) {
    localStorage.setItem('selectedCity', city);
    this.dialogRef.close(city);
  }
}

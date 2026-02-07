import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() rating!: number;
  @Output() bookClick = new EventEmitter<string>();

  onBookClick(): void {
    this.bookClick.emit(this.id);
  }
}

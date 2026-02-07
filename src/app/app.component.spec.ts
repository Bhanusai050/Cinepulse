import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have a movies array with 5 items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.movies.length).toBe(5);
  });

  it('should contain "Interstellar" in movies', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const movieTitles = app.movies.map((m: any) => m.title);
    expect(movieTitles).toContain('Interstellar');
  });

  it('should have a movie with rating 4.8', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const hasRating = app.movies.some((m: any) => m.rating === 4.8);
    expect(hasRating).toBeTrue();
  });

  it('should render all movie titles in the template', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent || '';
    expect(text).toContain('Varanasi');
    expect(text).toContain('Interstellar');
    expect(text).toContain('Avengers');
    expect(text).toContain('GubturKaaram');
    expect(text).toContain('Salaar');
  });

  it('should have all movies with a rating greater than 4', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const allAboveFour = app.movies.every((m: any) => m.rating > 4);
    expect(allAboveFour).toBeTrue();
  });

  it('should not contain a movie titled "Inception"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const movieTitles = app.movies.map((m: any) => m.title);
    expect(movieTitles).not.toContain('Inception');
  });

  it('should have unique movie titles', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const movieTitles = app.movies.map((m: any) => m.title);
    const uniqueTitles = new Set(movieTitles);
    expect(uniqueTitles.size).toBe(movieTitles.length);
  });

  it('should have ratings between 4 and 5', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const allInRange = app.movies.every((m: any) => m.rating >= 4 && m.rating <= 5);
    expect(allInRange).toBeTrue();
  });
});

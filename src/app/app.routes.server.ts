import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'movie/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'signin',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'booking/:movieId/:showId',
    renderMode: RenderMode.Server
  },
  {
    path: 'confirmation/:bookingId',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];

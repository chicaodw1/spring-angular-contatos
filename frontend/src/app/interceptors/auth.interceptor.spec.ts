import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
  HttpResponse,
} from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { lastValueFrom, Observable, of } from 'rxjs';

describe('authInterceptor (functional)', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([
            authInterceptor,
            (
              req: HttpRequest<any>,
              next: HttpHandlerFn,
            ): Observable<HttpEvent<any>> => {
              const response = new HttpResponse({ status: 200, body: req });
              return of(response);
            },
          ]),
        ),
      ],
    });

    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve adicionar o token Authorization no header se existir', async () => {
    localStorage.setItem('token', 'mocked-token');

    const res: any = await lastValueFrom(http.get('/api/test'));

    expect(res.headers.get('Authorization')).toBe('Bearer mocked-token');
  });

  it('não deve adicionar o token se não existir', async () => {
    const res: any = await lastValueFrom(http.get('/api/test'));

    expect(res.headers.has('Authorization')).toBeFalse();
  });
});

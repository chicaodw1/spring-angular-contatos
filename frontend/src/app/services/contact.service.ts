import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Contact } from '../models/contact.model';
import { Indicadores } from '../models/indicadores.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly API = 'http://localhost:8080/api/contatos';

  private contatosCache: Contact[] | null = null;
  private indicadoresCache$!: Observable<Indicadores>;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    if (this.contatosCache) {
      return of(this.contatosCache);
    }

    return this.http
      .get<Contact[]>(this.API)
      .pipe(tap((data) => (this.contatosCache = data)));
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.API}/${id}`);
  }

  create(contact: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(this.API, contact)
      .pipe(tap(() => this.clearCache()));
  }

  update(id: number, contact: Contact): Observable<Contact> {
    return this.http
      .put<Contact>(`${this.API}/${id}`, contact)
      .pipe(tap(() => this.clearCache()));
  }

  deactivate(id: number): Observable<void> {
    return this.http
      .patch<void>(`${this.API}/${id}/deactivate`, {})
      .pipe(tap(() => this.clearCache()));
  }

  getIndicadores(): Observable<Indicadores> {
    if (!this.indicadoresCache$) {
      this.indicadoresCache$ = this.http
        .get<Indicadores>(`${this.API}/indicadores`)
        .pipe(shareReplay(1));
    }
    return this.indicadoresCache$;
  }

  clearCache(): void {
    this.contatosCache = null;
    this.indicadoresCache$ = undefined!;
  }
}

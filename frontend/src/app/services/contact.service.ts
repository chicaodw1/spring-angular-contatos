import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { Indicadores } from '../models/indicadores.model';
import { environment } from '../../environments/environment';
import { ContactModel } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly BASE_API = `${environment.apiUrl}/api/contatos`;

  private contatosCache: ContactModel[] | null = null;
  private indicadoresCache$!: Observable<Indicadores>;

  constructor(private http: HttpClient) {}

  getAll(): Observable<ContactModel[]> {
    if (this.contatosCache) {
      return of(this.contatosCache);
    }

    return this.http
      .get<ContactModel[]>(this.BASE_API)
      .pipe(tap((data) => (this.contatosCache = data)));
  }

  getById(id: number): Observable<ContactModel> {
    return this.http.get<ContactModel>(`${this.BASE_API}/${id}`);
  }

  create(contact: ContactModel): Observable<ContactModel> {
    return this.http
      .post<ContactModel>(this.BASE_API, contact)
      .pipe(tap(() => this.clearCache()));
  }

  update(id: number, contact: ContactModel): Observable<ContactModel> {
    return this.http
      .put<ContactModel>(`${this.BASE_API}/${id}`, contact)
      .pipe(tap(() => this.clearCache()));
  }

  deactivate(id: number): Observable<void> {
    return this.http
      .patch<void>(`${this.BASE_API}/${id}/deactivate`, {})
      .pipe(tap(() => this.clearCache()));
  }

  getIndicadores(): Observable<Indicadores> {
    if (!this.indicadoresCache$) {
      this.indicadoresCache$ = this.http
        .get<Indicadores>(`${this.BASE_API}/indicadores`)
        .pipe(shareReplay(1));
    }
    return this.indicadoresCache$;
  }

  clearCache(): void {
    this.contatosCache = null;
    this.indicadoresCache$ = undefined!;
  }
}

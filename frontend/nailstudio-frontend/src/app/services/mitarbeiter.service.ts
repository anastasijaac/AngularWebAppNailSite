import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MitarbeiterService {
  private apiUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {
  }
}

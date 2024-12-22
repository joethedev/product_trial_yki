import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  registerUser(data: {
    username: string;
    email: string;
    password: string;
    firstname: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/account`, data);
  }

  loginUser(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token`, data);
  }

  getUserData(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get(`${this.apiUrl}/user/me`, { headers });
  }

  getProducts(): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.get(`${this.apiUrl}/products`, { headers });
  }

  addProduct(product: any): Observable<any> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${accessToken}`
    );
    return this.http.post(`${this.apiUrl}/products`, product, { headers });
  }
}

import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const api = environment.api;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

@Injectable({ providedIn: 'root' })

export class AuthService
{
	constructor (private http: HttpClient){}
    
    login(username: string, password: string): Observable<any> {
        return this.http.post(
            api + 'signin',
            {
                username,
                password
            },
            httpOptions
        );
    }

    register(username: string, password: string): Observable<any> {
        return this.http.post(
            api + 'signup',
          {
            username,
            password,
          },
          httpOptions
        );
      }
    
      logout(): Observable<any> {
        return this.http.post(api + 'signout', { }, httpOptions);
      }
      


}
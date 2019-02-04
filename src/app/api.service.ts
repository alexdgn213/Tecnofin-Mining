import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = 'http://tecnofinmining.corporacionjsk.es/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  nombreUsuario : string;
  conectado : boolean;


  constructor(private http: HttpClient, private storage: Storage) { 
    this.getUserData();    
  }

  getUserData(){
    this.storage.get('nombreUsuario').then((val) => {
      this.nombreUsuario = val;
    });
    this.storage.get('conectado').then((val) => {
      this.conectado = val;
    }); 
  }

  loginUser(user:any){
    this.storage.set('nombreUsuario',user.username);
    this.storage.set('conectado', true); 
    this.nombreUsuario = user.username;
    this.conectado = true;
  }

  logoutUser(){
    this.storage.set('nombreUsuario','');
    this.storage.set('conectado', false); 
    this.nombreUsuario = '';
    this.conectado = false;
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getData(relativePath): Observable<any> {
    return this.http.get(this.endpoint + relativePath).pipe(
      map(this.extractData)
    );
  }
  
  postData (relativePath, data): Observable<any> {
    return this.http.post<any>(this.endpoint + relativePath, JSON.stringify(data), this.httpOptions).pipe();
  }
  
  putData (relativePath, data): Observable<any> {
    return this.http.put(this.endpoint + relativePath, JSON.stringify(data), this.httpOptions).pipe();
  }
  
  deleteData (relativePath): Observable<any> {
    return this.http.delete<any>(this.endpoint + relativePath, this.httpOptions).pipe();
}
}

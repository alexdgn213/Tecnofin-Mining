import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

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
  idUsuario = 0;
  nombre : string;
  apellido : string;
  telf : string;
  email : string;

  public mensajeCargando;
  public mensajeInvalido;
  public mensajeError;
  public mensajeExito;


  constructor(private http: HttpClient, private storage: Storage, private translateService: TranslateService) { 
    this.getUserData();  
    this.setMessages();
  }

  getUserData(){
    this.storage.get('nombreUsuario').then((val) => {
      this.nombreUsuario = val;
    });
    this.storage.get('conectado').then((val) => {
      this.conectado = val;
    }); 
    this.storage.get('id').then((val) => {
      this.idUsuario = val;
    }); 
    this.storage.get('nombre').then((val) => {
      this.nombre = val;
    }); 
    this.storage.get('apellido').then((val) => {
      this.apellido = val;
    }); 
    this.storage.get('telf').then((val) => {
      this.telf = val;
    }); 
    this.storage.get('email').then((val) => {
      this.email = val;
    }); 
    this.translateService.use('es');
  }

  loginUser(user:any){
    this.storage.set('nombreUsuario',user.username);
    this.storage.set('conectado', true);
    this.storage.set('id', user.id);  
    this.storage.set('nombre',user.name);
    this.storage.set('apellido',user.lastname);
    this.storage.set('telf',user.phone);
    this.storage.set('email',user.email);
    this.nombreUsuario = user.username;
    this.conectado = true;
    this.idUsuario = user.id;
    this.nombre = user.name;
    this.apellido = user.lastname;
    this.telf = user.phone;
    this.email = user.email;
  }

  updateUser(user:any){
    this.storage.set('nombreUsuario',user.username);
    this.storage.set('nombre',user.name);
    this.storage.set('apellido',user.lastname);
    this.storage.set('telf',user.phone);
    this.storage.set('email',user.email);
    this.nombreUsuario = user.username;
    this.nombre = user.name;
    this.apellido = user.lastname;
    this.telf = user.phone;
    this.email = user.email;
  }

  logoutUser(){
    this.storage.set('nombreUsuario','');
    this.storage.set('conectado', false); 
    this.storage.set('id', 0);  
    this.storage.set('nombre','');
    this.storage.set('apellido','');
    this.storage.set('telf','');
    this.storage.set('email','');
    this.nombreUsuario = '';
    this.conectado = false;
    this.idUsuario = 0;
    this.nombre = '';
    this.apellido = '';
    this.telf = '';
    this.email = '';
  }

  changeLanguage(){
    if(this.translateService.currentLang == 'en'){
      this.translateService.use('es');
    }
    else{
      this.translateService.use('en');
    }    
    this.setMessages();
  }

  setMessages(){
    this.translateService.get('loading').subscribe(
      value => {
        this.mensajeCargando = value;
      }
    )
    this.translateService.get('invalidamount').subscribe(
      value => {
        this.mensajeInvalido = value;
      }
    )
    this.translateService.get('checkconection').subscribe(
      value => {
        this.mensajeError = value;
      }
    )
    this.translateService.get('succed').subscribe(
      value => {
        this.mensajeExito = value;
      }
    )
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

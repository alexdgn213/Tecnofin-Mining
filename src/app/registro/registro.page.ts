import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  userData = { email: '', username :'', name :'', lastname:'', 
              phone:'', password: '', password_confirmation:'' };
  public loading;

  constructor(private router: Router,  private service:ApiService, public loadingController: LoadingController, public alertController: AlertController) { }

  ngOnInit() {
  }

  registrarse(){
    this.presentLoading();
    this.service.postData('register',this.userData).subscribe((data: any) => {
      this.loading.dismiss();
      if(data.success==0 || data.errors!=null){
        this.presentError(data.errors[0]);
      }
      else{
        this.regresar();
      }
    },
    (err) => {
      this.loading.dismiss();
      this.presentError("Revise su conexión");
    });
  }

  regresar() {
    this.router.navigate(['/login'])
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Por favor espere'
    });
    return await this.loading.present();
  }

  async presentError(mensaje) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}

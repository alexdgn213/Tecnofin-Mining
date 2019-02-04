import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData = { email: '', password: '' };
  public loading;

  constructor(private router: Router, private service:ApiService, public loadingController: LoadingController, 
    public alertController: AlertController) { }

  ngOnInit() {
    
  }

  login(){
    this.presentLoading();
    this.service.postData('login',this.userData).subscribe((data: any) => {
      this.loading.dismiss();
      if(data.success==0 || data.errors!=null){
        this.presentError(data.errors[0]);
      }
      else{
        this.service.loginUser(data.user);
        this.abrirHome();
      }
    },
    (err) => {
      this.loading.dismiss();
      this.presentError("Revise su conexión");
    });
  }

  abrirHome() {
    this.router.navigate(['/home'])
  }

  abrirRegistro(){
    this.router.navigate(['/registro'])
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

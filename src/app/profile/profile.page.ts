import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData = { email: this.service.email, username :this.service.nombreUsuario, name :this.service.nombre, 
               lastname:this.service.apellido, phone: this.service.telf, password: '', password_confirmation:'' };
  public loading;

  constructor(private router: Router,  private service:ApiService, public loadingController: LoadingController, public alertController: AlertController) { }


  ngOnInit() {
  }

  ionViewWillEnter(){
    this.userData = { email: this.service.email, username :this.service.nombreUsuario, name :this.service.nombre, 
      lastname:this.service.apellido, phone: this.service.telf, password: '', password_confirmation:'' };
  }

  abrirHome() {
    this.router.navigate(['/home'])
  }

  async startUpdate() {
    this.loading = await this.loadingController.create({
      message: this.service.mensajeCargando
    });
    await this.loading.present();
    this.update();
  }

  update(){
    this.service.putData('update/' + this.service.idUsuario,this.userData).subscribe((data: any) => {
      this.loading.dismiss();
      if(data.success==0 || data.errors!=null){
        this.presentError(data.errors[0]);
      }
      else{
        this.service.updateUser(this.userData);
        this.presentSucced(data.message);
      }
    },
    (err) => {
      console.log(err);
      this.loading.dismiss();
      this.presentError(this.service.mensajeError);
    });
  }

  async presentError(mensaje) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentSucced(mensaje) {
    const alert = await this.alertController.create({
      header: this.service.mensajeExito,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}

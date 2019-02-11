import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public loading;
  public transacciones: Array<any>;
  public metodos: Array<any>;

  constructor(private router: Router, private service:ApiService, public loadingController: LoadingController, 
    public alertController: AlertController) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    if(this.service.conectado){
      this.startLoading();
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  getInfo(){
    this.service.getData('payment_method').subscribe((data: any) => {
      this.metodos = data;
      this.service.getData('user/transactions/'+this.service.idUsuario).subscribe((data: any) => {
        this.transacciones = data.transactions;
        this.loading.dismiss();
      },
      (err) => {
        this.presentError(this.service.mensajeError);
        this.loading.dismiss();
      });
    },
    (err) => {
      this.loading.dismiss();
      this.presentError(this.service.mensajeError);
    });
  }

  async startLoading() {  
    this.loading = await this.loadingController.create({
      message: this.service.mensajeCargando
    });
    await this.loading.present();
    this.getInfo();
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

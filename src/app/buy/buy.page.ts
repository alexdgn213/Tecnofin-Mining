import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  public loading;
  public metodos: Array<any>;
  public precio;
  public transaction = { user_id: this.service.idUsuario, payment_method: 0, amount: 0 }

  constructor(private router: Router, private service: ApiService, public loadingController: LoadingController,
    public alertController: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.service.conectado) {
      this.startLoading();
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  getInfo() {
    this.service.getData('payment_method').subscribe((data: any) => {
      this.metodos = data;
      this.service.getData('btc').subscribe((data: any) => {
        this.precio = data;
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

  regresar() {
    this.router.navigate(['/home'])
  }

  async startBuy() {
    if (this.transaction.amount > 0) {
      this.loading = await this.loadingController.create({
        message: this.service.mensajeCargando
      });
      await this.loading.present();
      this.enviarCompra();
    }
    else {
      this.presentError(this.service.mensajeInvalido);
    }
  }

  enviarCompra() {
    this.service.postData('transaction/store', this.transaction).subscribe((data: any) => {
      this.loading.dismiss();
      if (data.success == 0 || data.errors != null) {
        this.presentError(data.errors[0]);
      }
      else {
        this.presentSucced(data.message);
      }
    },
      (err) => {
        this.loading.dismiss();
        this.presentError(this.service.mensajeError);
      });
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

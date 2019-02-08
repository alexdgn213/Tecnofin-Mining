import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { LoadingController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public loading;
  tBalance = 0;
  balance = 0;
  hBalance = 0;
  dBalance = "0";


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
    this.service.getData('user/'+this.service.idUsuario).subscribe((data: any) => {
      this.balance = data.wallet.current_balance;
      this.hBalance = data.wallet.historic_balance;
      this.tBalance = data.user.terahash_balance;
      this.service.getData('btc').subscribe((data: any) => {
        this.loading.dismiss();
        this.dBalance = (this.balance * data).toFixed(2);
        this.updateInfo();
      },
      (err) => {
        console.log(err);
        this.presentError("Revise su conexión");
        this.loading.dismiss();
      });
    },
    (err) => {
      this.loading.dismiss();
      console.log(err);
      this.presentError("Revise su conexión");
    });
  }

  async startLoading() {  
    this.loading = await this.loadingController.create({
      message: 'Por favor espere'
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

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  
  async updateInfo() {
    while(true){
      await this.sleep(5000);
      this.service.getData('user/'+this.service.idUsuario).subscribe((data: any) => {
        this.balance = data.wallet.current_balance;
        this.hBalance = data.wallet.historic_balance;
        this.tBalance = data.user.terahash_balance;
      },
      (err) => {
      });

    }
    
  }

}

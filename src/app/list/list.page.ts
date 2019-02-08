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
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];


  constructor(private router: Router, private service:ApiService, public loadingController: LoadingController, 
    public alertController: AlertController) { 
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

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
        console.log(this.transacciones);
        this.loading.dismiss();
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
}

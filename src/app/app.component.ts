import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from '../app/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public service:ApiService,
    private translateService: TranslateService
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translateService.setDefaultLang('es');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translateService.get('home').subscribe((text:string) => { this.appPages[0].title=text} );
      this.translateService.get('idioma').subscribe((text:string) => { this.appPages[1].title=text} );
      this.translateService.get('profile').subscribe((text:string) => { this.appPages[2].title=text} );
      this.translateService.get('logout').subscribe((text:string) => { this.appPages[3].title=text} );
    });
  }
}

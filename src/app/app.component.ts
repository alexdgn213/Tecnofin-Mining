import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ApiService } from '../app/api.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'transactions',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'buy',
      url: '/buy',
      icon: 'card'
    },
    {
      title: 'profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'language',
      url: '/language',
      icon: 'switch'
    },
    {
      title: 'logout',
      url: '/logout',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public service:ApiService,
    private translateService: TranslateService,
    private router: Router
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translateService.setDefaultLang('es');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  handleMenu(url : string){
    if(url=='/logout'){
      this.service.logoutUser();
      this.router.navigate(['/login'])
    }
    else if(url=='/language'){
      this.service.changeLanguage();
    }
    else{
      this.router.navigate([url])
    }

  }
}

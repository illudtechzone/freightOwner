import { Component } from '@angular/core';

import { Platform, ToastController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OAuthService } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
     {
      title: 'Vehicles',
      url: '/vehicle-list',
      icon: 'bus'
    },
    {
      title: 'Bookings',
      url: '/vehicle-list',
      icon: 'document'
    },
    {
      title: 'Logout',
      url: '/',
      icon: 'log-out'
    }
   
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oauthService: OAuthService,
    private toastController: ToastController,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }
  logout() {
    console.log('Logout clicked');
    this.oauthService.logOut();
    this.presentToastLogout();
    this.navCtrl.navigateRoot('/login');
  }
    async presentToastLogout() {
    const toast = await this.toastController.create({
      message: 'You\'ve been successfully logout',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast'
    });
    toast.present();
  }
  initializeApp() {
    this.platform.ready().then(() => {
   
// let status bar overlay webview
this.statusBar.styleDefault();
// set status bar to white
this.statusBar.backgroundColorByHexString('#e6e6e6');
this.splashScreen.hide();
    });
  }
}

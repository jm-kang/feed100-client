import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/common/login/login';

import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, private uniqueDeviceID: UniqueDeviceID) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
            
      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });


      // to initialize push notifications

      const options: PushOptions = {
        android: {
            senderID: '889490373924'
        },
        ios: {
            alert: true,
            badge: true,
            sound: true,
            clearBadge: true
        },
        windows: {}
      };

      const pushObject: PushObject = this.push.init(options);
  
      pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

      pushObject.on('registration').subscribe((registration: any) => {
        console.log('Device registered', registration);
        console.log(registration.registrationId);
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      this.uniqueDeviceID.get()
      .then((uuid: any) => console.log('uuid:', uuid))
      .catch((error: any) => console.log(error));
    });
  }
}

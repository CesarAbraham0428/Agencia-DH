import { Component } from '@angular/core';


import  firebase  from "firebase/compat/app";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'agencia-dh';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyCkZ_mgpJnvZ2OgbxJw46QJVEA5pGjogR0",
      authDomain: "agencia-dh.firebaseapp.com",
  })
    
  }
  
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }


}

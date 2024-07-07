import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { RegistroComponent } from './pages/registro/registro.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({"projectId":"agencia-dh","appId":"1:852934717287:web:a3cb9ed8df20dd4fd6c9c2","databaseURL":"https://agencia-dh-default-rtdb.firebaseio.com","storageBucket":"agencia-dh.appspot.com","apiKey":"AIzaSyCkZ_mgpJnvZ2OgbxJw46QJVEA5pGjogR0","authDomain":"agencia-dh.firebaseapp.com","messagingSenderId":"852934717287","measurementId":"G-MX15MM3G5W"})),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

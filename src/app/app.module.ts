import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './header/footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';

import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import bootstrap from 'bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clientes/form.component'; 
import { FormsModule } from '@angular/forms';

/*locale para fechas*/
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es-MX';
import { PaginadorComponent } from './paginador/paginador.component';

registerLocaleData(localeES,"es");

const routes : Routes = [
  {path:'', redirectTo:'/clientes', pathMatch:'full'},
  {path:'directivas', component:DirectivaComponent},
  {path:'clientes', component:ClientesComponent},
  {path:'clientes/pagina/:page',component:ClientesComponent},
  {path:'clientes/form',component:FormComponent},
  {path:'clientes/form/:id', component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginadorComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClienteService,{provide:LOCALE_ID, useValue:'es-MX'}],
  bootstrap: [AppComponent]
})
export class AppModule { }

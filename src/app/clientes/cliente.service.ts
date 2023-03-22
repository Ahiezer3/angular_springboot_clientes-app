import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES} from './clientes.json';
import {  of, Observable, throwError, tap} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
/*import { DatePipe } from '@angular/common';*/

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint : string = 'http://localhost:8080/api/clientes';

  private headers : HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient, private router : Router) { }

  getClientes(page:number) : Observable<Cliente[]>{
    /*return of(CLIENTES);*/
    return this.http.get<Cliente[]>(this.urlEndpoint+"/pagina/"+page).pipe(
      
      tap((response : any) => {

        console.log("Tap1");


        (response.content as Cliente[]).forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),

      map((result : any) => {
        console.log("Map");
      
      
        (result.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();

        /*
          let datePipe = new DatePipe('es');
          cliente.fechaCreacion = datePipe.transform(cliente.fechaCreacion,"EEEE dd, MMMM yyyy");*/
          return cliente;
        });

      return result;
    }),
    
    tap(result => {
      console.log("Tap2");
      (result.content as Cliente[]).forEach(cliente => {
        console.log(cliente.nombre.toUpperCase());
      })
    }));

  }

  createCliente(cliente:Cliente) : Observable<Cliente>{
    return this.http.post(this.urlEndpoint,cliente,{headers:this.headers}).pipe(
      map((res : any) => res.cliente as Cliente),
      catchError(e=>{

        if( e.status == 502 ){
          console.log(e);
          return throwError(e);
        }

        console.log(e.error.error);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e.error.error)
      })
    );
  }

  getCliente(id) : Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        console.log(e.error.error);
        swal.fire('Error al editar',e.error.error,'error');
        this.router.navigate(['/clientes']);
        return throwError(e.error);
      })
    );
  }
 
  updateCliente(cliente:Cliente) : Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`,cliente,{headers:this.headers}).pipe(
      
      catchError(e=>{

        if( e.status == 502 ){
          return throwError(e);
        }

        console.log(e.error.error);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e.error.error);
      })
    );
  }

  deleteCliente(id:number) : Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers:this.headers}).pipe(
      catchError(e=>{
        console.log(e.error.error);
        swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(e.error.error);
      })
    );
  }
      
}

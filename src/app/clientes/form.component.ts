import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  cliente : Cliente = new Cliente();
  titulo : String = "Crear cliente";
  errors : String[];

  constructor(private service : ClienteService, private router : Router, private activateRoute : ActivatedRoute){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadUsuario();
  }

  create() : void {
    console.log("Creando usuario: "+this.cliente);
    this.service.createCliente(this.cliente).subscribe(
      result => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente creado',`Cliente: ${this.cliente.nombre}`,'success')
      },
        err => {
          console.log(JSON.stringify(err));
          this.errors = err.error.errors as String[];
          console.log("Status: "+err.error.status);
          console.log(err.error.errprs);
        }
      );
  }

  loadUsuario() : void{
    
    this.activateRoute.params.subscribe( params => {
      let id = params['id'];
      if( id ){
        this.service.getCliente(id).subscribe(
          result => this.cliente = result

        );

      }
    }
    )
  }

  update() : void {
    this.service.updateCliente(this.cliente).subscribe( result => {
      this.cliente = result.cliente
      swal.fire('Cliente actualizado',`Cliente: ${this.cliente.nombre}`,'success')
      this.router.navigate(['/clientes'])
    },
        err => {
          this.errors = err.error.errors as String[];
          console.log("Status: "+err.error.status);
          console.log(err.error.errprs);
        });
    
  }

}

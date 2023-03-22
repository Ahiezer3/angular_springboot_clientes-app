import { Component } from '@angular/core';
import { Cliente} from './cliente';
import { ClienteService } from './cliente.service';
import { CLIENTES } from './clientes.json';
import swal from'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})

export class ClientesComponent {

  clientes : Cliente[] = [];
  paginador : any;

  constructor(private clienteService : ClienteService, private activatedRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    /*Se mantiene la misma instancia del componente, pero se sucriber al observable para obtener los parámetros que han cambiado*/
    this.activatedRoute.paramMap.subscribe(params => {

      let page:number = +params.get('page');

      if(!page){
        page = 0;
      }

      this.clienteService.getClientes(page).subscribe( (response : any) => {
        this.paginador = response;
        this.clientes = response.content as Cliente[]
      });
   });
  }

  delete(cliente:Cliente) : void {
    
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: `¿Desea eliminar el cliente: ${cliente.nombre}?`,
      text: "¡Una vez borrado no será posible recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si!',
      cancelButtonText: '¡No!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clienteService.deleteCliente(cliente.id).subscribe( result => {

          this.clientes = this.clientes.filter( res => res !== cliente );
            swalWithBootstrapButtons.fire(
              '¡Cliente borrado!',
              'El cliente ha sido borrado con éxito',
              'success'
            )
          });
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'No se ha realizado ninguna opción',
          'error'
        )
      }
    })

  }
  
}

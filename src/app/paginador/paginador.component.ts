import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador-nav',
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent implements OnInit, OnChanges{

  @Input() paginador : any;
  paginas : number[];
  desde : number;
  hasta : number;

  constructor(){
    
  }

  ngOnInit(): void {
    this.changePaginador();
  }

  ngOnChanges( changes : SimpleChanges): void {
    
    /*Se obtienen los cambios para el paginador y si existen, se refresca la paginación.*/
    if(changes['paginador'].previousValue){
      this.changePaginador();
    }
    
  }

  private changePaginador():void{
    this.desde = Math.min( Math.max(1,this.paginador.number-4), this.paginador.totalPages-5);
    this.hasta = Math.max( Math.min(this.paginador.totalPages, this.paginador.number+4),6); 

    if(this.paginador.totalPages > 5){
      this.paginas = new Array(this.hasta-this.desde+1).fill(0).map((valor,indice) => indice+this.desde);
    } else {
      this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor,indice) => indice+1);
    }
  }
}

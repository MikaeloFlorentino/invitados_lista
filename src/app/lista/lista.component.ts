import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
//import { DescripcionComponent } from '../descripcion/descripcion.component';
import { Invitados } from '../models/invitados-model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  
  constructor(private http: HttpClient, private dialog: MatDialog) { }

  invitados: Invitados[];
  displayedColumns: string[] = ['nombre', 'confirmaAsistencia', 'fechaConfimacion', 'invitadoDe','servicios'];
  dataSource: MatTableDataSource<Invitados>    = new MatTableDataSource<Invitados>(this.invitados);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  totalAngularPackages;

  ngOnInit() {
    this.construirTabla();
  }
  construirTabla(): void {

    const headers = { 
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': '*/*'
    }

    this.http.get<Array<Invitados>>('https://examen.nariux.com/api/invitados/consulta', { headers } ).subscribe(response => {
      this.invitados = response.filter(inv => {
        return isNumber(inv.id);
      });
      
      this.dataSource.data = this.invitados;
      this.construirPaginado();
    });
  }

  construirPaginado(): void {
    if (this.invitados != null) {
      console.log("a wiwi");
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else{
      console.log("cmamut");
    }
  }

  verServicios(invitado: Invitados): void {
    console.log('clstado invitados');
    const headers = { 
      'Access-Control-Allow-Origin': '*', 
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': '*/*'
    }

    /*this.http.get<Invitados>('https://examen.nariux.com/api/invitados/'+invitado.nombre, { headers } ).subscribe(
      response => {
        this.dialog.open(DescripcionComponent, { width: '80%', height: '85%', data: { servicios: response, invitado } });
      });*/
    /*
    this.clientesServiciosService.obtenerServiciosPorCliente(cliente.idCliente).subscribe(
      response => {
        this.dialog.open(ServiciosClienteComponent, { width: '80%', height: '85%', data: { servicios: response, cliente } });
      }
    );*/
  }

  filtrarContenido(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}




export function isNumber(str: any): boolean {
  const pattern = /^\d+$/;
  return pattern.test(str);
}


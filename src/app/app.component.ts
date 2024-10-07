import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from '../app/core/interfaces/user';
import { Rol } from '../app/core/interfaces/rol';
import { Servicio } from '../app/core/interfaces/servicio';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Hermes';

  Users : User[] = [
                    {id:1,UserEmail:'jferber18',password:'12345',role:1, name :'JOSUE FERNANDEZ BERDUGO'},
                    {id:2,UserEmail:'prueba',password:'12345',role:2,name :'PRUEBA'}
                  ];
  Roles : Rol[] = [
    {id:1,name :'Administrador',block:false},
    {id:2,name :'Visualizador',block:true}
  ];
  Servicios : Servicio[] = [
    {id:1,nombre :'Servicio 1',descripcion:'descripción servicio 1',precio:25000},
    {id:2,nombre :'Servicio 2',descripcion:'descripción servicio 2',precio:35000},
    {id:3,nombre :'Servicio 3',descripcion:'descripción servicio 3',precio:45000},
    {id:4,nombre :'Servicio 4',descripcion:'descripción servicio 4',precio:55000},
    {id:5,nombre :'Servicio 5',descripcion:'descripción servicio 5',precio:65000},
    {id:6,nombre :'Servicio 6',descripcion:'descripción servicio 6',precio:75000},
    {id:7,nombre :'Servicio 7',descripcion:'descripción servicio 7',precio:85000},
    {id:8,nombre :'Servicio 8',descripcion:'descripción servicio 8',precio:95000},
    {id:9,nombre :'Servicio 9',descripcion:'descripción servicio 19',precio:105000}
  ];

  constructor() {
    if (localStorage.getItem('users') === undefined){
      localStorage.setItem('users', JSON.stringify(this.Users));
    }

    if (localStorage.getItem('roles') === undefined){
      localStorage.setItem('roles', JSON.stringify(this.Roles));
    }

    if (localStorage.getItem('servicios') === undefined){
      localStorage.setItem('servicios', JSON.stringify(this.Servicios));
    }
  }
}

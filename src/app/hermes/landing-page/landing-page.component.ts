import { Component } from '@angular/core';
import { NgFor,NgIf } from '@angular/common';
import { User } from '../../core/interfaces/user';
import { Rol } from '../../core/interfaces/rol';
import { Servicio } from '../../core/interfaces/servicio';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  block: boolean = false;
  Roles: Rol[] = [];
  Users: User[] = [];
  Servicios :Servicio[] = [];
  NamePermission : string = '';
  constructor() {
    var val = localStorage.getItem('users');
    this.Users = JSON.parse(val === null ? '' : val) as User[];

    var val2 = localStorage.getItem('roles');
    this.Roles = JSON.parse(val2 === null ? '' : val2) as Rol[];

    var val3 = localStorage.getItem('servicios');
    this.Servicios = JSON.parse(val3 === null ? '' : val3) as Servicio[];

    this.ActivarPermisos();
  }

  ActivarPermisos(){
    var val :string | undefined = localStorage.getItem('user')?.toString();
    var user : User[] = this.Users.filter(x=> x.UserEmail === atob(val === undefined ? '' : val));
    var roles : Rol[] = this.Roles.filter(x=> x.id === user[0].id);
    this.NamePermission = roles[0].name;
    this.block = roles[0].block;

    this.cargarServicios();
  }

  cargarServicios(){
    
  }
}

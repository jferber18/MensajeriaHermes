import { Component,inject, TemplateRef  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgFor,NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../core/interfaces/user';
import { Rol } from '../../core/interfaces/rol';
import { Servicio } from '../../core/interfaces/servicio';
import { MatDialog,MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,MatDialogModule,MatButtonModule,MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  readonly dialog = inject(MatDialog);

  block: boolean = false;
  Roles: Rol[] = [];
  Users: User[] = [];
  Servicios :Servicio[] = [];
  NamePermission : string = '';

  //Variables form Servicio
  nombreServicio: string = '';
  descripcionServicio: string = '';
  precioServicio: number = 0;

  //Variables form User
  UserEmail: string = '';
  nameUser: string = '';
  pass: string = '';
  Role: number = 0;

  constructor(private router:Router) {
    var val = localStorage.getItem('users');
    this.Users = JSON.parse(val === null ? '' : val) as User[];

    var val2 = localStorage.getItem('roles');
    this.Roles = JSON.parse(val2 === null ? '' : val2) as Rol[];

    this.ActivarPermisos();
    this.cargarServicios();
  }

  ActivarPermisos(){
    var val :string | undefined = localStorage.getItem('user')?.toString();
    var user : User[] = this.Users.filter(x=> x.UserEmail === atob(val === undefined ? '' : val));
    var roles : Rol[] = this.Roles.filter(x=> x.id === Number(user[0].role));
    this.NamePermission = roles[0].name;
    this.block = roles[0].block;
  }

  cargarServicios(){
    var val3 = localStorage.getItem('servicios');
    this.Servicios = JSON.parse(val3 === null ? '' : val3) as Servicio[];
  }

  guardarServicio(){

  }

  navigateLogin(){
    
  }

  openDialog(templateRef: TemplateRef<any>): void {
    const dialogRef = this.dialog.open(templateRef, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado');
    });
  }

  onConfirm(): void {
    console.log('Confirmado');
    this.dialog.closeAll(); // Cierra el diálogo manualmente si se necesita
  }

  saveService(){
    if(this.nombreServicio === "" || this.descripcionServicio === "" ||
      this.precioServicio === 0){
      alert('Falta información!');
    }else{
      
      this.Servicios.push(
        {
          id: (this.Servicios[this.Servicios.length-1].id) +1,
          nombre: this.nombreServicio, 
          descripcion: this.descripcionServicio, 
          precio: this.precioServicio
        }
      );

      localStorage.setItem('servicios', JSON.stringify(this.Servicios));
    }
  }

  saveUser(){
    if(this.UserEmail === "" || this.pass === "" ||
      this.Role === 0 || this.nameUser === ""){
      alert('Falta información!');
    }else{
      if(this.Users.filter(user => user.UserEmail === this.UserEmail).length > 0){
        alert('El usuario ya existe!');
        return;
      }

      this.Users.push(
        {
          id: (this.Users[this.Users.length-1].id) +1,
          UserEmail: this.UserEmail, 
          password: this.pass, 
          name: this.nameUser, 
          role: Number(this.Role), 
        }
      );
      localStorage.setItem('users', JSON.stringify(this.Users));
    }
    this.UserEmail = '';
    this.nameUser = '';
    this.pass = '';
    this.Role = 0;
  }

  deleteService(id: number){
    this.Servicios = this.Servicios.filter(x => x.id!== id);
    localStorage.setItem('servicios', JSON.stringify(this.Servicios));
  }

  deleteUser(id: number){
    this.Users = this.Users.filter(x => x.id!== id);
    localStorage.setItem('users', JSON.stringify(this.Users));
  }

  RHome():void{
    this.router.navigate(['home'])
  }
}

import { Component,inject, TemplateRef  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NgFor,NgIf } from '@angular/common';
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

  constructor() {
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
    var roles : Rol[] = this.Roles.filter(x=> x.id === user[0].id);
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

}

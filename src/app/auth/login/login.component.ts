import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router : Router) {
  }

  EyePass : boolean = false;
  User : string = '';
  Pass : string = '';
  Users : User[] = [];

  togglePassword(){
    this.EyePass = !this.EyePass;
  }

  login(){
    if(this.User == '' || this.Pass == ''){
      alert('Falta el usuario o la contraseña!');
    }else{

      var val = localStorage.getItem('users');
      this.Users = JSON.parse(val === null ? '' : val) as User[];

      var exist = this.Users.filter(x => x.UserEmail === this.User && x.password === this.Pass);
      if(exist === null){
        alert('El usuario o contraseña incorrecta!');
        return;
      }

      localStorage.setItem('user', btoa(this.User));
      localStorage.setItem('Pass', btoa(this.Pass));

      this.router.navigate(['/landingpage']);
    }
  }

}

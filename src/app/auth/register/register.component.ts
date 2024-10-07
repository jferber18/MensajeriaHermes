import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private router : Router) {
  }

  User : User = {id : 0, UserEmail: "",password:"",role : 0,name : ""};
  Users! : User[];

  register(){
    if(this.User.UserEmail === "" || this.User.name === "" ||
      this.User.name === "" || this.User.role === 0 || this.User.password === ""){
      alert('Falta información!');
    }else{

      var val = localStorage.getItem('users');
      this.Users = JSON.parse(val === null ? '' : val) as User[];

      var exist = this.Users.filter(x => x.UserEmail === this.User.UserEmail);
      if(exist.length>0){
        alert('El usuario ya existe!');
        return;
      }

      this.Users.push(
        {
          id: (this.Users[this.Users.length-1].id) +1,
          UserEmail: this.User.UserEmail, 
          password: this.User.password, 
          name: this.User.name, 
          role: Number(this.User.role), 
        }
      );

      localStorage.setItem('users', JSON.stringify(this.Users));
      this.router.navigate(['/login']);
    }
  }

  RLogin():void{
    this.router.navigate(['login'])
  }

  RRegister():void{
    this.router.navigate(['register'])
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hermes',
  standalone: true,
  imports: [],
  styleUrls: ['./hermes.component.scss'],
  templateUrl: './hermes.component.html',
})
export class HermesComponent {

  constructor(private router: Router) {    
  }
  RLogin():void{
    this.router.navigate(['login'])
  }

  private RRegister():void{
    this.router.navigate(['register'])
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-hermes',
  standalone: true,
  imports: [MatIconModule,MatFormFieldModule],
  styleUrls: ['./hermes.component.scss'],
  templateUrl: './hermes.component.html',
})
export class HermesComponent {

  constructor(private router: Router) {    
  }
  RLogin():void{
    this.router.navigate(['login'])
  }

  RRegister():void{
    this.router.navigate(['register'])
  }

}

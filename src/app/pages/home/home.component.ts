import { Component } from '@angular/core';
import { CarrosselComponent } from "../../components-home/carrossel/carrossel.component";
import { SobreNosComponent } from "../../components-home/sobre-nos/sobre-nos.component";
import { ServicosComponent } from "../../components-home/servicos/servicos.component";



@Component({
  selector: 'app-home',
  imports: [CarrosselComponent, SobreNosComponent, ServicosComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

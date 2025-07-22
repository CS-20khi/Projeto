import { Component } from '@angular/core';
import { FormsComponent } from "../../components-marcacao/forms/forms.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marcacao',
  standalone: true,
  imports: [FormsComponent, CommonModule],
  templateUrl: './marcacao.html',
  styleUrls: ['./marcacao.css']  
})
export class Marcacao { }

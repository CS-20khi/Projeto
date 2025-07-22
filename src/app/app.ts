import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
    
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'SDM-Sistema Digital de Marcação';
}

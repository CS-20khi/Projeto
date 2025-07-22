import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrossel',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css']
})
export class CarrosselComponent implements OnInit {
  carouselItems = [
    {
      id: 'slide1',
      imageUrl: 'assets/img/carrossel-2.jpg',
      altText: 'Agendamento',
      title: 'Bem-vindo ao SDM',
      description: 'Marque seus exames/consultas no conforto da sua casa'
    },
    {
      id: 'slide2',
      imageUrl: 'assets/img/cican.jpg',
      altText: 'Hospital',
      title: 'Atenção',
      description: ' Toda primeira sexta-feira do mês, o CICAN faz marcação de exames/comsultas'
    },
    {
      id: 'slide3',
      imageUrl: 'assets/img/carrossel-3.jpg',
      altText: 'Filas',
      title: 'Não enfrente filas',
      description: 'Diga adeus às madrugadas e aos riscos! Com nosso site, você garante seu atendimento com praticidade e segurança, porque sua vida vale muito mais que qualquer fila.'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}

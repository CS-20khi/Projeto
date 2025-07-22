import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.css']
})
export class ServicosComponent implements OnInit {
  services = [
    {
      imageUrl: 'assets/img/consultas.jpg',
      icon: 'bi-heart-pulse-fill',
      title: 'Consultas',
      link: '/marcacao'
    },
    {
      imageUrl: 'assets/img/exames.jpg',
      icon: 'bi-file-earmark-text-fill',
      title: 'Exames ',
      link: '/marcacao'
    },
    {
      imageUrl: 'assets/img/odonto.jpg',
      icon: 'bi-tooth',
      title: 'Odontologia',
      link: '/marcacao'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}

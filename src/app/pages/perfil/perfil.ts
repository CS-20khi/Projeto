import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Agendamento, AgendamentoService } from '../../services/agendamento';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class PerfilComponent implements OnInit {
  agendamentos: Agendamento[] = [];

  constructor(private agendamentoService: AgendamentoService) { }

  ngOnInit(): void {
    this.agendamentos = this.agendamentoService.listar();

    if (this.agendamentos.length === 0) {
      console.warn('Nenhum agendamento encontrado no AgendamentoService.');
    } else {
      console.log('Agendamentos carregados:', this.agendamentos);
    }
  }

  cancelarAgendamento(index: number): void {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      this.agendamentos.splice(index, 1);
    }
  }
}

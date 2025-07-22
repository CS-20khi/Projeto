import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Agendamento, AgendamentoService } from '../../services/agendamento'; 

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.html',
  styleUrls: ['./confirmacao.css'],
  standalone: true,
  imports: [
    CommonModule 
  ]
})
export class ConfirmacaoComponent implements OnInit {
 
  dadosAgendamento: Agendamento | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private agendamentoService: AgendamentoService 
  ) { }

  ngOnInit(): void {
   
    const todosAgendamentos = this.agendamentoService.listar();
    if (todosAgendamentos.length > 0) {
     
      this.dadosAgendamento = todosAgendamentos[todosAgendamentos.length - 1];
    } else {
      console.warn('Nenhum agendamento encontrado para exibir na confirmação.');
    }
    
  }

  irParaPerfil(): void {
    this.router.navigate(['/perfil']);
  }
}
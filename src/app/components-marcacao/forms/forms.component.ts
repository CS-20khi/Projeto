import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Agendamento, AgendamentoService } from '../../services/agendamento';

interface FormData {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  endereco: string;
  telefone: string;
  email: string;
  especialidade: string;
  medico: string;
  hospital: string;
  horaAgendamento: string;
  dataConsulta: string;
  confirmarAgendamento: boolean;
  termoAutorizacao: boolean; 
}

interface Medico {
  id: string;
  nome: string;
  especialidadeId: string;
}

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule
    
  ],
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  @ViewChild('agendamentoForm') agendamentoForm!: NgForm;

  formData: FormData = {
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    telefone: '',
    email: '',
    especialidade: '',
    medico: '',
    hospital: '',
    horaAgendamento: '',
    dataConsulta: '',
    confirmarAgendamento: false,
    termoAutorizacao: false 
  };

  private todosOsMedicos: Medico[] = [
    { id: 'Dra. Maria Oliveira', nome: 'Dra. Maria Oliveira', especialidadeId: 'Clinico Geral' },
    { id: 'Dr. Pedro Souza', nome: 'Dr. Pedro Souza', especialidadeId: 'Cardiologista' },
    { id: 'Dra. Ana Costa', nome: 'Dra. Ana Costa', especialidadeId: 'Exames de sangue' },
    { id: 'Dr. Carlos Santos', nome: 'Dr. Carlos Santos', especialidadeId: 'Ultrassonografia' },
    { id: 'Dra. Laura Mendes', nome: 'Dra. Laura Mendes', especialidadeId: 'Ortodontia' },
    { id: 'Dr. Gabriel Ferreira', nome: 'Dr. Gabriel Ferreira', especialidadeId: 'Clinico Geral Odontologia' }
  ];

  medicosDisponiveis: Medico[] = [];
  horasDisponiveis: string[] = [];

  constructor(private router: Router, private agendamentoService: AgendamentoService) {}

  ngOnInit(): void {
    this.generateAvailableHours();
  }

  public getTodayDateHtml(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  public getMaxDateHtml(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private generateAvailableHours(): void {
    const startHour = 8;
    const endHour = 18;
    const intervalMinutes = 30;

    for (let h = startHour; h <= endHour; h++) {
      for (let m = 0; m < 60; m += intervalMinutes) {
        if (h === endHour && m >= intervalMinutes) {
          break;
        }
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        this.horasDisponiveis.push(`${hour}:${minute}`);
      }
    }
  }

  onEspecialidadeChange(): void {
    this.formData.medico = ''; 
    const especialidadeMap: { [key: string]: string } = {
      'Clinico Geral': 'Clinico Geral',
      'Cardiologista': 'Cardiologista',
      'Exames de sangue': 'Exames de sangue',
      'Ultrassonografia': 'Ultrassonografia',
      'Ortodontia': 'Ortodontia',
      'Clinico Geral Odontologia': 'Clinico Geral Odontologia'
    };
    
    const especialidadeSelecionadaId = especialidadeMap[this.formData.especialidade];

    if (especialidadeSelecionadaId) {
      this.medicosDisponiveis = this.todosOsMedicos.filter(
        medico => medico.especialidadeId === especialidadeSelecionadaId
      );
    } else {
      this.medicosDisponiveis = [];
    }
  }

  onSubmit(): void {
    this.agendamentoForm.control.markAllAsTouched();

    if (this.agendamentoForm.valid) {
      console.log('Formulário válido e termo aceito!', this.formData); 

      const novoAgendamento: Agendamento = {
        nomeCompleto: this.formData.nomeCompleto,
        cpf: this.formData.cpf,
        dataNascimento: this.formData.dataNascimento,
        endereco: this.formData.endereco,
        telefone: this.formData.telefone,
        email: this.formData.email,
        especialidade: this.formData.especialidade,
        medico: this.formData.medico,
        hospital: this.formData.hospital,
        horaMarcada: this.formData.horaAgendamento, 
        dataAgendamento: this.formData.dataConsulta, 
        status: 'Confirmado',
        dataCriacaoAgendamento: new Date()
      };

      
      
      this.agendamentoService.adicionar(novoAgendamento);
      this.agendamentoForm.resetForm(); 
      this.router.navigate(['/confirmacao']); 
    } else {
      console.log('Formulário inválido. Por favor, preencha todos os campos obrigatórios e aceite os termos.');
      alert('Por favor, preencha todos os campos obrigatórios e aceite os termos para prosseguir.');
    }
  }
}
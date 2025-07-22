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
  genero: 'masculino' | 'feminino'; 
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
    { id: 'Dra. Maria Oliveira', nome: 'Dra. Maria Oliveira', genero: 'feminino', especialidadeId: 'Clinico Geral' },
    { id: 'Dr. Carlos Silva', nome: 'Dr. Carlos Silva', genero: 'masculino', especialidadeId: 'Clinico Geral' },
    
    
    { id: 'Dra. Ana Souza', nome: 'Dra. Ana Souza', genero: 'feminino', especialidadeId: 'Cardiologista' },
    { id: 'Dr. Pedro Santos', nome: 'Dr. Pedro Santos', genero: 'masculino', especialidadeId: 'Cardiologista' },
    
    
    { id: 'Dra. Juliana Costa', nome: 'Dra. Juliana Costa', genero: 'feminino', especialidadeId: 'Exames de sangue' },
    { id: 'Dr. Roberto Almeida', nome: 'Dr. Roberto Almeida', genero: 'masculino', especialidadeId: 'Exames de sangue' },
    
   
    { id: 'Dra. Fernanda Lima', nome: 'Dra. Fernanda Lima', genero: 'feminino', especialidadeId: 'Ultrassonografia' },
    { id: 'Dr. Marcelo Oliveira', nome: 'Dr. Marcelo Oliveira', genero: 'masculino', especialidadeId: 'Ultrassonografia' },
    
    
    { id: 'Dra. Patrícia Mendes', nome: 'Dra. Patrícia Mendes', genero: 'feminino', especialidadeId: 'Ortodontia' },
    { id: 'Dr. Gustavo Ferreira', nome: 'Dr. Gustavo Ferreira', genero: 'masculino', especialidadeId: 'Ortodontia' },
    
    
    { id: 'Dra. Camila Rodrigues', nome: 'Dra. Camila Rodrigues', genero: 'feminino', especialidadeId: 'Clinico Geral Odontologia' },
    { id: 'Dr. Lucas Pereira', nome: 'Dr. Lucas Pereira', genero: 'masculino', especialidadeId: 'Clinico Geral Odontologia' }
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
  
  
  if (this.formData.especialidade) {
    this.medicosDisponiveis = this.todosOsMedicos.filter(
      medico => medico.especialidadeId === this.formData.especialidade
    );
    
    
    if (this.medicosDisponiveis.length > 2) {
      
      const medicoHomem = this.medicosDisponiveis.find(m => m.genero === 'masculino');
      const medicoMulher = this.medicosDisponiveis.find(m => m.genero === 'feminino');
      
      this.medicosDisponiveis = [];
      if (medicoHomem) this.medicosDisponiveis.push(medicoHomem);
      if (medicoMulher) this.medicosDisponiveis.push(medicoMulher);
    }
  } else {
    this.medicosDisponiveis = [];
  }
}

onSubmit(): void {
  this.agendamentoForm.control.markAllAsTouched();

  if (this.agendamentoForm.valid) {
    
    const medicoSelecionado = this.todosOsMedicos.find(m => m.id === this.formData.medico);
    
    const novoAgendamento: Agendamento = {
      nomeCompleto: this.formData.nomeCompleto,
      cpf: this.formData.cpf,
      dataNascimento: this.formData.dataNascimento,
      endereco: this.formData.endereco,
      telefone: this.formData.telefone,
      email: this.formData.email,
      especialidade: this.formData.especialidade,
      medico: medicoSelecionado ? medicoSelecionado.nome : '', 
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
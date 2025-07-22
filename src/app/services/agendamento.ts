import { Injectable } from '@angular/core';

export interface Agendamento {
  nomeCompleto: string;
  dataNascimento: string;
  telefone: string;
  cpf: string;
  endereco: string;
  email: string;
  especialidade: string;
  medico: string;
  hospital: string;
  horaMarcada: string;
  dataAgendamento: string;
  sexo?: string;
  status?: string;
  dataCriacaoAgendamento?: Date;
}

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly storageKey = 'agendamentos';

  adicionar(agendamento: Agendamento) {
    const lista = this.listar();
    lista.push(agendamento);
    localStorage.setItem(this.storageKey, JSON.stringify(lista));
  }

  listar(): Agendamento[] {
    const data = localStorage.getItem(this.storageKey);
    const agendamentos = data ? JSON.parse(data) : [];
    return agendamentos.map((ag: any) => ({
      ...ag,
      dataCriacaoAgendamento: ag.dataCriacaoAgendamento ? new Date(ag.dataCriacaoAgendamento) : undefined
    }));
  }
}

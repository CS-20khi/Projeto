import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css' 
})
export class CadastroComponent {
  usuario = {
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  cadastroSucesso: boolean = false;
  mensagemErro: string = '';

  constructor(private router: Router) { }

  onSubmit(form: NgForm): void {
    this.cadastroSucesso = false; 
    this.mensagemErro = '';      

    
    if (form.invalid) {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      return; 
    }

   
    if (this.usuario.senha !== this.usuario.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem. Por favor, verifique.';
      return; 
    }

    
    const simulacaoSucesso = Math.random() > 0.1; 

    if (simulacaoSucesso) {
      console.log('--- Cadastro Simulado com Sucesso ---');
      console.log('Dados do usuário (não persistidos):', this.usuario);
      this.cadastroSucesso = true; 

      
     
      this.resetForm(form);

      
      setTimeout(() => {
        this.router.navigate(['/login']);
      }); 
    } 
  }

  
  resetForm(form: NgForm): void {
    form.resetForm(); 
    this.usuario = {
      nome: '',
      email: '',
      senha: '',
      confirmarSenha: ''
    };
  }
}
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { AuthService } from '../service/auth.service';
import { UsuarioData } from '../models/usuario-data.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  usuario?: UsuarioData;
  novoNome: string = '';
  novoEmail: string = '';
  novaSenha: string = '';
  authService: AuthService;

  mensagem: string = '';

  constructor(private usuarioService: UsuarioService,
    authService: AuthService
    ) {
    this.authService = authService;
     }

  ngOnInit(): void {
    this.buscarUsuarioAtual();
  }

  buscarUsuarioAtual(): void {
    this.usuarioService.getUserId().subscribe(
      (data: UsuarioData) => {
        this.usuario = data;
      },
      (error) => {
        console.log('Erro ao buscar usuário: ', error);
      }
    );
  }

  atualizarUsuario(): void {
    const id = this.usuario?.id;
    if (!id || !this.usuarioService.atualizarUsuario) return;
    
    const body = {
      nome: this.novoNome ?? this.usuario!.nome,
      email: this.novoEmail ?? this.usuario!.email,
      senha: this.novaSenha
    };

    this.usuarioService.atualizarUsuario(id, body).subscribe(
      (data: UsuarioData) => {
        this.usuario = data;
        this.novoNome = '';
        this.novoEmail = '';
        this.novaSenha = '';
        console.log('Usuário atualizado com sucesso:', data);
        this.mensagem = 'Usuário atualizado com sucesso!'
        alert(this.mensagem);
        this.authService.logout();
            // redireciona para a tela de login
            window.location.href = '';
      },
      (error:any) => {
        console.log('Erro ao atualizar usuário:', error);
      }
    );
  }

  deletarUsuario() {
    if (confirm('Tem certeza que deseja deletar sua conta?')) {
      const id = this.usuario?.id;
      if (!id) return;
  
      this.usuarioService.deletarUsuario(id).subscribe(
        (response: any) => {
          console.log('Usuário deletado com sucesso!');
          this.mensagem = 'Usuário deletado com sucesso!'
          alert(this.mensagem);
          this.authService.logout();
            // redireciona para a tela de login
            window.location.href = '';
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
    }
  }
}
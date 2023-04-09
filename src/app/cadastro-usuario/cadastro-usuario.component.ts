import { UsuarioData } from '../models/usuario-data.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from '../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})

export class CadastroUsuarioComponent implements OnInit {
  usuario: UsuarioData = {
    nome: '',
    email: '',
    senha: ''
  };

  mensagem: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {
  }

  cadastrarUsuario() {
    this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
      (response: any) => {
        console.log('Usuário cadastrado com sucesso!');
        this.mensagem = 'Usuário cadastrado com sucesso!'
        alert(this.mensagem);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  submitForm() {
    this.cadastrarUsuario();
  }

}
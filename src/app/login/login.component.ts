import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.email, this.senha).subscribe(
      response => {
        console.log(response.token);
        console.log('Usuário logado com sucesso!');
        this.router.navigate(['/dashboard']); // redirecionar para a página de destino
      },
      
      error => {
        console.log(error);
        this.errorMessage = 'Usuario ou senha inválidos! ';
        alert(this.errorMessage); // exibir mensagem de erro para o usuário
      }
    );
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingDialogService } from '../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../core/dialogs/services/message-dialog.service';
import { UsuarioService } from '../../../admin/services/usuario.service';
import { AuthService } from './../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private loading: LoadingDialogService,
    private message: MessageDialogService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    //if (this.loginForm.valid) {
    this.router.navigate(['/gestion-salas/comision']);
    //}
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.errors) {
      return;
    }

    const dato = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
    };

    this.loading.show();
    const usuario = await this.usuarioService.login(dato);
    this.loading.hide();
    if (usuario) {
      this.authService.saveToken(usuario);
      this.authService.setUsuario(usuario);

      if (usuario.roles?.type_rol == 'ADMINISTRADOR') {
        this.router.navigate(['/admin']);
      } else if (usuario.roles?.type_rol == 'USUARIO') {
        this.router.navigate(['/client']);
      }
    } else {
      this.message.showError('Credenciales Incorrectas');
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingDialogService } from '../../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../../core/dialogs/services/message-dialog.service';
import { UsuarioService } from '../../../services/usuario.service';
import { RolService } from '../../../services/rol.service';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';

@Component({
  selector: 'app-form-usuario',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form-usuario.component.html',
  styleUrl: './form-usuario.component.scss'
})
export class FormUsuarioComponent implements OnInit {
  id!: any;

  usuario: any = null;
  roles: any[] = [];

  form!: FormGroup;
  formValidator!: FormValidationUtils;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private loadingDialog: LoadingDialogService,
    private messageDialog: MessageDialogService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      username: [this.usuario?.username, [Validators.required]],
      password: [this.usuario?.password, [Validators.required]],
      email: [this.usuario?.email, [Validators.required]],
      phone_number: [this.usuario?.phone_number, []],
      rol_id: [this.usuario?.rol_id, [Validators.required]],
    });
    this.formValidator = new FormValidationUtils(this.form);
  };

  async inicializarData(): Promise<void> {
    this.initForm();

    this.loadingDialog.show();

    this.usuario = this.id? await this.usuarioService.get(this.id) : null;
    this.roles = await this.rolService.list('');
    this.initForm();

    this.loadingDialog.hide();
  }

  async onSave(): Promise<void> {
    this.form.markAsTouched();

    if(this.form.invalid){
      return;
    }

    const dato = {
      id: this.id,
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      email: this.form.controls['email'].value,
      phone_number: this.form.controls['phone_number'].value,
      rol_id: this.form.controls['rol_id'].value,
    };

    this.loadingDialog.show();

    let res = false;

    try {
      if(this.id){
        res = await this.usuarioService.edit(dato);
      }else{
        res = await this.usuarioService.add(dato);
      }

      if(res){
        this.messageDialog.showInformation(`Usuario ${this.id? 'actualizado' : 'agregado'}`);

        this.router.navigate(['/admin/usuario/list']);
      }else{
        this.messageDialog.showError(`No se pudo ${this.id? 'actualizar' : 'agregar'} el usuario`);
      }
    } catch (error: any) {
      this.messageDialog.showError(error.message)
    }

    this.loadingDialog.hide();
  }

  onCancelar = () => {
    this.router.navigate(['/admin/usuario/list']);
  }
}


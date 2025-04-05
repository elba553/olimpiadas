import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingDialogService } from '../../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../../core/dialogs/services/message-dialog.service';
import { RolService } from '../../../services/rol.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-rol',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form-rol.component.html',
  styleUrl: './form-rol.component.scss',
})
export class FormRolComponent implements OnInit {
  id!: any;

  rol: any = null;

  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
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
      rol: [this.rol?.type_rol, [Validators.required]],
    });
  };

  async inicializarData(): Promise<void> {
    this.initForm();

    this.loadingDialog.show();

    await this.getRol();
    this.initForm();

    this.loadingDialog.hide();
  }

  async getRol(): Promise<void> {
    if (!this.id) {
      return;
    }

    const rol = await this.rolService.get(this.id);
    this.rol = rol ?? null;
  }

  async onSave(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.errors) {
      return;
    }

    const dato = {
      id: this.id,
      rol: this.form.controls['rol'].value,
    };

    this.loadingDialog.show();

    try {
      let res = false;

      if (this.id) {
        res = await this.rolService.edit(dato);
      } else {
        res = await this.rolService.add(dato);
      }

      if (res) {
        this.messageDialog.showInformation(`Rol ${this.id ? 'actualizado' : 'agregado'}`);

        this.router.navigate(['/admin/rol/list']);
      } else {
        this.messageDialog.showInformation(`No se pudo ${this.id ? 'actualizar' : 'agregar'} el rol`);
      }
    } catch (error: any) {
      this.messageDialog.showError(error.message);
    }

    this.loadingDialog.hide();
  }

  onCancelar = () => {
    this.router.navigate(['/admin/rol/list']);
  }
}

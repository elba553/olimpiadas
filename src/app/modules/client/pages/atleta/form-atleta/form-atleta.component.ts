import { CommonModule } from '@angular/common';
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
import { enumGender } from '../../../../../shared/types/people.enums';
import { FormValidationUtils } from '../../../../../utils/form-validation-utils';
import { AtletaService } from '../../../services/atleta.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-form-atleta',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form-atleta.component.html',
  styleUrl: './form-atleta.component.scss',
})
export class FormAtletaComponent implements OnInit {
  id!: any;

  atleta: any = null;
  estados: any[] = [];

  genders = Object.keys(enumGender);

  form!: FormGroup;
  formValidator!: FormValidationUtils;

  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private atletaService: AtletaService,
    private stateService: StateService,
    private loadingDialog: LoadingDialogService,
    private messageDialog: MessageDialogService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      first_name: [this.atleta?.people?.first_name, [Validators.required]],
      last_name: [this.atleta?.people?.last_name, [Validators.required]],
      email: [this.atleta?.people?.email, [Validators.required]],
      phone_number: [this.atleta?.people?.phone_number, [Validators.pattern('^[0-9]*$')]],
      gender: [this.atleta?.people?.gender.toUpperCase(), [Validators.required]],
      birthdate: [this.atleta?.people?.birthdate, [Validators.required]],
      address: [this.atleta?.people?.address, [Validators.required]],
      cedula: [this.atleta?.people?.cedula, [Validators.required]],
      state_id: [this.atleta?.states?.id, [Validators.required]],
    });
    this.formValidator = new FormValidationUtils(this.form);
  };


  async inicializarData(): Promise<void> {
    this.initForm();

    this.loadingDialog.show();

    this.estados = await this.stateService.list()?? [];
    this.atleta = this.id ? await this.atletaService.get(this.id) : null;
    this.initForm();

    this.loadingDialog.hide();
  }

  async onFileSelect(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async onSave(): Promise<void> {
    console.log({ form: this.form });
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }
  
    const dato = {
      id: this.id,
      people: {
        id: this.atleta?.people?.id,
        first_name: this.form.controls['first_name'].value,
        last_name: this.form.controls['last_name'].value,
        email: this.form.controls['email'].value,
        gender: this.form.controls['gender'].value,
        birthdate: this.form.controls['birthdate'].value,
        phone_number: this.form.controls['phone_number'].value,
        cedula: this.form.controls['cedula'].value,
        address: this.form.controls['address'].value,
      },
      profile_photo: this.atleta?.profile_photo,
      state_id: this.form.controls['state_id'].value,
    };

    console.log('dato', dato);

    if (this.selectedFile) {
      dato.profile_photo = await this.atletaService.uploadFile(
        this.selectedFile
      );
    }

    this.loadingDialog.show();

    let res = false;

    try {
      if (this.id) {
        res = await this.atletaService.edit(dato);
      } else {
        res = await this.atletaService.add(dato);
      }

      if (res) {
        this.messageDialog.showInformation(
          `Atleta ${this.id ? 'actualizado' : 'agregado'}`
        );

        this.router.navigate(['/client/atleta/list']);
      } else {
        this.messageDialog.showError(
          `No se pudo ${this.id ? 'actualizar' : 'agregar'} el atleta`
        );
      }
    } catch (error: any) {
      this.messageDialog.showError(error.message);
    }

    this.loadingDialog.hide();
  }

  async randomProfilePhoto(): Promise<void> {
    const gender = this.form.controls['gender'].value;
    console.log({ gender });
    const file =  await this.atletaService.obtainRandomProfilePhoto(gender);

    this.selectedFileUrl = URL.createObjectURL(file);

    this.selectedFile = file;
  }

  onCancelar = () => {
    this.router.navigate(['/client/atleta/list']);
  };

}

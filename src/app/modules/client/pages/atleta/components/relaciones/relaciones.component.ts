import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  NgbActiveModal,
  NgbModal,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogService } from '../../../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../../../core/dialogs/services/message-dialog.service';
import { Constants } from '../../../../../../utils/constantes';
import { FormValidationUtils } from '../../../../../../utils/form-validation-utils';
import { AtletaService } from '../../../../services/atleta.service';
import { SportService } from '../../../../services/sport.service';

const ANGULAR_MODULE = [FormsModule, ReactiveFormsModule, CommonModule];

const BOOSTRAP_MODULE = [NgbPaginationModule];

@Component({
  selector: 'app-relaciones',
  imports: [ANGULAR_MODULE, BOOSTRAP_MODULE],
  templateUrl: './relaciones.component.html',
  styleUrl: './relaciones.component.scss',
})
export class RelacionesComponent implements OnInit {
  @Input() data: any = null;
  @Input() reporte: any = false;

  private constantes = Constants;

  page: number = 1;
  size: number = 2;
  totalRecords: number = 4;

  sortColumn: string = '';
  sortOrder: string = '';

  people: any = null;
  listData: any[] = [];
  selectListItems: number[] = this.constantes.paginacion.items;

  form!: FormGroup;
  formValidator!: FormValidationUtils;

  registrar: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingDialog: LoadingDialogService,
    private messageDialog: MessageDialogService,
    private modalService: NgbModal,
    private atletaService: AtletaService,
    private sportService: SportService
  ) {}

  ngOnInit(): void {
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      first_name: [this.people?.first_name, [Validators.required]],
      last_name: [this.people?.last_name, [Validators.required]],
      email: [this.people?.email, [Validators.required]],
      phone_number: [this.people?.phone_number, []],
      address: [this.people?.address, [Validators.required]],
      cedula: [this.people?.cedula, [Validators.required]],
      relationship: [null, Validators.required],
    });
    this.formValidator = new FormValidationUtils(this.form);
  };

  async inicializarData(): Promise<void> {
    this.initForm();
    await this.onConsultar();
  }

  async onBuscar(): Promise<void> {
    const cedula = this.form.controls['cedula'].value;
    if (!cedula || cedula.trim() == '') {
      this.messageDialog.showWarning('Ingresa la Cédula a buscar');
      return;
    }

    this.loadingDialog.show();

    this.people = await this.atletaService.getPeople(cedula);

    if (this.people) {
      const relationship = await this.atletaService.getRelationship(
        this.people?.id
      );
      if (relationship) {
        this.messageDialog.showWarning(
          'La persona que ha buscado ya se ha registrado como parentesco'
        );
      }
    }

    this.initForm();
    this.form.controls['cedula'].setValue(cedula);

    this.registrar = true;
    this.loadingDialog.hide();
  }

  onNuevo = () => {
    this.registrar = true;
    this.people = null;

    this.initForm();
  };

  async onConsultar(): Promise<void> {
    this.loadingDialog.show();

    this.listData =
      (await this.atletaService.listRelationship(this.data.athletaId)) ?? [];
    this.inicializarPaginacion();

    this.loadingDialog.hide();
  }

  inicializarPaginacion = () => {
    this.totalRecords = this.listData.length;
    this.page = 1;
    this.size = this.constantes.paginacion.defaultSize;
  };

  get pageItems() {
    const startIndex = (this.page - 1) * this.size;
    return this.listData.slice(startIndex, startIndex + this.size);
  }

  onPageChange(event: any): void {
    this.page = event;
  }

  async onAgregar(): Promise<void> {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    try {
      const dato = {
        people: {
          first_name: this.form.controls['first_name'].value,
          last_name: this.form.controls['last_name'].value,
          email: this.form.controls['email'].value,
          phone_number: this.form.controls['phone_number'].value,
          cedula: this.form.controls['cedula'].value,
          address: this.form.controls['address'].value,
        },
        relationship: this.form.controls['relationship'].value,
        athleta_id: this.data?.athletaId,
      };

      this.loadingDialog.show();
      if (await this.atletaService.addRelationship(dato)) {
        this.loadingDialog.hide();
        this.messageDialog.showInformation('Parentesco agregado');
        this.onConsultar();
      }
    } catch (error: any) {
      this.loadingDialog.hide();
      this.messageDialog.showError(error.message);
    }
  }

  async onEliminar(item: any): Promise<void> {
    this.loadingDialog.show();

    try {
      const res = await this.atletaService.deleteRelationship(item.id);
      if (res) {
        this.messageDialog.showInformation('Se quitó el parentesco del atleta');
      } else {
        this.messageDialog.showError('No se pudo quitar el parentesco del atleta');
      }
    } catch (error: any) {
      this.messageDialog.showError(error.message);
    }

    this.loadingDialog.hide();

    this.onConsultar();
  }

  onClose = () => {
    this.activeModal.dismiss(true);
  };
}

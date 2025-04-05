import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../../../../../../utils/constantes';
import { Utils } from '../../../../../../utils/utils';
import { Router } from '@angular/router';
import { LoadingDialogService } from '../../../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../../../core/dialogs/services/message-dialog.service';
import { AtletaService } from '../../../../services/atleta.service';
import { SportService } from '../../../../services/sport.service';
import { FormValidationUtils } from '../../../../../../utils/form-validation-utils';

const ANGULAR_MODULE = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
]

const BOOSTRAP_MODULE = [
  NgbPaginationModule,
]

@Component({
  selector: 'app-deportes',
  imports: [ANGULAR_MODULE, BOOSTRAP_MODULE],
  templateUrl: './deportes.component.html',
  styleUrl: './deportes.component.scss'
})
export class DeportesComponent implements OnInit{

  @Input() data: any = null;
  @Input() reporte: any = false;

  private utils = Utils;
  private constantes = Constants;

  page: number = 1;
  size: number = 2;
  totalRecords: number = 4;

  sortColumn: string = '';
  sortOrder: string = '';

  deportes: any[] = [];
  listData: any[] = [];
  selectListItems: number[] = this.constantes.paginacion.items;

  form!: FormGroup;
  formValidator!: FormValidationUtils;

  constructor(public activeModal: NgbActiveModal,
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingDialog: LoadingDialogService,
    private messageDialog: MessageDialogService,
    private modalService: NgbModal,
    private atletaService: AtletaService,
    private sportService: SportService,
  ) {
  }

  ngOnInit(): void {
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      sport_id: [null, [Validators.required]],
    });
    this.formValidator = new FormValidationUtils(this.form);
  };

  async inicializarData(): Promise<void> {

    this.initForm();
    this.deportes = await this.sportService.list()?? [];

    await this.onConsultar();
  };

  async onConsultar(): Promise<void> {

    this.loadingDialog.show();

    this.listData = await this.atletaService.listSport(this.data.athletaId)?? [];
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

  toggleActivo(item: any): void {
    item.activo = !item.activo;
  }

  onPageChange(event: any): void {
    this.page = event;
  }

  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }

    this.utils.sortDataTable(this.listData, column, this.sortOrder);
  }

  getSortIcon(column: string): string {
    if (this.sortColumn === column) {
      return this.sortOrder === 'asc'
        ? 'bi bi-arrow-up sort-active'
        : 'bi bi-arrow-down sort-active';
    }
    return 'bi bi-arrow-down';
  }

  async onAgregar() : Promise<void>{
    this.form.markAllAsTouched();
    if(this.form.invalid){
      return;
    }

    try {
      const dato = {
        athleta_id: this.data.athletaId,
        sport_id: this.form.controls['sport_id'].value,
      }

      this.loadingDialog.show();
      if(await this.atletaService.addSport(dato)){
        this.loadingDialog.hide();
        this.messageDialog.showInformation('Deporte agregado');
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
      const res = await this.atletaService.deleteSport(item.id);
      if (res) {
        this.messageDialog.showInformation('Se quitó el deporte del atleta');
      } else {
        this.messageDialog.showError('No se pudo quitar el deporte del atleta');
      }
    } catch (error: any) {
      this.messageDialog.showError(error.message);
    }

    this.loadingDialog.hide();

    this.onConsultar();
  }

  onClose = () => {
    this.activeModal.dismiss(true);
  }

}

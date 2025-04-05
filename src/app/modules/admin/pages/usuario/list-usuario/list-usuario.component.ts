import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogService } from '../../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../../core/dialogs/services/message-dialog.service';
import { Constants } from '../../../../../utils/constantes';
import { Utils } from '../../../../../utils/utils';
import { UsuarioService } from '../../../services/usuario.service';

const ANGULAR_MODULE = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgbModule,
];

const BOOSTRAP_MODULE = [NgbPaginationModule];

@Component({
  selector: 'app-list-usuario',
  imports: [ANGULAR_MODULE, BOOSTRAP_MODULE],
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.scss'
})
export class ListUsuarioComponent implements OnInit{
  private constantes = Constants;
  private utils = Utils;

  permisos: any = null;

  page: number = 1;
  size: number = 5;
  totalRecords: number = 4;

  sortColumn: string = '';
  sortOrder: string = '';

  listData: any[] = [];
  selectListItems: number[] = this.constantes.paginacion.items;

  form!: FormGroup;
  formResult!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingDialog: LoadingDialogService,
    private messageDialog: MessageDialogService,
    private usuarioService: UsuarioService,
  ) {
  }

  ngOnInit(): void {
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      filter: ['', []],
    });
  };

  async inicializarData(): Promise<void> {

    this.initForm();
    await this.onConsultar();
  };

  async onConsultar(): Promise<void> {

    this.loadingDialog.show();

    const filter = this.form.controls['filter'].value;
    const usuarios = await this.usuarioService.list(filter);
    this.listData = usuarios ?? [];

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

  onAgregar = () => {
    this.router.navigate(['/admin/usuario/add']);
  }

  onEditar = (item: any) => {
    this.router.navigate(['/admin/usuario/edit', item.id]);
  }

  async onEliminar(item: any): Promise<void> {
    this.loadingDialog.show();

    try {
      const res = await this.usuarioService.delete(item.id);
      if (res) {
        this.messageDialog.showInformation('Se eliminó el usuario');
      } else {
        this.messageDialog.showError('No se pudo eliminar el usuario');
      }
    } catch (error: any) {
      this.messageDialog.showError(error.message);
    }

    this.loadingDialog.hide();

    this.onConsultar();
  }
}

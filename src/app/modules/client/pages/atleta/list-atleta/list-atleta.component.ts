import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingDialogService } from '../../../../../core/dialogs/services/loading-dialog.service';
import { MessageDialogService } from '../../../../../core/dialogs/services/message-dialog.service';
import { enumGender } from '../../../../../shared/types/people.enums';
import { Constants } from '../../../../../utils/constantes';
import { Utils } from '../../../../../utils/utils';
import { AtletaService } from '../../../services/atleta.service';
import { DeportesComponent } from '../components/deportes/deportes.component';
import { RelacionesComponent } from '../components/relaciones/relaciones.component';

const ANGULAR_MODULE = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgbModule,
];

const BOOSTRAP_MODULE = [NgbPaginationModule];


@Component({
  selector: 'app-list-atleta',
  imports: [ANGULAR_MODULE, BOOSTRAP_MODULE],
  templateUrl: './list-atleta.component.html',
  styleUrl: './list-atleta.component.scss'
})
export class ListAtletaComponent implements OnInit{
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
    private modalService: NgbModal,
    private atletaService: AtletaService,
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
    const atletas = await this.atletaService.list(filter);
    this.listData = atletas?.map((atleta: any) => ({ ...atleta, people: {
      ...atleta.people,
      gender: atleta.people.gender === enumGender.MALE ? 'Masculino' : 'Femenino'
    }})) ?? [];

    // await this.atletaService.updateAllAtletasAvatar();

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

  onAgregar = () => {
    this.router.navigate(['/client/atleta/add']);
  }

  onEditar = (item: any) => {
    this.router.navigate(['/client/atleta/edit', item.id]);
  }

  onVerDeportes = (item: any) => {
    const modalRef = this.modalService.open(
      DeportesComponent,
      { centered: false, windowClass: 'modal-xl' }
    );

    modalRef.componentInstance.data = {
      athletaId: item.id,
      athleta: item,
    };

    modalRef.result.then(
      (result) => {
        if (result) {
        }
      }
    );
  }

  onVerRelaciones = (item: any) => {
    const modalRef = this.modalService.open(
      RelacionesComponent,
      { centered: false, windowClass: 'modal-xl' }
    );

    modalRef.componentInstance.data = {
      athletaId: item.id,
      athleta: item,
    };

    modalRef.result.then(
      (result) => {
        if (result) {
        }
      }
    );
  }
}

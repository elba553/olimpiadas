import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgbModal,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { format } from 'date-fns';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { LoadingDialogService } from '../../../../../core/dialogs/services/loading-dialog.service';
import { Constants } from '../../../../../utils/constantes';
import { AtletaService } from '../../../services/atleta.service';
import { SportService } from '../../../services/sport.service';
import { StateService } from '../../../services/state.service';
import { DeportesComponent } from '../../atleta/components/deportes/deportes.component';
import { RelacionesComponent } from '../../atleta/components/relaciones/relaciones.component';

const ANGULAR_MODULE = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  NgbModule,
];

const BOOSTRAP_MODULE = [NgbPaginationModule];

@Component({
  selector: 'app-reporte',
  imports: [ANGULAR_MODULE, BOOSTRAP_MODULE],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteComponent implements OnInit {
  private constantes = Constants;

  permisos: any = null;

  page: number = 1;
  size: number = 5;
  totalRecords: number = 4;

  sortColumn: string = '';
  sortOrder: string = '';

  listData: any[] = [];
  estados: any[] = [];
  deportes: any[] = [];
  selectListItems: number[] = this.constantes.paginacion.items;

  form!: FormGroup;
  formResult!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loadingDialog: LoadingDialogService,
    private modalService: NgbModal,
    private atletaService: AtletaService,
    private sportService: SportService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.inicializarData();
  }

  initForm = () => {
    this.form = this.formBuilder.group({
      filter: ['', []],
      sport_id: [null, []],
      state_id: [null, []],
    });
  };

  async inicializarData(): Promise<void> {
    this.initForm();

    this.deportes = (await this.sportService.list()) ?? [];
    this.estados = (await this.stateService.list()) ?? [];

    await this.onConsultar();
  }

  async onConsultar(): Promise<void> {
    this.loadingDialog.show();

    const dato = {
      filter: this.form.controls['filter'].value ?? '',
      state_id: this.form.controls['state_id'].value,
      sport_id: this.form.controls['sport_id'].value,
    };

    const atletas = await this.atletaService.report(dato);
    this.listData = atletas ?? [];

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

  onVerDeportes = (item: any) => {
    const modalRef = this.modalService.open(DeportesComponent, {
      centered: false,
      windowClass: 'modal-xl',
    });

    modalRef.componentInstance.data = {
      athletaId: item.id,
      athleta: item,
    };
    modalRef.componentInstance.reporte = true;
  };

  onVerRelaciones = (item: any) => {
    const modalRef = this.modalService.open(RelacionesComponent, {
      centered: false,
      windowClass: 'modal-xl',
    });

    modalRef.componentInstance.data = {
      athletaId: item.id,
      athleta: item,
    };
    modalRef.componentInstance.reporte = true;
  };


  onExportar = () => {
    const datos = this.listData; // tu arreglo JSON

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Athletas');

    // Define columnas
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Cédula', key: 'cedula' },
      { header: 'Nombre', key: 'nombre' },
      { header: 'Apellido', key: 'apellido' },
      { header: 'Teléfono', key: 'telefono' },
      { header: 'Correo', key: 'correo' },
      { header: 'Dirección', key: 'direccion' },
      { header: 'Estado', key: 'estado' },
      { header: 'Deportes', key: 'deportes' },
      { header: 'Foto', key: 'foto' }
    ];

    const headerRow = worksheet.getRow(1);
  headerRow.eachCell(cell => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9D9D9' } // gris claro
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

    // Agrega filas con datos planos
    datos.forEach(item => {
      worksheet.addRow({
        id: item.id,
        cedula: item.people?.cedula || '',
        nombre: item.people?.first_name || '',
        apellido: item.people?.last_name || '',
        telefono: item.people?.phone_number || '',
        correo: item.people?.email || '',
        direccion: item.people?.address || '',
        estado: item.states?.name_state || '',
        deportes: item.athleta_sport.map((s: any) => s.sport.name).join(', '),
        foto: item.profile_photo || ''
      });
    });

    // Ajusta el ancho de columnas al contenido
    worksheet.columns.forEach((column: any) => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, (cell: any) => {
        const cellValue = cell.value ? cell.value.toString() : '';
        maxLength = Math.max(maxLength, cellValue.length);
      });
      column.width = maxLength + 2;
    });

    const formattedDate = format(new Date(), 'ddMMyyyyHHmmss');
    // Guarda el archivo
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `athletas_${formattedDate}.xlsx`);
    });
  }
}

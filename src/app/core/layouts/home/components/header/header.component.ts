import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [NgFor, NgIf, NgClass, RouterModule]
})

export class HeaderComponent implements OnInit {
  @Input() esLogeado = false;
  @Input() esInterno = false;

  showMenuMovil = false;
  showMegaMenuServicios = false;
  showMegaMenuGestion = false;

  categoriaSeleccionadaServicios = '';
  categoriaSeleccionadaGestion = '';

  categoriasServicios: any[] = [];
  categoriasServicios1 = [
    {
      nombre: 'Propiedad Intelectual',
      icon: 'assets/icons/icons-special/icon_propiedad_intelectual.svg',
      columns: [
        {
          title: 'Signos Distintivos',
          items: [
            { label: 'Asesoría virtual de Marcas', route: '/asesoria-virtual-marcas' },
            { label: 'Registra tu marca', route: '/registra-marca' },
            { label: 'Consulta tu Trámite', route: '/consulta-tramite' },
            { label: 'Renovación de Registro de Marcas', route: '/renovacion-registro-marcas' },
            { label: 'Busca tu Marca', route: '/busca-tu-marca' },
            { label: 'Gaceta Electrónica', route: '/gaceta-electronica' },
            { label: 'Buscador Peruanizado', route: '/buscador-peruanizado' },
            { label: 'Plataforma de Marcas Colectivas - Externo', route: '/marcas-colectivas-externo' },
            { label: 'Plataforma de Marcas Colectivas - Interno', route: '/marcas-colectivas-interno' }
          ]

        },
        {
          title: 'Derechos de Autor',
          items: [

            { label: 'Registro de Obras', route: '/registro-obras' },
            { label: 'Sintonízate', route: '/sintonizate' },
            { label: 'Catálogo de obras de dominio público', route: '/catalogo-obras-dominio-publico' },
            { label: 'Segunda opción', route: '/segunda-opcion' }
          ]

        },
        {
          title: 'Invenciones',
          items: [
            { label: 'Registro de Patentes PCT', route: '/registro-patentes-pct' },
            { label: 'Sistema UPOV Prisma para variedades vegetales', route: '/sistema-upov-prisma' },
            { label: 'Identi-Pat', route: '/identi-pat' }
          ]
        },
        {
          title: 'Opciones de Consulta',
          specialRows: [
            { icon: 'assets/icons/icons-special/icon_search.svg', label: 'Buscador de Resoluciones', route: '/buscador-resoluciones' },
            { icon: 'assets/icons/icons-special/icon_file_folder.svg', label: 'Consulta tu Expediente', route: '/consulta-expediente' }
          ]
        }
      ]
    },
    {
      nombre: 'Protección al Consumidor',
      icon: 'assets/icons/icons-special/icon_proteccion_consumidor.svg',
      columns: [
        {
          title: 'Denuncias',
          items: [
            { label: 'Denuncia 1', route: '/denuncia1' },
            { label: 'Denuncia 2', route: '/denuncia2' }
          ]
        },
        {
          title: 'Reclamos',
          items: [
            { label: 'Reclamo 1', route: '/reclamo1' },
            { label: 'Reclamo 2', route: '/reclamo2' }
          ]
        },
        {
          title: 'Atención',
          items: [
            { label: 'Atención Telefónica', route: '/atencion-telefonica' }
          ]
        },
        {
          title: 'Información',
          items: [
            { label: 'Guías', route: '/guias' },
            { label: 'FAQs', route: '/faqs' }
          ]
        }
      ]
    },
    {
      nombre: 'Eliminación de Barreras Burocráticas',
      icon: 'assets/icons/icons-special/icon_barrera_burocratica.svg',
      columns: [
        {
          title: 'Solicitudes',
          items: [
            { label: 'Nueva Solicitud', route: '/nueva-solicitud' },
            { label: 'Historial', route: '/historial-solicitudes' }
          ]
        },
        {
          title: 'Reportes',
          items: [
            { label: 'Reporte Mensual', route: '/reporte-mensual' },
            { label: 'Reporte Anual', route: '/reporte-anual' }
          ]
        },
        {
          title: 'Asesoría',
          items: [
            { label: 'Asesoría en Línea', route: '/asesoria-linea' }
          ]
        },
        {
          title: 'Recursos',
          items: [
            { label: 'Documentación', route: '/documentacion' },
            { label: 'Estadísticas', route: '/estadisticas' }
          ]
        }
      ]
    },
    {
      nombre: 'Dumping y Subsidios',
      icon: 'assets/icons/icons-special/icon_dumping.svg',
      columns: []
    },
    {
      nombre: 'Libre Competencia',
      icon: 'assets/icons/icons-special/icon_libre_competencia.svg',
      columns: []
    },
    {
      nombre: 'Concursal',
      icon: 'assets/icons/icons-special/icon_libre_competencia.svg',
      columns: []
    },
    {
      nombre: 'Fiscalización de la Competencia Desleal',
      icon: 'assets/icons/icons-special/icon_competencia.svg',
      columns: []
    },
    {
      nombre: 'Firma Electrónica',
      icon: 'assets/icons/icons-special/icon_firma_electronica.svg',
      columns: []
    }
  ];

  categoriasGestion = [
    {
      nombre: 'Expediente',
      icon: 'assets/icons/icons-special/icon_expediente.svg',
      columns: [
        {
          title: 'Usuarios',
          items: [
            { label: 'Crear Usuario', route: '/crear-usuario' },
            { label: 'Modificar Usuario', route: '/modificar-usuario' }
          ]
        },
        {
          title: 'Permisos',
          items: [
            { label: 'Eliminar Usuario', route: '/eliminar-usuario' }
          ]
        },
        {
          title: 'Reportes',
          items: [
            { label: 'Listado Usuarios', route: '/listado-usuarios' }
          ]
        },
        {
          title: 'Otras Funciones',
          items: [
            { label: 'Backup', route: '/backup' },
            { label: 'Restaurar', route: '/restaurar' }
          ]
        }
      ]
    },
    {
      nombre: 'Gestión de salas',
      icon: 'assets/icons/icons-special/icon_gestion_salas.svg',
      columns: [
        {
          title: 'Roles',
          items: [
            { label: 'Asignar Roles', route: '/asignar-roles' }
          ]
        },
        {
          title: 'Permisos',
          items: [
            { label: 'Reasignar Permisos', route: '/reasignar-permisos' }
          ]
        },
        {
          title: 'Reportes',
          items: [
            { label: 'Reporte de Roles', route: '/reporte-roles' }
          ]
        },
        {
          title: 'Otras Opciones',
          items: [
            { label: 'Importar', route: '/importar' },
            { label: 'Exportar', route: '/exportar' }
          ]
        }
      ]
    }
  ];

  @ViewChild('serviciosMenuContainer') serviciosMenuContainer!: ElementRef;
  @ViewChild('gestionMenuContainer') gestionMenuContainer!: ElementRef;
  @ViewChild('serviciosTrigger') serviciosTrigger!: ElementRef;
  @ViewChild('gestionTrigger') gestionTrigger!: ElementRef;

  constructor() { }

  ngOnInit() { }

  get logo(): string {
    return "assets/images/logo-indecopi.svg";
  }

  get marca(): string {
    return "assets/icons/icon-busca-tu-marca.svg";
  }

  toggleMegaMenu(menu: 'servicios' | 'gestion' | 'sucursales') {
    if (menu !== 'servicios') this.showMegaMenuServicios = false;
    if (menu !== 'gestion') this.showMegaMenuGestion = false;

    if (menu === 'servicios') {
      this.showMegaMenuServicios = !this.showMegaMenuServicios;
      if (this.showMegaMenuServicios) {
        this.categoriaSeleccionadaServicios = this.categoriasServicios[0]?.nombre ?? '';
      } else {
        this.categoriaSeleccionadaServicios = '';
      }
    } else if (menu === 'gestion') {
      this.showMegaMenuGestion = !this.showMegaMenuGestion;
      if (this.showMegaMenuGestion) {
        this.categoriaSeleccionadaGestion = this.categoriasGestion[0]?.nombre ?? '';
      } else {
        this.categoriaSeleccionadaGestion = '';
      }
    }
  }

  seleccionarCategoria(menu: 'servicios' | 'gestion' | 'sucursales', nombre: string, event: MouseEvent) {
    event.stopPropagation();
    if (menu === 'servicios') {
      this.categoriaSeleccionadaServicios = nombre;
    } else if (menu === 'gestion') {
      this.categoriaSeleccionadaGestion = nombre;
    }
  }

  getColumnsCategoria(menu: 'servicios' | 'gestion' | 'sucursales', nombre: string): {
    title: string,
    items?: { label: string, route: string }[],
    specialRows?: { icon: string, label: string, route: string }[]
  }[] {
    let data;
    if (menu === 'servicios') {
      data = this.categoriasServicios.find(c => c.nombre === nombre);
    } else if (menu === 'gestion') {
      data = this.categoriasGestion.find(c => c.nombre === nombre);
    }
    return data ? data.columns : [];
  }

  getCategoryIcon(menu: 'servicios' | 'gestion' | 'sucursales', nombre: string): string {
    let category;
    if (menu === 'servicios') {
      category = this.categoriasServicios.find(c => c.nombre === nombre);
    } else if (menu === 'gestion') {
      category = this.categoriasGestion.find(c => c.nombre === nombre);
    }
    return category?.icon || 'assets/icons/default.svg';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedInsideServicios = this.serviciosTrigger?.nativeElement.contains(event.target) ||
      this.serviciosMenuContainer?.nativeElement.contains(event.target);
    const clickedInsideGestion = this.gestionTrigger?.nativeElement.contains(event.target) ||
      this.gestionMenuContainer?.nativeElement.contains(event.target);

    if (!clickedInsideServicios) {
      this.showMegaMenuServicios = false;
      this.categoriaSeleccionadaServicios = '';
    }
    if (!clickedInsideGestion) {
      this.showMegaMenuGestion = false;
      this.categoriaSeleccionadaGestion = '';
    }

  }

  toggleHamburger() {
    this.showMenuMovil = !this.showMenuMovil;
  }
}

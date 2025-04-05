import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [RouterModule, NgClass]
})

export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  @Input() showTemplate = false;
  @Input() esInterno = false;

  isExpanded = false;

  MOCK_MENU_ITEMS: MenuItem[] = [
    {
      icon: 'assets/icons/icon-variables-yellow.svg',
      description: 'Variables',
      url: '/plantilla-componentes/tipografia'
    },
    {
      icon: 'assets/icons/icon-sesiones-yellow.svg',
      description: 'Components',
      expanded: false,
      items: [
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Header y footer',
          url: '/plantilla-componentes/header-footer'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Forms (input, select, radio)',
          url: '/plantilla-componentes/forms'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Cards',
          url: '/plantilla-componentes/cards'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Table y pagination',
          url: '/plantilla-componentes/table'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Modals y alerts',
          url: '/plantilla-componentes/modals'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Botones',
          url: '/plantilla-componentes/buttons'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Tooltip y popover',
          url: '/plantilla-componentes/tooltip'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Datepicker y diagram',
          url: '/plantilla-componentes/datepicker'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Stepper y tabs',
          url: '/plantilla-componentes/stepper'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Accordion',
          url: '/plantilla-componentes/accordions'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Menú Lateral',
          url: '/plantilla-componentes/menu-lateral'
        }
      ]
    },
    {
      icon: 'assets/icons/icon-plantillas-yellow.svg',
      description: 'Plantillas',
      expanded: false,
      items: [
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Login',
          url: '/gestion-salas/login'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Plantilla Pública 01',
          url: '/plantilla-publica'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Plantilla Pública 02',
          url: '/plantilla-publica/consulta'
        },
        {
          icon: 'assets/icons/icon-document-gray.svg',
          description: 'Plantilla Interna 01',
          url: '/gestion-salas/consulta'
        }
      ]
    }
  ]
  constructor(private router: Router) {

  }
  onToggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    this.toggleSidebar.emit();
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.toggleSidebar.emit(this.isExpanded);
  }

  selectedMenuOption(item: MenuItem) {
    this.MOCK_MENU_ITEMS.map(menuItem => {
      menuItem.active = false
      return menuItem;
    });
    item.expanded = !item.expanded;
    item.active = !item.active;
  }
  isActive(url: any): boolean {
    return this.router.url === url; // Coincidencia exacta
  }
}

export interface MenuItem {
  icon: string;
  description: string;
  url?: string;
  items?: MenuItem[];
  expanded?: boolean;
  active?: boolean;
}

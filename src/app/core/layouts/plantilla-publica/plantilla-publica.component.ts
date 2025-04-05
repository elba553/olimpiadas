import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { BannerComponent } from '../../../modules/plantilla-publica/components/banner/banner.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../home/components/sidebar/sidebar.component';
import { HeaderComponent } from '../home/components/header/header.component';
import { filter, map, mergeMap, of, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PlantillaPublicaService } from './plantilla-publica.service';

@Component({
  standalone: true,
  selector: 'app-plantilla-publica',
  templateUrl: './plantilla-publica.component.html',
  styleUrls: ['./plantilla-publica.component.scss'],
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule,
    BannerComponent,
    FooterComponent,

  ],
})
export class PlantillaPublicaComponent implements OnInit {
  isCollapsed = false;
  sub: any;
  subjectSidebar$;
  subjectBanner$;
  showSideBar: boolean = true;
  subjectBanner: boolean = true;

  constructor(
    public __plantillaPublicaService: PlantillaPublicaService,
    private cdr: ChangeDetectorRef
  ) {
    this.subjectSidebar$ = this.__plantillaPublicaService.subjectSidebar$;
    this.subjectBanner$ = this.__plantillaPublicaService.subjectBanner$;
  }

  ngOnInit() {
    this.subjectSidebar$.subscribe((state) => {
      this.showSideBar = state;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });

    this.subjectBanner$.subscribe((state) => {
      this.subjectBanner = state;
      this.cdr.detectChanges(); // Forzar la detección de cambios
    });
  }
  toggleSidebar(isExpanded: boolean): void {
    this.isCollapsed = isExpanded;
  }

}

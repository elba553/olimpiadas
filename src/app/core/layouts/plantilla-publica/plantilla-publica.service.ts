import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})

export class PlantillaPublicaService {
    public subjectSidebar = new Subject<boolean>();
    public subjectBanner = new Subject<boolean>();
    constructor() {

    }

    get subjectSidebar$(): Observable<boolean> {
        return this.subjectSidebar.asObservable();
    }

    setSidebarState(state: boolean): void {
        this.subjectSidebar.next(state);
    }

    get subjectBanner$(): Observable<boolean> {
        return this.subjectBanner.asObservable();
    }

    setBannerState(state: boolean): void {
        this.subjectBanner.next(state);
    }
}

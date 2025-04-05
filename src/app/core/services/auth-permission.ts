import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthPermissionService {
  private permissionsSubject = new BehaviorSubject<any>({});
  permissions$ = this.permissionsSubject.asObservable();

  constructor() {}

  setPermissions(permissions: any) {
    this.permissionsSubject.next(permissions);
  }

  getPermissions(keyModulo: string): any {
    return this.permissionsSubject.value?.[keyModulo];
  }
}

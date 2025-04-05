import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../../utils/constantes';
import { Utils } from '../../utils/utils';
import { AuthPermissionService } from './auth-permission';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = Constants.auth;

  constructor(private authPermissionService: AuthPermissionService) {}

  saveToken = (token: string): void => {
    if(token && token != ''){
      const expirationTime = new Date().getTime() + this.auth.expirationTime;
      localStorage.setItem(this.auth.appKey, token);
      localStorage.setItem(this.auth.expirationKey, expirationTime.toString());
      return;
    }

    this.logout();
  };

  getToken = (): string | null => {
    return localStorage.getItem(this.auth.appKey);
  };

  logout = () => {
    localStorage.removeItem(this.auth.appKey);
    localStorage.removeItem(this.auth.expirationKey);
    localStorage.clear();

    this.authPermissionService.setPermissions({});
  };

  setUsuario = (usuario: any) => {
    localStorage.setItem(
      this.auth.usuarioKey,
      JSON.stringify(usuario)
    );

    this.authPermissionService.setPermissions(Utils.getPermisosPerfil(usuario?.nuIdPerfil));
  }

  getPerfil = () =>{
    const usuario = JSON.parse(localStorage.getItem(this.auth.usuarioKey) ?? 'null');
    if(usuario){
      return usuario.roles?.type_rol;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.auth.appKey);
    const expiration = localStorage.getItem(this.auth.expirationKey);

    if (!token || !expiration) {
      return false;
    }

    const now = new Date().getTime();
    if (now > Number(expiration)) {
      this.logout();
      return false;
    }

    return true;
  }

}

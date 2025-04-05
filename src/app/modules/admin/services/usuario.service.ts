import { Injectable } from '@angular/core';
import { supabase } from '../../../core/services/supabase.service';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  // agrega otros campos que tenga tu tabla
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor() {}

  async login(dato: any): Promise<any | null> {
    const { data, error } = await supabase
      .from('users')
      .select('username, roles (id, type_rol)')
      .eq('username', dato?.username)
      .eq('password', dato?.password);

    return error ? null : data[0];
  }

  async add(dato: any): Promise<boolean> {
    const { error } = await supabase
      .from('users')
      .insert([
        {
          username: dato?.username,
          password: dato?.password,
          email: dato?.email,
          rol_id: dato?.rol_id,
          phone_number: dato?.phone_number,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async list(filter: string): Promise<any[] | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*, roles!inner (type_rol)')
      .ilike('username', `${filter}%`);

    return error ? null : data;
  }

  async edit(dato: any): Promise<boolean> {
    const { error } = await supabase
      .from('users')
      .update({
        username: dato.username,
        password: dato.password,
        email: dato.email,
        phone_number: dato.phone_number,
        rol_id: dato.rol_id,
      })
      .eq('id', dato.id)
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async delete(id: any): Promise<boolean> {
    const { error } = await supabase.from('users').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  }

  async get(id: any): Promise<any | null> {
    const { data, error } = await supabase.from('users').select().eq('id', id);

    return error ? null : data?.[0];
  }
}

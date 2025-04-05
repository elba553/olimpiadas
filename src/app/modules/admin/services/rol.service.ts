import { Injectable } from '@angular/core';
import { supabase } from '../../../core/services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  //await supabase.auth.signOut();

  constructor() { }

  async list(filter: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .ilike('type_rol', `${filter}%`);

    return error ? [] : data;
  }

  async add(dato: any): Promise<boolean> {

    const { error } = await supabase
      .from('roles')
      .insert([
        { type_rol: dato?.rol },
      ])
      .select();

    if (error) {
      throw error;
    }

    return true;

  }

  async edit(dato: any): Promise<boolean> {

    const { data, error } = await supabase
      .from('roles')
      .update({ type_rol: dato.rol })
      .eq('id', dato.id)
      .select()

    if (error) {
      throw error;
    }

    return true;
  }

  async delete(id: any): Promise<boolean> {

    const { error } = await supabase
      .from('roles')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  }

  async get(id: any): Promise<any | null> {
    await supabase.auth.getSession();

    const { data, error } = await supabase
      .from('roles')
      .select()
      .eq('id', id);

    return error ? null : data?.[0];

  }
}

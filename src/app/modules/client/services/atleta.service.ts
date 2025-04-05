import { Injectable } from '@angular/core';
import { supabase } from '../../../core/services/supabase.service';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class AtletaService {
  constructor() {}

  async add(dato: any): Promise<boolean> {
    const oPersona = await this.getPeople(dato?.people?.cedula);

    if (!oPersona) {
      dato.people = await this.addPeople(dato?.people);
    } else {
      throw Error('La cédula ya existe');
    }

    const { error } = await supabase
      .from('athleta')
      .insert([
        {
          profile_photo: dato?.profile_photo,
          people_id: dato?.people?.id,
          state_id: dato?.state_id,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async report(dato: any): Promise<any[] | null> {
    console.log('dato', dato);
    const { data, error } = await supabase
      .from('athleta')
      .select(
        `
        *,
        athleta_sport!inner (
        *,
        sport!inner (*)
        ),
        people!inner (*),
        states!inner (*)
        `
      )
      .ilike('people.cedula', `${dato.filter}%`)
      .or(dato.state_id ? `id.eq.${dato.state_id}` : `id.gte.0`, {
        foreignTable: 'state_id',
        referencedTable: 'states',
      })
      .or(dato.sport_id ? `sport_id.eq.${dato.sport_id}` : `id.gte.0`, {
        foreignTable: 'athleta_id',
        referencedTable: 'athleta_sport',
      });

    if (error) {
      console.log('error', error);
    }
    console.log('data', data);
    return error ? null : data;
  }

  async list(filter: any): Promise<any[] | null> {
    const { data, error } = await supabase
      .from('athleta')
      .select(
        `
        *,
        people!inner (*),
        states!inner (*)
        `
      )
      .ilike('people.cedula', `${filter}%`);

    console.log('error', error);
    console.log('data', data);
    return error ? null : data;
  }

  async edit(dato: any): Promise<boolean> {
    await this.editPeople(dato.people);
    const { error } = await supabase
      .from('athleta')
      .update({
        profile_photo: dato?.profile_photo,
      })
      .eq('id', dato.id)
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async delete(id: any): Promise<boolean> {
    const { error } = await supabase.from('athleta').delete().eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  }

  async get(id: any): Promise<any | null> {
    const { data, error } = await supabase
      .from('athleta')
      .select('*, people!inner(*), states!inner(*)')
      .eq('id', id);

    return error ? null : data?.[0];
  }

  //deportes
  async listSport(id: any): Promise<any[] | null> {
    const { data, error } = await supabase
      .from('athleta_sport')
      .select('*, sport!inner(*)')
      .eq('athleta_id', id);

    return error ? null : data;
  }

  async addSport(dato: any): Promise<boolean> {
    const { data } = await supabase
      .from('athleta_sport')
      .select()
      .eq('sport_id', dato.sport_id)
      .eq('athleta_id', dato.athleta_id);

    if (data && data?.length > 0) {
      throw new Error('El atleta ya tiene el deporte seleccionado');
    }

    const { error } = await supabase
      .from('athleta_sport')
      .insert([
        {
          sport_id: dato?.sport_id,
          athleta_id: dato?.athleta_id,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async deleteSport(id: any): Promise<boolean> {
    const { error } = await supabase
      .from('athleta_sport')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  }

  //relationship

  async getRelationship(id: any): Promise<any | null> {
    const { data, error } = await supabase
      .from('athleta_parents')
      .select()
      .eq('people_id', id);

    return error ? null : data?.[0];
  }

  async addRelationship(dato: any): Promise<boolean> {
    const oPersona = await this.getPeople(dato?.people?.cedula);

    if (!oPersona) {
      dato.people = await this.addPeople(dato?.people);
    } else {
      dato.people = await this.getPeople(dato?.people?.cedula);
    }

    const { error } = await supabase
      .from('athleta_parents')
      .insert([
        {
          relationship: dato?.relationship,
          people_id: dato?.people?.id,
          athleta_id: dato?.athleta_id,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async listRelationship(id: any): Promise<any[] | null> {
    const { data, error } = await supabase
      .from('athleta_parents')
      .select('*, people!inner(*)')
      .eq('athleta_id', id);

    return error ? null : data;
  }

  async deleteRelationship(id: any): Promise<boolean> {
    const { error } = await supabase
      .from('athleta_parents')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return true;
  }

  //people
  async getPeople(cedula: string): Promise<any | null> {
    const { data, error } = await supabase
      .from('people')
      .select()
      .eq('cedula', cedula);

    return error ? null : data?.[0];
  }

  async addPeople(dato: any): Promise<any> {
    const { data, error } = await supabase
      .from('people')
      .insert([
        {
          first_name: dato?.first_name,
          last_name: dato?.last_name,
          email: dato?.email,
          address: dato?.address,
          phone_number: dato?.phone_number,
          cedula: dato?.cedula,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return data[0];
  }

  async editPeople(dato: any): Promise<any> {
    const { data, error } = await supabase
      .from('people')
      .update({
        first_name: dato?.first_name,
        last_name: dato?.last_name,
        email: dato?.email,
        address: dato?.address,
        phone_number: dato?.phone_number,
        cedula: dato?.cedula,
      })
      .eq('id', dato.id)
      .select();

    if (error) {
      throw error;
    }

    return true;
  }

  async uploadFile(file: File): Promise<string> {
    const formattedDate = format(new Date(), 'ddMMyyyyHHmmss');
    const imagePath = `profiles/${file.name}_${formattedDate}`;
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(imagePath, file, { upsert: true });

    if (error) {
      throw new Error('Error al cargar la imagen: ' + error.message);
    }

    return supabase.storage.from('uploads').getPublicUrl(imagePath).data
      .publicUrl;
  }

  async updateAllAtletasAvatar() {


    const atletas = await supabase

  }



    


}

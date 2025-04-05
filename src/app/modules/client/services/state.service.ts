import { Injectable } from '@angular/core';
import { supabase } from '../../../core/services/supabase.service';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor() {}

  async list(): Promise<any[] | null> {
    const { data, error } = await supabase
      .from('states')
      .select('*');

    return error ? null : data;
  }
}

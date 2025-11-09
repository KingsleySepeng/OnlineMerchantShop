import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {environment} from "../environment";


@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly _client: SupabaseClient;
  constructor() {
    this._client = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }
  get client() { return this._client; }
}

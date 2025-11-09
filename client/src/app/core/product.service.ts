import {Injectable} from '@angular/core';
import {SupabaseService} from './supabase.service';


export interface Product {
  id: number;
  name: string;
  price_cents: number;
  image_url?: string
}


@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private supa: SupabaseService) {
  }


  async list(): Promise<Product[]> {
    const {data, error} = await this.supa.client
      .from('products')
      .select('*')
      .eq('active', true)
      .order('id', {ascending: true});
    if (error) throw error;
    return data as Product[];
  }
}

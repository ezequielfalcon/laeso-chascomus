import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import {Response} from '@angular/http';

@Injectable()
export class ProductosService {

  constructor(
    private http: HttpVeaService
  ) { }

  verCategorias() {
    return this.http.get('/productos/categorias').map((response: Response) => response.json().datos);
  }

  verUnidades() {
    return this.http.get('/productos/unidades').map((response: Response) => response.json().datos);
  }

  borrarUnidad(unidadId: number) {
    return this.http.del('/productos/unidades/' + unidadId).map((response: Response) => response.json());
  }

  verProductosFull() {
    return this.http.get('/productos-full').map((response: Response) => response.json().datos);
  }

  borrarProducto(productoId: number) {
    return this.http.del('/productos/' + productoId).map((response: Response) => response.json());
  }

  borrarCategoria(categoriaId: number) {
    return this.http.del('/productos/categorias/' + categoriaId).map((response: Response) => response.json());
  }

  verProducto(productoId: number) {
    return this.http.get('/productos-por-id/' + productoId).map((response: Response) => response.json().datos);
  }

  nuevoProducto(nombre: string, stock_minimo: number, codigo: string, iva: string,
                id_categoria: number, id_unidad: number) {
    const body = {
      nombre: nombre,
      stock_minimo: stock_minimo,
      iva: iva,
      codigo: codigo,
      id_categoria: id_categoria,
      id_unidad: id_unidad
    };
    return this.http.post('/productos', body).map((response: Response) => response.json());
  }

  nuevoProductoRand(nombre: string, stock_minimo: number, iva: string,
                    id_categoria: number, id_unidad: number) {
    const body = {
      nombre: nombre,
      stock_minimo: stock_minimo,
      iva: iva,
      id_categoria: id_categoria,
      id_unidad: id_unidad
    };
    return this.http.post('/producto-rand', body).map((response: Response) => response.json());
  }

  modificarProducto(productoId: number, nombre: string, stock_minimo: number, codigo: string, iva: string,
                id_categoria: number, id_unidad: number) {
    const body = {
      nombre: nombre,
      stock_minimo: stock_minimo,
      iva: iva,
      codigo: codigo,
      id_categoria: id_categoria,
      id_unidad: id_unidad
    };
    return this.http.put('/productos/' + productoId, body).map((response: Response) => response.json().id);
  }

  nuevaCategoria(nombre: string) {
    const body = {
      nombre: nombre
    };
    return this.http.post('/productos/categorias', body).map((response: Response) => response.json().id);
  }

  nuevaUnidad(nombre: string) {
    const body = {
      nombre: nombre
    };
    return this.http.post('/productos/unidades', body).map((response: Response) => response.json().id);
  }

}

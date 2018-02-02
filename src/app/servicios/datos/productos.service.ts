import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';

@Injectable()
export class ProductosService {

  constructor(
    private http: HttpVeaService
  ) { }

  verCategorias() {
    return this.http.get('/productos/categorias').map(response => response['datos']);
  }

  verUnidades() {
    return this.http.get('/productos/unidades').map(response => response['datos']);
  }

  borrarUnidad(unidadId: number) {
    return this.http.del('/productos/unidades/' + unidadId);
  }

  verProductosFull() {
    return this.http.get('/productos-full').map(response => response['datos']);
  }

  borrarProducto(productoId: number) {
    return this.http.del('/productos/' + productoId);
  }

  borrarCategoria(categoriaId: number) {
    return this.http.del('/productos/categorias/' + categoriaId).map(response => response['datos']);
  }

  verProducto(productoId: number) {
    return this.http.get('/productos-por-id/' + productoId).map(response => response['datos']);
  }

  nuevoProducto(nombre: string, stock_minimo: number, codigo: string, iva: string,
                id_categoria: number, id_unidad: number, es_ingrediente: boolean) {
    const body = {
      nombre: nombre,
      stock_minimo: stock_minimo,
      iva: iva,
      codigo: codigo,
      id_categoria: id_categoria,
      id_unidad: id_unidad,
      es_ingrediente: es_ingrediente
    };
    return this.http.post('/productos', body);
  }

  nuevoProductoRand(nombre: string, stock_minimo: number, iva: string,
                    id_categoria: number, id_unidad: number, es_ingrediente: boolean) {
    const body = {
      nombre: nombre,
      stock_minimo: stock_minimo,
      iva: iva,
      id_categoria: id_categoria,
      id_unidad: id_unidad,
      es_ingrediente: es_ingrediente
    };
    return this.http.post('/producto-rand', body);
  }

  modificarProducto(productoId: number, nombre: string, stock_minimo: number, codigo: string, iva: string,
                id_categoria: number, id_unidad: number, es_ingrediente: boolean) {
    const body = {
      nombre: nombre,
      stock_minimo: stock_minimo,
      iva: iva,
      codigo: codigo,
      id_categoria: id_categoria,
      id_unidad: id_unidad,
      es_ingrediente: es_ingrediente
    };
    return this.http.put('/productos/' + productoId, body).map(response => response['id']);
  }

  nuevaCategoria(nombre: string) {
    const body = {
      nombre: nombre
    };
    return this.http.post('/productos/categorias', body).map(response => response['id']);
  }

  nuevaUnidad(nombre: string) {
    const body = {
      nombre: nombre
    };
    return this.http.post('/productos/unidades', body).map(response => response['id']);
  }

  verProductosPrecios() {
    return this.http.get('/productos/precios').map(response => response['datos']);
  }

  verPreciosProducto(productoId: number) {
    return this.http.get('/productos/precios/' + productoId).map(response => response['datos']);
  }

  nuevoPrecio(productoId: number, precio: number) {
    const body = {
      precio: precio
    };
    return this.http.put('/productos/precios/' + productoId, body).map(response => response['id']);
  }

}

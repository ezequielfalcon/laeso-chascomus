import { Injectable } from '@angular/core';
import {HttpVeaService} from '../http-vea.service';
import { Producto } from '../../modelos/producto';

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

  nuevoProducto(p: Producto) {
    const body = {
      nombre: p.nombre,
      stock_minimo: p.stock_minimo,
      iva: p.iva,
      codigo: p.codigo,
      id_categoria: p.id_categoria,
      id_unidad: p.id_unidad,
      es_ingrediente: p.es_ingrediente,
      es_adicional: p.es_adicional
    };
    return this.http.post('/productos', body);
  }

  nuevoProductoRand(p: Producto) {
    const body = {
      nombre: p.nombre,
      stock_minimo: p.stock_minimo,
      iva: p.iva,
      id_categoria: p.id_categoria,
      id_unidad: p.id_unidad,
      es_ingrediente: p.es_ingrediente,
      es_adicional: p.es_adicional
    };
    return this.http.post('/producto-rand', body);
  }

  modificarProducto(p: Producto) {
    const body = {
      nombre: p.nombre,
      stock_minimo: p.stock_minimo,
      iva: p.iva,
      codigo: p.codigo,
      id_categoria: p.id_categoria,
      id_unidad: p.id_unidad,
      es_ingrediente: p.es_ingrediente,
      es_adicional: p.es_adicional
    };
    return this.http.put('/productos/' + p.id, body).map(response => response['id']);
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

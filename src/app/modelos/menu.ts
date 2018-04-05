import { Producto } from './producto';

export class Menu {
  id: number;
  id_menu_pedido: number;
  nombre: string;
  color: string;
  adicionales: Producto[];
  observaciones: string;
}

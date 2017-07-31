import { StockComponent } from './stock.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionesComponent } from './componentes/configuraciones/configuraciones.component';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { DetalleProveedorComponent } from './componentes/proveedores/detalle-proveedor/detalle-proveedor.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { DetalleProductoComponent } from './componentes/productos/detalle-producto/detalle-producto.component';
import { StockHomeComponent } from './componentes/stock-home/stock-home.component';
const stockRoutes: Routes = [
  { path: 'stock', component: StockComponent, children: [
    { path: 'configuraciones',  component: ConfiguracionesComponent },
    { path: 'configuraciones/:id', component: ConfiguracionesComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'proveedores/:id', component: DetalleProveedorComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'productos/:id', component: DetalleProductoComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(stockRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StockRoutingModule {

}

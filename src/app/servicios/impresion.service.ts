import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ImpresionService {

  constructor(
    private http: HttpClient
  ) {
    this.http = http;
  }

  imprimirPedido(numPedido: string, items: string) {
    const body = {
      npedido: numPedido,
      items: items
    };
    console.log('Mandando POST de impresión...');
    return this.http.post('http://localhost:5050/imprimir', body);
  }

}

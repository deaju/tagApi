import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../environments/environment';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketService {

  constructor(){}

  private url = API_ENDPOINT;
  private socket;

  connect():undefined{
    this.socket   = io( API_ENDPOINT + '/test');
    return;
  }

  emit( emitName: string, data? ){
    this.socket.emit( emitName, data );
  }

  on( onName: string ){
    let observable = new Observable( observer => {
      this.socket.on( onName, ( data ) => {
        observer.next( data );
      });

      return () => { this.socket.disconnect(); };
    } );
    return observable;
  }
  
  isExistSocket():boolean{
    return this.socket != null;
  }

}
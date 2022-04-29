
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import { SearchGiftsResponse, gif } from '../interfaces/gifs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

    private apikey:string = 'vYA9WapRu9jOp6fRb7jzJsFpU8qXm17d';
    private serviceUrl:string ='https://api.giphy.com/v1/gifs';
    private _historial:string [] =[];


  // cambiar luegoo a su tipo de datos
  public resultados:gif[] =[]; 

    get historial(){
      return [...this._historial];
    }

    constructor(private http: HttpClient){
     
      this._historial = JSON.parse(localStorage.getItem('historial')!)|| [] ;
      this.resultados = JSON.parse(localStorage.getItem('gift')!)|| [];
    }

    buscargifts(query:string = ''){

      query = query.trim().toLocaleLowerCase();

      if(!this._historial.includes( query )){
        this._historial.unshift( query );
        this._historial = this._historial.splice(0,10);
        localStorage.setItem('historial',JSON.stringify(this._historial));
       
      }

      const params = new HttpParams()
        .set('api_key',this.apikey)
        .set('limit','10')
        .set('lang','esp')
        .set('q',query);

      this.http.get<SearchGiftsResponse>(`${this.serviceUrl}/search`,{params})
          .subscribe( (resp) =>{
          this.resultados = resp.data;
          localStorage.setItem('gift',JSON.stringify(this.resultados));
     
          });
    }

}

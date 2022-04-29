import { Component} from '@angular/core';
import { GifsService } from '../../gifts/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  // styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {


  
  constructor(private giftsservice:GifsService ) { }

  get historial2(){
   return [...this.giftsservice.historial]
  }

  buscar(termino: string){
    this.giftsservice.buscargifts(termino);
  }
}
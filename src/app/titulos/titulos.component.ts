import { Component, OnInit } from '@angular/core';
import { TitulosService } from '../service/titulos.service';
import { AuthService } from '../service/auth.service';
import { TitulosData } from '../models/titulos-data.model';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {
  titulosData!: TitulosData[];

  constructor(private titulosService: TitulosService) { }

  ngOnInit() {
    this.titulosService.getTitulosData().subscribe(
      (data: TitulosData[]) => {
        this.titulosData = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}

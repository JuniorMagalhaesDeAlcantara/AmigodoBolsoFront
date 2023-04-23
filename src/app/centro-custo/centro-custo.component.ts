import { Component, OnInit, ViewChild } from '@angular/core';
import { CentroCustoService } from '../service/centro-custo.service';
import { AuthService } from '../service/auth.service';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html',
  styleUrls: ['./centro-custo.component.css']
})
export class CentroCustoComponent implements OnInit {
  centrocustoData!: CentrocustoData[];
  id!:number;
  descricao!: string;
  observacao!: string;
  modalFormulario: FormGroup;
  modalFormularioCriar: FormGroup;
  @ViewChild('content') content: any;
  @ViewChild('contentCriar') contentCriar: any;
  

  constructor(
    private centrocustoService: CentroCustoService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
  ) { 
    this.modalFormulario = this.formBuilder.group({
      id: [''],
      descricao: [''],
      observacao: ['']
    });

    this.modalFormularioCriar = this.formBuilder.group({
      descricao: [''],
      observacao: ['']
    });
    
  }

  ngOnInit() {
    this.centrocustoService.getCentrocustoData().subscribe(
      (data: CentrocustoData[]) => {
        this.centrocustoData = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  openEditarModal(content: any, id: number) {
    this.centrocustoService.getCentroCustoPorId(id).subscribe(centroCusto => {
      this.modalFormulario.patchValue({
        id: centroCusto.id,
        descricao: centroCusto.descricao,
        observacao: centroCusto.observacao
      });
    });

    this.modalService.open(content);
  }

openModal(contentCriar: any,id: number) {
  this.modalFormulario.patchValue({
    id:'',
    descricao:'',
    observacao: ''
  });
  this.modalService.open(contentCriar);
}

  editarCentroCusto(id: number, descricao: string, observacao: string, ) {
    // Chama o serviço para atualizar o centro de custo
    this.centrocustoService.atualizarCentroCusto(id, descricao, observacao).subscribe(
      res => {
        // Atualiza a lista de centros de custo
        this.centrocustoService.getCentrocustoData().subscribe(
          (data: CentrocustoData[]) => {
            this.centrocustoData = data;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  atualizarCentroCusto() {
    if (this.modalFormulario.valid) {
      // Obtém os valores do formulário
      const id = this.modalFormulario.value.id;
      const descricao = this.modalFormulario.value.descricao;
      const observacao = this.modalFormulario.value.observacao;
    
      // Chama o serviço para atualizar o centro de custo
      this.centrocustoService.atualizarCentroCusto(id, descricao, observacao).subscribe(
        res => {
          // Atualiza a lista de centros de custo
          this.centrocustoService.getCentrocustoData().subscribe(
            (data: CentrocustoData[]) => {
              this.centrocustoData = data;
            },
            error => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
    
      // Fecha o modal
      this.modalService.dismissAll();
    }
  }

  criarCentroCusto() {
    this.centrocustoService.criarCentroCusto(this.descricao, this.observacao).subscribe(
      res => {
        // Atualiza a lista de centros de custo
        this.centrocustoService.getCentrocustoData().subscribe(
          (data: CentrocustoData[]) => {
            this.centrocustoData = data;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  removerCentroCusto(id: number) {
    this.centrocustoService.removerCentroCusto(id).subscribe(
      res => {
        // Atualiza a lista de centros de custo
        this.centrocustoService.getCentrocustoData().subscribe(
          (data: CentrocustoData[]) => {
            this.centrocustoData = data;
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }
}
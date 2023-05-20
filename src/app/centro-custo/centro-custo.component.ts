import { Component, OnInit, ViewChild } from '@angular/core';
import { CentroCustoService } from '../service/centro-custo.service';
import { AuthService } from '../service/auth.service';
import { CentrocustoData } from '../models/centrocusto-data.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';



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
      descricao: ['', Validators.required], // Adiciona Validators.required para tornar o campo obrigatório
      observacao: ['']
    });
  
    this.modalFormularioCriar = this.formBuilder.group({
      descricao: ['', Validators.required], // Adiciona Validators.required para tornar o campo obrigatório
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
      // Verifica se os campos obrigatórios estão preenchidos
      if (this.modalFormulario.value.descricao && this.modalFormulario.value.observacao) {
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
  
                // Exibe o alerta de sucesso ao atualizar o centro de custo
                alert('Centro de custo atualizado com sucesso!');
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
      } else {
        // Exibe o alerta informando para preencher os campos obrigatórios
        alert('Por favor, preencha todos os campos obrigatórios antes de atualizar o centro de custo.');
  
        // Ou tome uma ação adequada para lidar com os campos não preenchidos
        console.log('Por favor, preencha todos os campos obrigatórios antes de atualizar o centro de custo.');
      }
    }
  }
  
  criarCentroCusto() {
    // Verifica se os campos obrigatórios estão preenchidos
    if (this.descricao && this.observacao) {
      this.centrocustoService.criarCentroCusto(this.descricao, this.observacao).subscribe(
        res => {
          // Atualiza a lista de centros de custo
          this.centrocustoService.getCentrocustoData().subscribe(
            (data: CentrocustoData[]) => {
              this.centrocustoData = data;
  
              // Exibe o alerta de sucesso ao criar o centro de custo
              alert('Centro de custo criado com sucesso!');
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
    } else {
      // Exibe o alerta informando para preencher os campos obrigatórios
      alert('Por favor, preencha todos os campos obrigatórios antes de criar o centro de custo.');
  
      // Ou tome uma ação adequada para lidar com os campos não preenchidos
      console.log('Por favor, preencha todos os campos obrigatórios antes de criar o centro de custo.');
    }
  }
  
  removerCentroCusto(id: number) {
    if (window.confirm('Tem certeza que deseja excluir esse centro de custo?')) {
      this.centrocustoService.removerCentroCusto(id).subscribe(
        res => {
          // Atualiza a lista de centros de custo
          this.centrocustoService.getCentrocustoData().subscribe(
            (data: CentrocustoData[]) => {
              this.centrocustoData = data;
            alert('Centro de custo removido com sucesso!');
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
  
}
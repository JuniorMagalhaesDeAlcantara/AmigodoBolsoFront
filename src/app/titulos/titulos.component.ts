import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CentrosDeCustosSelectData } from '../models/CentrosCustosSelect-data.model';
import { TitulosData } from '../models/titulos-data.model';
import { TitulosService } from '../service/titulos.service';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {
  idTitulo: number | undefined;
  titulosData: TitulosData[] = [];
  formularioTitulo!: FormGroup;
  centrosDeCustos: CentrosDeCustosSelectData[] = [];
  @ViewChild('content') content: any;
  @ViewChild('modalEditar') modalEditar: any;
  tituloEditando: TitulosData | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private titulosService: TitulosService,
    public modalService: NgbModal
  ) {}

  ngOnInit(): void {
      this.formularioTitulo = this.formBuilder.group({
      id: [null], // define the id control with initial value of null  
      descricao: [''],
      tipo: ['', Validators.required],
      valor: ['', Validators.required],
      dataCadastro: [new Date().toISOString()],
      dataVencimento: ['',],
      dataReferencia: ['',],
      observacao: ['',],
      centrosDeCustos:[null, Validators.required]
    });

    this.titulosService.getCentrosDeCusto().subscribe((centrosDeCustos: CentrosDeCustosSelectData[]) => {
      this.centrosDeCustos = centrosDeCustos;
    });

    this.getTitulos();
  }

  getTitulos() {
    this.titulosService.getTitulosData().subscribe((titulos: TitulosData[]) => {
      this.titulosData = titulos;
    });
  }

  excluirTitulo(id: number) {
    if (id !== undefined) {
      this.titulosService.excluirTitulo(id).subscribe(() => {
        // atualizar a lista de titulos após a exclusão
        this.getTitulos();
      });
    }
  }

  
  abrirModalCriarTitulo(content: any) {
    this.modalService.open(content);
  }


  onSubmit(): void {
    console.log(this.formularioTitulo.value);
    const dadosTitulo: TitulosData = {
      descricao: this.formularioTitulo.get('descricao')!.value,
      tipo: this.formularioTitulo.get('tipo')!.value,
      valor: parseFloat(this.formularioTitulo.get('valor')!.value.replace('.', '').replace(',', '.')),
      dataReferencia: new Date(),
      dataCadastro: new Date(),
      dataVencimento: this.formularioTitulo.get('dataVencimento')!.value,
      observacao: this.formularioTitulo.get('observacao')!.value,
      centrosDeCustos: [{ 
        id: Number(this.formularioTitulo.get('centrosDeCustos')!.value),
        descricao: this.centrosDeCustos.find(x => x.id === Number(this.formularioTitulo.get('centrosDeCustos')!.value))!.descricao,
      }]
    };
    
    this.titulosService.criarTitulo(dadosTitulo).subscribe(() => {
      this.modalService.dismissAll();
      this.formularioTitulo.reset();
      this.getTitulos();
    });
  }

  abrirModalEditarTitulo(titulo: TitulosData) {
    // preencher o formulário com os dados do título selecionado
    this.tituloEditando = titulo;
    this.formularioTitulo.setValue({
      id: titulo.id, // Adicione o ID aqui
      descricao: titulo.descricao,
      tipo: titulo.tipo,
      valor: titulo.valor,
      dataCadastro: titulo.dataCadastro,
      dataVencimento: titulo.dataVencimento,
      dataReferencia: titulo.dataReferencia,
      observacao: titulo.observacao,
      centrosDeCustos: [Number(titulo.centrosDeCustos?.[0]?.id)]
    });
    // abrir o modal de edição
    this.modalService.open(this.modalEditar);
  }
  
  salvarEdicao(): void {
    const dadosTitulo: TitulosData = {
      id: this.formularioTitulo.get('id')!.value,
      descricao: this.formularioTitulo.get('descricao')!.value,
      tipo: this.formularioTitulo.get('tipo')!.value,
      valor: parseFloat(this.formularioTitulo.get('valor')!.value.replace('.', '').replace(',', '.')),
      dataReferencia: new Date(),
      dataCadastro: new Date(),
      dataVencimento: this.formularioTitulo.get('dataVencimento')!.value,
      observacao: this.formularioTitulo.get('observacao')!.value,
      centrosDeCustos: [{ 
        id: Number(this.formularioTitulo.get('centrosDeCustos')!.value),
        descricao: this.centrosDeCustos.find(x => x.id === Number(this.formularioTitulo.get('centrosDeCustos')!.value))!.descricao,
      }]
    };
    
    if (dadosTitulo.id && dadosTitulo.id > 0) {
      this.titulosService.editarTitulo(dadosTitulo.id, dadosTitulo).subscribe(() => {
        this.modalService.dismissAll();
        this.formularioTitulo.reset();
        this.getTitulos();
      });
    }
  }


}

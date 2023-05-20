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
      if (confirm("Tem certeza que deseja excluir este título?")) {
        this.titulosService.excluirTitulo(id).subscribe(() => {
          // atualizar a lista de titulos após a exclusão
          this.getTitulos();
          alert("Título excluído com sucesso!");
        });
      }
    }
  }

  
  abrirModalCriarTitulo(content: any) {
    this.modalService.open(content);
  }


  onSubmit(): void {
    // Verifica se os campos obrigatórios estão preenchidos
    if (
      this.formularioTitulo.get('descricao')!.value &&
      this.formularioTitulo.get('tipo')!.value &&
      this.formularioTitulo.get('valor')!.value &&
      this.formularioTitulo.get('dataVencimento')!.value &&
      this.formularioTitulo.get('observacao')!.value &&
      this.formularioTitulo.get('centrosDeCustos')!.value
    ) {
      console.log(this.formularioTitulo.value);
      const dadosTitulo: TitulosData = {
        descricao: this.formularioTitulo.get('descricao')!.value,
        tipo: this.formularioTitulo.get('tipo')!.value,
        valor: parseFloat(
          this.formularioTitulo.get('valor')!.value.replace('.', '').replace(',', '.')
        ),
        dataReferencia: new Date(),
        dataCadastro: new Date(),
        dataVencimento: this.formularioTitulo.get('dataVencimento')!.value,
        observacao: this.formularioTitulo.get('observacao')!.value,
        centrosDeCustos: [
          {
            id: Number(this.formularioTitulo.get('centrosDeCustos')!.value),
            descricao: this.centrosDeCustos.find(
              (x) => x.id === Number(this.formularioTitulo.get('centrosDeCustos')!.value)
            )!.descricao,
          },
        ],
      };
  
      this.titulosService.criarTitulo(dadosTitulo).subscribe(() => {
        this.modalService.dismissAll();
        this.formularioTitulo.reset();
        this.getTitulos();
  
        // Exibe o alerta de sucesso
        alert('Título criado com sucesso!');
      });
    } else {
      // Exiba uma mensagem de erro ou tome uma ação adequada para lidar com os campos não preenchidos
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
  
  filtrarTitulosPorPeriodoCadastro() {
    const filtroDataCadastroInicio = this.formularioTitulo.get('dataCadastro')!.value;
    const filtroDataCadastroFim = this.formularioTitulo.get('dataCadastro')!.value;
    let periodoCadastroInicio: string | undefined;
    let periodoCadastroFim: string | undefined;
  
    if (filtroDataCadastroInicio) { 
      periodoCadastroInicio = new Date(filtroDataCadastroInicio).toISOString();
    }
  
    if (filtroDataCadastroFim) { 
      periodoCadastroFim = new Date(filtroDataCadastroFim).toISOString();
      periodoCadastroFim = periodoCadastroFim.split('T')[0] + 'T23:59:59.999Z';
    }
  
    this.titulosService.getTitulosData().subscribe((titulos: TitulosData[]) => {
      this.titulosData = titulos.filter((titulo: TitulosData) => {
        if (periodoCadastroInicio && periodoCadastroFim) {
          return new Date(titulo.dataCadastro) >= new Date(periodoCadastroInicio) && new Date(titulo.dataCadastro) <= new Date(periodoCadastroFim);
        } else if (periodoCadastroInicio) {
          return new Date(titulo.dataCadastro) >= new Date(periodoCadastroInicio);
        } else if (periodoCadastroFim) {
          return new Date(titulo.dataCadastro) <= new Date(periodoCadastroFim);
        }
        return true;
      });
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
      valor: parseFloat(
        this.formularioTitulo.get('valor')!.value.replace('.', '').replace(',', '.')
      ),
      dataReferencia: new Date(),
      dataCadastro: new Date(),
      dataVencimento: this.formularioTitulo.get('dataVencimento')!.value,
      observacao: this.formularioTitulo.get('observacao')!.value,
      centrosDeCustos: [
        {
          id: Number(this.formularioTitulo.get('centrosDeCustos')!.value),
          descricao: this.centrosDeCustos.find(
            (x) => x.id === Number(this.formularioTitulo.get('centrosDeCustos')!.value)
          )!.descricao,
        },
      ],
    };
  
    if (dadosTitulo.descricao && dadosTitulo.tipo && dadosTitulo.valor && dadosTitulo.dataVencimento && dadosTitulo.observacao && dadosTitulo.centrosDeCustos) {
      if (dadosTitulo.id && dadosTitulo.id > 0) {
        this.titulosService.editarTitulo(dadosTitulo.id, dadosTitulo).subscribe(
          () => {
            this.modalService.dismissAll();
            this.formularioTitulo.reset();
            this.getTitulos();
  
            // Exibe o alerta de sucesso
            alert('Título editado com sucesso!');
          },
          (error) => {
            // Exibe o alerta de erro
            alert('Erro ao editar o título. Por favor, tente novamente.');
  
            // Você também pode exibir informações adicionais sobre o erro no console
            console.log('Erro ao editar o título:', error);
          }
        );
      }
    } else {
      // Exibe o alerta informando para preencher campos obrigatórios
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }
  
  imprimir() {
    window.print();
  }


}

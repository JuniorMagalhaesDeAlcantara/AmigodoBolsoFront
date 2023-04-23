export interface TitulosData {
  id?: number;
  descricao?: string;
  tipo: string;
  centrosDeCustos?: {
    id: number;
    descricao: string;
   
  }[];
  valor: number;
  dataCadastro: Date;
  dataVencimento: Date;
  observacao: string;
  dataReferencia: Date;
}

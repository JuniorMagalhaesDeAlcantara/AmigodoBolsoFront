import { Component } from '@angular/core';

@Component({
  selector: 'app-dicas-para-o-bolso',
  templateUrl: './dicas-para-o-bolso.component.html',
  styleUrls: ['./dicas-para-o-bolso.component.css']
})
export class DicasParaOBolsoComponent {

  tabAtiva = 'artigos';

  alterarTab(tab: string) {
    this.tabAtiva = tab;
  }

  get isArtigosAtivo() {
    return this.tabAtiva === 'artigos';
  }

  get isVideosAtivo() {
    return this.tabAtiva === 'videos';
  }

  artigos = [
    {
      titulo: '10 dicas para economizar dinheiro no dia a dia',
      descricao: 'Aprenda a economizar dinheiro e melhorar sua situação financeira',
      imagem: 'https://picsum.photos/id/4/200/150',
      link: 'https://www.bcb.gov.br/educacaofinanceira/noticias/10-dicas-para-economizar-dinheiro-no-dia-a-dia'
    },
    {
      titulo: '7 passos para sair das dívidas',
      descricao: 'Descubra como sair das dívidas e ficar no azul',
      imagem: 'https://picsum.photos/id/20/200/150',
      link: 'https://blog.mobills.com.br/7-passos-para-sair-das-dividas/'
    },
    {
      titulo: '5 dicas para começar a investir com pouco dinheiro',
      descricao: 'Saiba como começar a investir mesmo com pouco dinheiro',
      imagem: 'https://picsum.photos/id/48/200/150',
      link: 'https://blog.nubank.com.br/investir-com-pouco-dinheiro/'
    },
    {
      titulo: 'Como fazer um planejamento financeiro eficiente',
      descricao: 'Saiba como planejar-se financeiramente',
      imagem: 'https://picsum.photos/id/60/200/150',
      link: 'https://www.submarinofinanceiro.com.br/planilha-financeira/planejamento-financeiro-eficiente/'
    },
    {
      titulo: 'Como organizar suas finanças: 8 passos para ter mais controle do dinheiro',
      descricao: 'Prenda a organizar suas finanças',
      imagem: 'https://picsum.photos/id/180/200/150',
      link: 'https://exame.com/seu-dinheiro/como-organizar-suas-financas-8-passos-para-ter-mais-controle-do-dinheiro/'
    }
  ];

  videos = [
    {
      titulo: 'Investimentos para iniciantes',
      descricao: 'Aprenda a investir em renda fixa e variável',
      imagem: 'https://picsum.photos/200/150',
      link: 'https://www.youtube.com'
    },
    {
      titulo: 'Dicas para economizar dinheiro',
      descricao: 'Dicas simples para economizar dinheiro',
      imagem: 'https://picsum.photos/200/150',
      link: 'https://www.youtube.com'
    },
    {
      titulo: 'Como sair das dívidas',
      descricao: 'Passo a passo para sair das dívidas e organizar as finanças',
      imagem: 'https://picsum.photos/200/150',
      link: 'https://www.youtube.com'
    }
  ];
}


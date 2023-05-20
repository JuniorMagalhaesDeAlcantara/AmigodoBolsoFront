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
      titulo: '10 dicas para economizar dinheiro',
      descricao: 'Aprenda a economizar dinheiro',
      imagem: 'https://picsum.photos/id/4/200/150',
      link: 'https://www.serasa.com.br/blog/10-dicas-para-economizar-dinheiro/'
    },
    {
      titulo: '10 passos para sair das dívidas',
      descricao: 'Descubra como sair das dívidas e ficar no azul',
      imagem: 'https://picsum.photos/id/20/200/150',
      link: 'https://www.serasa.com.br/limpa-nome-online/blog/10-passos-para-sair-das-dividas/'
    },
    {
      titulo: 'Aprenda a investir com pouco dinheiro',
      descricao: 'Saiba como começar a investir com pouco dinheiro',
      imagem: 'https://picsum.photos/id/48/200/150',
      link: 'https://neon.com.br/aprenda/investimentos/como-investir-com-pouco-dinheiro/'
    },
    {
      titulo: 'Como fazer um planejamento financeiro',
      descricao: 'Saiba como planejar-se financeiramente',
      imagem: 'https://picsum.photos/id/60/200/150',
      link: 'https://www.suno.com.br/guias/planejamento-financeiro/'
    },
    {
      titulo: 'Como organizar suas finanças',
      descricao: 'Aprenda a organizar suas finanças',
      imagem: 'https://picsum.photos/id/180/200/150',
      link: 'https://melhorplano.net/dinheiro/como-organizar-financas'
    }
  ];

  videos = [
    {
      titulo: 'Investimentos para iniciantes',
      descricao: 'Aprenda a investir em renda fixa e variável',
      imagem: 'https://picsum.photos/id/4/200/150',
      link: 'https://www.youtube.com/watch?v=VkqQB64xn-A'
    },
    {
      titulo: 'Dicas para economizar dinheiro',
      descricao: 'Dicas simples para economizar dinheiro',
      imagem: 'https://picsum.photos/id/48/200/150',
      link: 'https://www.youtube.com/watch?v=6nozjRdiOps'
    },
    {
      titulo: 'Como sair das dívidas',
      descricao: 'Passo a passo para sair das dívidas e organizar as finanças',
      imagem: 'https://picsum.photos/id/60/200/150',
      link: 'https://www.youtube.com/watch?v=8zj0GJKTWwE'
    }
  ];
}


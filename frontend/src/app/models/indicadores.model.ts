export interface Indicadores {
  totalContatos: number;
  totalFavoritos: number;
  totalInativos: number;
  contatosPorMes: { [mes: string]: number };
  ativosInativos: { [status: string]: number };
}

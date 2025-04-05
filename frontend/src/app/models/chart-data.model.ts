import { ChartConfiguration, ChartType } from 'chart.js';

export interface ChartDataCustom {
  title: string;
  type: ChartType;
  data: ChartConfiguration['data'];
  options: ChartConfiguration['options'];
}

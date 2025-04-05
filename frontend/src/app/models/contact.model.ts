export interface Contact {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  telephone?: string;
  favorite: boolean;
  active: boolean;
  createdAt: Date;
}

export interface EventCreateOrEdit {
  id?: number;
  uudi_code?: string;
  is_active: boolean;
  name: string;
  description: string;
  address: string;
  complement: string;
  zipcode: string;
  number: string;
  city: string;
  state: string;
  max_subscription: number;
  starts_at: string;
  ends_at: string;
  neighborhood: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
  active?: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  domain?: string;
  message: string;
  createdAt?: string;
  status?: string;
}

export interface CompanyContactInfo {
  phone: string;
  email: string;
  address: string;
  fax?: string;
}

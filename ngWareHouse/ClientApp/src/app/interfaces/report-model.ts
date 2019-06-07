export interface ReportModel {
  product: string;
  branch: string;
  userName: string;
  lotNumber: string;
  quantity: number;
  reference: string;
  expirationDate: Date;
  transactionDate: Date;
  comment: string;
}

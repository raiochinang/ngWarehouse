export interface WareHouseTransaction {
  wareHouseTransactionId: number;
  locationId: number;
  productId: number;
  lotNumber: string;
  transactionType: string;
  quantity: number;
  reference: string;
  userId: number;
  lastUpdate: Date;
  expirationDate: Date;
  comment: string;
  product: string;
}


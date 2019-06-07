export interface WarehouseMaster {
  wareHouseMasterId: number;
  productId: number;
  lotNumber: string;
  quantity: number;
  expirationDate: Date;
  locationId: number;
}

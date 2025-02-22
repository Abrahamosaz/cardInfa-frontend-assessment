export type CardProfiledataProps = {
  id: number;
  name: string;
  currency: string;
  expiration: number;
  binPrefix: number;
  createdAt: string;
};

export type CardRequestdataProps = {
  id: number;
  branch: string;
  initiator: string;
  cardType?: string;
  quantity: number;
  batch: string;
  dateRequested: string;
  status: string;
};

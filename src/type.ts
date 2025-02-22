export type CardProfiledataProps = {
  id: number;
  name: string;
  currency: string;
  expiration: number;
  binPrefix: number;
  createdAt: string;
  description?: string;
  cardScheme?: string;
  branchBlacklist?: string;
};

export type CardRequestdataProps = {
  id: number;
  branch: string;
  initiator: string;
  cardType?: string;
  quantity: number;
  batch: number;
  dateRequested: string;
  status: string;
};

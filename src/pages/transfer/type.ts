export type TransferData = {
  biology_name: string;
  name: string;
  chats: [];
  createdAt: string;
  createdBy: string;
  transfer_category: TTransferCategory;
  transfer_code: string;
  description: string;
  details: string;
  gallery: [];
  harvest_duration: number;
  id: string;
  is_common: boolean;
  product: {
    bar_code: {
      size: {
        x: number;
      };
    };
    y: number;
  };
  count: string;
  main_image: {
    aws_path: string;
  };
  planting_time_end: string;
  planting_time_start: string;
  reels: [];
  updatedAt: string;
  updatedBy: string;
  variety: string;
};

export type TransferQuery = {
  limit: number;
  page: number;
  to?: string;
  from?: string;
  filial?: string;
  type?: string;
};

export type TTransferCategory = {
  id: number;
  name: string;
};

export type TransferIdQuery = {
  populate: string;
};

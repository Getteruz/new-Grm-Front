enum PartiyaStatusEnum {
  NEW = 'new',
  PENDING = 'pending',
  CLOSED = 'closed',
}
export type TData = {
  id: string;
  biology_name: string;
  name: string;
  date: string;
  volume: string;
  expense: string;
  chats: [];
  createdAt: string;
  createdBy: string;
  crop_category: TCropCategory;
  crop_code: string;
  description: string;
  details: string;
  gallery: [];
  harvest_duration: number;
  is_common: boolean;
  main_image: {
    aws_path: string;
  };
  partiya_status: PartiyaStatusEnum;
  planting_time_end: string;
  planting_time_start: string;
  reels: [];
  updatedAt: string;
  updatedBy: string;
  variety: string;
};

export type TQuery = {
  search?: string | undefined;
  limit: number;
  page: number;
  country?: string | undefined,
  partiya_no?: string | undefined,
  factory?: string | undefined,
};

export type TCropCategory = {
  id: number;
  name: string;
};

export type CropIdQuery = {
  populate: string;
};

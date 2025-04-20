export type TData = {
  id: string;
  biology_name: string;
  name: string;
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
};

export type TCropCategory = {
  id: number;
  name: string;
};

export type CropIdQuery = {
  populate: string;
};

export type TData = {
  dateOne: Date;
  dateTwo: Date;
  deletedDate: null;
  id: string;
  title: string;
  price: number;
  date: Date;
  kv: number;
};

export type TStaticData = {
  savdoNarxi: number;
  savdoKv: number;
  terminal: number;
  inkasatsiya: number;
  qaytganKv: number;
  qaytganNarx: number;
  davlatlar: [
    {
      countryId: string;
      countryName: string;
      totalKv: number;
      totalPrice: number;
    },
    {
      countryId: string;
      countryName: string;
      totalKv:number;
      totalPrice: number;
    },
    {
      countryId: string;
      countryName:string;
      totalKv: number;
      totalPrice: number;
    },
  ];
  skidka: number;
  qarzgaSotilganKv: number;
  qarzgaSotilganNarx: number;
  magazinRasxod: number;
  navar: number;
  kelganQarzlar: number;
};

export type TQuery = {
  year?: number;
  month?: number;
  filialId?: string;
  page?: number;
  limit?: number;
};

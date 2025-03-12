export type TData = {
  id:string,
  code: string;
  model: {
    id: string;
    title: string;
    collection: {
      id: string;
      title: string;
    };
  };
  size: string;
  count: string;
  shape: string;
  style: string;
  color: {
    id: string;
    title: string;
    code: string;
  };
  price: string;
};

export type TActionData ={
  name:string
}

export type TQuery = {
  search: string | undefined;
  limit: number;
  page: number;
};

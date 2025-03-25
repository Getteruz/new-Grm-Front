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
  title: string;
  color: {
    id: string;
    title: string;
    code: string;
  };
  price: string;
};

export type TActionData ={
  title:string;
}

export type TQuery = {
  search: string | undefined;
  limit: number;
  page: number;
};

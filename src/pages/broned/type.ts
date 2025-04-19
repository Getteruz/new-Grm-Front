export type BronedData = {
  id: string;
  code: string;
  model: {
    id: string;
    title: string;
    collection: {
      id: string;
      title: string;
    };
  };
  user: {
    firstName: string;
    lastName: string;
    avatar: {
      path: string;
    };
  };
  product: {
    x: number;
    y: number;
    book_count: string;

    price: string;
    bar_code: {
      shape: {
        title: string;
      };
      imgUrl: {
        path: string;
      };
      model: {
        title: string;
      };
      collection: {
        title: string;
      };
      color: {
        title: string;
      };
      size: {
        x: number;
        y: number;
      };
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

export type BronedQuery = {
  search: string | undefined;
  limit: number;
  page: number;
};

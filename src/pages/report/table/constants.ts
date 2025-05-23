export type ManagerStatusKey = "open" | "accepted" | "closed_by_c" | "rejected";

export type ManagerStatusType = {
  [key in ManagerStatusKey]: {
    text: string;
    color: string;
    background: string;
  };
};

export const managerStatus: ManagerStatusType = {
  open: {
    text: "В процессе",
    color: "#89A143",
    background: "none",
  },
  accepted: {
    text: "Принято",
    color: "#CBCBC173",
    background: "none",
  },
  closed_by_c: {
    text: "Принят",
    color: "white",
    background: "#E38157",
  },
  rejected: {
    text: "Отменено",
    color: "#E38157",
    background: "none",
  },
};

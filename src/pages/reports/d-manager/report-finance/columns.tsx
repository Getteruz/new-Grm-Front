import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
import { TKassareportData } from "./type";
import ActionBadge from "@/components/actionBadge";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import { getAllData } from "@/service/apiHelpers";
import { IUserData, TResponse } from "@/types";
import TebleAvatar from "@/components/teble-avatar";

export const KassaColumnsLoc: ColumnDef<TKassareportData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: ({ row }) => {
      const month =[
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
      ]
      const item = row.original;
      // текущий месяц определяется календарём
      const now = new Date();
      const isCurrent =
        item?.month == now.getMonth() + 1 &&
        (!item?.year || item?.year == now.getFullYear());
      return (
        <p className={`${isCurrent ? "text-[#89A143]" : ""}`}>
          {isCurrent
            ? month[item?.month - 1] + " — Продолжается"
            : month[item?.month - 1] || ""}
        </p>
      );
    },
  },
  {
    header: "Наличие",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#89A143]"> {item?.in_hand} $</p>;
    },
  },

  {
    header: "Терминал",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#58A0C6]"> {item?.totalPlasticSum} $</p>;
    },
  },
  {
    header: "Отправлено",
    id: "debt_sum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className={ '' }> {item?.debt_sum} $</p>;
    },
  },
  
  {
    header: "Итого задолжность",
    id: "expense",
    cell: ({ row }) => {
      const item = row.original;
      return <p className={ 'text-[#E38157]' }>  {item?.reportStatus == 2? item?.owed:  item?.dealer_frozen_owed} $</p>;
    },
  },

  {
    header: "Принял",
    id: "closer",
    cell: ({ row }) => {
      const { data } = useQuery({
        queryKey: [apiRoutes.reports],
        queryFn: () =>
          getAllData<TResponse<IUserData>, object>(
            apiRoutes.userManagersAccountants,
            {}
          ),
      });
      return (
        <div className="flex gap-2 items-center">
          {row?.original?.status != "my" && data?.items?.length
            ? data?.items?.map((item) => (
                <TebleAvatar
                  key={item?.id}
                  status={
                    row?.original?.status ==
                      (item?.position.role == 10
                        ? "m_manager_confirmed"
                        : "accountant_confirmed") ||
                    row?.original?.status == "accepted"
                      ? "success"
                      : row?.original?.status == "rejected"
                        ? "fail"
                        : "panding"
                  }
                  url={item?.avatar?.path}
                  name={item?.firstName}
                />
              ))
            : ""}
        </div>
      );
    },
  },


  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      // касса годовая: подтверждение/закрытие месяца удалено,
      // статус месяца определяется календарём
      const item = row.original;
      const now = new Date();
      const isCurrent =
        item?.month == now.getMonth() + 1 &&
        (!item?.year || item?.year == now.getFullYear());
      const isFuture =
        (item?.year && item?.year > now.getFullYear()) ||
        (item?.year == now.getFullYear() && item?.month > now.getMonth() + 1);
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {isCurrent ? (
            <ActionBadge status={"willSell"} />
          ) : isFuture ? (
            ""
          ) : (
            <ActionBadge status={"completed"} />
          )}
        </div>
      );
    },
  },

  // {
  //   id: "actions",
  //   header: "actions",
  //   cell: () => (
  //     <Button onClick={(e) => e.stopPropagation()} variant="ghost" size="icon">
  //       <MoreHorizontal className="h-4 w-4" />
  //     </Button>
  //   ),
  // },
];
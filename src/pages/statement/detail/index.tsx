import { FileOutput, PlusCircle, Send } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import CardSort from "@/components/card-sort";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { useStatementsDataDetail } from "../table/queries";
import AddEmployeeModal from "./AddEmployeeModal";
import { StatementEmployeeColumns } from "./columns";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const userId = JSON.parse(localStorage.getItem("userMe-storage") || "{}")?.state?.meUser?.id;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStatementsDataDetail({
      queries: {
        payrollId: id,
        userId: userId,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <div className="bg-sidebar border-border border-b px-4 h-[64px] flex items-center">
        <Button variant="outline" className="mr-2">
          <Send className="mr-2 h-4 w-4" /> Отправить ведомость
        </Button>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <FileOutput className="mr-2 h-4 w-4" /> Экспорт
          </Button>

          <Button onClick={() => setIsAddEmployeeOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Добавить сотрудника
          </Button>
        </div>
      </div>

      <CardSort  KassaId=""/>

      {/* Employees Table */}
      <div className="m-4">
        <DataTable
          columns={StatementEmployeeColumns()}
          data={flatData ?? []}
          isLoading={isLoading}
          className="mt-2"
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        isOpen={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
        statementId={id || ""}
      />
    </>
  );
}

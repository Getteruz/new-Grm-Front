import { FileOutput, PlusCircle, Send } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import { useStatementsDataDetail } from "../table/queries";
import AddEmployeeModal from "./AddEmployeeModal";
import { StatementEmployeeColumns } from "./columns";
import { Statement } from "../type";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const { data, isLoading } = useStatementsDataDetail({
    queries: {
      payrollId: id,
    },
  });

  function isStatement(obj: any): obj is Statement {
    return obj && 
      typeof obj === 'object' && 
      'id' in obj && 
      'createdAt' in obj && 
      'user' in obj && 
      typeof obj.user === 'object' &&
      'payroll' in obj &&
      typeof obj.payroll === 'object';
  }

  let flatData: Statement[] = [];
  if (data?.items) {
    flatData = data.items.filter(isStatement).map((item: any) => {
      // Ensure we're not passing any raw objects to React
      const transformedItem = {
        ...item,
        id: String(item.id), // Ensure id is a string
        user: {
          firstName: String(item.user?.firstName || ''),
          lastName: String(item.user?.lastName || ''),
          avatar: String(item.user?.avatar || ''),
          salary: Number(item.user?.salary || 0),
          filial: String(item.user?.filial?.title || ''),
        },
        payroll: {
          bonus: Number(item.payroll?.bonus || 0),
          award: Number(item.payroll?.award || 0),
          total: Number(item.payroll?.total || 0),
          plastic: Number(item.payroll?.plastic || 0),
          prepayment: Number(item.payroll?.prepayment || 0),
          in_hand: Number(item.payroll?.in_hand || 0),
        }
      };
      return transformedItem;
    });
  }

  console.log(flatData);

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

      {/* Employees Table */}
      <div className="m-4">
        <DataTable
          columns={StatementEmployeeColumns()}
          data={flatData}
          isLoading={isLoading}
          className="mt-2"
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

import { FileOutput, PlusCircle, Send, X } from "lucide-react";
// import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CardSort from "@/components/card-sort";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";

import AddEmployeeModal from "./AddEmployeeModal";
import { StatementEmployeeColumns } from "./columns";
import { useDetailedStatement } from "./queries";

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
//   const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
//   const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: statement, isLoading } = useDetailedStatement({ id });

  return (
    <>
      <div className="bg-sidebar border-border border-b px-4 h-[64px] flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={() => navigate("/statement")}
        >
          <X className="mr-2 h-4 w-4" /> Назад
        </Button>
        
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
      
      <CardSort/>
      
      {/* Employees Table */}
      <div className="m-4">
        <DataTable
          columns={StatementEmployeeColumns()}
          data={(statement as unknown as {employees:[]})?.employees || []}
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
import { Filter,MoreVertical, Search } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

const OrderManagementPage = () => {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  
  // Mock data for orders based on the screenshot
  const orders = [
    {
      id: 80,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Не оплачена',
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '-700 000 сум',
      status: 'Новый',
      hasNotes: 0,
      time: '10:47'
    },
    {
      id: 79,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Оплачен 100%',
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '-250 000 сум',
      status: 'В обработке',
      hasNotes: 3,
      time: '10:47'
    },
    {
      id: 78,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Предоплата',
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '~',
      status: 'Завершено',
      hasNotes: 3,
      time: '10:47'
    },
    {
      id: 77,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Оплачен 100%',
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '-700 000 сум',
      status: 'Завершено',
      hasNotes: 3,
      time: '10:47'
    },
    {
      id: 76,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Оплачен 100%', 
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '-700 000 сум',
      status: 'Отказана',
      hasNotes: 3,
      time: '10:47'
    },
    {
      id: 75,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Не оплачена',
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '-700 000 сум',
      status: 'Завершено',
      hasNotes: 3,
      time: '10:47'
    },
    {
      id: 74,
      customer: 'Аббос Жанизаков',
      phone: '+94 609-34-44',
      amount: '7 690 000 сум',
      paymentType: 'Наличные',
      paymentStatus: 'Оплачен 100%',
      pendingAmount: '0~ сум',
      notes: 'нет',
      balance: '-250 000 сум',
      status: 'Завершено',
      hasNotes: 3,
      time: '10:47'
    },
  ];
  
  // Group orders by date
  const ordersByDate: Record<'12.01.2025' | '11.01.2025', typeof orders> = {
    '12.01.2025': orders.slice(0, 5),
    '11.01.2025': orders.slice(5, 7)
  };

  type OrderDate = keyof typeof ordersByDate;

  // For selection logic
  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>, date: OrderDate) => {
    if (e.target.checked) {
      const dateOrders = ordersByDate[date].map(order => order.id);
      setSelectedOrders([...selectedOrders, ...dateOrders]);
    } else {
      const dateOrders = ordersByDate[date].map(order => order.id);
      setSelectedOrders(selectedOrders.filter(id => !dateOrders.includes(id)));
    }
  };

  const handleSelectOrder = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectedOrders([...selectedOrders, id]);
    } else {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    }
  };

  // Render status badge with appropriate styling
  const renderStatusBadge = (status) => {
    let className = "py-1 px-4 rounded-full text-sm";
    
    switch(status) {
      case 'Новый':
        className += " bg-orange-400 text-white";
        break;
      case 'В обработке':
        className += " border border-orange-400 text-orange-400";
        break;
      case 'Завершено':
        className += " border border-gray-300 text-gray-500";
        break;
      case 'Отказана':
        className += " border border-red-400 text-red-400";
        break;
      default:
        className += " border border-gray-300 text-gray-500";
    }
    
    return <span className={className}>{status}</span>;
  };

  // Render payment status with appropriate styling
  const renderPaymentStatus = (status) => {
    let className = "py-1 px-2 rounded flex items-center gap-1";
    
    switch(status) {
      case 'Не оплачена':
        className += " bg-red-100 text-red-500";
        return (
          <div className={className}>
            {status}
            <span className="ml-1">▼</span>
          </div>
        );
      case 'Оплачен 100%':
        className += " bg-green-100 text-green-500";
        return (
          <div className={className}>
            {status}
            <span className="ml-1">▼</span>
          </div>
        );
      case 'Предоплата':
        className += " bg-orange-100 text-orange-500";
        return (
          <div className={className}>
            {status}
            <span className="ml-1">▼</span>
          </div>
        );
      default:
        return status;
    }
  };

  return (
    <div className="bg-stone-100 min-h-screen p-4">
      {/* Header with search and filters */}
      <div className="flex items-center mb-4 gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Поиск"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <Filter size={18} />
          <span>Фильтр</span>
        </button>
        
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <span>Сортировка по:</span>
          <span className="font-medium">▼</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <span>Чекед:</span>
          <span className="font-medium">3 шт</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <span>36 м²</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <span>210 $</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <span>-100 $</span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white rounded-md">
          <span>-110 $</span>
        </div>
        
        <button className="p-2 border border-gray-300 bg-white rounded-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
        
        <button className="p-2 border border-gray-300 bg-white rounded-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md ml-2">
          <span>+</span>
          <span>Добавить заказ</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow">
        {/* Table Header */}
        <div className="grid grid-cols-12 border-b text-sm p-2">
          <div className="col-span-1 flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Номер</span>
          </div>
          <div className="col-span-1">Покупатель</div>
          <div className="col-span-1">Номер</div>
          <div className="col-span-1">Стоимость заказа ▲</div>
          <div className="col-span-1">Тип оплаты</div>
          <div className="col-span-1">Статус оплаты</div>
          <div className="col-span-1">Оплачено</div>
          <div className="col-span-1">Промокод</div>
          <div className="col-span-1">Скидка</div>
          <div className="col-span-2">Статус заказа</div>
          <div className="col-span-1">Время</div>
        </div>
        {Object.entries(ordersByDate).map(([date, dateOrders]) => (
          <div key={date}>
            {/* Date Header */}
            <div className="grid grid-cols-12 bg-stone-100 p-2 text-sm">
              <div className="col-span-2 flex items-center">
                <input 
                  type="checkbox" 
                  className="mr-2"
                  onChange={(e) => handleSelectAll(e, date as OrderDate)}
                  checked={dateOrders.every(order => selectedOrders.includes(order.id))}
                />
                <span>{date}</span>
                {date === '12.01.2025' ? <span className="ml-2 text-gray-500">Заказы за сегодня</span> : <span className="ml-2 text-gray-500">Заказы за вечера</span>}
              </div>
              <div className="col-span-2 col-start-4">32 680 000 сум</div>
              <div className="col-span-2 col-start-7">5 880 000 сум</div>
            </div>
              <div className="col-span-2 col-start-7">5 880 000 сум</div>
            </div>

            {/* Orders */}
            {dateOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 border-b p-2 text-sm items-center">
                <div className="col-span-1 flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedOrders.includes(order.id)}
                    onChange={(e) => handleSelectOrder(e, order.id)}
                  />
                  <span>№{order.id}</span>
                </div>
                <div className="col-span-1">{order.customer}</div>
                <div className="col-span-1 text-blue-500">{order.phone}</div>
                <div className="col-span-1 text-orange-500">{order.amount}</div>
                <div className="col-span-1 text-blue-500">{order.paymentType}</div>
                <div className="col-span-1">{renderPaymentStatus(order.paymentStatus)}</div>
                <div className="col-span-1">{order.pendingAmount}</div>
                <div className="col-span-1 text-gray-400">{order.notes}</div>
                <div className="col-span-1 text-red-500">{order.balance}</div>
                <div className="col-span-2 flex items-center gap-2">
                  {renderStatusBadge(order.status)}
                  {order.hasNotes > 0 && (
                    <div className="flex items-center gap-1 text-gray-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>{order.hasNotes} note</span>
                    </div>
                  )}
                </div>
                <div className="col-span-1 flex items-center justify-between">
                  <span>{order.time}</span>
                  <MoreVertical size={18} className="text-gray-500" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagementPage;
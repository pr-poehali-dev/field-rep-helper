const products = [
  {
    category: "Средства для стирки",
    items: [
      { name: "Порошок универсальный 1кг", article: "БХ-001", unit: "шт" },
      { name: "Гель для стирки цветного 1л", article: "БХ-002", unit: "шт" },
      { name: "Кондиционер для белья 1л", article: "БХ-003", unit: "шт" },
    ]
  },
  {
    category: "Средства для уборки",
    items: [
      { name: "Чистящее средство для ванной 500мл", article: "БХ-010", unit: "шт" },
      { name: "Средство для мытья полов 1л", article: "БХ-011", unit: "шт" },
      { name: "Стеклоочиститель 500мл", article: "БХ-012", unit: "шт" },
    ]
  },
  {
    category: "Средства для посуды",
    items: [
      { name: "Гель для мытья посуды 500мл", article: "БХ-020", unit: "шт" },
      { name: "Таблетки для посудомойки №30", article: "БХ-021", unit: "уп" },
      { name: "Ополаскиватель для ПММ 500мл", article: "БХ-022", unit: "шт" },
    ]
  },
];

export default function Chemistry() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 animate-fade-in">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-4 font-semibold">Категория</p>
        <h1 className="text-5xl font-black text-gray-900 leading-none">🧴 Бытовая химия</h1>
        <p className="mt-4 text-gray-400">Полный ассортимент для вашего клиента</p>
      </div>

      <div className="space-y-10">
        {products.map((group, i) => (
          <div key={group.category} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
            <h2 className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-4 pb-3 border-b border-orange-100">
              {group.category}
            </h2>
            <div className="space-y-1">
              {group.items.map((item) => (
                <div
                  key={item.article}
                  className="flex items-center justify-between py-4 border-b border-gray-50 hover:bg-gray-50 -mx-3 px-3 transition-colors rounded"
                >
                  <div>
                    <p className="text-gray-900 font-500">{item.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Арт. {item.article}</p>
                  </div>
                  <span className="text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">{item.unit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-orange-50 border border-orange-100 rounded-xl">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-2 font-semibold">Минимальный заказ</p>
        <p className="text-gray-900 font-600">Уточните у менеджера актуальные условия поставки</p>
      </div>
    </div>
  );
}
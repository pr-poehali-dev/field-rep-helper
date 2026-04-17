const priceData = [
  {
    category: "Бытовая химия",
    emoji: "🧴",
    rows: [
      { name: "Порошок универсальный 1кг", article: "БХ-001", price: "189", unit: "шт", min: "12" },
      { name: "Гель для стирки цветного 1л", article: "БХ-002", price: "215", unit: "шт", min: "6" },
      { name: "Кондиционер для белья 1л", article: "БХ-003", price: "175", unit: "шт", min: "6" },
      { name: "Чистящее для ванной 500мл", article: "БХ-010", price: "129", unit: "шт", min: "12" },
      { name: "Средство для мытья полов 1л", article: "БХ-011", price: "145", unit: "шт", min: "6" },
      { name: "Гель для посуды 500мл", article: "БХ-020", price: "95", unit: "шт", min: "24" },
    ]
  },
  {
    category: "Продукты питания",
    emoji: "🥫",
    rows: [
      { name: "Тушёнка говяжья 325г", article: "ПП-001", price: "189", unit: "шт", min: "24" },
      { name: "Горбуша натуральная 250г", article: "ПП-002", price: "145", unit: "шт", min: "24" },
      { name: "Гречка ядрица 900г", article: "ПП-010", price: "89", unit: "шт", min: "24" },
      { name: "Рис длиннозёрный 900г", article: "ПП-011", price: "79", unit: "шт", min: "24" },
      { name: "Масло подсолнечное 1л", article: "ПП-020", price: "139", unit: "шт", min: "12" },
      { name: "Майонез Провансаль 400мл", article: "ПП-021", price: "115", unit: "шт", min: "12" },
    ]
  }
];

export default function Price() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 animate-fade-in">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-4 font-semibold">Документы</p>
        <h1 className="text-5xl font-black text-gray-900 leading-none">Прайс-лист</h1>
        <p className="mt-4 text-gray-400">Актуальные цены · Апрель 2026</p>
      </div>

      <div className="space-y-12">
        {priceData.map((section, si) => (
          <div key={section.category} className="animate-fade-in" style={{ animationDelay: `${si * 0.15}s`, opacity: 0 }}>
            <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
              <span>{section.emoji}</span>
              <span>{section.category}</span>
            </h2>

            <div className="border border-orange-100 overflow-hidden rounded-xl">
              <div className="grid grid-cols-12 bg-orange-500 text-white text-xs font-semibold tracking-widest uppercase">
                <div className="col-span-5 px-4 py-3">Наименование</div>
                <div className="col-span-2 px-4 py-3 hidden md:block">Артикул</div>
                <div className="col-span-2 px-4 py-3 text-right">Цена, ₽</div>
                <div className="col-span-2 px-4 py-3 hidden md:block text-center">Ед.</div>
                <div className="col-span-3 md:col-span-1 px-4 py-3 text-right">Мин.</div>
              </div>

              {section.rows.map((row, i) => (
                <div
                  key={row.article}
                  className={`grid grid-cols-12 text-sm border-t border-orange-50 hover:bg-yellow-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/40'}`}
                >
                  <div className="col-span-5 px-4 py-4 text-gray-900 font-500">{row.name}</div>
                  <div className="col-span-2 px-4 py-4 text-gray-400 hidden md:block">{row.article}</div>
                  <div className="col-span-2 px-4 py-4 text-gray-900 font-700 text-right">{row.price}</div>
                  <div className="col-span-2 px-4 py-4 text-gray-400 text-center hidden md:block">{row.unit}</div>
                  <div className="col-span-3 md:col-span-1 px-4 py-4 text-gray-400 text-right">{row.min}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          { label: "Валюта", value: "Российский рубль (₽)" },
          { label: "НДС", value: "Включён в цену" },
          { label: "Срок действия", value: "До 01.07.2026" },
        ].map((info) => (
          <div key={info.label} className="p-5 bg-orange-50 border border-orange-100 rounded-xl">
            <p className="text-xs text-orange-400 tracking-widest uppercase mb-1 font-semibold">{info.label}</p>
            <p className="text-gray-900 font-600 text-sm">{info.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
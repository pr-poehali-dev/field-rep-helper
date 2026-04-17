import { useEffect, useState } from "react";
import { api, Category, Product } from "@/api/products";

export default function Price() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getProducts(), api.getCategories()]).then(([p, c]) => {
      setProducts(p);
      setCategories(c);
      setLoading(false);
    });
  }, []);

  const grouped = categories.map(cat => ({
    ...cat,
    rows: products.filter(p => p.category_id === cat.id),
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 animate-fade-in">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-4 font-semibold">Документы</p>
        <h1 className="text-5xl font-black text-gray-900 leading-none">Прайс-лист</h1>
        <p className="mt-4 text-gray-400">Актуальные цены · Апрель 2026</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Загрузка...</div>
      ) : (
        <div className="space-y-12">
          {grouped.map((section, si) => (
            <div key={section.id} className="animate-fade-in" style={{ animationDelay: `${si * 0.15}s`, opacity: 0 }}>
              <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <span>{section.emoji}</span>
                <span>{section.name}</span>
              </h2>

              <div className="border border-orange-100 overflow-hidden rounded-xl">
                <div className="grid grid-cols-10 bg-orange-500 text-white text-xs font-semibold tracking-widest uppercase">
                  <div className="col-span-7 px-4 py-3">Наименование</div>
                  <div className="col-span-2 px-4 py-3 text-right">Цена, ₽</div>
                  <div className="col-span-1 px-4 py-3 text-center hidden md:block">Ед.</div>
                </div>

                {section.rows.length === 0 ? (
                  <div className="px-4 py-6 text-sm text-gray-400">Нет товаров</div>
                ) : (
                  section.rows.map((row, i) => (
                    <div
                      key={row.id}
                      className={`grid grid-cols-10 text-sm border-t border-orange-50 hover:bg-yellow-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-orange-50/40'}`}
                    >
                      <div className="col-span-7 px-4 py-4 text-gray-900 font-medium">{row.name}</div>
                      <div className="col-span-2 px-4 py-4 text-gray-900 font-bold text-right">
                        {row.price ? row.price : "—"}
                      </div>
                      <div className="col-span-1 px-4 py-4 text-gray-400 text-center hidden md:block">{row.unit}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          { label: "Валюта", value: "Российский рубль (₽)" },
          { label: "НДС", value: "Включён в цену" },
          { label: "Срок действия", value: "До 01.07.2026" },
        ].map((info) => (
          <div key={info.label} className="p-5 bg-orange-50 border border-orange-100 rounded-xl">
            <p className="text-xs text-orange-400 tracking-widest uppercase mb-1 font-semibold">{info.label}</p>
            <p className="text-gray-900 font-semibold text-sm">{info.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

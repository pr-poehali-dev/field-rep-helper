import { useEffect, useState } from "react";
import { api, Product } from "@/api/products";

export default function Chemistry() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then(all => {
      setProducts(all.filter(p => p.category_slug === "chemistry"));
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 animate-fade-in">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-4 font-semibold">Категория</p>
        <h1 className="text-5xl font-black text-gray-900 leading-none">🧴 Бытовая химия</h1>
        <p className="mt-4 text-gray-400">Полный ассортимент для вашего клиента</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Загрузка...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Товары не добавлены</div>
      ) : (
        <div className="space-y-1 animate-fade-in">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b border-orange-50 hover:bg-orange-50 -mx-3 px-3 transition-colors rounded-lg"
            >
              <p className="text-gray-900 font-medium">{item.name}</p>
              <div className="flex items-center gap-3">
                {item.price && (
                  <span className="text-gray-900 font-bold">{item.price} ₽</span>
                )}
                <span className="text-xs text-gray-400 border border-orange-200 px-2 py-1 rounded">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-orange-50 border border-orange-100 rounded-xl">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-2 font-semibold">Минимальный заказ</p>
        <p className="text-gray-900 font-semibold">Уточните у менеджера актуальные условия поставки</p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { api, Category, Product } from "@/api/products";
import Icon from "@/components/ui/icon";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const emptyForm = { name: "", price: "", category_id: "", unit: "шт" };
  const [form, setForm] = useState(emptyForm);

  const load = async () => {
    setLoading(true);
    const [p, c] = await Promise.all([api.getProducts(), api.getCategories()]);
    setProducts(p);
    setCategories(c);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditItem(p);
    setForm({ name: p.name, price: p.price?.toString() ?? "", category_id: p.category_id.toString(), unit: p.unit });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.category_id) return;
    setSaving(true);
    const data = {
      name: form.name.trim(),
      price: form.price ? parseFloat(form.price) : null,
      category_id: parseInt(form.category_id),
      unit: form.unit || "шт",
    };
    if (editItem) {
      await api.updateProduct({ ...data, id: editItem.id });
    } else {
      await api.createProduct(data);
    }
    setSaving(false);
    setShowForm(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить товар?")) return;
    await api.deleteProduct(id);
    load();
  };

  const grouped = categories.map(cat => ({
    ...cat,
    items: products.filter(p => p.category_id === cat.id),
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-10 flex items-center justify-between animate-fade-in">
        <div>
          <p className="text-xs text-orange-400 tracking-widest uppercase mb-2 font-semibold">Управление</p>
          <h1 className="text-4xl font-black text-gray-900">Ассортимент</h1>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors"
        >
          <Icon name="Plus" size={16} />
          Добавить товар
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">
                {editItem ? "Редактировать товар" : "Новый товар"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-700">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-orange-400 font-semibold tracking-widest uppercase block mb-1">Название</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Например: Порошок 1кг"
                  className="w-full border border-orange-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 text-gray-900"
                />
              </div>

              <div>
                <label className="text-xs text-orange-400 font-semibold tracking-widest uppercase block mb-1">Категория</label>
                <select
                  value={form.category_id}
                  onChange={e => setForm({ ...form, category_id: e.target.value })}
                  className="w-full border border-orange-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 text-gray-900 bg-white"
                >
                  <option value="">Выберите категорию</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-orange-400 font-semibold tracking-widest uppercase block mb-1">Цена, ₽</label>
                <input
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  placeholder="199"
                  type="number"
                  className="w-full border border-orange-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-orange-400 text-gray-900"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim() || !form.category_id}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white py-3 rounded-xl font-semibold text-sm transition-colors"
              >
                {saving ? "Сохраняю..." : "Сохранить"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-5 py-3 border border-orange-200 rounded-xl text-gray-500 hover:text-gray-900 text-sm transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">Загрузка...</div>
      ) : (
        <div className="space-y-10">
          {grouped.map(group => (
            <div key={group.id} className="animate-fade-in">
              <h2 className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-4 pb-3 border-b border-orange-100 flex items-center gap-2">
                <span>{group.emoji}</span>
                <span>{group.name}</span>
                <span className="ml-auto text-gray-300 font-normal">{group.items.length} поз.</span>
              </h2>

              {group.items.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">Нет товаров в этой категории</p>
              ) : (
                <div className="space-y-1">
                  {group.items.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 px-3 border-b border-orange-50 hover:bg-orange-50 rounded-lg transition-colors group"
                    >
                      <div>
                        <p className="text-gray-900 font-medium">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {item.price ? `${item.price} ₽` : "Цена не указана"} · {item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 text-orange-400 hover:text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                        >
                          <Icon name="Pencil" size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Icon name="Trash2" size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

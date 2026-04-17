interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-16 animate-fade-in">
        <p className="text-xs text-orange-400 tracking-widest uppercase mb-4 font-semibold">Торговый представитель</p>
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-none tracking-tight">
          Рабочий<br />кабинет
        </h1>
        <p className="mt-6 text-gray-400 text-lg max-w-md">
          Выберите категорию для работы с ассортиментом и клиентами
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate("chemistry")}
          className="group relative overflow-hidden border-2 border-orange-400 bg-white hover:bg-orange-400 transition-all duration-300 text-left p-10 animate-fade-in rounded-xl"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <div className="mb-8">
            <span className="text-5xl">🧴</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 group-hover:text-white transition-colors leading-none mb-3">
            Бытовая<br />химия
          </h2>
          <p className="text-sm text-gray-400 group-hover:text-orange-50 transition-colors">
            Ассортимент, условия, новинки
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-orange-500 group-hover:text-white transition-colors">
            <span>Перейти</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate("food")}
          className="group relative overflow-hidden border-2 border-yellow-400 bg-yellow-400 hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 text-left p-10 animate-fade-in rounded-xl"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <div className="mb-8">
            <span className="text-5xl">🥫</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 leading-none mb-3">
            Продукты<br />питания
          </h2>
          <p className="text-sm text-gray-700 transition-colors">
            Ассортимент, условия, новинки
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors">
            <span>Перейти</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate("price")}
          className="group border border-orange-100 hover:border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all duration-300 text-left p-8 animate-fade-in rounded-xl"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <p className="text-xs text-orange-400 tracking-widest uppercase mb-2 font-semibold">Документы</p>
          <h3 className="text-xl font-black text-gray-900">Прайс-лист</h3>
          <p className="text-sm text-gray-400 mt-1">Актуальные цены на все позиции</p>
        </button>

        <button
          onClick={() => onNavigate("about")}
          className="group border border-orange-100 hover:border-orange-300 bg-orange-50 hover:bg-orange-100 transition-all duration-300 text-left p-8 animate-fade-in rounded-xl"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <p className="text-xs text-orange-400 tracking-widest uppercase mb-2 font-semibold">Информация</p>
          <h3 className="text-xl font-black text-gray-900">О компании</h3>
          <p className="text-sm text-gray-400 mt-1">Контакты, реквизиты, условия</p>
        </button>
      </div>
    </div>
  );
}

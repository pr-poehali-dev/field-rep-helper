interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-16 animate-fade-in">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">Торговый представитель</p>
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
          className="group relative overflow-hidden border border-gray-900 bg-white hover:bg-gray-900 transition-all duration-300 text-left p-10 animate-fade-in"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <div className="mb-8">
            <span className="text-5xl">🧴</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 group-hover:text-white transition-colors leading-none mb-3">
            Бытовая<br />химия
          </h2>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
            Ассортимент, условия, новинки
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-600 text-gray-900 group-hover:text-white transition-colors">
            <span>Перейти</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate("food")}
          className="group relative overflow-hidden border border-gray-900 bg-gray-900 hover:bg-white transition-all duration-300 text-left p-10 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <div className="mb-8">
            <span className="text-5xl">🥫</span>
          </div>
          <h2 className="text-3xl font-black text-white group-hover:text-gray-900 transition-colors leading-none mb-3">
            Продукты<br />питания
          </h2>
          <p className="text-sm text-gray-400 group-hover:text-gray-500 transition-colors">
            Ассортимент, условия, новинки
          </p>
          <div className="mt-8 flex items-center gap-2 text-sm font-600 text-white group-hover:text-gray-900 transition-colors">
            <span>Перейти</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate("price")}
          className="group border border-gray-100 hover:border-gray-900 bg-gray-50 hover:bg-white transition-all duration-300 text-left p-8 animate-fade-in"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Документы</p>
          <h3 className="text-xl font-black text-gray-900">Прайс-лист</h3>
          <p className="text-sm text-gray-400 mt-1">Актуальные цены на все позиции</p>
        </button>

        <button
          onClick={() => onNavigate("about")}
          className="group border border-gray-100 hover:border-gray-900 bg-gray-50 hover:bg-white transition-all duration-300 text-left p-8 animate-fade-in"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Информация</p>
          <h3 className="text-xl font-black text-gray-900">О компании</h3>
          <p className="text-sm text-gray-400 mt-1">Контакты, реквизиты, условия</p>
        </button>
      </div>
    </div>
  );
}

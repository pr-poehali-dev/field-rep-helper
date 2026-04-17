const contacts = [
  { label: "Офис", value: "г. Москва, ул. Примерная, д. 1" },
  { label: "Телефон", value: "+7 (000) 000-00-00" },
  { label: "Email", value: "info@company.ru" },
  { label: "Режим работы", value: "Пн–Пт, 9:00–18:00" },
];

const requisites = [
  { label: "ИНН", value: "0000000000" },
  { label: "КПП", value: "000000000" },
  { label: "ОГРН", value: "0000000000000" },
  { label: "Расчётный счёт", value: "00000000000000000000" },
  { label: "Банк", value: "ПАО Сбербанк" },
  { label: "БИК", value: "044525225" },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="mb-12 animate-fade-in">
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-4">Информация</p>
        <h1 className="text-5xl font-black text-gray-900 leading-none">О компании</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h2 className="text-xs font-700 tracking-widest uppercase text-gray-400 mb-6 pb-3 border-b border-gray-100">
            Описание
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Компания работает на рынке дистрибуции с 2010 года. Мы специализируемся на поставках бытовой химии и продуктов питания в розничные торговые точки.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Собственный склад, широкий ассортимент, гибкие условия сотрудничества — мы помогаем бизнесу расти.
          </p>

          <div className="mt-8 space-y-4">
            {[
              { num: "500+", desc: "активных клиентов" },
              { num: "2 000+", desc: "позиций в ассортименте" },
              { num: "15 лет", desc: "на рынке" },
            ].map((stat) => (
              <div key={stat.num} className="flex items-baseline gap-4">
                <span className="text-3xl font-black text-gray-900 w-24 shrink-0">{stat.num}</span>
                <span className="text-gray-400 text-sm">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <h2 className="text-xs font-700 tracking-widest uppercase text-gray-400 mb-4 pb-3 border-b border-gray-100">
              Контакты
            </h2>
            <div className="space-y-3">
              {contacts.map((c) => (
                <div key={c.label} className="flex gap-4">
                  <span className="text-xs text-gray-400 w-28 shrink-0 pt-0.5">{c.label}</span>
                  <span className="text-gray-900 font-500 text-sm">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <h2 className="text-xs font-700 tracking-widest uppercase text-gray-400 mb-4 pb-3 border-b border-gray-100">
              Реквизиты
            </h2>
            <div className="space-y-3">
              {requisites.map((r) => (
                <div key={r.label} className="flex gap-4">
                  <span className="text-xs text-gray-400 w-28 shrink-0 pt-0.5">{r.label}</span>
                  <span className="text-gray-900 font-500 text-sm">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 bg-gray-900 animate-fade-in" style={{ animationDelay: '0.4s', opacity: 0 }}>
        <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">Ваш менеджер</p>
        <p className="text-white text-2xl font-black">Иван Иванов</p>
        <p className="text-gray-400 mt-1">+7 (000) 000-00-00 · ivan@company.ru</p>
      </div>
    </div>
  );
}

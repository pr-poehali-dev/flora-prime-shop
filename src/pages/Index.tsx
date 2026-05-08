import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a6c4d786-829a-4102-9fdb-c7248bc8cae4/files/ed96f816-48b0-4353-a740-12cf27017448.jpg";

const PRODUCTS = [
  {
    id: 1,
    name: "Розовая мечта",
    desc: "Нежные пионовидные розы с эвкалиптом",
    price: 3200,
    emoji: "🌸",
    tag: "Хит",
    color: "from-pink-100 to-rose-50",
  },
  {
    id: 2,
    name: "Весенний бриз",
    desc: "Тюльпаны, ранункулюс и веточки мимозы",
    price: 2800,
    emoji: "🌷",
    tag: "Новинка",
    color: "from-orange-100 to-yellow-50",
  },
  {
    id: 3,
    name: "Фиолетовый закат",
    desc: "Лаванда, ирисы и статица",
    price: 3600,
    emoji: "💜",
    tag: "",
    color: "from-purple-100 to-violet-50",
  },
  {
    id: 4,
    name: "Белая роскошь",
    desc: "Белые розы с гипсофилой премиум",
    price: 4500,
    emoji: "🤍",
    tag: "Премиум",
    color: "from-slate-100 to-gray-50",
  },
  {
    id: 5,
    name: "Коралловый рассвет",
    desc: "Кустовые розы, хризантемы, зелень",
    price: 2400,
    emoji: "🧡",
    tag: "",
    color: "from-orange-100 to-red-50",
  },
  {
    id: 6,
    name: "Садовая история",
    desc: "Полевые цветы в стиле бохо",
    price: 2100,
    emoji: "🌻",
    tag: "Эко",
    color: "from-green-100 to-emerald-50",
  },
];

const REVIEWS = [
  { name: "Анастасия К.", text: "Заказала букет на день рождения мамы — она была в слезах от восторга! Цветы свежайшие, доставили вовремя.", stars: 5, emoji: "💕" },
  { name: "Михаил Р.", text: "Уже третий раз заказываю. Всегда красиво, всегда вовремя. Жена каждый раз счастлива!", stars: 5, emoji: "🌹" },
  { name: "Елена В.", text: "Профессионалы своего дела. Флорист помог выбрать состав — получилось лучше, чем я представляла.", stars: 5, emoji: "✨" },
];

const NAV = ["Главная", "Каталог", "О нас", "Доставка", "Отзывы", "Контакты"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  emoji: string;
  qty: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState("Главная");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filter, setFilter] = useState("Все");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => { setOrderPlaced(false); setCartOpen(false); }, 3000);
  };

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenu(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const filters = ["Все", "Хит", "Новинка", "Премиум", "Эко"];
  const filtered = filter === "Все" ? PRODUCTS : PRODUCTS.filter((p) => p.tag === filter);

  return (
    <div className="min-h-screen font-golos" style={{ background: "#FFFAF8" }}>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <span className="font-display text-2xl font-bold grad-text">FloraPrime</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item
                    ? "grad-main text-white shadow-md"
                    : "text-gray-600 hover:text-pink-500 hover:bg-pink-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 btn-primary px-4 py-2 rounded-full text-sm font-medium"
            >
              <Icon name="ShoppingBag" size={16} />
              <span className="hidden sm:inline">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orange-400 text-white text-xs flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name="Menu" size={22} className="text-gray-700" />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden glass border-t border-pink-100 px-4 py-3 flex flex-col gap-1">
            {NAV.map((item) => (
              <button key={item} onClick={() => scrollTo(item)} className="text-left px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-500">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="Главная" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Цветы" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,10,18,0.75) 0%, rgba(155,89,182,0.5) 50%, rgba(255,107,138,0.3) 100%)" }} />
        </div>

        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full opacity-20 animate-float" style={{ background: "radial-gradient(circle, #FF6B8A, transparent)" }} />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full opacity-10 animate-float animate-delay-300" style={{ background: "radial-gradient(circle, #9B59B6, transparent)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Доставка сегодня · от 60 минут
            </div>

            <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-light text-white leading-none mb-6">
              Цветы,<br />
              <em className="not-italic font-bold" style={{ color: "#FF6B8A" }}>созданные</em><br />
              для вас
            </h1>

            <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-md">
              Свежие букеты ручной работы. Доставляем тепло и красоту прямо к вашей двери — каждый день.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("Каталог")}
                className="btn-primary px-8 py-4 rounded-full text-base font-semibold inline-flex items-center gap-2"
              >
                Выбрать букет
                <Icon name="ArrowRight" size={18} />
              </button>
              <button
                onClick={() => scrollTo("Доставка")}
                className="px-8 py-4 rounded-full text-base font-semibold text-white border border-white/40 hover:bg-white/10 transition-all"
              >
                Условия доставки
              </button>
            </div>

            <div className="mt-16 flex items-center gap-8">
              {[["500+", "Довольных клиентов"], ["60 мин", "Доставка"], ["100%", "Свежие цветы"]].map(([val, label]) => (
                <div key={val}>
                  <div className="text-2xl font-bold text-white font-display">{val}</div>
                  <div className="text-sm text-white/60">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="Каталог" className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--flora-coral)" }}>Наш выбор</p>
            <h2 className="font-display text-5xl font-bold text-gray-900 mb-4">Каталог букетов</h2>
            <p className="text-gray-500 max-w-md mx-auto">Каждый букет — это история, рассказанная цветами</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? "grad-main text-white shadow-md"
                    : "bg-white text-gray-600 hover:text-pink-500 border border-pink-100 hover:border-pink-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div key={product.id} className={`card-hover rounded-3xl overflow-hidden bg-gradient-to-br ${product.color} border border-white shadow-sm`}>
                <div className="flex items-center justify-center h-48 text-8xl">
                  {product.emoji}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display text-2xl font-bold text-gray-900">{product.name}</h3>
                    {product.tag && (
                      <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold text-white grad-warm shrink-0">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-5">{product.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold grad-text">{product.price.toLocaleString()} ₽</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-primary px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                    >
                      <Icon name="Plus" size={16} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="О нас" className="section-pad relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A0A12 0%, #2D1B40 100%)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, #FF6B8A, transparent)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #9B59B6, transparent)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest mb-4" style={{ color: "var(--flora-coral)" }}>О нас</p>
              <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
                Мы создаём<br />красоту с душой
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                FloraPrime — это команда флористов, влюблённых в своё дело. Каждый букет мы создаём как произведение искусства: подбираем свежайшие цветы, продумываем каждую деталь и упаковываем с заботой.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: "Leaf", title: "Свежие цветы", desc: "Только прямые поставки от лучших ферм" },
                  { icon: "Heart", title: "Ручная работа", desc: "Каждый букет создан вручную с любовью" },
                  { icon: "Clock", title: "Быстро", desc: "Доставка от 60 минут по всему городу" },
                  { icon: "Star", title: "Гарантия", desc: "Вернём деньги, если вы не довольны" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="w-10 h-10 rounded-xl mb-3 flex items-center justify-center grad-main">
                      <Icon name={icon} fallback="Star" size={20} className="text-white" />
                    </div>
                    <div className="font-semibold text-white mb-1">{title}</div>
                    <div className="text-sm text-white/50">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl">
                <img src={HERO_IMG} alt="Флорист" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-display font-bold grad-text">5 лет</div>
                <div className="text-sm text-gray-600">на рынке цветов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="Доставка" className="section-pad" style={{ background: "var(--flora-light)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--flora-coral)" }}>Быстро и надёжно</p>
            <h2 className="font-display text-5xl font-bold text-gray-900 mb-4">Условия доставки</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "⚡", title: "Экспресс", time: "60–90 минут", price: "300 ₽", desc: "Срочная доставка в любую точку города" },
              { emoji: "📅", title: "Стандарт", time: "2–4 часа", price: "150 ₽", desc: "Выберите удобный временной слот" },
              { emoji: "🎁", title: "Бесплатно", time: "При заказе от 3000 ₽", price: "0 ₽", desc: "Доставляем с улыбкой и любовью" },
            ].map(({ emoji, title, time, price, desc }) => (
              <div key={title} className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50 card-hover text-center">
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                <div className="text-3xl font-bold grad-text mb-1">{price}</div>
                <div className="text-sm text-gray-500 mb-4">{time}</div>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-3xl p-8 border border-pink-50">
            <h3 className="font-display text-2xl font-bold text-gray-900 mb-6 text-center">Как оформить заказ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {[
                { step: "01", title: "Выберите букет", desc: "В каталоге или по описанию" },
                { step: "02", title: "Добавьте в корзину", desc: "Укажите количество" },
                { step: "03", title: "Оформите заказ", desc: "Адрес и время доставки" },
                { step: "04", title: "Получайте!", desc: "Курьер привезёт с улыбкой" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full grad-main flex items-center justify-center text-white font-bold mb-3">{step}</div>
                  <div className="font-semibold text-gray-900 mb-1">{title}</div>
                  <div className="text-sm text-gray-500">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="Отзывы" className="section-pad">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--flora-coral)" }}>Клиенты о нас</p>
            <h2 className="font-display text-5xl font-bold text-gray-900 mb-4">Отзывы</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-xl">★</span>)}
              <span className="ml-2 text-gray-600 font-medium">4.9 из 5</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map(({ name, text, stars, emoji }) => (
              <div key={name} className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50 card-hover">
                <div className="text-3xl mb-4">{emoji}</div>
                <div className="flex mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{text}"</p>
                <div className="font-semibold text-gray-900">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="Контакты" className="section-pad" style={{ background: "linear-gradient(135deg, #FF6B8A10, #9B59B610)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-medium uppercase tracking-widest mb-3" style={{ color: "var(--flora-coral)" }}>Мы рядом</p>
            <h2 className="font-display text-5xl font-bold text-gray-900 mb-4">Контакты</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (900) 000-00-00" },
                { icon: "Mail", label: "Email", value: "hello@floraprime.ru" },
                { icon: "MapPin", label: "Адрес", value: "ул. Цветочная, 12, Москва" },
                { icon: "Clock", label: "Режим работы", value: "Ежедневно: 8:00 – 22:00" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl grad-main flex items-center justify-center shrink-0">
                    <Icon name={icon} fallback="Phone" size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{label}</div>
                    <div className="font-semibold text-gray-900">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-50">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-6">Написать нам</h3>
              <div className="space-y-4">
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-pink-100 focus:outline-none focus:border-pink-400 bg-pink-50/30 text-gray-800 placeholder-gray-400"
                  placeholder="Ваше имя"
                />
                <input
                  className="w-full px-4 py-3 rounded-2xl border border-pink-100 focus:outline-none focus:border-pink-400 bg-pink-50/30 text-gray-800 placeholder-gray-400"
                  placeholder="Телефон или email"
                />
                <textarea
                  className="w-full px-4 py-3 rounded-2xl border border-pink-100 focus:outline-none focus:border-pink-400 bg-pink-50/30 text-gray-800 placeholder-gray-400 h-28 resize-none"
                  placeholder="Ваше сообщение..."
                />
                <button className="w-full btn-primary py-3 rounded-2xl font-semibold text-base">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center" style={{ background: "#1A0A12" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">🌸</span>
          <span className="font-display text-xl font-bold text-white">FloraPrime</span>
        </div>
        <p className="text-white/40 text-sm">© 2026 FloraPrime. Все права защищены.</p>
      </footer>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-pink-100">
              <h2 className="font-display text-2xl font-bold text-gray-900">Корзина</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-pink-50 rounded-full">
                <Icon name="X" size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {orderPlaced ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Заказ оформлен!</h3>
                  <p className="text-gray-500">Мы скоро свяжемся с вами для уточнения деталей</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-5xl mb-4">🌸</div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h3>
                  <p className="text-gray-500 mb-6">Добавьте букеты из каталога</p>
                  <button onClick={() => { setCartOpen(false); scrollTo("Каталог"); }} className="btn-primary px-6 py-3 rounded-full font-semibold">
                    Перейти в каталог
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-pink-50 rounded-2xl p-4">
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-sm grad-text font-bold">{(item.price * item.qty).toLocaleString()} ₽</div>
                        <div className="text-xs text-gray-400">{item.qty} шт × {item.price.toLocaleString()} ₽</div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 rounded-full">
                        <Icon name="Trash2" size={16} className="text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!orderPlaced && cart.length > 0 && (
              <div className="p-6 border-t border-pink-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Итого:</span>
                  <span className="text-2xl font-bold grad-text">{totalPrice.toLocaleString()} ₽</span>
                </div>
                <button onClick={placeOrder} className="w-full btn-primary py-4 rounded-2xl font-semibold text-base flex items-center justify-center gap-2">
                  <Icon name="Check" size={18} />
                  Оформить заказ
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
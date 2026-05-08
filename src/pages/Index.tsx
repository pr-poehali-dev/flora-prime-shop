import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a6c4d786-829a-4102-9fdb-c7248bc8cae4/files/ed96f816-48b0-4353-a740-12cf27017448.jpg";

const PRODUCTS = [
  { id: 1,  name: "Букет «Нежность»",       desc: "Сборный букет с пионами, эвкалиптом и лентами",    price: 3200, emoji: "💐", category: "Букеты" },
  { id: 2,  name: "Корзина «Лесная»",        desc: "Плетёная корзина с полевыми цветами и зеленью",    price: 4800, emoji: "🧺", category: "Корзины" },
  { id: 3,  name: "Гортензия синяя",         desc: "Крупные шапки гортензии, 5 веток",                 price: 2600, emoji: "💙", category: "Гортензия" },
  { id: 4,  name: "Пионы «Сад»",             desc: "Пышные белые и розовые пионы, 9 шт",               price: 3800, emoji: "🌸", category: "Пионы" },
  { id: 5,  name: "Роза красная 60см",       desc: "Классические красные розы, длинный стебель",       price: 3500, emoji: "🌹", category: "Розы" },
  { id: 6,  name: "Роза микс пастель",       desc: "Нежные пастельные розы 5 цветов, 15 шт",           price: 2900, emoji: "🌷", category: "Розы" },
  { id: 7,  name: "Кустовая роза белая",     desc: "Белая кустовая роза, ветвистая, 7 шт",             price: 1800, emoji: "🤍", category: "Кустовая Роза" },
  { id: 8,  name: "Кустовая роза персик",    desc: "Персиковый оттенок, пышное цветение",               price: 2100, emoji: "🧡", category: "Кустовая Роза" },
  { id: 9,  name: "Хризантема шаровая",      desc: "Жёлтые шаровые хризантемы, букет 10 шт",           price: 1600, emoji: "🌼", category: "Хризантемы" },
  { id: 10, name: "Хризантема кустовая",     desc: "Белая и лиловая кустовая хризантема",               price: 1400, emoji: "🌾", category: "Хризантемы" },
  { id: 11, name: "Антуриум красный",        desc: "Экзотический антуриум, яркий акцент",               price: 2200, emoji: "🌺", category: "Экзотика" },
  { id: 12, name: "Орхидея Дендробиум",      desc: "Элегантная белая орхидея на длинном стебле",        price: 3100, emoji: "🪷", category: "Экзотика" },
  { id: 13, name: "Мишка плюшевый",          desc: "Мягкий медведь 40 см, идеально к букету",           price: 900,  emoji: "🧸", category: "Мягкие игрушки" },
  { id: 14, name: "Зайчик с сердцем",        desc: "Плюшевый зайка с сердцем, 30 см",                  price: 750,  emoji: "🐰", category: "Мягкие игрушки" },
  { id: 15, name: "Ранункулюс микс",         desc: "Яркие ранункулюсы 5 цветов, 10 шт",                price: 2400, emoji: "🌈", category: "Ранункулюсы" },
  { id: 16, name: "Ранункулюс белый",        desc: "Нежные белые ранункулюсы, 7 шт",                   price: 1900, emoji: "⚪", category: "Ранункулюсы" },
  { id: 17, name: "Эвкалипт",               desc: "Свежие ветки эвкалипта, пучок",                     price: 600,  emoji: "🌿", category: "Зелень" },
  { id: 18, name: "Питтоспорум",             desc: "Декоративная зелень для букета, пучок",             price: 550,  emoji: "🍃", category: "Зелень" },
  { id: 19, name: "Диантус розовый",         desc: "Гвоздика диантус, нежно-розовый, 10 шт",           price: 1200, emoji: "🌷", category: "Диантусы" },
  { id: 20, name: "Диантус бордо",           desc: "Бордовый диантус, насыщенный цвет",                price: 1300, emoji: "🍷", category: "Диантусы" },
  { id: 21, name: "Сет «Люкс»",             desc: "Розы, пионы, орхидея — всё в одном сете",           price: 8500, emoji: "👑", category: "Премиум Сеты" },
  { id: 22, name: "Сет «Романтика»",         desc: "Красные розы, макаруны, свеча и открытка",          price: 6200, emoji: "💝", category: "Премиум Сеты" },
  { id: 23, name: "Комплимент «Мини»",       desc: "Маленький букетик 5 цветков с лентой",              price: 650,  emoji: "🎀", category: "Комплименты" },
  { id: 24, name: "Комплимент «Сюрприз»",    desc: "Бутоньерка + открытка ручной работы",              price: 850,  emoji: "💌", category: "Комплименты" },
  { id: 25, name: "Ваза цилиндр стекло",     desc: "Прозрачная стеклянная ваза, 30 см",                price: 1100, emoji: "🏺", category: "Вазы" },
  { id: 26, name: "Ваза керамика белая",     desc: "Матовая керамическая ваза, скандинавский стиль",   price: 1500, emoji: "🪔", category: "Вазы" },
  { id: 27, name: "Упаковка крафт",          desc: "Крафтовая упаковка с лентой и тишью",              price: 300,  emoji: "📦", category: "Оформление Букета" },
  { id: 28, name: "Коробка-сюрприз",         desc: "Шляпная коробка с наполнителем и декором",         price: 700,  emoji: "🎁", category: "Оформление Букета" },
  { id: 29, name: "Лента атласная",          desc: "Атласная лента для завязки, 2 м",                  price: 120,  emoji: "🎗️", category: "Флористические материалы" },
  { id: 30, name: "Флористическая пена",     desc: "Оазис для создания композиций, блок",              price: 250,  emoji: "🧽", category: "Флористические материалы" },
];

const REVIEWS = [
  { name: "Анастасия К.", text: "Заказала букет на день рождения мамы — она была в слезах от восторга! Цветы свежайшие, доставили вовремя.", stars: 5 },
  { name: "Михаил Р.",    text: "Уже третий раз заказываю. Всегда красиво, всегда вовремя. Жена каждый раз счастлива!", stars: 5 },
  { name: "Елена В.",     text: "Профессионалы своего дела. Флорист помог выбрать состав — получилось лучше, чем я представляла.", stars: 5 },
];

const NAV = ["Главная", "Каталог", "О нас", "Доставка", "Отзывы", "Контакты"];

const FILTERS = [
  "Все категории", "Букеты", "Корзины", "Гортензия", "Пионы",
  "Розы", "Кустовая Роза", "Хризантемы", "Экзотика", "Мягкие игрушки",
  "Ранункулюсы", "Зелень", "Диантусы", "Премиум Сеты",
  "Комплименты", "Вазы", "Оформление Букета", "Флористические материалы",
];

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
  const [filter, setFilter] = useState("Все категории");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, emoji: product.emoji, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((prev) => prev.filter((i) => i.id !== id));

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

  const filtered = filter === "Все категории" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen font-golos" style={{ background: "var(--black-deep)", color: "var(--white-soft)" }}>

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

          <div className="flex items-center gap-3">
            <span className="text-xl">🌸</span>
            <span className="font-display text-xl font-semibold tracking-wider" style={{ color: "var(--gold)" }}>
              FloraPrime
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200"
                style={{
                  color: activeSection === item ? "var(--gold)" : "var(--white-muted)",
                  borderBottom: activeSection === item ? "1px solid var(--gold)" : "1px solid transparent",
                }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 btn-primary px-5 py-2 rounded-sm text-sm font-semibold tracking-wide"
            >
              <Icon name="ShoppingBag" size={15} />
              <span className="hidden sm:inline">Корзина</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-white text-xs flex items-center justify-center font-bold"
                  style={{ background: "var(--gold-dark)" }}>
                  {totalItems}
                </span>
              )}
            </button>
            <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
              <Icon name="Menu" size={20} style={{ color: "var(--gold)" }} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="md:hidden px-6 py-3 flex flex-col gap-1" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
            {NAV.map((item) => (
              <button key={item} onClick={() => scrollTo(item)}
                className="text-left px-4 py-2.5 text-sm tracking-wide transition-colors"
                style={{ color: "var(--white-muted)" }}>
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="Главная" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(10,10,10,0.8) 60%, rgba(20,16,8,0.7) 100%)" }} />
        </div>

        {/* Gold glow */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-10 animate-float pointer-events-none"
          style={{ background: "radial-gradient(circle, #C9A84C, transparent 70%)" }} />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full opacity-5 animate-float animate-delay-300 pointer-events-none"
          style={{ background: "radial-gradient(circle, #E8C97A, transparent 70%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24">
          <div className="max-w-2xl">

            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: "var(--gold)" }} />
              <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>
                Флористика высшего класса
              </span>
            </div>

            <h1 className="font-display font-light leading-[0.9] mb-8" style={{ fontSize: "clamp(4rem, 10vw, 8rem)", color: "var(--white-soft)" }}>
              Цветы,<br />
              <em className="not-italic" style={{ color: "var(--gold)" }}>созданные</em><br />
              для вас
            </h1>

            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: "var(--white-muted)" }}>
              Свежие букеты ручной работы. Доставляем красоту и тепло прямо к вашей двери — каждый день.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <button onClick={() => scrollTo("Каталог")}
                className="btn-primary px-8 py-3.5 rounded-sm text-sm font-semibold tracking-widest uppercase inline-flex items-center gap-3">
                Выбрать букет
                <Icon name="ArrowRight" size={16} />
              </button>
              <button onClick={() => scrollTo("Доставка")}
                className="btn-outline px-8 py-3.5 rounded-sm text-sm font-semibold tracking-widest uppercase">
                Доставка
              </button>
            </div>

            <div className="divider-gold mb-10" />

            <div className="flex items-center gap-12">
              {[["500+", "Клиентов"], ["60 мин", "Доставка"], ["100%", "Свежесть"]].map(([val, label]) => (
                <div key={val}>
                  <div className="font-display text-3xl font-light grad-text">{val}</div>
                  <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--white-muted)" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CATALOG ── */}
      <section id="Каталог" className="section-pad section-dark">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>Каталог</span>
          </div>
          <h2 className="font-display font-light text-5xl mb-3" style={{ color: "var(--white-soft)" }}>Наш ассортимент</h2>
          <p className="mb-10 text-sm" style={{ color: "var(--white-muted)" }}>Каждый букет — история, рассказанная цветами</p>

          {/* Filters */}
          <div className="flex gap-2 mb-10 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-4 py-2 text-xs font-medium tracking-wide uppercase whitespace-nowrap shrink-0 rounded-sm transition-all duration-200"
                style={filter === f
                  ? { background: "var(--grad-main)", color: "#0A0A0A" }
                  : { background: "transparent", color: "var(--white-muted)", border: "1px solid rgba(201,168,76,0.2)" }
                }
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div key={product.id} className="card-luxury rounded-sm flex flex-col">
                <div className="flex items-center justify-center h-40 text-7xl"
                  style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(201,168,76,0.08)" }}>
                  {product.emoji}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--gold-dark)" }}>
                    {product.category}
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-1 leading-tight" style={{ color: "var(--white-soft)" }}>
                    {product.name}
                  </h3>
                  <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: "var(--white-muted)" }}>
                    {product.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl grad-text">{product.price.toLocaleString()} ₽</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="btn-primary px-3 py-2 rounded-sm text-xs font-semibold tracking-wide flex items-center gap-1.5"
                    >
                      <Icon name="Plus" size={13} />
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="О нас" className="section-pad section-deeper relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #C9A84C, transparent 70%)" }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-10" style={{ background: "var(--gold)" }} />
                <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>О нас</span>
              </div>
              <h2 className="font-display font-light text-5xl mb-6 leading-tight" style={{ color: "var(--white-soft)" }}>
                Мы создаём<br />красоту с душой
              </h2>
              <p className="text-sm leading-loose mb-10" style={{ color: "var(--white-muted)" }}>
                FloraPrime — команда флористов, влюблённых в своё дело. Каждый букет — произведение искусства: свежайшие цветы, тщательно продуманные детали и упаковка с заботой.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Leaf",  title: "Свежие цветы",  desc: "Прямые поставки с лучших ферм" },
                  { icon: "Heart", title: "Ручная работа",  desc: "Каждый букет создан с любовью" },
                  { icon: "Clock", title: "Быстро",         desc: "Доставка от 60 минут" },
                  { icon: "Star",  title: "Гарантия",       desc: "Вернём деньги, если не понравится" },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="p-4 rounded-sm" style={{ border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.03)" }}>
                    <div className="w-9 h-9 rounded-sm mb-3 flex items-center justify-center grad-main">
                      <Icon name={icon} fallback="Star" size={16} style={{ color: "#0A0A0A" }} />
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "var(--white-soft)" }}>{title}</div>
                    <div className="text-xs" style={{ color: "var(--white-muted)" }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-sm overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute -bottom-5 -left-5 px-6 py-4 rounded-sm glass-card"
                style={{ border: "1px solid rgba(201,168,76,0.25)" }}>
                <div className="font-display text-3xl font-light grad-text">5 лет</div>
                <div className="text-xs tracking-widest uppercase mt-0.5" style={{ color: "var(--white-muted)" }}>на рынке цветов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section id="Доставка" className="section-pad section-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>Доставка</span>
          </div>
          <h2 className="font-display font-light text-5xl mb-12" style={{ color: "var(--white-soft)" }}>Условия доставки</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { emoji: "⚡", title: "Экспресс",   time: "60–90 минут",         price: "300 ₽",  desc: "Срочная доставка в любую точку города" },
              { emoji: "📅", title: "Стандарт",   time: "2–4 часа",            price: "150 ₽",  desc: "Выберите удобный временной слот" },
              { emoji: "🎁", title: "Бесплатно",  time: "При заказе от 3000 ₽", price: "0 ₽",  desc: "Доставляем с улыбкой и любовью" },
            ].map(({ emoji, title, time, price, desc }) => (
              <div key={title} className="card-luxury rounded-sm p-8 text-center">
                <div className="text-4xl mb-5">{emoji}</div>
                <h3 className="font-display text-2xl font-light mb-2" style={{ color: "var(--white-soft)" }}>{title}</h3>
                <div className="font-display text-3xl grad-text mb-1">{price}</div>
                <div className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--gold-dark)" }}>{time}</div>
                <div className="divider-gold mb-4" />
                <p className="text-xs leading-relaxed" style={{ color: "var(--white-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>

          <div className="rounded-sm p-8" style={{ border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.02)" }}>
            <h3 className="font-display text-2xl font-light text-center mb-8" style={{ color: "var(--white-soft)" }}>Как оформить заказ</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Выберите букет",    desc: "В каталоге или по описанию" },
                { step: "02", title: "В корзину",         desc: "Укажите нужное количество" },
                { step: "03", title: "Оформите заказ",    desc: "Адрес и время доставки" },
                { step: "04", title: "Получайте!",        desc: "Курьер привезёт с улыбкой" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex flex-col items-center text-center">
                  <div className="font-display text-4xl font-light grad-text mb-3">{step}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: "var(--white-soft)" }}>{title}</div>
                  <div className="text-xs" style={{ color: "var(--white-muted)" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="Отзывы" className="section-pad section-deeper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>Отзывы</span>
          </div>
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-display font-light text-5xl" style={{ color: "var(--white-soft)" }}>Клиенты о нас</h2>
            <div className="flex items-center gap-2 pb-1">
              <div className="flex">
                {[1,2,3,4,5].map(i => <span key={i} style={{ color: "var(--gold)" }}>★</span>)}
              </div>
              <span className="text-sm" style={{ color: "var(--white-muted)" }}>4.9 / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map(({ name, text, stars }) => (
              <div key={name} className="card-luxury rounded-sm p-8">
                <div className="flex mb-5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <span key={i} style={{ color: "var(--gold)" }}>★</span>
                  ))}
                </div>
                <p className="text-sm leading-loose mb-6 italic" style={{ color: "var(--white-muted)" }}>"{text}"</p>
                <div className="divider-gold mb-5" />
                <div className="text-sm font-semibold tracking-wide" style={{ color: "var(--white-soft)" }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACTS ── */}
      <section id="Контакты" className="section-pad section-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10" style={{ background: "var(--gold)" }} />
            <span className="text-xs font-medium uppercase tracking-[0.3em]" style={{ color: "var(--gold)" }}>Контакты</span>
          </div>
          <h2 className="font-display font-light text-5xl mb-12" style={{ color: "var(--white-soft)" }}>Свяжитесь с нами</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-7">
              {[
                { icon: "Phone",  label: "Телефон",       value: "+7 (900) 000-00-00" },
                { icon: "Mail",   label: "Email",          value: "hello@floraprime.ru" },
                { icon: "MapPin", label: "Адрес",          value: "ул. Цветочная, 12, Москва" },
                { icon: "Clock",  label: "Режим работы",   value: "Ежедневно: 8:00 – 22:00" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-5">
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0 grad-main">
                    <Icon name={icon} fallback="Phone" size={17} style={{ color: "#0A0A0A" }} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest mb-0.5" style={{ color: "var(--gold-dark)" }}>{label}</div>
                    <div className="text-sm font-medium" style={{ color: "var(--white-soft)" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-sm p-8" style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.02)" }}>
              <h3 className="font-display text-2xl font-light mb-6" style={{ color: "var(--white-soft)" }}>Написать нам</h3>
              <div className="space-y-4">
                {["Ваше имя", "Телефон или email"].map((ph) => (
                  <input key={ph} placeholder={ph}
                    className="w-full px-4 py-3 rounded-sm text-sm bg-transparent outline-none transition-colors"
                    style={{ border: "1px solid rgba(201,168,76,0.2)", color: "var(--white-soft)" }}
                  />
                ))}
                <textarea placeholder="Ваше сообщение..."
                  className="w-full px-4 py-3 rounded-sm text-sm bg-transparent outline-none h-28 resize-none transition-colors"
                  style={{ border: "1px solid rgba(201,168,76,0.2)", color: "var(--white-soft)" }}
                />
                <button className="w-full btn-primary py-3.5 rounded-sm font-semibold text-sm tracking-widest uppercase">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 text-center" style={{ background: "var(--black-deep)", borderTop: "1px solid rgba(201,168,76,0.18)" }}>
        <div className="flex items-center justify-center gap-2 mb-3">
          <span>🌸</span>
          <span className="font-display text-lg tracking-wider" style={{ color: "var(--gold)" }}>FloraPrime</span>
        </div>
        <div className="divider-gold w-24 mx-auto mb-4" />
        <p className="text-xs tracking-widest uppercase" style={{ color: "rgba(168,152,128,0.4)" }}>
          © 2026 FloraPrime. Все права защищены.
        </p>
      </footer>

      {/* ── CART DRAWER ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(30,25,20,0.75)" }} onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md h-full flex flex-col shadow-2xl"
            style={{ background: "var(--black-card)", borderLeft: "1px solid rgba(201,168,76,0.2)" }}>

            <div className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
              <h2 className="font-display text-2xl font-light" style={{ color: "var(--white-soft)" }}>Корзина</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 transition-colors"
                style={{ color: "var(--white-muted)" }}>
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {orderPlaced ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-5xl mb-4">✨</div>
                  <h3 className="font-display text-2xl font-light mb-2" style={{ color: "var(--white-soft)" }}>Заказ оформлен!</h3>
                  <p className="text-sm" style={{ color: "var(--white-muted)" }}>Мы скоро свяжемся с вами</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-5xl mb-4">🌸</div>
                  <h3 className="font-display text-2xl font-light mb-2" style={{ color: "var(--white-soft)" }}>Корзина пуста</h3>
                  <p className="text-sm mb-6" style={{ color: "var(--white-muted)" }}>Добавьте букеты из каталога</p>
                  <button onClick={() => { setCartOpen(false); scrollTo("Каталог"); }}
                    className="btn-primary px-6 py-3 rounded-sm text-sm font-semibold tracking-widest uppercase">
                    В каталог
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-sm"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.1)" }}>
                      <span className="text-3xl">{item.emoji}</span>
                      <div className="flex-1">
                        <div className="text-sm font-medium" style={{ color: "var(--white-soft)" }}>{item.name}</div>
                        <div className="text-xs grad-text font-semibold mt-0.5">{(item.price * item.qty).toLocaleString()} ₽</div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--white-muted)" }}>{item.qty} шт × {item.price.toLocaleString()} ₽</div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 transition-colors"
                        style={{ color: "rgba(201,168,76,0.4)" }}>
                        <Icon name="Trash2" size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!orderPlaced && cart.length > 0 && (
              <div className="p-6" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm uppercase tracking-widest" style={{ color: "var(--white-muted)" }}>Итого</span>
                  <span className="font-display text-2xl font-light grad-text">{totalPrice.toLocaleString()} ₽</span>
                </div>
                <button onClick={placeOrder}
                  className="w-full btn-primary py-4 rounded-sm font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2">
                  <Icon name="Check" size={16} />
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
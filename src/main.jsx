import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logoImage from "../logo/logo.png";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const email = "e4etrading26@gmail.com";
const phoneDisplay = "+38(099)-146-10-02";
const phoneHref = "+380991461002";
const address = "Київ, 04215, вул. Світлицького, 35, прим. 108/4 в літ. «З»";

const navigation = [
  ["index.html", "Головна"],
  ["about.html", "Про нас"],
  ["services.html", "Трейдерська діяльність"],
  ["documents.html", "Документи"],
  ["contact.html", "Контакти"]
];

const currentFile = window.location.pathname.split("/").pop() || "index.html";
const pageName = currentFile.replace(".html", "") || "index";
const href = (file) => `${import.meta.env.BASE_URL}${file}`;

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href={href("index.html")} aria-label="Е4Е ТРЕЙДИНГ — головна">
      <span className="brand-mark"><img src={logoImage} alt="" /></span>
      <span className="brand-copy">
        <strong>ТРЕЙДИНГ</strong>
        <small>E4E TRADING</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-shell">
        <Brand light />
        <nav className={`desktop-nav ${open ? "is-open" : ""}`} aria-label="Головна навігація">
          {navigation.map(([file, label]) => (
            <a className={currentFile === file || (currentFile === "" && file === "index.html") ? "active" : ""} href={href(file)} key={file}>
              {label}
            </a>
          ))}
          <a className="mobile-phone" href={`tel:${phoneHref}`}>{phoneDisplay}</a>
        </nav>
        <div className="header-actions">
          <a className="header-phone" href={`tel:${phoneHref}`}>{phoneDisplay}</a>
          <a className="header-cta" href={href("contact.html")}>Зв'язатися</a>
          <button
            className={`menu-button ${open ? "is-open" : ""}`}
            type="button"
            aria-label={open ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function ArrowLink({ to, children, variant = "dark", external = false }) {
  return (
    <a className={`button button-${variant}`} href={to} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <span>{children}</span>
      <span className="button-arrow" aria-hidden="true" />
    </a>
  );
}

function PageHero({ title, eyebrow, text, image = "energy-market-grid" }) {
  return (
    <section className="page-hero">
      <img className="hero-image" src={`https://picsum.photos/seed/${image}/1800/1100`} alt="" />
      <div className="hero-wash" />
      <div className="container page-hero-inner">
        <p className="eyebrow hero-reveal">{eyebrow}</p>
        <h1 className="hero-reveal">{title}</h1>
        <p className="page-hero-copy hero-reveal">{text}</p>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, copy, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading-light" : ""}`} data-reveal>
      {kicker && <p className="eyebrow">{kicker}</p>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Marquee() {
  const items = ["CLIENT FIRST", "FAIR PRICING", "LAW COMPLIANCE", "UKRAINE MARKET", "EUROPEAN TRADE"];
  return (
    <div className="marquee" aria-label="Принципи роботи компанії">
      <div className="marquee-track">
        {[0, 1, 2, 3, 4, 5].map((group) => (
          <div className="marquee-group" aria-hidden={group !== 0} key={group}>
            {items.map((item) => (
              <React.Fragment key={`${group}-${item}`}>
                <span>{item}</span><i aria-hidden="true" />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CTA({ title, copy, primary = "Залишити заявку", secondary = "Дізнатися більше", secondaryHref = "about.html" }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner" data-reveal>
        <div>
          <p className="eyebrow">Почнемо діалог</p>
          <h2>{title}</h2>
          {copy && <p>{copy}</p>}
        </div>
        <div className="cta-actions">
          <ArrowLink to={href("contact.html")} variant="lime">{primary}</ArrowLink>
          <ArrowLink to={href(secondaryHref)} variant="outline-light">{secondary}</ArrowLink>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Brand light />
          <p>Професійна оптова торгівля електроенергією на ринку України та Європи.</p>
          <span className="license-note">Ліцензована діяльність · НКРЕКП</span>
        </div>
        <div className="footer-column">
          <h3>Навігація</h3>
          {navigation.map(([file, label]) => <a href={href(file)} key={file}>{label}</a>)}
        </div>
        <div className="footer-column">
          <h3>Реквізити</h3>
          <p>ЄДРПОУ 46363402</p>
          <p>Вид діяльності 35.14</p>
          <p>Керівник — Гришко М. В.</p>
        </div>
        <div className="footer-column footer-contacts">
          <h3>Контакти</h3>
          <p>{address}</p>
          <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <p>Пн–пт 09:00–18:00</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 ТОВ «Е4Е ТРЕЙДИНГ»</p>
        <p>Енергія відповідального партнерства</p>
      </div>
    </footer>
  );
}

function HomePage() {
  const advantages = [
    ["Трейдерська діяльність", "Оптова торгівля з індивідуальним підходом і гнучкими тарифами."],
    ["Надійність", "Роки роботи на ринку з неухильним дотриманням нормативних вимог."],
    ["Прозорість", "Чесні умови співпраці без прихованих комісій і неочікуваних платежів."]
  ];
  return (
    <>
      <section className="home-hero">
        <img className="hero-image" src="https://picsum.photos/seed/modern-energy-flow/2000/1300" alt="" />
        <div className="hero-wash" />
        <div className="container home-hero-inner">
          <p className="eyebrow hero-reveal">Енергія для відповідального бізнесу</p>
          <h1 className="hero-reveal">Клієнт —<br />найвища цінність</h1>
          <p className="hero-copy hero-reveal">ТОВ «Е4Е ТРЕЙДИНГ» — юридична особа за законодавством України, яка здійснює перепродаж електричної енергії.</p>
          <div className="hero-actions hero-reveal">
            <ArrowLink to={href("services.html")} variant="lime">Наші послуги</ArrowLink>
            <ArrowLink to={href("contact.html")} variant="glass">Отримати консультацію</ArrowLink>
          </div>
        </div>
      </section>

      <section className="record-section">
        <div className="container">
          <article className="record-card" data-reveal>
            <div className="record-energy" aria-hidden="true">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            <div className="record-main">
              <p>Торговий майданчик</p>
              <h2>Оптова торгівля електроенергією в реальному часі</h2>
            </div>
            <dl>
              <div><dt>Код ЄДРПОУ</dt><dd>46363402</dd></div>
              <div><dt>Вид діяльності</dt><dd>35.14</dd></div>
            </dl>
          </article>
        </div>
      </section>

      <Marquee />

      <section className="section-space">
        <div className="container">
          <SectionHeading kicker="Сильна основа" title="Наші переваги" copy="Умови, в яких професійність відчувається на кожному етапі співпраці." />
          <div className="advantage-grid grid-flow-dense">
            {advantages.map(([title, copy], index) => (
              <article className="advantage-card interactive-card" data-reveal key={title}>
                <span className="card-index">0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space company-section" data-pinned-section>
        <div className="container pinned-layout">
          <div className="pinned-title" data-pin-title>
            <p className="eyebrow">Про компанію</p>
            <h2>Рухаємо енергію туди, де вона створює цінність.</h2>
          </div>
          <div className="story-list">
            <article className="story-card" data-reveal>
              <p className="story-number">01</p>
              <h3>Професійна торгівля</h3>
              <p>Українська енергетична компанія, що працює з оптовими поставками електроенергії та будує довгострокові відносини з клієнтами.</p>
            </article>
            <article className="story-card story-card-dark" data-reveal>
              <p className="story-number">02</p>
              <h3>Наша місія</h3>
              <p>Забезпечувати надійне постачання електроенергії, підтримуючи високі стандарти якості, прозорості та відповідальності.</p>
            </article>
            <article className="story-card story-card-image" data-reveal>
              <img src="https://picsum.photos/seed/european-energy-architecture/1200/900" alt="Сучасна енергетична інфраструктура" />
              <div className="story-overlay">
                <p>ЄДРПОУ 46363402 · КВЕД 35.14</p>
                <ArrowLink to={href("about.html")} variant="light">Детальніше про компанію</ArrowLink>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space geography-section">
        <div className="container">
          <SectionHeading kicker="Географія діяльності" title="Працюємо без зайвих кордонів" copy="Поєднуємо локальну експертизу з європейським масштабом оптової торгівлі." />
          <HorizontalAccordion items={[
            { title: "Україна", meta: "Ринок України", copy: "Професійна робота на внутрішньому ринку електричної енергії.", tone: "green" },
            { title: "Європа", meta: "Оптові поставки", copy: "Розвиток партнерств і торгівлі на європейському енергетичному ринку.", tone: "dark" },
            { title: "Київ", meta: "Головний офіс", copy: address, tone: "sand" }
          ]} />
        </div>
      </section>

      <CTA title="Готові співпрацювати?" copy="Отримайте професійну консультацію вже сьогодні." />
    </>
  );
}

function HorizontalAccordion({ items }) {
  return (
    <div className="horizontal-accordion" data-reveal>
      {items.map((item, index) => (
        <article className={`accordion-panel accordion-${item.tone}`} tabIndex="0" key={item.title}>
          <span className="panel-number">0{index + 1}</span>
          <div className="panel-content">
            <p>{item.meta}</p>
            <h3>{item.title}</h3>
            <span>{item.copy}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function PrinciplesCarousel() {
  const [active, setActive] = useState(0);
  const principles = [
    ["Надійність", "Стабільність та якість послуг згідно з нормативами України та ЄС."],
    ["Чесність", "Прозорість у ціноутворенні та жодних прихованих комісій."],
    ["Досвід", "Кваліфікована команда з багаторічним досвідом в енергетиці."],
    ["Ефективність", "Швидко реагуємо на потреби клієнтів і працюємо на результат."]
  ];
  const move = (direction) => setActive((active + direction + principles.length) % principles.length);
  return (
    <div className="principles-carousel" data-reveal>
      <div className="carousel-count">0{active + 1} / 0{principles.length}</div>
      <div className="carousel-stage" aria-live="polite">
        <p>“</p>
        <h3>{principles[active][0]}</h3>
        <span>{principles[active][1]}</span>
      </div>
      <div className="carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Попередній принцип">←</button>
        <button type="button" onClick={() => move(1)} aria-label="Наступний принцип">→</button>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Про нас" title="Надійний партнер у сфері енергетики" text="Клієнтоорієнтований бізнес, який поєднує професійну експертизу, прозорість і відповідальність." image="energy-partnership" />

      <section className="section-space">
        <div className="container">
          <SectionHeading kicker="Офіційно" title="Реєстраційні дані" />
          <div className="registration-grid grid-flow-dense" data-reveal>
            <article className="registration-primary">
              <p>Повна назва</p>
              <h3>ТОВАРИСТВО З ОБМЕЖЕНОЮ ВІДПОВІДАЛЬНІСТЮ «Е4Е ТРЕЙДИНГ»</h3>
              <span className="status-dot"><i />Зареєстровано</span>
            </article>
            <dl className="registration-data">
              <div><dt>ЄДРПОУ</dt><dd>46363402</dd></div>
              <div><dt>Керівник</dt><dd>Гришко Максим Вікторович</dd></div>
              <div><dt>Вид діяльності</dt><dd>35.14</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section-space soft-section" data-pinned-section>
        <div className="container pinned-layout">
          <div className="pinned-title" data-pin-title>
            <p className="eyebrow">Компанія</p>
            <h2>Українська експертиза. Європейський масштаб.</h2>
          </div>
          <div className="story-list">
            <article className="story-card" data-reveal>
              <h3>Оптова торгівля</h3>
              <p>ТОВ «Е4Е ТРЕЙДИНГ» здійснює оптову торгівлю електроенергією на ринку України та Європи.</p>
            </article>
            <article className="story-card story-card-dark" data-reveal>
              <h3>Клієнт у центрі</h3>
              <p>Будуємо бізнес навколо реальних потреб клієнта, пропонуючи зрозумілі умови та персональний підхід.</p>
            </article>
            <article className="contact-snapshot" data-reveal>
              <div><p>Адреса</p><strong>{address}</strong></div>
              <div><p>Графік</p><strong>Пн–пт 09:00–18:00<br />Сб–нд вихідний</strong></div>
              <div><p>Зв'язок</p><strong>{phoneDisplay}<br />{email}</strong></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space principles-section">
        <div className="container principles-layout">
          <SectionHeading kicker="Наші принципи" title="Рішення, за якими стоять цінності" copy="Чотири орієнтири, що визначають кожен робочий процес." light />
          <PrinciplesCarousel />
        </div>
      </section>

      <section className="section-space leadership-section">
        <div className="container leadership-card" data-reveal>
          <div className="leader-monogram">МГ</div>
          <div>
            <p className="eyebrow">Керівництво</p>
            <h2>Гришко Максим Вікторович</h2>
            <p>Відповідальна особа компанії з досвідом у сфері енергетики та трейдерської діяльності.</p>
          </div>
        </div>
      </section>

      <CTA title="Готові обговорити ваш проєкт?" primary="Зв'язатися з нами" secondary="Наші послуги" secondaryHref="services.html" />
    </>
  );
}

function ServicesPage() {
  const offers = [
    ["Індивідуальний підхід", "Умови співпраці формуються навколо потреб і профілю споживання клієнта."],
    ["Гнучке ціноутворення", "Враховуємо обсяг, період поставки та інші фактори кожної угоди."],
    ["Прозорість умов", "Зрозуміла комунікація, чесні розрахунки та відсутність прихованих комісій."],
    ["Надійність поставок", "Стабільні процеси та відповідальна робота в межах чинних нормативів."]
  ];
  const reasons = [
    ["Client · First", "Бізнес, орієнтований на клієнта."],
    ["Fair · Pricing", "Прозорий ресурс за прозорою ціною."],
    ["Law · Compliance", "Дотримання законодавства України та вимог НКРЕКП."]
  ];
  const process = [
    ["Консультація", "Безкоштовний аналіз потреб і первинне визначення задачі."],
    ["Розрахунок", "Індивідуальна калькуляція ціни з урахуванням обсягів і періоду."],
    ["Угода", "Фіксуємо умови та підписуємо зрозумілий договір."],
    ["Постачання", "Забезпечуємо надійне постачання електричної енергії."]
  ];
  return (
    <>
      <PageHero eyebrow="КВЕД 35.14" title="Трейдерська діяльність" text="Господарська діяльність з перепродажу електроенергії на ринку України та Європи." image="electric-trading" />

      <section className="section-space direction-section">
        <div className="container direction-grid">
          <div className="direction-image" data-reveal>
            <img src="https://picsum.photos/seed/energy-control-room/1300/1100" alt="Сучасний простір управління енергією" />
          </div>
          <div className="direction-copy" data-reveal>
            <p className="eyebrow">Напрям роботи</p>
            <h2>Оптова торгівля, адаптована до вашого бізнесу.</h2>
            <p>Ціни встановлюються індивідуально та залежать від обсягу, періоду постачання й інших факторів. Ми пояснюємо логіку пропозиції та погоджуємо кожну умову.</p>
            <ArrowLink to={href("contact.html")}>Обговорити умови</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section-space offers-section">
        <div className="container">
          <SectionHeading kicker="Для клієнтів" title="Що ми пропонуємо" />
          <div className="offer-grid grid-flow-dense">
            {offers.map(([title, copy], index) => (
              <article className="offer-card interactive-card" data-reveal key={title}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space reason-section">
        <div className="container">
          <SectionHeading kicker="Чому обирають нас" title="Зрозумілий принцип у кожній дії" light />
          <div className="reason-grid grid-flow-dense">
            {reasons.map(([title, copy]) => <article data-reveal key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section-space process-section">
        <div className="container process-layout">
          <div className="process-intro">
            <p className="eyebrow">Як ми працюємо</p>
            <h2>Від першої розмови до стабільного постачання.</h2>
          </div>
          <div className="process-stack">
            {process.map(([title, copy], index) => (
              <article className="process-card" data-stack-card key={title} style={{ top: `${110 + index * 18}px` }}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA title="Отримайте індивідуальну пропозицію" primary="Залишити заявку" secondary="Нормативні документи" secondaryHref="documents.html" />
    </>
  );
}

function DocumentsPage() {
  const laws = [
    { title: "ЗАКОН УКРАЇНИ «Про ринок електричної енергії»", url: "https://zakon.rada.gov.ua/laws/show/2019-19" },
    { title: "ЗАКОН УКРАЇНИ «Про захист економічної конкуренції»", url: "https://zakon.rada.gov.ua/laws/show/2210-14" },
    { title: "ЗАКОН УКРАЇНИ «Про захист персональних даних»", url: "https://zakon.rada.gov.ua/laws/show/2297-17" },
    { title: "ЗАКОН УКРАЇНИ «Про Національну комісію, що здійснює державне регулювання у сферах енергетики та комунальних послуг»", url: "https://zakon.rada.gov.ua/laws/show/1540-19" },
    { title: "ЗАКОН УКРАЇНИ «Про особливості доступу до інформації…»", url: "https://zakon.rada.gov.ua/laws/show/887-19" }
  ];
  const regulations = [
    { title: "Постанова НКРЕКП «Про затвердження Правил ринку»", url: "https://zakon.rada.gov.ua/laws/show/v0307874-18#Text" },
    { title: "Постанова НКРЕКП «Про затвердження Кодексу системи передачі»", url: "https://zakon.rada.gov.ua/laws/show/v0309874-18#Text" },
    { title: "Постанова НКРЕКП «Про затвердження Кодексу комерційного обліку електричної енергії»", url: "https://zakon.rada.gov.ua/laws/show/v0311874-18#Text" },
    { title: "Постанова НКРЕКП «Про затвердження Правил ринку \"на добу наперед\" та внутрішньодобового ринку»", url: "https://zakon.rada.gov.ua/laws/show/v0308874-18#Text" },
    { title: "Постанова НКРЕКП «Про затвердження Ліцензійних умов провадження господарської діяльності з перепродажу електричної енергії (трейдерської діяльності)»", url: "https://zakon.rada.gov.ua/laws/show/v1468874-17#Text" }
  ];
  return (
    <>
      <PageHero eyebrow="Правова основа" title="Нормативні документи" text="Діяльність компанії регулюється законодавством України щодо ринку електричної енергії." image="law-and-energy" />
      <section className="section-space documents-section">
        <div className="container documents-grid">
          <DocumentList title="Закони України" items={laws} />
          <DocumentList title="Постанови НКРЕКП" items={regulations} />
        </div>
      </section>
      <CTA title="Потрібна додаткова консультація?" primary="Задати питання" secondary="Трейдерська діяльність" secondaryHref="services.html" />
    </>
  );
}

function DocumentList({ title, items }) {
  return (
    <section className="document-list" data-reveal>
      <h2>{title}</h2>
      <div>
        {items.map((item, index) => (
          <article key={item.url}>
            <a className="document-link" href={item.url} target="_blank" rel="noreferrer">
              <span className="document-index">{String(index + 1).padStart(2, "0")}</span>
              <p>{item.title}</p>
              <span className="document-arrow" aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`${data.get("topic")}: ${data.get("company") || data.get("name")}`);
    const body = encodeURIComponent(`Ім'я: ${data.get("name")}\nEmail: ${data.get("email")}\nТелефон: ${data.get("phone")}\nКомпанія: ${data.get("company")}\n\n${data.get("message")}`);
    setSent(true);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };
  return (
    <>
      <PageHero eyebrow="Будемо на зв'язку" title="Контакти" text="Звертайтеся з питаннями щодо консультації, умов співпраці та індивідуальної пропозиції." image="kyiv-business-energy" />

      <section className="section-space contact-section">
        <div className="container contact-layout">
          <div className="contact-details">
            <SectionHeading kicker="Прямий контакт" title="Усі дані в одному місці" />
            <dl data-reveal>
              <div><dt>Адреса</dt><dd>{address}</dd></div>
              <div><dt>Години роботи</dt><dd>Пн–пт 09:00–18:00<br />Сб–нд вихідний</dd></div>
              <div><dt>Відповідальна особа</dt><dd>Керівник Гришко Максим Вікторович<br /><a href={`tel:${phoneHref}`}>{phoneDisplay}</a></dd></div>
              <div><dt>Email</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
              <div><dt>Юридична інформація</dt><dd>ЄДРПОУ 46363402<br />Код діяльності 35.14 — торгівля електроенергією</dd></div>
            </dl>
          </div>

          <form className="contact-form" onSubmit={submit} data-reveal>
            <p className="eyebrow">Напишіть нам</p>
            <h2>Розкажіть, чим можемо допомогти.</h2>
            <div className="form-grid">
              <label><span>Ім'я *</span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>Email *</span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>Номер телефону</span><input name="phone" type="tel" autoComplete="tel" /></label>
              <label><span>Назва компанії</span><input name="company" type="text" autoComplete="organization" /></label>
              <label className="form-wide"><span>Тема звернення *</span>
                <select name="topic" required defaultValue="Консультація">
                  <option>Консультація</option><option>Співпраця</option><option>Питання щодо цін</option><option>Технічні питання</option><option>Інше</option>
                </select>
              </label>
              <label className="form-wide"><span>Повідомлення *</span><textarea name="message" rows="5" required /></label>
              <label className="checkbox-label form-wide">
                <input type="checkbox" required />
                <span>Погоджуюся на обробку персональних даних.</span>
              </label>
            </div>
            <button className="button button-lime submit-button" type="submit"><span>Надіслати повідомлення</span><span className="button-arrow" aria-hidden="true" /></button>
            {sent && <p className="form-note" role="status">Повідомлення підготовлено у вашому поштовому клієнті.</p>}
          </form>
        </div>
      </section>

      <section className="section-space route-section">
        <div className="container">
          <SectionHeading kicker="Як дістатися" title="Зручна транспортна розв'язка" />
          <HorizontalAccordion items={[
            { title: "Автомобілем", meta: "Особистий транспорт", copy: "Доїзд у межах Києва до вул. Світлицького.", tone: "green" },
            { title: "Автобуси", meta: "Міські маршрути", copy: "Маршрути у напрямку Подільського району.", tone: "dark" },
            { title: "Залізниця", meta: "Міський транспорт", copy: "Найближчі станції метро та подальший міський транспорт.", tone: "sand" }
          ]} />
        </div>
      </section>

      <section className="direct-contact">
        <div className="container" data-reveal>
          <h2>Зв'яжіться з нами прямо зараз</h2>
          <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
          <a href={`mailto:${email}`}>{email}</a>
        </div>
      </section>
    </>
  );
}

const pages = {
  index: HomePage,
  about: AboutPage,
  services: ServicesPage,
  documents: DocumentsPage,
  contact: ContactPage
};

function App() {
  const root = useRef(null);
  const Page = pages[pageName] || HomePage;

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".hero-reveal", {
        opacity: 0,
        y: 34,
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      });

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 38,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
          clearProps: "all"
        });
      });
    });

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray("[data-pinned-section]").forEach((section) => {
        const title = section.querySelector("[data-pin-title]");
        if (title) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top+=112",
            end: "bottom bottom-=120",
            pin: title,
            pinSpacing: false
          });
        }
      });

      gsap.utils.toArray("[data-stack-card]").forEach((card) => {
        gsap.fromTo(card, { y: 56, scale: 0.96 }, {
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top 92%", end: "top 45%", scrub: 0.7 }
        });
      });
    });

    return () => media.revert();
  }, { scope: root });

  return (
    <div ref={root} className="site-shell">
      <Header />
      <main className="overflow-x-hidden w-full max-w-full">
        <Page />
      </main>
      <Footer />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);

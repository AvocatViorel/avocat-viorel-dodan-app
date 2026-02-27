// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

// Splash hide (cinematic)
window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  setTimeout(() => splash.classList.add("hide"), 2100);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Lead form -> open WhatsApp with prefilled text (free + effective)
document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  const text = [
    "Solicitare consultanță",
    `Nume: ${data.name}`,
    `Telefon: ${data.phone}`,
    `Subiect: ${data.topic}`,
    `Mesaj: ${data.message}`,
  ].join("\n");

  const url = "https://wa.me/37369968269?text=" + encodeURIComponent(text);
  window.open(url, "_blank", "noreferrer");
  e.target.reset();
});

// Simple i18n (RO/IT/RU)
const i18n = {
  ro: {
    wow: "Consultanță juridică pentru moldovenii din diaspora",
    badge: "16+ ani experiență juridică",
    pill: "Divorț • Drept civil • Dreptul familiei",
    cta: "Solicită consultanță",
    call: "Sună acum",
    book: "Programare",
    consultTitle: "Solicită consultanță",
    consultDesc: "Trimite un mesaj scurt și te contactez cât mai rapid.",
    name: "Nume",
    phone: "Telefon",
    topic: "Subiect",
    msg: "Mesaj",
    send: "Trimite",
    privacy: "Confidențialitate: mesajul este trimis direct către avocat.",
    bookTitle: "Programare online",
    bookDesc: "Alege un interval disponibil. (În etapa 1 folosim un link gratuit.)",
    openCal: "Deschide calendarul",
    emailBook: "Trimite email pentru programare",
    tip: "Tip:",
    tipText: "după ce setăm calendarul tău, înlocuim linkul de mai sus.",
    servicesTitle: "Servicii",
    s1: "Divorț (inclusiv la distanță)",
    s2: "Pensie alimentară",
    s3: "Stabilirea domiciliului copiilor",
    s4: "Decăderea din drepturi părintești",
    s5: "Drept civil",
    s6: "Consultanță pentru diaspora",
    contactTitle: "Contact",
  },
  it: {
    wow: "Consulenza legale per i moldavi della diaspora",
    badge: "16+ anni di esperienza legale",
    pill: "Divorzio • Diritto civile • Diritto di famiglia",
    cta: "Richiedi consulenza",
    call: "Chiama ora",
    book: "Appuntamento",
    consultTitle: "Richiedi consulenza",
    consultDesc: "Invia un breve messaggio e ti contatterò al più presto.",
    name: "Nome",
    phone: "Telefono",
    topic: "Argomento",
    msg: "Messaggio",
    send: "Invia",
    privacy: "Privacy: il messaggio viene inviato direttamente all’avvocato.",
    bookTitle: "Appuntamento online",
    bookDesc: "Scegli uno slot disponibile. (Fase 1: link gratuito.)",
    openCal: "Apri il calendario",
    emailBook: "Invia email per appuntamento",
    tip: "Suggerimento:",
    tipText: "dopo aver impostato il tuo calendario, sostituiamo il link qui sopra.",
    servicesTitle: "Servizi",
    s1: "Divorzio (anche a distanza)",
    s2: "Assegno di mantenimento",
    s3: "Residenza dei minori",
    s4: "Decadenza della responsabilità genitoriale",
    s5: "Diritto civile",
    s6: "Consulenza per la diaspora",
    contactTitle: "Contatti",
  },
  ru: {
    wow: "Юридическая консультация для молдавской диаспоры",
    badge: "16+ лет юридического опыта",
    pill: "Развод • Гражданское право • Семейное право",
    cta: "Запросить консультацию",
    call: "Позвонить",
    book: "Запись",
    consultTitle: "Запросить консультацию",
    consultDesc: "Отправьте короткое сообщение — я свяжусь с вами как можно быстрее.",
    name: "Имя",
    phone: "Телефон",
    topic: "Тема",
    msg: "Сообщение",
    send: "Отправить",
    privacy: "Конфиденциальность: сообщение отправляется напрямую адвокату.",
    bookTitle: "Онлайн-запись",
    bookDesc: "Выберите доступное время. (Этап 1: бесплатная ссылка.)",
    openCal: "Открыть календарь",
    emailBook: "Отправить email для записи",
    tip: "Совет:",
    tipText: "после настройки вашего календаря заменим ссылку выше.",
    servicesTitle: "Услуги",
    s1: "Развод (в том числе дистанционно)",
    s2: "Алименты",
    s3: "Место жительства ребенка",
    s4: "Лишение родительских прав",
    s5: "Гражданское право",
    s6: "Консультации для диаспоры",
    contactTitle: "Контакты",
  }
};

function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  localStorage.setItem("lang", lang);
}

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

setLang(localStorage.getItem("lang") || "ro");

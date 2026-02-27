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

// iPhone install hint (PWA Premium)
(function () {
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (isIOS && !isInStandalone) {
    const hint = document.getElementById("iosInstallHint");
    if (hint) hint.style.display = "block";
  }
})();

// Lead form -> WhatsApp message
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

// Descrieri servicii (RO)
const serviceDetails = {
  divort: {
    title: "Divorț (inclusiv la distanță)",
    html: `
      <p><strong>Ce include:</strong> consultanță, pregătirea actelor, reprezentare, strategie procedurală.</p>
      <h3>Pentru diaspora</h3>
      <ul>
        <li>Lucrăm la distanță (după caz, cu procură unde este necesar).</li>
        <li>Îți spun exact ce documente trebuie și cum le trimiți.</li>
      </ul>
      <h3>De obicei ai nevoie de</h3>
      <ul>
        <li>Act de identitate (copie)</li>
        <li>Certificat de căsătorie (copie)</li>
        <li>Certificate de naștere ale copiilor (dacă există)</li>
      </ul>
    `
  },
  pensie: {
    title: "Pensie de întreținere (pensie alimentară)",
    html: `
      <p><strong>Corect:</strong> „pensie de întreținere (pensie alimentară)”. Mulți spun și „alimente”.</p>
      <h3>Te pot ajuta cu</h3>
      <ul>
        <li>Stabilirea pensiei</li>
        <li>Majorare / micșorare</li>
        <li>Recuperarea restanțelor</li>
        <li>Executarea când nu se plătește</li>
      </ul>
    `
  },
  domiciliu: {
    title: "Stabilirea domiciliului copiilor",
    html: `
      <p>Se bazează pe <strong>interesul superior al copilului</strong>.</p>
      <h3>Include</h3>
      <ul>
        <li>Stabilirea domiciliului</li>
        <li>Custodie / program de vizitare</li>
        <li>Probe relevante (condiții de trai, implicare, stabilitate)</li>
      </ul>
    `
  },
  decadere: {
    title: "Decăderea din drepturi părintești",
    html: `
      <p>Procedură <strong>serioasă</strong>, pentru situații grave (abuz, violență, abandon, neglijență severă).</p>
      <h3>Ce facem</h3>
      <ul>
        <li>Analiză juridică</li>
        <li>Pregătire probatoriu</li>
        <li>Reprezentare în instanță</li>
      </ul>
    `
  },
  civil: {
    title: "Drept civil",
    html: `
      <h3>Exemple</h3>
      <ul>
        <li>Contracte</li>
        <li>Recuperare datorii</li>
        <li>Litigii / despăgubiri</li>
        <li>Moșteniri / succesiuni</li>
      </ul>
    `
  },
  diaspora: {
    title: "Consultanță pentru diaspora",
    html: `
      <p>Lucrăm eficient chiar dacă ești în Italia sau în altă țară.</p>
      <ul>
        <li>Consultare online</li>
        <li>Acte scanate / poze</li>
        <li>Ghidare pentru procură și pași</li>
        <li>Reprezentare în Moldova</li>
      </ul>
    `
  }
};

// Modal
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");

function openModal(serviceKey) {
  const data = serviceDetails[serviceKey];
  if (!data) return;

  modalTitle.textContent = "✅ " + data.title;
  modalBody.innerHTML = data.html;

  // preselect topic in form
  const topicSelect = document.getElementById("topicSelect");
  if (topicSelect) {
    const mapping = {
      divort: "Divorț",
      pensie: "Pensie de întreținere (pensie alimentară)",
      domiciliu: "Stabilirea domiciliului copiilor",
      decadere: "Decăderea din drepturi părintești",
      civil: "Drept civil",
      diaspora: "Consultanță diaspora",
    };
    if (mapping[serviceKey]) topicSelect.value = mapping[serviceKey];
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// Click pe card
document.querySelectorAll(".service-card").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.service));
});

// Căutare servicii
const search = document.getElementById("serviceSearch");
const grid = document.getElementById("servicesGrid");

function normalize(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function filterServices() {
  const q = normalize(search.value.trim());
  grid.querySelectorAll(".service-card").forEach(c => {
    const hay = normalize(c.innerText + " " + (c.dataset.keywords || ""));
    c.style.display = q === "" || hay.includes(q) ? "" : "none";
  });
}
if (search) search.addEventListener("input", filterServices);

// Interfață RO/IT/RU (doar textele scurte)
const i18n = {
  ro: {
    wow: "Consultanță juridică pentru moldovenii din diaspora",
    badge: "16+ ani experiență juridică",
    pill: "Divorț • Drept civil • Dreptul familiei",
    cta: "Solicită consultanță",
    call: "Sună acum",
    book: "Programare",
    navServices: "📌 Servicii",
    navConsult: "✉️ Consultanță",
    navContact: "📍 Contact",
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
    servicesHint: "Tastează un cuvânt (ex: „divorț”, „alimente”, „copii”, „contract”, „diaspora”), apoi apasă pe serviciu pentru detalii.",
    contactTitle: "Contact",
  },
  it: {
    wow: "Consulenza legale per i moldavi della diaspora",
    badge: "16+ anni di esperienza legale",
    pill: "Divorzio • Diritto civile • Diritto di famiglia",
    cta: "Richiedi consulenza",
    call: "Chiama ora",
    book: "Appuntamento",
    navServices: "📌 Servizi",
    navConsult: "✉️ Consulenza",
    navContact: "📍 Contatti",
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
    servicesHint: "Cerca una parola (es: “divorzio”, “alimenti”, “figli”, “contratto”, “diaspora”), poi tocca il servizio per i dettagli.",
    contactTitle: "Contatti",
  },
  ru: {
    wow: "Юридическая консультация для молдавской диаспоры",
    badge: "16+ лет юридического опыта",
    pill: "Развод • Гражданское право • Семейное право",
    cta: "Запросить консультацию",
    call: "Позвонить",
    book: "Запись",
    navServices: "📌 Услуги",
    navConsult: "✉️ Консультация",
    navContact: "📍 Контакты",
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
    servicesHint: "Введите слово (например: «развод», «алименты», «дети», «договор», «диаспора»), затем нажмите на услугу для деталей.",
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

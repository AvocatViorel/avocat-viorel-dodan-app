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

// Services content (RO) — descrieri complete
const serviceDetails = {
  divort: {
    title: "Divorț (inclusiv la distanță)",
    html: `
      <p><strong>Ce include:</strong> consultanță, pregătirea actelor, reprezentare în instanță/autoritate competentă, comunicare cu partea adversă, strategie procedurală.</p>
      <h3>Pentru diaspora</h3>
      <ul>
        <li>Putem lucra la distanță (fără prezență fizică), în baza actelor și a procurii unde este necesar.</li>
        <li>Te ghidez exact ce documente trebuie și cum le trimiți (scan/poze).</li>
      </ul>
      <h3>De obicei ai nevoie de</h3>
      <ul>
        <li>Act de identitate (copie)</li>
        <li>Certificat de căsătorie (copie)</li>
        <li>Certificate de naștere ale copiilor (dacă există)</li>
        <li>Informații despre bunuri/locuință (dacă e relevant)</li>
      </ul>
      <p><em>Notă:</em> fiecare caz e diferit — îți spun pașii exact după o analiză scurtă.</p>
    `
  },
  pensie: {
    title: "Pensie de întreținere (pensie alimentară)",
    html: `
      <p><strong>Corect:</strong> „pensie de întreținere (pensie alimentară)”. În practică oamenii spun și „alimente”.</p>
      <h3>Te pot ajuta cu</h3>
      <ul>
        <li>Stabilirea pensiei de întreținere pentru copil</li>
        <li>Majorarea sau micșorarea pensiei</li>
        <li>Recuperarea restanțelor (datorii)</li>
        <li>Executarea silită (când nu se plătește)</li>
      </ul>
      <h3>Ce contează în calcul</h3>
      <ul>
        <li>Veniturile reale, posibilitățile de muncă</li>
        <li>Cheltuielile copilului (școală, sănătate, necesități)</li>
        <li>Alți copii/obligații legale</li>
      </ul>
      <p><strong>Scop:</strong> să obții o soluție corectă și aplicabilă, nu doar „pe hârtie”.</p>
    `
  },
  domiciliu: {
    title: "Stabilirea domiciliului copiilor",
    html: `
      <p>Acest serviciu ține de <strong>interesul superior al copilului</strong> și de stabilirea unui cadru clar pentru părinți.</p>
      <h3>Include</h3>
      <ul>
        <li>Stabilirea domiciliului minorului</li>
        <li>Custodie / exercitarea drepturilor părintești</li>
        <li>Program de vizitare / comunicare</li>
        <li>Documentare și probatoriu (condiții de trai, implicare, stabilitate)</li>
      </ul>
      <h3>Ce pregătim</h3>
      <ul>
        <li>Strategie + acte</li>
        <li>Probe relevante (mesaje, documente, martori, rapoarte, etc.)</li>
      </ul>
      <p><em>Ținta:</em> o soluție echilibrată, stabilă, care protejează copilul.</p>
    `
  },
  decadere: {
    title: "Decăderea din drepturi părintești",
    html: `
      <p>Este o procedură <strong>serioasă</strong>, folosită în situații grave, când comportamentul unui părinte afectează copilul.</p>
      <h3>Poate fi relevantă în cazuri precum</h3>
      <ul>
        <li>neglijență severă, abandon</li>
        <li>violență, abuz</li>
        <li>dependențe care pun copilul în pericol</li>
        <li>lipsă totală de implicare + prejudiciu pentru copil</li>
      </ul>
      <h3>Ce facem</h3>
      <ul>
        <li>analiză juridică a situației</li>
        <li>pregătirea probelor</li>
        <li>reprezentare și susținere în instanță</li>
      </ul>
      <p><em>Important:</em> îți spun direct și realist șansele și pașii corecți.</p>
    `
  },
  civil: {
    title: "Drept civil",
    html: `
      <p>Te ajut cu probleme civile care cer soluții clare și documente corecte.</p>
      <h3>Exemple</h3>
      <ul>
        <li>contracte (vânzare-cumpărare, împrumut, arendă etc.)</li>
        <li>recuperare datorii / pretenții</li>
        <li>litigii civile și despăgubiri</li>
        <li>moșteniri / succesiuni</li>
      </ul>
      <h3>Ce primești</h3>
      <ul>
        <li>strategie + acte corecte</li>
        <li>negociere unde e posibil</li>
        <li>reprezentare în instanță când e necesar</li>
      </ul>
    `
  },
  diaspora: {
    title: "Consultanță pentru diaspora",
    html: `
      <p>Lucrăm eficient chiar dacă ești în Italia sau în altă țară.</p>
      <h3>Ce facem la distanță</h3>
      <ul>
        <li>consultare online (WhatsApp/telefon)</li>
        <li>trimitere/primire acte scanate</li>
        <li>ghidare pentru procură / acte necesare</li>
        <li>reprezentare în Moldova</li>
      </ul>
      <p><strong>Avantaj:</strong> economisești timp și drumuri, iar procesul este organizat.</p>
    `
  }
};

// Modal helpers
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalCta = document.getElementById("modalCta");

function openModal(serviceKey) {
  const data = serviceDetails[serviceKey];
  if (!data) return;

  modalTitle.textContent = "✅ " + data.title;
  modalBody.innerHTML = data.html;

  // preselect topic in consult form
  const topicSelect = document.getElementById("topicSelect");
  if (topicSelect) {
    const mapping = {
      divort: "Divorț",
      pensie: "Pensie de întreținere (pensie alimentară)",
      domiciliu: "Stabilirea domiciliului copiilor",
      decadere: "Decăderea din drepturi părintești",
      civil: "Drept civil",
      diaspora: "Consultanță diaspora"
    };
    const val = mapping[serviceKey];
    if (val) topicSelect.value = val;
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  modalCta.href = "#consult";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Click on service cards
document.querySelectorAll(".service-card").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.service));
});

// Search filter for services
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
  const cards = grid.querySelectorAll(".service-card");
  cards.forEach(c => {
    const hay = normalize(c.innerText + " " + (c.dataset.keywords || ""));
    c.style.display = q === "" || hay.includes(q) ? "" : "none";
  });
}

if (search) search.addEventListener("input", filterServices);

// Simple i18n (RO/IT/RU) — păstrăm baza pentru interfață
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
    contactTitle: "Contact"
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
    contactTitle: "Contatti"
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
    contactTitle: "Контакты"
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

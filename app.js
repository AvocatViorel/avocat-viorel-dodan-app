// SAFE APP.JS (nu blochează pagina dacă lipsește ceva)
function $(id){ return document.getElementById(id); }

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

window.addEventListener("load", () => {
  const splash = $("splash");
  if (splash) setTimeout(() => splash.classList.add("hide"), 2100);

  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();

  // iPhone install hint
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isInStandalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;

  if (isIOS && !isInStandalone) {
    const hint = $("iosInstallHint");
    if (hint) hint.style.display = "block";
  }
});

// WhatsApp form
const form = $("leadForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const text = [
      "Solicitare consultanță",
      `Nume: ${data.name || ""}`,
      `Telefon: ${data.phone || ""}`,
      `Subiect: ${data.topic || ""}`,
      `Mesaj: ${data.message || ""}`,
    ].join("\n");
    const url = "https://wa.me/37369968269?text=" + encodeURIComponent(text);
    window.open(url, "_blank", "noreferrer");
    form.reset();
  });
}

// Modal servicii (detalii)
const serviceDetails = {
  divort: {
    title: "Divorț (inclusiv la distanță)",
    html: `
      <p><strong>Ce include:</strong> consultanță, pregătirea actelor, reprezentare.</p>
      <h3>Pentru diaspora</h3>
      <ul>
        <li>Lucrăm la distanță (după caz, cu procură).</li>
        <li>Îți spun exact ce documente trebuie și cum le trimiți.</li>
      </ul>
    `
  },
  pensie: {
    title: "Pensie de întreținere (pensie alimentară)",
    html: `
      <p>Stabilire, majorare/micșorare, recuperare restanțe, executare.</p>
      <p><strong>Corect:</strong> „pensie de întreținere (pensie alimentară)”.</p>
    `
  },
  domiciliu: {
    title: "Stabilirea domiciliului copiilor",
    html: `
      <p>Se aplică principiul <strong>interesului superior al copilului</strong>.</p>
      <ul>
        <li>Domiciliu</li>
        <li>Custodie / program de vizitare</li>
      </ul>
    `
  },
  decadere: {
    title: "Decăderea din drepturi părintești",
    html: `
      <p>Procedură serioasă pentru situații grave (abuz, violență, abandon, neglijență severă).</p>
      <ul>
        <li>Analiză juridică</li>
        <li>Probatoriu</li>
        <li>Reprezentare în instanță</li>
      </ul>
    `
  },
  civil: {
    title: "Drept civil",
    html: `
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
      <ul>
        <li>Consultare online</li>
        <li>Acte scanate / poze</li>
        <li>Ghidare pentru procură</li>
        <li>Reprezentare în Moldova</li>
      </ul>
    `
  }
};

const modal = $("serviceModal");
const modalTitle = $("modalTitle");
const modalBody = $("modalBody");
const modalClose = $("modalClose");

function openModal(key){
  if (!modal || !modalTitle || !modalBody) return;
  const data = serviceDetails[key];
  if (!data) return;

  modalTitle.textContent = "✅ " + data.title;
  modalBody.innerHTML = data.html;

  // preselect topic (dacă există)
  const topicSelect = $("topicSelect");
  if (topicSelect) {
    const map = {
      divort: "Divorț",
      pensie: "Pensie de întreținere (pensie alimentară)",
      domiciliu: "Stabilirea domiciliului copiilor",
      decadere: "Decăderea din drepturi părintești",
      civil: "Drept civil",
      diaspora: "Consultanță diaspora",
    };
    if (map[key]) topicSelect.value = map[key];
  }

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden","false");
}
function closeModal(){
  if (!modal) return;
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden","true");
}

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) modal.addEventListener("click", (e)=>{ if (e.target === modal) closeModal(); });
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeModal(); });

document.querySelectorAll(".service-card").forEach(btn=>{
  btn.addEventListener("click", ()=> openModal(btn.dataset.service));
});

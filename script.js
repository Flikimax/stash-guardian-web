const builds = [
  {
    os: "macos",
    label: "macOS (Apple Silicon)",
    version: "0.5.0",
    status: "beta",
    size: "143.3 MB",
    checksum: "8be2...9e13",
    downloadUrl: "dist/0.5.0/Stash%20Guardian-0.5.0-arm64.dmg",
    notesUrl: "#"
  },
  {
    os: "windows",
    label: "Windows 10+",
    version: "0.5.0",
    status: "beta",
    size: "119.9 MB",
    checksum: "f74a...12d8",
    downloadUrl: "dist/0.5.0/Stash%20Guardian-0.5.0-setup.exe",
    notesUrl: "#"
  },
//   {
//     os: "linux",
//     label: "Linux (AppImage)",
//     version: "0.5.0",
//     status: "stable",
//     size: "96 MB",
//     checksum: "31ca...45ff",
//     downloadUrl: "#",
//     notesUrl: "#"
//   }
];

const buildGrid = document.querySelector("#buildGrid");
const tabs = document.querySelectorAll(".os-tab");
const year = document.querySelector("#year");

function renderBuilds(osFilter) {
  const filtered = osFilter === "all" ? builds : builds.filter((build) => build.os === osFilter);

  buildGrid.innerHTML = filtered
    .map(
      (build) => `
      <article class="build-card">
        <div class="build-head">
          <h3>${build.label}</h3>
          <span class="badge ${build.status}">${build.status.toUpperCase()}</span>
        </div>
        <p class="build-meta">Versión: ${build.version} · Tamaño: ${build.size}</p>
        <div class="build-actions">
        <a class="btn-link primary" href="${build.downloadUrl}" download aria-label="Descargar build para ${build.label}">Descargar</a>
        </div>
        </article>
    `
    )
    .join("");
}

function initTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((current) => {
        current.classList.remove("active");
        current.setAttribute("aria-selected", "false");
      });

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      renderBuilds(tab.dataset.os);
    });
  });
}

function initReveal() {
  const sections = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((section) => observer.observe(section));
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}

renderBuilds("all");
initTabs();
initReveal();

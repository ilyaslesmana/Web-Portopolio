/* =========================================
   1. DATA MODULE (Ubah isi portofolio di sini)
   ========================================= */
const PORTFOLIO_DATA = {
  skills: [
    {
      category: "Frontend Development",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "TypeScript",
        "React",
        "Responsive Design",
      ],
    },
    {
      category: "Software & OOP",
      items: [
        "Java",
        "Object-Oriented Programming",
        "Modular Architecture",
        "Git & GitHub",
      ],
    },
    {
      category: "Sistem & Jaringan",
      items: [
        "Logika Informatika",
        "Dasar Jaringan Komputer",
        "REST API Integration",
        "SQL",
      ],
    },
  ],
  projects: [
    {
      id: "warkoplin-pos",
      title: "Restoran Warkoplin CLI",
      category: "desktop",
      categoryLabel: "Desktop / OOP",
      summary:
        "Aplikasi kasir dan manajemen pesanan berbasis Java dengan arsitektur berlapis.",
      description:
        "Sistem manajemen pemesanan dan pencetakan struk berbasis Java Console yang dipisahkan ke dalam paket UI, Model, Service, dan Utils lengkap dengan validasi diskon dan penyimpanan file.",
      tags: ["Java", "OOP", "File Persistence", "Clean Architecture"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: "interactive-module",
      title: "Web Modul Belajar Interaktif",
      category: "web",
      categoryLabel: "Web App",
      summary:
        "Konversi materi kuliah menjadi halaman web interaktif dengan navigasi terstruktur.",
      description:
        "Platform pembaca modul digital responsif yang memudahkan mahasiswa menavigasi bab materi, mencatat ringkasan, dan mengakses latihan soal secara cepat.",
      tags: ["HTML5", "CSS3", "JavaScript", "UI/UX"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      id: "personal-portfolio",
      title: "Website Portofolio Modular",
      category: "web",
      categoryLabel: "Web App",
      summary:
        "Portofolio pribadi dengan pemisahan struktur, gaya, dan data dinamis.",
      description:
        "Website portofolio yang dirancang tanpa dependensi berat agar cepat dimuat, mudah dikustomisasi lewat objek data terpusat, dan siap di-deploy ke berbagai hosting statis.",
      tags: ["HTML", "CSS Variables", "Vanilla JS"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ],
};

/* =========================================
   2. RENDER MODULE (Merender data ke DOM)
   ========================================= */
const Renderer = {
  skills() {
    const container = document.getElementById("skillsContainer");
    if (!container) return;

    container.innerHTML = PORTFOLIO_DATA.skills
      .map(
        (group) => `
        <article class="skill-card">
          <h3>${group.category}</h3>
          <div class="skill-tags">
            ${group.items.map((skill) => `<span class="tag">${skill}</span>`).join("")}
          </div>
        </article>
      `,
      )
      .join("");
  },

  projects(filter = "all") {
    const container = document.getElementById("projectsContainer");
    if (!container) return;

    const filtered =
      filter === "all"
        ? PORTFOLIO_DATA.projects
        : PORTFOLIO_DATA.projects.filter((item) => item.category === filter);

    container.innerHTML = filtered
      .map(
        (project) => `
        <article class="project-card">
          <div>
            <span class="badge">${project.categoryLabel}</span>
            <h3>${project.title}</h3>
            <p>${project.summary}</p>
          </div>
          <div>
            <div class="project-tags">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
            <div class="project-footer">
              <button class="btn btn-secondary btn-sm" data-project-id="${project.id}">
                Detail Proyek
              </button>
            </div>
          </div>
        </article>
      `,
      )
      .join("");
  },
};

/* =========================================
   3. INTERACTION & MODAL MODULE
   ========================================= */
const UIController = {
  initNavigation() {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  },

  initProjectFilter() {
    const filterBar = document.getElementById("filterBar");
    if (!filterBar) return;

    filterBar.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;

      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      Renderer.projects(btn.dataset.filter);
    });
  },

  initProjectModal() {
    const projectsContainer = document.getElementById("projectsContainer");
    const modal = document.getElementById("projectModal");
    const closeBtn = document.getElementById("closeModalBtn");

    if (!projectsContainer || !modal || !closeBtn) return;

    projectsContainer.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-project-id]");
      if (!btn) return;

      const project = PORTFOLIO_DATA.projects.find(
        (p) => p.id === btn.dataset.projectId,
      );
      if (!project) return;

      document.getElementById("modalCategory").textContent =
        project.categoryLabel;
      document.getElementById("modalTitle").textContent = project.title;
      document.getElementById("modalDesc").textContent = project.description;
      document.getElementById("modalTags").innerHTML = project.tags
        .map((tag) => `<span class="tag">${tag}</span>`)
        .join("");
      document.getElementById("modalDemoLink").href = project.demoUrl;
      document.getElementById("modalRepoLink").href = project.repoUrl;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    });

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  },

  initContact() {
    const copyBtn = document.getElementById("copyEmailBtn");
    const emailText = document.getElementById("emailText");
    const copyFeedback = document.getElementById("copyFeedback");

    if (copyBtn && emailText && copyFeedback) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(emailText.textContent.trim());
          copyFeedback.textContent = "Email berhasil disalin ke clipboard!";
          setTimeout(() => (copyFeedback.textContent = ""), 3000);
        } catch {
          copyFeedback.textContent = "Gagal menyalin email secara otomatis.";
        }
      });
    }

    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const formFeedback = document.getElementById("formFeedback");

      let isValid = true;
      document.getElementById("nameError").textContent = "";
      document.getElementById("emailError").textContent = "";
      document.getElementById("messageError").textContent = "";

      if (name.value.trim().length < 2) {
        document.getElementById("nameError").textContent =
          "Nama minimal 2 karakter.";
        isValid = false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        document.getElementById("emailError").textContent =
          "Format email tidak valid.";
        isValid = false;
      }

      if (message.value.trim().length < 10) {
        document.getElementById("messageError").textContent =
          "Pesan minimal 10 karakter.";
        isValid = false;
      }

      if (isValid) {
        formFeedback.textContent = "Terima kasih! Pesan Anda siap diproses.";
        form.reset();
      }
    });
  },
};

/* =========================================
   4. INITIALIZATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  Renderer.skills();
  Renderer.projects();
  UIController.initNavigation();
  UIController.initProjectFilter();
  UIController.initProjectModal();
  UIController.initContact();
});

/* ==========================================
   1. DATA PROYEK (Mudah diubah / ditambah)
   ========================================== */
const projectsData = [
  {
    category: "Java OOP &bull; Arsitektur Modular",
    title: "Aplikasi Kasir & Manajemen Struk Restoran",
    desc: "Aplikasi kasir restoran yang dirancang sepenuhnya menggunakan prinsip Object-Oriented Programming (OOP) di Java. Sistem memisahkan logika bisnis dari tampilan dan penyimpanan data agar mudah dikembangkan dan diuji secara terpisah.",
    highlights: [
      "Pemisahan paket modular: UI (interaksi pengguna), Model (entitas Menu, ItemPesanan, Transaksi), Service (kalkulasi & manajemen order), dan Utils (validasi & formatter).",
      "Implementasi File Persistence untuk menyimpan arsip struk transaksi secara otomatis dalam format teks/CSV terstruktur.",
      "Perhitungan otomatis subtotal, pajak restoran (PB1), diskon promo, dan kembalian dengan validasi input ketat.",
    ],
    tags: [
      "Java SE",
      "OOP Architecture",
      "File Persistence",
      "Layered Design",
      "Exception Handling",
    ],
  },
  {
    category: "Pengembangan Web &bull; EdTech",
    title: "Modul Pembelajaran Interaktif Logika & Algoritma",
    desc: "Media pembelajaran berbasis web yang dirancang untuk membantu mahasiswa memahami konsep dasar logika informatika, tabel kebenaran, dan alur percabangan algoritma melalui simulasi visual interaktif.",
    highlights: [
      "Simulasi interaktif gerbang logika (AND, OR, NOT, XOR) yang merespons input pengguna secara real-time.",
      "Sistem evaluasi mandiri (kuis terintegrasi) dengan umpan balik langsung dan skor otomatis.",
      "Desain antarmuka responsif yang nyaman diakses melalui perangkat desktop maupun smartphone.",
    ],
    tags: [
      "HTML5 Semantik",
      "Tailwind CSS",
      "Vanilla JavaScript",
      "DOM Manipulation",
      "Responsive Design",
    ],
  },
  {
    category: "Sistem Informasi &bull; Basis Data & Jaringan",
    title: "Sistem Inventaris Lab & Topologi Jaringan Kampus",
    desc: "Solusi pencatatan aset perangkat keras dan konfigurasi jaringan lokal (LAN) untuk laboratorium komputer guna mempermudah pelacakan spesifikasi perangkat dan alokasi alamat IP.",
    highlights: [
      "Perancangan skema relasional (ERD) ter-normalisasi untuk pencatatan unit PC, perangkat jaringan (switch/router), dan riwayat pemeliharaan.",
      "Perencanaan pembagian subnetting IPv4 untuk segmentasi jaringan antar ruangan laboratorium.",
      "Query SQL teroptimasi untuk pencarian cepat status perangkat dan laporan audit inventaris.",
    ],
    tags: [
      "MySQL",
      "Database Normalization",
      "TCP/IP & Subnetting",
      "System Analysis",
      "Documentation",
    ],
  },
];

/* ==========================================
   2. MODUL NAVIGASI & SCROLL REVEAL
   ========================================== */
function initNavigation() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (!mobileMenuBtn || !mobileMenu || !menuIcon) return;

  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuIcon.className = isHidden
      ? "fa-solid fa-bars text-xl"
      : "fa-solid fa-xmark text-xl";
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.className = "fa-solid fa-bars text-xl";
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

/* ==========================================
   3. MODUL FILTER & MODAL PROYEK
   ========================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("bg-cyan-500", "text-slate-950", "font-semibold");
        b.classList.add(
          "bg-slate-900",
          "text-slate-300",
          "border",
          "border-slate-800",
        );
      });
      btn.classList.remove(
        "bg-slate-900",
        "text-slate-300",
        "border",
        "border-slate-800",
      );
      btn.classList.add("bg-cyan-500", "text-slate-950", "font-semibold");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || filterValue === cardCategory) {
          card.style.display = "flex";
          setTimeout(() => card.classList.add("active"), 50);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const openButtons = document.querySelectorAll(".open-modal-btn");
  const closeTopBtn = document.getElementById("close-modal-top");
  const closeBottomBtn = document.getElementById("close-modal-bottom");
  const discussLink = document.getElementById("modal-discuss-link");

  if (!modal) return;

  function openProjectModal(index) {
    const data = projectsData[index];
    if (!data) return;

    document.getElementById("modal-category").innerHTML = data.category;
    document.getElementById("modal-title").textContent = data.title;
    document.getElementById("modal-desc").textContent = data.desc;

    const highlightsList = document.getElementById("modal-highlights");
    highlightsList.innerHTML = data.highlights
      .map((item) => `<li>${item}</li>`)
      .join("");

    const tagsContainer = document.getElementById("modal-tags");
    tagsContainer.innerHTML = data.tags
      .map(
        (tag) =>
          `<span class="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-mono">${tag}</span>`,
      )
      .join("");

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }

  function closeProjectModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  }

  openButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.getAttribute("data-project-index"));
      openProjectModal(index);
    });
  });

  if (closeTopBtn) closeTopBtn.addEventListener("click", closeProjectModal);
  if (closeBottomBtn)
    closeBottomBtn.addEventListener("click", closeProjectModal);
  if (discussLink) discussLink.addEventListener("click", closeProjectModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeProjectModal();
    }
  });
}

/* ==========================================
   4. MODUL KONTAK & SALIN EMAIL
   ========================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById("copy-email-btn");
  const copyLabel = document.getElementById("copy-btn-label");
  const emailEl = document.getElementById("email-text");

  if (!copyBtn || !copyLabel || !emailEl) return;

  const emailText = emailEl.textContent.trim();

  copyBtn.addEventListener("click", () => {
    const tempInput = document.createElement("textarea");
    tempInput.value = emailText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    copyLabel.textContent = "Tersalin!";
    copyBtn.classList.add("bg-emerald-500", "text-slate-950");
    copyBtn.classList.remove("bg-slate-800", "text-slate-200");

    setTimeout(() => {
      copyLabel.textContent = "Salin";
      copyBtn.classList.remove("bg-emerald-500", "text-slate-950");
      copyBtn.classList.add("bg-slate-800", "text-slate-200");
    }, 2200);
  });
}

function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (!contactForm) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formFeedback = document.getElementById("form-feedback");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (nameInput.value.trim().length < 3) {
      nameError.classList.remove("hidden");
      nameInput.classList.add("border-rose-500");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
      nameInput.classList.remove("border-rose-500");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.classList.remove("hidden");
      emailInput.classList.add("border-rose-500");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
      emailInput.classList.remove("border-rose-500");
    }

    if (messageInput.value.trim().length < 10) {
      messageError.classList.remove("hidden");
      messageInput.classList.add("border-rose-500");
      isValid = false;
    } else {
      messageError.classList.add("hidden");
      messageInput.classList.remove("border-rose-500");
    }

    if (isValid) {
      formFeedback.classList.remove("hidden");
      contactForm.reset();
      setTimeout(() => {
        formFeedback.classList.add("hidden");
      }, 5000);
    }
  });
}

/* ==========================================
   5. INISIALISASI UTAMA
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initNavigation();
  initScrollReveal();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initContactForm();
});

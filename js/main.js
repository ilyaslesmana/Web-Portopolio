document.addEventListener("DOMContentLoaded", () => {
  // 1. Set Tahun Otomatis di Footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // 2. Navigasi Mobile Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    menuIcon.className = isHidden
      ? "fa-solid fa-bars text-xl"
      : "fa-solid fa-xmark text-xl";
  });

  // Tutup menu mobile otomatis saat tautan diklik
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuIcon.className = "fa-solid fa-bars text-xl";
    });
  });

  // 3. Animasi Scroll Reveal (Intersection Observer)
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

  // 4. Filter Kategori Proyek
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Reset tampilan tombol aktif
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

  // 5. Fitur Salin Email Cepat (Kompatibel dengan iFrame & Browser Modern)
  const copyBtn = document.getElementById("copy-email-btn");
  const copyLabel = document.getElementById("copy-btn-label");
  const emailText = document.getElementById("email-text").textContent.trim();

  copyBtn.addEventListener("click", () => {
    const tempInput = document.createElement("textarea");
    tempInput.value = emailText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Feedback visual tombol
    copyLabel.textContent = "Tersalin!";
    copyBtn.classList.add("bg-emerald-500", "text-slate-950");
    copyBtn.classList.remove("bg-slate-800", "text-slate-200");

    setTimeout(() => {
      copyLabel.textContent = "Salin";
      copyBtn.classList.remove("bg-emerald-500", "text-slate-950");
      copyBtn.classList.add("bg-slate-800", "text-slate-200");
    }, 2200);
  });

  // 6. Validasi Formulir Kontak Interaktif
  const contactForm = document.getElementById("contact-form");
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

    // Validasi Nama
    if (nameInput.value.trim().length < 3) {
      nameError.classList.remove("hidden");
      nameInput.classList.add("border-rose-500");
      isValid = false;
    } else {
      nameError.classList.add("hidden");
      nameInput.classList.remove("border-rose-500");
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailError.classList.remove("hidden");
      emailInput.classList.add("border-rose-500");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
      emailInput.classList.remove("border-rose-500");
    }

    // Validasi Pesan
    if (messageInput.value.trim().length < 10) {
      messageError.classList.remove("hidden");
      messageInput.classList.add("border-rose-500");
      isValid = false;
    } else {
      messageError.classList.add("hidden");
      messageInput.classList.remove("border-rose-500");
    }

    // Jika Valid, Tampilkan Pesan Sukses & Reset
    if (isValid) {
      formFeedback.classList.remove("hidden");
      contactForm.reset();
      setTimeout(() => {
        formFeedback.classList.add("hidden");
      }, 5000);
    }
  });
});

// 7. Data & Fungsi Modal Detail Proyek
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

const modal = document.getElementById("project-modal");

function openProjectModal(index) {
  const data = projectsData[index];
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

// Tutup modal saat area gelap di luar kotak diklik
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Tutup modal dengan tombol Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeProjectModal();
  }
});

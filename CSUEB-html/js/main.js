// import "../scss/styles.scss";
// import Swiper and styles if needed
// import Swiper from "swiper";
// import "swiper/css";


// DOM Ready

document.addEventListener("DOMContentLoaded", () => {
  initTestimonialSlider();
  initHeader();
  initGallerySlider();
  initInnerHeroSlider();
  initTextIconSlider();
  initBrightFutureSlider();
  initHeroSlider();
  initMainImgSlider();
});

// Swiper Sliders
function initTestimonialSlider() {
  new Swiper(".testimonial-slider", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function initGallerySlider() {
  new Swiper(".image-gallery-slider", {
    slidesPerView: 1.2,
    spaceBetween: 4,
    breakpoints: {
      640: { slidesPerView: 2.1 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-new",
      prevEl: ".swiper-button-prev.swiper-button-prev-new",
    },
  });
}

function initInnerHeroSlider() {
  new Swiper(".hero-full-swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next.swiper-btn",
      prevEl: ".swiper-button-prev.swiper-btn",
    },
  });
}

function initTextIconSlider() {
  new Swiper(".text-icon-slider", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    breakpoints: {
      640: { slidesPerView: 2.1 },
      768: { slidesPerView: 3 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next.swiper-button-next-new",
      prevEl: ".swiper-button-prev.swiper-button-prev-new",
    },
  });
}

function initBrightFutureSlider() {
  new Swiper(".bright-future-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      100: { slidesPerView: 1.2 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3 },
    },
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slider .swiper-slide");
  const hasMultipleSlides = slides.length > 1;

  if (!hasMultipleSlides) {
    const group = document.querySelector(".swiper-button-group");
    if (group) group.style.display = "none";
  }

  new Swiper(".hero-slider", {
    navigation: hasMultipleSlides
      ? {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      : false,
  });
}

function initMainImgSlider() {
  new Swiper(".main-img-slider", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

// Header Menu & Scroll Effects
function initHeader() {
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnMobile = document.getElementById("menuToggleMobile");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".overlay-header");
  const closeBtn = document.querySelector(".close-btn");
  const closeBtnMobile = document.querySelector(".close-btn-mobile");
  const body = document.body;
  const header = document.querySelector(".main-header");
  let lastScrollTop = 0;

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("show");
    body.classList.add("sidebar-open", "no-scroll");
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("show");
    body.classList.remove("sidebar-open", "no-scroll");
  }

  [menuBtn, menuBtnMobile].forEach(btn => btn?.addEventListener("click", openSidebar));
  [overlay, closeBtn, closeBtnMobile].forEach(el => el?.addEventListener("click", closeSidebar));

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    header.classList.toggle("header-color", scrollTop > 10);
    header.classList.toggle("upwards", scrollTop > lastScrollTop && scrollTop > 10);
    lastScrollTop = Math.max(scrollTop, 0);
  });
}


const dropdownBtn = document.querySelector('#dropdownMenuButton1');
const dropdown = dropdownBtn.closest('.custom-dropdown');

dropdownBtn.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('show');
});



// Lightbox Gallery
const html = document.documentElement;
html.setAttribute("data-bs-theme", "dark");


document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.querySelector(".gallery-grid");
  const links = galleryGrid?.querySelectorAll("a") || [];
  const imgs = galleryGrid?.querySelectorAll("img") || [];
  const lightboxModal = document.getElementById("lightbox-modal");
  const modalBody = lightboxModal?.querySelector(".lightbox-content");
  const bsModal = lightboxModal ? new bootstrap.Modal(lightboxModal) : null;

  function createCaption(caption) {
    return `<div class="carousel-caption d-none d-md-block"><h5 class="m-0">${caption}</h5></div>`;
  }

  function createIndicators(img) {
    const curIndex = [...img.closest(".swiper-slide").parentElement.children].indexOf(img.closest(".swiper-slide"));
    return [...links].map((_, i) => `<button type="button" data-bs-target="#lightboxCarousel" data-bs-slide-to="${i}" ${i === curIndex ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${i + 1}"></button>`).join("");
  }

  function createSlides(img) {
    const currentImgSrc = img.closest(".gallery-item").getAttribute("href");
    return [...imgs].map(image => {
      const imgSrc = image.closest(".gallery-item").getAttribute("href");
      const imgAlt = image.getAttribute("alt") || "";
      return `<div class="carousel-item${currentImgSrc === imgSrc ? " active" : ""}"><img class="d-block img-fluid w-100" src=${imgSrc} alt="${imgAlt}">${imgAlt ? createCaption(imgAlt) : ""}</div>`;
    }).join("");
  }

  function createCarousel(img) {
    modalBody.innerHTML = `
      <div id="lightboxCarousel" class="carousel slide carousel-fade" data-bs-ride="true">
        <div class="carousel-indicators">${createIndicators(img)}</div>
        <div class="carousel-inner justify-content-center mx-auto">${createSlides(img)}</div>
        <button class="carousel-control-prev" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#lightboxCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
  }

  links.forEach(link => link.addEventListener("click", e => {
    e.preventDefault();
    const currentImg = link.querySelector("img");
    const lightboxCarousel = document.getElementById("lightboxCarousel");
    if (lightboxCarousel) {
      const index = [...link.closest(".swiper-slide").parentElement.children].indexOf(link.closest(".swiper-slide"));
      const bsCarousel = new bootstrap.Carousel(lightboxCarousel);
      bsCarousel.to(index);
    } else {
      createCarousel(currentImg);
    }
    bsModal?.show();
  }));

  // Fullscreen
  const fsEnlarge = document.querySelector(".btn-fullscreen-enlarge");
  const fsExit = document.querySelector(".btn-fullscreen-exit");

  fsEnlarge?.addEventListener("click", e => {
    e.preventDefault();
    lightboxModal.requestFullscreen().then(() => {
      fsEnlarge.classList.toggle("d-none");
      fsExit.classList.toggle("d-none");
    }).catch(err => alert(`Error enabling fullscreen: ${err.message}`));
  });

  fsExit?.addEventListener("click", e => {
    e.preventDefault();
    document.exitFullscreen();
    fsExit.classList.toggle("d-none");
    fsEnlarge.classList.toggle("d-none");
  });
});
// Lightbox Gallery End
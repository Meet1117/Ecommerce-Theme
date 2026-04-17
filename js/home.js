/* =========================================================
   LUXE STORE — Home Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Hero Slider =====
  const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    effect: 'fade',
    fadeEffect: { crossFade: true },
    pagination: {
      el: '.hero .swiper-pagination',
      clickable: true,
    },
  });

  // ===== Best Sellers Slider =====
  new Swiper('.best-sellers-slider', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    speed: 500,
    navigation: {
      nextEl: '.best-next',
      prevEl: '.best-prev',
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
    },
  });

  // ===== Trending Slider =====
  new Swiper('.trending-slider', {
    slidesPerView: 1.2,
    spaceBetween: 16,
    speed: 500,
    navigation: {
      nextEl: '.trending-next',
      prevEl: '.trending-prev',
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
    },
  });

  // ===== Testimonials Slider =====
  new Swiper('.testimonials-slider', {
    loop: true,
    speed: 600,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.testimonials-slider .swiper-pagination',
      clickable: true,
    },
  });

  // ===== Countdown Timer =====
  function initCountdown() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 15);
    endDate.setHours(endDate.getHours() + 8);

    function updateCountdown() {
      const now = new Date();
      const diff = endDate - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('days');
      const hoursEl = document.getElementById('hours');
      const minutesEl = document.getElementById('minutes');
      const secondsEl = document.getElementById('seconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  if (document.getElementById('countdown')) {
    initCountdown();
  }

});

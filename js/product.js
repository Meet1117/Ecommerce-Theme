/* =========================================================
   LUXE STORE — Product Detail Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Gallery Thumbnail Switching =====
  const mainImage = document.querySelector('.product-gallery__main img');
  const zoomLayer = document.querySelector('.product-gallery__zoom');
  const thumbnails = document.querySelectorAll('.product-gallery__thumb');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const newSrc = thumb.querySelector('img').src;
      if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(() => {
          mainImage.src = newSrc;
          mainImage.style.opacity = '1';
          if (zoomLayer) {
            zoomLayer.style.backgroundImage = `url(${newSrc})`;
          }
        }, 200);
      }
    });
  });

  // ===== Image Zoom on Hover =====
  const galleryMain = document.querySelector('.product-gallery__main');
  if (galleryMain && zoomLayer) {
    const imgSrc = mainImage?.src;
    if (imgSrc) {
      zoomLayer.style.backgroundImage = `url(${imgSrc})`;
    }

    galleryMain.addEventListener('mousemove', (e) => {
      const rect = galleryMain.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      zoomLayer.style.backgroundPosition = `${x}% ${y}%`;
    });
  }

  // ===== Color Swatch Selection =====
  document.querySelectorAll('.product-info .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.product-info .color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const colorName = swatch.getAttribute('data-color');
      const label = document.querySelector('.product-info__variant-label[data-for="color"] span');
      if (label && colorName) label.textContent = colorName;
    });
  });

  // ===== Size Selection =====
  document.querySelectorAll('.product-info .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('disabled')) return;
      document.querySelectorAll('.product-info .size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sizeName = btn.textContent.trim();
      const label = document.querySelector('.product-info__variant-label[data-for="size"] span');
      if (label) label.textContent = sizeName;
    });
  });

  // ===== Add to Cart Animation =====
  const addToCartBtn = document.querySelector('.product-info__add-cart .btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const originalText = addToCartBtn.innerHTML;

      addToCartBtn.innerHTML = '<i class="ri-check-line"></i> Added!';
      addToCartBtn.style.background = 'var(--clr-success)';
      addToCartBtn.style.borderColor = 'var(--clr-success)';

      // Update cart badge
      const cartBadge = document.getElementById('cartCount');
      if (cartBadge) {
        let count = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = count + 1;
        cartBadge.style.transform = 'scale(1.4)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
      }

      if (typeof showToast === 'function') {
        showToast('Product added to your cart!', 'success', 'Added to Cart');
      }

      setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.style.background = '';
        addToCartBtn.style.borderColor = '';
      }, 2000);
    });
  }

  // ===== Wishlist Toggle =====
  const wishlistBtn = document.querySelector('.product-info__wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('btn-icon--active');
      const icon = wishlistBtn.querySelector('i');
      if (wishlistBtn.classList.contains('btn-icon--active')) {
        icon.className = 'ri-heart-fill';
        if (typeof showToast === 'function') showToast('Added to wishlist!', 'success');
      } else {
        icon.className = 'ri-heart-line';
        if (typeof showToast === 'function') showToast('Removed from wishlist', 'info');
      }
    });
  }

  // ===== Related Products Slider =====
  if (document.querySelector('.related-slider')) {
    new Swiper('.related-slider', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      speed: 500,
      navigation: {
        nextEl: '.related-next',
        prevEl: '.related-prev',
      },
      breakpoints: {
        576: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 24 },
      },
    });
  }

  // ===== Recently Viewed Slider =====
  if (document.querySelector('.recently-viewed-slider')) {
    new Swiper('.recently-viewed-slider', {
      slidesPerView: 2,
      spaceBetween: 16,
      speed: 500,
      breakpoints: {
        576: { slidesPerView: 3, spaceBetween: 16 },
        768: { slidesPerView: 4, spaceBetween: 20 },
        1024: { slidesPerView: 5, spaceBetween: 20 },
      },
    });
  }

});

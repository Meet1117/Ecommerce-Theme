/* =========================================================
   LUXE STORE — Main JavaScript (Global Features)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Preloader =====
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('loaded'), 500);
    });
    // Fallback
    setTimeout(() => preloader.classList.add('loaded'), 3000);
  }

  // ===== Sticky Header =====
  const header = document.getElementById('header');
  if (header) {
    const scrollThreshold = 50;
    const handleScroll = () => {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // ===== Mobile Menu =====
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  mobileMenuToggle?.addEventListener('click', openMobileMenu);
  mobileMenuClose?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // Mobile submenu toggle
  document.querySelectorAll('.mobile-menu__link[data-submenu]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const submenuId = link.getAttribute('data-submenu') + '-submenu';
      const submenu = document.getElementById(submenuId);
      if (submenu) {
        submenu.classList.toggle('open');
        link.classList.toggle('active');
      }
    });
  });

  // ===== Search Overlay =====
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    searchOverlay?.classList.add('active');
    document.body.classList.add('no-scroll');
    setTimeout(() => searchInput?.focus(), 300);
  }

  function closeSearch() {
    searchOverlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);
  
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeMobileMenu();
    }
  });

  // Search tags click
  document.querySelectorAll('.search-overlay__tag').forEach(tag => {
    tag.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = tag.textContent;
        searchInput.focus();
      }
    });
  });

  // ===== Back to Top =====
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== Scroll Reveal (IntersectionObserver) =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ===== Toast Notifications =====
  window.showToast = function(message, type = 'success', title = '') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = {
      success: 'ri-check-line',
      error: 'ri-close-line',
      info: 'ri-information-line'
    };

    const titles = {
      success: title || 'Success',
      error: title || 'Error',
      info: title || 'Info'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `
      <i class="toast__icon ${icons[type]}"></i>
      <div class="toast__content">
        <p class="toast__title">${titles[type]}</p>
        <p class="toast__message">${message}</p>
      </div>
      <button class="toast__close"><i class="ri-close-line"></i></button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });
    });

    // Close button
    toast.querySelector('.toast__close').addEventListener('click', () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  // ===== Add to Cart Click (Global) =====
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.product-card__add-btn');
    if (addBtn) {
      e.preventDefault();
      const card = addBtn.closest('.product-card');
      const title = card?.querySelector('.product-card__title')?.textContent || 'Item';
      
      // Badge bounce
      const cartBadge = document.getElementById('cartCount');
      if (cartBadge) {
        let count = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = count + 1;
        cartBadge.style.transform = 'scale(1.4)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
      }

      showToast(`${title} added to cart!`, 'success', 'Added to Cart');
    }
  });

  // ===== Wishlist Toggle (Global) =====
  document.addEventListener('click', (e) => {
    const wishBtn = e.target.closest('.product-card__action-btn[title="Wishlist"]');
    if (wishBtn) {
      e.preventDefault();
      wishBtn.classList.toggle('active');
      const icon = wishBtn.querySelector('i');
      if (wishBtn.classList.contains('active')) {
        icon.className = 'ri-heart-fill';
        showToast('Added to wishlist', 'success');
      } else {
        icon.className = 'ri-heart-line';
        showToast('Removed from wishlist', 'info');
      }
    }
  });

  // ===== Skeleton Loading Simulation =====
  document.querySelectorAll('.skeleton-card').forEach(skeleton => {
    setTimeout(() => {
      skeleton.style.display = 'none';
      const realContent = skeleton.nextElementSibling;
      if (realContent) realContent.style.display = '';
    }, 1500);
  });

  // ===== Accordion =====
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion__item');
      const isActive = item.classList.contains('active');
      
      // Close others in same accordion
      const accordion = item.closest('.accordion');
      accordion?.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // ===== Tabs =====
  document.querySelectorAll('.tabs__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabs = btn.closest('.tabs');
      const targetId = btn.getAttribute('data-tab');

      tabs.querySelectorAll('.tabs__btn').forEach(b => b.classList.remove('active'));
      tabs.querySelectorAll('.tabs__panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = tabs.querySelector(`#${targetId}`);
      if (panel) panel.classList.add('active');
    });
  });

  // ===== Quantity Selector =====
  document.addEventListener('click', (e) => {
    if (e.target.closest('.quantity-selector__btn')) {
      const btn = e.target.closest('.quantity-selector__btn');
      const selector = btn.closest('.quantity-selector');
      const input = selector.querySelector('.quantity-selector__input');
      let value = parseInt(input.value) || 1;

      if (btn.classList.contains('qty-minus')) {
        value = Math.max(1, value - 1);
      } else if (btn.classList.contains('qty-plus')) {
        value = Math.min(99, value + 1);
      }
      input.value = value;
      input.dispatchEvent(new Event('change'));
    }
  });

});

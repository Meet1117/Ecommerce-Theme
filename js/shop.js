/* =========================================================
   LUXE STORE — Shop Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Grid / List Toggle =====
  const viewBtns = document.querySelectorAll('.shop-toolbar__view-btn');
  const productGrid = document.querySelector('.product-grid');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.getAttribute('data-view');
      if (view === 'list') {
        productGrid?.classList.add('product-grid--list');
      } else {
        productGrid?.classList.remove('product-grid--list');
      }
    });
  });

  // ===== Mobile Filter Drawer =====
  const filterToggle = document.querySelector('.filter-drawer-toggle');
  const sidebar = document.querySelector('.shop-sidebar');
  const filterOverlay = document.querySelector('.filter-drawer-overlay');
  const filterClose = document.querySelector('.filter-close-btn');

  function openFilters() {
    sidebar?.classList.add('open');
    filterOverlay?.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeFilters() {
    sidebar?.classList.remove('open');
    filterOverlay?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  filterToggle?.addEventListener('click', openFilters);
  filterOverlay?.addEventListener('click', closeFilters);
  filterClose?.addEventListener('click', closeFilters);

  // ===== Filter Section Collapse =====
  document.querySelectorAll('.filter-section__title').forEach(title => {
    title.addEventListener('click', () => {
      title.closest('.filter-section')?.classList.toggle('collapsed');
    });
  });

  // ===== Category Filter Active State =====
  document.querySelectorAll('.filter-category').forEach(cat => {
    cat.addEventListener('click', () => {
      document.querySelectorAll('.filter-category').forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
    });
  });

  // ===== Size Filter Toggle =====
  document.querySelectorAll('.filter-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!btn.classList.contains('disabled')) {
        btn.classList.toggle('active');
      }
    });
  });

  // ===== Color Swatch Toggle =====
  document.querySelectorAll('.filter-colors .color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatch.classList.toggle('active');
    });
  });

  // ===== Sort Dropdown =====
  const sortSelect = document.querySelector('.shop-toolbar__sort select');
  sortSelect?.addEventListener('change', () => {
    // In a real app, this would re-sort the products
    if (typeof showToast === 'function') {
      showToast(`Sorted by: ${sortSelect.options[sortSelect.selectedIndex].text}`, 'info');
    }
  });

  // ===== Pagination Active State =====
  document.querySelectorAll('.pagination__btn:not(.pagination__btn--arrow)').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.pagination__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ===== Active Filter Remove =====
  document.querySelectorAll('.active-filter__close').forEach(close => {
    close.addEventListener('click', () => {
      close.closest('.active-filter')?.remove();
    });
  });

  // ===== Clear All Filters =====
  document.querySelector('.clear-filters')?.addEventListener('click', () => {
    document.querySelectorAll('.active-filter').forEach(f => f.remove());
    document.querySelectorAll('.filter-size-btn.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.filter-colors .color-swatch.active').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.filter-category.active').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.filter-brand input:checked').forEach(i => i.checked = false);
    document.querySelectorAll('.filter-rating input:checked').forEach(i => i.checked = false);
    if (typeof showToast === 'function') {
      showToast('All filters cleared', 'info');
    }
  });

});

/* =========================================================
   LUXE STORE — Search Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const searchInput = document.querySelector('.search-page__input');
  const autosuggest = document.querySelector('.search-autosuggest');

  // Demo product data for autosuggest
  const products = [
    { name: 'Linen Blazer — Slim Fit', category: 'Men\'s Clothing', price: '$189.00', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&q=60' },
    { name: 'Leather Sneakers — White', category: 'Shoes', price: '$129.00', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=100&q=60' },
    { name: 'Silk Midi Dress — Emerald', category: 'Women\'s Clothing', price: '$159.00', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=60' },
    { name: 'Cashmere Scarf — Camel', category: 'Accessories', price: '$78.00', img: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d44?w=100&q=60' },
    { name: 'Designer Watch — Gold', category: 'Accessories', price: '$349.00', img: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=100&q=60' },
    { name: 'Italian Leather Tote — Tan', category: 'Bags', price: '$198.00', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=100&q=60' },
    { name: 'Cotton Trench Coat', category: 'Women\'s Clothing', price: '$245.00', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&q=60' },
    { name: 'Denim Jacket — Washed Blue', category: 'Men\'s Clothing', price: '$135.00', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=100&q=60' },
  ];

  // ===== Autosuggest =====
  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();

    if (query.length < 2) {
      autosuggest?.classList.remove('active');
      return;
    }

    const matches = products.filter(p =>
      p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
    ).slice(0, 5);

    if (matches.length > 0 && autosuggest) {
      autosuggest.innerHTML = matches.map(p => `
        <a href="product.html" class="search-autosuggest__item">
          <div class="search-autosuggest__item-img"><img src="${p.img}" alt="${p.name}"></div>
          <div>
            <p class="search-autosuggest__item-name">${highlightMatch(p.name, query)}</p>
            <p class="search-autosuggest__item-category">${p.category}</p>
          </div>
          <span class="search-autosuggest__item-price">${p.price}</span>
        </a>
      `).join('');
      autosuggest.classList.add('active');
    } else {
      autosuggest?.classList.remove('active');
    }
  });

  // Close autosuggest on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-page__bar')) {
      autosuggest?.classList.remove('active');
    }
  });

  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }

  // ===== FAQ Category Tabs (reused on FAQ page) =====
  document.querySelectorAll('.faq-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.faq-category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-category');
      document.querySelectorAll('.faq-group').forEach(group => {
        group.classList.remove('active');
      });
      const targetGroup = document.getElementById(target);
      if (targetGroup) targetGroup.classList.add('active');
    });
  });

  // ===== Copy Coupon Code =====
  document.querySelectorAll('.coupon-card__copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.previousElementSibling?.textContent.trim();
      if (code) {
        navigator.clipboard?.writeText(code).then(() => {
          btn.textContent = 'Copied!';
          setTimeout(() => btn.textContent = 'Copy', 2000);
          if (typeof showToast === 'function') {
            showToast(`Coupon "${code}" copied!`, 'success');
          }
        });
      }
    });
  });

});

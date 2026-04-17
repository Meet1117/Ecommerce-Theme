/* =========================================================
   LUXE STORE — Cart Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Quantity Update & Recalculation =====
  function recalculateCart() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
      const price = parseFloat(item.querySelector('.cart-item__price')?.textContent.replace('$', '')) || 0;
      const qty = parseInt(item.querySelector('.quantity-selector__input')?.value) || 1;
      const itemTotal = price * qty;
      const subtotalEl = item.querySelector('.cart-item__subtotal');
      if (subtotalEl) subtotalEl.textContent = `$${itemTotal.toFixed(2)}`;
      subtotal += itemTotal;
    });

    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    const discountEl = document.getElementById('cartDiscount');
    const discount = parseFloat(discountEl?.textContent.replace(/[^0-9.]/g, '')) || 0;
    const shipping = 0; // Free shipping

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${(subtotal - discount + shipping).toFixed(2)}`;
  }

  // Listen for quantity changes
  document.querySelectorAll('.cart-item .quantity-selector__input').forEach(input => {
    input.addEventListener('change', recalculateCart);
  });

  // ===== Remove Item =====
  document.querySelectorAll('.cart-item__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cart-item');
      if (item) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
          item.remove();
          recalculateCart();
          updateCartCount();
          if (typeof showToast === 'function') {
            showToast('Item removed from cart', 'info');
          }
          checkEmptyCart();
        }, 300);
      }
    });
  });

  // ===== Save for Later =====
  document.querySelectorAll('.cart-item__save').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof showToast === 'function') {
        showToast('Item saved for later', 'success');
      }
    });
  });

  // ===== Apply Coupon =====
  const couponBtn = document.querySelector('.cart-coupon__btn');
  const couponInput = document.querySelector('.cart-coupon__input');

  couponBtn?.addEventListener('click', () => {
    const code = couponInput?.value.trim().toUpperCase();
    if (!code) {
      if (typeof showToast === 'function') showToast('Please enter a coupon code', 'error');
      return;
    }

    // Demo coupon codes
    const coupons = { 'LUXE15': 15, 'SAVE20': 20, 'FIRST10': 10 };
    if (coupons[code]) {
      const discountEl = document.getElementById('cartDiscount');
      if (discountEl) discountEl.textContent = `-$${coupons[code].toFixed(2)}`;
      recalculateCart();
      if (typeof showToast === 'function') {
        showToast(`Coupon applied! You saved $${coupons[code]}`, 'success', 'Coupon Applied');
      }
      couponBtn.textContent = 'Applied ✓';
      couponBtn.style.background = 'var(--clr-success)';
    } else {
      if (typeof showToast === 'function') {
        showToast('Invalid coupon code. Try LUXE15, SAVE20, or FIRST10', 'error');
      }
    }
  });

  // ===== Update Cart Count =====
  function updateCartCount() {
    const items = document.querySelectorAll('.cart-item');
    const cartBadge = document.getElementById('cartCount');
    if (cartBadge) cartBadge.textContent = items.length;
  }

  // ===== Check Empty Cart =====
  function checkEmptyCart() {
    const items = document.querySelectorAll('.cart-item');
    const emptyState = document.querySelector('.empty-state');
    const cartContent = document.querySelector('.cart-layout');
    if (items.length === 0 && emptyState && cartContent) {
      cartContent.style.display = 'none';
      emptyState.style.display = 'block';
    }
  }

});

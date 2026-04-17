/* =========================================================
   LUXE STORE — Wishlist Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Remove from Wishlist =====
  document.querySelectorAll('.wishlist-card__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.wishlist-card');
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.remove();
          updateWishlistCount();
          checkEmptyWishlist();
          if (typeof showToast === 'function') {
            showToast('Item removed from wishlist', 'info');
          }
        }, 300);
      }
    });
  });

  // ===== Move to Cart =====
  document.querySelectorAll('.wishlist-card__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.wishlist-card');
      const name = card?.querySelector('.wishlist-card__name')?.textContent || 'Item';

      // Update cart badge
      const cartBadge = document.getElementById('cartCount');
      if (cartBadge) {
        let count = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = count + 1;
        cartBadge.style.transform = 'scale(1.4)';
        setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
      }

      // Remove from wishlist
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.remove();
          updateWishlistCount();
          checkEmptyWishlist();
        }, 300);
      }

      if (typeof showToast === 'function') {
        showToast(`${name} moved to cart!`, 'success', 'Added to Cart');
      }
    });
  });

  function updateWishlistCount() {
    const items = document.querySelectorAll('.wishlist-card');
    const badge = document.getElementById('wishlistCount');
    if (badge) badge.textContent = items.length;
  }

  function checkEmptyWishlist() {
    const items = document.querySelectorAll('.wishlist-card');
    const emptyState = document.querySelector('.empty-state');
    const wishlistGrid = document.querySelector('.wishlist-grid');
    if (items.length === 0) {
      if (wishlistGrid) wishlistGrid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    }
  }

});

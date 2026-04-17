/* =========================================================
   LUXE STORE — Profile / Account Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Tab Navigation =====
  const navItems = document.querySelectorAll('.profile-nav__item[data-section]');
  const sections = document.querySelectorAll('.profile-section');

  function switchSection(targetId) {
    // Update nav
    navItems.forEach(item => item.classList.remove('active'));
    document.querySelector(`.profile-nav__item[data-section="${targetId}"]`)?.classList.add('active');

    // Update sections
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(targetId)?.classList.add('active');

    // Update URL hash
    history.replaceState(null, '', `#${targetId}`);

    // Scroll to top on mobile
    if (window.innerWidth < 768) {
      window.scrollTo({ top: document.querySelector('.profile-content').offsetTop - 100, behavior: 'smooth' });
    }
  }

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-section');
      if (targetId) switchSection(targetId);
    });
  });

  // Load from hash
  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (document.getElementById(hash)) {
      switchSection(hash);
    }
  }

  // ===== Order Status Filter =====
  document.querySelectorAll('.orders-filter__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.orders-filter__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.order-card').forEach(card => {
        if (filter === 'all' || card.getAttribute('data-status') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ===== Personal Info Form Save =====
  const profileForm = document.getElementById('profileInfoForm');
  profileForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (typeof showToast === 'function') {
      showToast('Profile updated successfully!', 'success', 'Saved');
    }
  });

  // ===== Change Password =====
  const changePassForm = document.getElementById('changePasswordForm');
  changePassForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPass = document.getElementById('newPassword')?.value;
    const confirmPass = document.getElementById('confirmNewPassword')?.value;

    if (newPass !== confirmPass) {
      if (typeof showToast === 'function') {
        showToast('Passwords do not match!', 'error');
      }
      return;
    }

    if (typeof showToast === 'function') {
      showToast('Password changed successfully!', 'success');
    }
    changePassForm.reset();
  });

  // ===== Avatar Upload =====
  const avatarUpload = document.getElementById('avatarUpload');
  const avatarPreview = document.querySelectorAll('.profile-sidebar__avatar img, .profile-form__avatar img');

  avatarUpload?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        avatarPreview.forEach(img => img.src = e.target.result);
      };
      reader.readAsDataURL(file);
      if (typeof showToast === 'function') {
        showToast('Avatar updated!', 'success');
      }
    }
  });

  // ===== Delete Address =====
  document.querySelectorAll('.address-card__delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.address-card');
      if (card && confirm('Are you sure you want to delete this address?')) {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.remove();
          if (typeof showToast === 'function') {
            showToast('Address deleted', 'info');
          }
        }, 300);
      }
    });
  });

  // ===== Delete Payment Method =====
  document.querySelectorAll('.payment-card__delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.payment-card');
      if (card && confirm('Remove this payment method?')) {
        card.style.opacity = '0';
        setTimeout(() => {
          card.remove();
          if (typeof showToast === 'function') {
            showToast('Payment method removed', 'info');
          }
        }, 300);
      }
    });
  });

  // ===== Toggle Switch Notifications =====
  document.querySelectorAll('.toggle-switch input').forEach(toggle => {
    toggle.addEventListener('change', () => {
      const label = toggle.closest('.notification-item')?.querySelector('.notification-item__label')?.textContent;
      if (typeof showToast === 'function') {
        showToast(`${label} ${toggle.checked ? 'enabled' : 'disabled'}`, 'info');
      }
    });
  });

  // ===== Logout =====
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to sign out?')) {
      if (typeof showToast === 'function') {
        showToast('Signed out successfully', 'success');
      }
      setTimeout(() => window.location.href = 'login.html', 1000);
    }
  });

  // ===== Delete Account =====
  document.getElementById('deleteAccountBtn')?.addEventListener('click', () => {
    if (confirm('⚠ This action is permanent! All your data will be deleted. Are you sure?')) {
      if (typeof showToast === 'function') {
        showToast('Account scheduled for deletion', 'info');
      }
    }
  });

  // ===== Reorder Button =====
  document.querySelectorAll('.order-card__reorder').forEach(btn => {
    btn.addEventListener('click', () => {
      const cartBadge = document.getElementById('cartCount');
      if (cartBadge) {
        let count = parseInt(cartBadge.textContent) || 0;
        cartBadge.textContent = count + 1;
      }
      if (typeof showToast === 'function') {
        showToast('Items added to cart!', 'success', 'Reorder');
      }
    });
  });

});

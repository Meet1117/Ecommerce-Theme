/* =========================================================
   LUXE STORE — Auth Pages JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Password Toggle =====
  document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling || toggle.closest('.password-group')?.querySelector('input');
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          toggle.querySelector('i').className = 'ri-eye-off-line';
        } else {
          input.type = 'password';
          toggle.querySelector('i').className = 'ri-eye-line';
        }
      }
    });
  });

  // ===== Password Strength =====
  const passwordInput = document.getElementById('registerPassword');
  const strengthFill = document.querySelector('.password-strength__fill');
  const strengthText = document.querySelector('.password-strength__text');

  passwordInput?.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;

    if (val.length >= 6) strength++;
    if (val.length >= 10) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    if (strengthFill) {
      strengthFill.classList.remove('weak', 'medium', 'strong');
      if (val.length === 0) {
        strengthFill.style.width = '0%';
        if (strengthText) strengthText.textContent = '';
      } else if (strength <= 2) {
        strengthFill.classList.add('weak');
        if (strengthText) strengthText.textContent = 'Weak password';
      } else if (strength <= 3) {
        strengthFill.classList.add('medium');
        if (strengthText) strengthText.textContent = 'Medium strength';
      } else {
        strengthFill.classList.add('strong');
        if (strengthText) strengthText.textContent = 'Strong password';
      }
    }
  });

  // ===== Form Validation =====
  const authForms = document.querySelectorAll('.auth-form form');
  authForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('[required]').forEach(field => {
        const group = field.closest('.form-group');
        if (!field.value.trim()) {
          group?.classList.add('error');
          valid = false;
        } else {
          group?.classList.remove('error');
        }
      });

      // Email validation
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
          emailInput.closest('.form-group')?.classList.add('error');
          valid = false;
        }
      }

      // Password match (register form)
      const pass = form.querySelector('#registerPassword');
      const confirm = form.querySelector('#confirmPassword');
      if (pass && confirm && pass.value !== confirm.value) {
        confirm.closest('.form-group')?.classList.add('error');
        valid = false;
        if (typeof showToast === 'function') {
          showToast('Passwords do not match', 'error');
        }
      }

      if (valid) {
        if (typeof showToast === 'function') {
          showToast('Success! Redirecting...', 'success');
        }
        // Demo: redirect after delay
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      }
    });
  });

  // Real-time clear errors
  document.querySelectorAll('.auth-form input').forEach(input => {
    input.addEventListener('input', () => {
      input.closest('.form-group')?.classList.remove('error');
    });
  });

});

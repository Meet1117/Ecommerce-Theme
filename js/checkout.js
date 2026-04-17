/* =========================================================
   LUXE STORE — Checkout Page JavaScript
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Multi-Step Navigation =====
  const steps = document.querySelectorAll('.checkout-step');
  const sections = document.querySelectorAll('.checkout-section[data-step]');
  let currentStep = 1;

  function goToStep(step) {
    currentStep = step;
    steps.forEach((s, i) => {
      const stepNum = i + 1;
      // Divide by 2 since lines are in between
      s.classList.remove('active', 'completed');
      if (s.classList.contains('checkout-step__line')) return;
      
      // This is overly simplified — just handle the step indicators
    });

    sections?.forEach(sec => {
      const sectionStep = parseInt(sec.getAttribute('data-step'));
      if (sectionStep === step) {
        sec.style.display = '';
      } else {
        sec.style.display = 'none';
      }
    });
  }

  // Step navigation buttons
  document.querySelectorAll('[data-next-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next-step'));
      if (next) goToStep(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  document.querySelectorAll('[data-prev-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev-step'));
      if (prev) goToStep(prev);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ===== Same as Billing Toggle =====
  const sameAddress = document.getElementById('sameAddress');
  const shippingFields = document.getElementById('shippingFields');

  sameAddress?.addEventListener('change', () => {
    if (shippingFields) {
      shippingFields.style.display = sameAddress.checked ? 'none' : 'block';
    }
  });

  // ===== Payment Method Toggle =====
  document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
      document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
      method.classList.add('active');

      const radio = method.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;

      document.querySelectorAll('.payment-details').forEach(d => d.classList.remove('active'));
      const targetDetails = document.getElementById(radio?.value + '-details');
      if (targetDetails) targetDetails.classList.add('active');
    });
  });

  // ===== Place Order =====
  const placeOrderBtn = document.getElementById('placeOrder');
  const orderModal = document.getElementById('orderSuccessModal');

  placeOrderBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Show success modal
    if (orderModal) {
      orderModal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  });

  // Close order modal
  document.querySelector('.order-success .btn')?.addEventListener('click', () => {
    if (orderModal) {
      orderModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // ===== Form Validation =====
  const checkoutForm = document.getElementById('checkoutForm');
  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const requiredFields = checkoutForm.querySelectorAll('[required]');

    requiredFields.forEach(field => {
      const group = field.closest('.form-group');
      if (!field.value.trim()) {
        group?.classList.add('error');
        valid = false;
      } else {
        group?.classList.remove('error');
      }
    });

    if (valid) {
      goToStep(currentStep + 1);
    }
  });

  // Real-time validation
  document.querySelectorAll('.checkout-section input, .checkout-section select').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (input.value.trim()) {
        group?.classList.remove('error');
      }
    });
  });

});

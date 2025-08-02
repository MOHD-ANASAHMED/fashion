(function() {
  // Cache DOM elements
  const domCache = {
    modal: document.getElementById('modal'),
    modalImg: document.getElementById('modal-img'),
    quoteContainer: document.getElementById('quote-container'),
    accordionButtons: document.querySelectorAll('.accordion-button'),
    paymentModal: document.getElementById('paymentModal'),
    paymentDetails: document.getElementById('payment-details')
  };

  // Freeze reward data to prevent tampering
  let rewardData = Object.freeze({});

  // Set reward data securely
  window.setRewardData = function(data) {
    rewardData = Object.freeze(Object.assign({}, data));
  };

  // FAQ Accordion Functionality
  function handleAccordionToggle() {
  const isExpanded = this.getAttribute('aria-expanded') === 'true';

  domCache.accordionButtons.forEach(btn => {
    btn.setAttribute('aria-expanded', 'false');
    const iconSpan = btn.querySelector('.icon');
    if (iconSpan) iconSpan.textContent = '+';
  });

  if (!isExpanded) {
    this.setAttribute('aria-expanded', 'true');
    const iconSpan = this.querySelector('.icon');
    if (iconSpan) iconSpan.textContent = '–';
  }
}

  function initAccordion() {
    domCache.accordionButtons.forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', handleAccordionToggle);
    });
  }

  // Gallery Modal Functions
  function openModal(img) {
    if (!domCache.modal || !domCache.modalImg) return;

    domCache.modal.classList.add('show');
    domCache.modalImg.src = img.src;
    domCache.modalImg.alt = img.alt || 'Enlarged view';
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!domCache.modal) return;

    domCache.modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  function handleEscapeKey(event) {
    if (event.key === 'Escape') closeModal();
  }

  // Payment Modal Functions
  function createSafeElement(tag, content, attributes = {}) {
    const el = document.createElement(tag);
    if (content) el.textContent = content;
    Object.entries(attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
    return el;
  }

  function supportReward(rewardId) {
    if (!rewardId || !domCache.paymentDetails) return;

    const reward = rewardData[String(rewardId)];
    if (!reward) return;

    // Clear previous content safely
    domCache.paymentDetails.innerHTML = '';

    const container = createSafeElement('div', null, {class: 'modal-reward-details'});
    const heading = createSafeElement('h2', 'Complete Your Support');

    const bankInfo = createSafeElement('p');
    bankInfo.appendChild(createSafeElement('strong', 'Bank A/c: '));
    bankInfo.appendChild(document.createTextNode(reward.bank_account || 'XXXXXXXXXXXX'));

    const ifscInfo = createSafeElement('p');
    ifscInfo.appendChild(createSafeElement('strong', 'IFSC Code: '));
    ifscInfo.appendChild(document.createTextNode(reward.ifsc || 'XXXX0000000'));

    container.appendChild(heading);
    container.appendChild(bankInfo);
    container.appendChild(ifscInfo);

    if (reward.qr_code) {
      const qrImg = createSafeElement('img', null, {
        src: reward.qr_code,
        alt: 'QR Code',
        class: 'modal-reward-image'
      });
      container.appendChild(qrImg);
    }

    if (reward.upi) {
      const upiLink = createSafeElement('a', 'Pay via UPI', {
        href: reward.upi,
        class: 'upi-button',
        target: '_blank',
        rel: 'noopener noreferrer'
      });
      container.appendChild(createSafeElement('p').appendChild(upiLink));
    }

    domCache.paymentDetails.appendChild(container);
    domCache.paymentModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  function closePaymentModal() {
    if (!domCache.paymentModal) return;

    domCache.paymentModal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Quote Rotation
  const quotes = Object.freeze([
    "Fashion with a conscience — your support creates change, one stitch at a time.",
    "Back more than a brand — back a movement for ethical, sustainable style.",
    "Every thread tells a story. Help us weave a better future.",
    "You're not just funding clothes — you're empowering creators and protecting the planet.",
    "Real change starts with real people — like you.",
    "Together, we can turn conscious fashion into the new standard.",
    "This isn't just a launch — it's a legacy in the making. Be part of it.",
    "Your contribution, no matter how small, makes a big difference.",
    "100% of your support goes toward production, fair wages, and sustainable materials.",
    "We're building in the open — with you, not just for you."
  ]);

  function initQuotes() {
    if (!domCache.quoteContainer || quotes.length === 0) return;

    let quoteIndex = 0;
    domCache.quoteContainer.textContent = quotes[0];

    const rotateQuotes = () => {
      domCache.quoteContainer.style.opacity = '0';

      setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        domCache.quoteContainer.textContent = quotes[quoteIndex];
        domCache.quoteContainer.style.opacity = '1';
      }, 500);
    };

    setInterval(rotateQuotes, 6000);
  }

  // Event Listeners
  function initEventListeners() {
    // Gallery modal close with escape key
    document.addEventListener('keydown', handleEscapeKey);

    // Modal close when clicking outside content
    if (domCache.modal) {
      domCache.modal.addEventListener('click', (e) => {
        if (e.target === domCache.modal) closeModal();
      });
    }

    if (domCache.paymentModal) {
      domCache.paymentModal.addEventListener('click', (e) => {
        if (e.target === domCache.paymentModal) closePaymentModal();
      });
    }
  }

  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    initAccordion();
    initQuotes();
    initEventListeners();

    // Cleanup when leaving page
    window.addEventListener('beforeunload', () => {
      document.removeEventListener('keydown', handleEscapeKey);
      domCache.accordionButtons.forEach(btn => {
        btn.removeEventListener('click', handleAccordionToggle);
      });
    });
  });

  // Expose necessary functions to global scope
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.supportReward = supportReward;
  window.closePaymentModal = closePaymentModal;
})();

//for animated cursor
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

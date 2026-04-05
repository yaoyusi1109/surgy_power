const accCards = document.querySelectorAll('[data-acc]');

accCards.forEach((card, index) => {
  const button = card.querySelector('.core-toggle');
  if (!button) return;

  if (index === 0) {
    card.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
  }

  button.addEventListener('click', () => {
    const isOpen = card.classList.contains('is-open');
    card.classList.toggle('is-open', !isOpen);
    button.setAttribute('aria-expanded', String(!isOpen));
  });
});

const tabButtons = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('[data-panel]');

const activateTab = (tabId) => {
  tabButtons.forEach((btn) => {
    const active = btn.dataset.tab === tabId;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  tabPanels.forEach((panel) => {
    const show = panel.dataset.panel === tabId;
    panel.hidden = !show;
  });
};

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => activateTab(btn.dataset.tab));
});

const costInput = document.getElementById('inputCost');
const statBase = document.getElementById('statBase');
const statLow = document.getElementById('statLow');
const statHigh = document.getElementById('statHigh');
const statMethod = document.getElementById('statMethod');

const renderCalc = (baseCostWan) => {
  const low = Math.round(baseCostWan * 0.02);
  const high = Math.round(baseCostWan * 0.08);

  statBase.textContent = `${baseCostWan} 万元`;
  statLow.textContent = `${low} 万元`;
  statHigh.textContent = `${high} 万元`;
  statMethod.textContent = '连续运行+第三方复核';
};

if (costInput && statBase && statLow && statHigh && statMethod) {
  renderCalc(Number(costInput.value));

  costInput.addEventListener('input', () => {
    renderCalc(Number(costInput.value));
  });
}

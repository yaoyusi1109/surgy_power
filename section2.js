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

const whInput = document.getElementById('inputWh');
const statIn = document.getElementById('statIn');
const statOut = document.getElementById('statOut');
const statRatio = document.getElementById('statRatio');
const statElec = document.getElementById('statElec');

const renderCalc = (inputWh) => {
  const outWh = Math.round(inputWh * 9.008);
  const ratio = outWh / inputWh;
  const elecWh = Math.round(inputWh * 3);

  statIn.textContent = `${inputWh} Wh`;
  statOut.textContent = `${outWh} Wh`;
  statRatio.textContent = `${ratio.toFixed(1)}x`;
  statElec.textContent = `${elecWh} Wh`;
};

if (whInput && statIn && statOut && statRatio && statElec) {
  renderCalc(Number(whInput.value));

  whInput.addEventListener('input', () => {
    renderCalc(Number(whInput.value));
  });
}

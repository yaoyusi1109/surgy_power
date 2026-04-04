const stageButtons = document.querySelectorAll('.stage-btn');
const stageFigures = document.querySelectorAll('.s4-figure[data-stage]');

const applyStageFilter = (stage) => {
  stageButtons.forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.stage === stage);
  });

  stageFigures.forEach((figure) => {
    const show = stage === 'all' || figure.dataset.stage === stage;
    figure.classList.toggle('is-hidden', !show);
  });
};

stageButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    applyStageFilter(btn.dataset.stage);
  });
});

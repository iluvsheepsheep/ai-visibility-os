const scoreCards = [
  { label: 'AI Visibility Score', score: 72, summary: 'Strong foundation with room to improve entity clarity.' },
  { label: 'SEO Score', score: 78, summary: 'Solid technical and content baseline for organic search.' },
  { label: 'GEO Score', score: 64, summary: 'Needs more AI-citable proof points and source consistency.' },
  { label: 'AEO Score', score: 69, summary: 'Good FAQ potential; answer snippets can be expanded.' },
];

const opportunities = [
  'Create answer-focused service pages for high-intent buyer questions.',
  'Add structured FAQ and Organization schema across priority landing pages.',
  'Publish comparison content that clearly explains positioning versus competitors.',
  'Strengthen local authority signals with consistent location and review metadata.',
];

const scoreGrid = document.querySelector('#score-grid');
const competitorList = document.querySelector('#competitor-list');
const opportunityList = document.querySelector('#opportunity-list');
const reportStatus = document.querySelector('#report-status');
const form = document.querySelector('#setup-form');

function renderScoreCards() {
  scoreGrid.innerHTML = scoreCards.map((card) => `
    <article class="score-card">
      <div class="score-ring" style="--score: ${card.score * 3.6}deg"><span>${card.score}</span></div>
      <div><h3>${card.label}</h3><p>${card.summary}</p></div>
    </article>
  `).join('');
}

function renderCompetitors(rawCompetitors) {
  const competitors = rawCompetitors.split(',').map((item) => item.trim()).filter(Boolean);
  competitorList.innerHTML = (competitors.length ? competitors : ['Example Competitor'])
    .map((competitor) => `<span class="chip">${competitor}</span>`)
    .join('');
}

function renderOpportunities() {
  opportunityList.innerHTML = opportunities.map((opportunity) => `<li>${opportunity}</li>`).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const companyName = document.querySelector('#company-name').value.trim() || 'Your company';
  const competitors = document.querySelector('#competitors').value;
  reportStatus.textContent = `Mock report for ${companyName}`;
  renderCompetitors(competitors);
});

renderScoreCards();
renderCompetitors(document.querySelector('#competitors').value);
renderOpportunities();

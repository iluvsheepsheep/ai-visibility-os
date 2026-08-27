const analysisStatus = {
  stage: 'Prototype mode',
  label: 'Mock analysis only',
  description: 'V0.2 keeps the dashboard interactive while separating sample scores from the future crawler and AI analysis pipeline.',
  nextStep: 'Next version: connect crawler, collect page evidence, run AI interpretation, then calculate verified scores.',
};

const scoreModel = [
  { key: 'overall', label: 'Overall AI Visibility', score: 72, source: 'Mock baseline', summary: 'Composite planning score across SEO, GEO, AEO, authority, content, and technical readiness.' },
  { key: 'seo', label: 'SEO', score: 78, source: 'Mock baseline', summary: 'Represents organic discoverability fundamentals, not live Google rankings.' },
  { key: 'geo', label: 'GEO', score: 64, source: 'Mock baseline', summary: 'Estimates readiness to be cited by generative answer engines once real evidence is collected.' },
  { key: 'aeo', label: 'AEO', score: 69, source: 'Mock baseline', summary: 'Measures answer-focused content structure and FAQ coverage for future snippet analysis.' },
  { key: 'entityAuthority', label: 'Entity Authority', score: 61, source: 'Mock baseline', summary: 'Models consistency of brand, location, service, and third-party proof signals.' },
  { key: 'content', label: 'Content', score: 74, source: 'Mock baseline', summary: 'Reviews topical coverage, buyer questions, comparisons, and evidence depth.' },
  { key: 'technicalSeo', label: 'Technical SEO', score: 81, source: 'Mock baseline', summary: 'Tracks crawlability, structured data readiness, performance, and indexation hygiene.' },
];

const analysisPipeline = [
  { name: 'Company profile', state: 'Ready', detail: 'Uses the setup form values as the seed for future analysis jobs.' },
  { name: 'Website crawler', state: 'Planned', detail: 'Will discover pages, metadata, schema, internal links, and crawl issues.' },
  { name: 'Evidence store', state: 'Planned', detail: 'Will save page-level findings so recommendations cite real URLs and observations.' },
  { name: 'AI analysis layer', state: 'Planned', detail: 'Will classify content gaps, entity signals, and answer-engine readiness from collected evidence.' },
  { name: 'Scoring engine', state: 'Mock now', detail: 'Currently uses transparent sample scores until real crawler data is available.' },
];

const recommendations = [
  {
    problem: 'Service pages are not structured around buyer questions.',
    why: 'AI answer systems and featured-answer experiences need concise, extractable responses backed by clear service context.',
    action: 'Create answer-led sections for pricing, process, outcomes, timelines, and use cases on each priority service page.',
    impact: 'Higher AEO and content readiness once real page analysis is connected.',
    difficulty: 'Medium',
    priority: 'High',
  },
  {
    problem: 'Organization and FAQ schema are not yet validated in the prototype.',
    why: 'Structured data can help crawlers interpret entity details, services, locations, and question-answer pairs consistently.',
    action: 'Add a schema validation step to the future crawler and prioritize Organization, LocalBusiness, Service, and FAQPage markup.',
    impact: 'Improves technical SEO and entity authority confidence.',
    difficulty: 'Medium',
    priority: 'High',
  },
  {
    problem: 'Competitor positioning is captured but not evidence-based yet.',
    why: 'GEO recommendations should compare real messaging, citations, and proof points before ranking opportunities.',
    action: 'Store competitor domains, crawl public comparison pages, and map differentiators to verifiable claims.',
    impact: 'Creates more credible GEO and authority recommendations in V0.3.',
    difficulty: 'High',
    priority: 'Medium',
  },
];

const scoreGrid = document.querySelector('#score-grid');
const competitorList = document.querySelector('#competitor-list');
const reportStatus = document.querySelector('#report-status');
const statusDetails = document.querySelector('#status-details');
const pipelineList = document.querySelector('#pipeline-list');
const recommendationList = document.querySelector('#recommendation-list');
const form = document.querySelector('#setup-form');

function renderScoreCards() {
  scoreGrid.innerHTML = scoreModel.map((card) => `
    <article class="score-card">
      <div class="score-ring" style="--score: ${card.score * 3.6}deg"><span>${card.score}</span></div>
      <div>
        <div class="score-meta"><span>${card.source}</span></div>
        <h3>${card.label}</h3>
        <p>${card.summary}</p>
      </div>
    </article>
  `).join('');
}

function renderStatus(companyName = 'Acme Growth Studio') {
  reportStatus.textContent = `${analysisStatus.label} for ${companyName}`;
  statusDetails.innerHTML = `
    <p><strong>${analysisStatus.stage}:</strong> ${analysisStatus.description}</p>
    <p>${analysisStatus.nextStep}</p>
    <p class="status-note">These scores are sample planning inputs only. They are not live rankings, verified crawler findings, or real Google performance data.</p>
  `;
}

function renderPipeline() {
  pipelineList.innerHTML = analysisPipeline.map((step) => `
    <li>
      <span class="pipeline-state">${step.state}</span>
      <div><strong>${step.name}</strong><p>${step.detail}</p></div>
    </li>
  `).join('');
}

function renderCompetitors(rawCompetitors) {
  const competitors = rawCompetitors.split(',').map((item) => item.trim()).filter(Boolean);
  competitorList.innerHTML = (competitors.length ? competitors : ['Example Competitor'])
    .map((competitor) => `<span class="chip">${competitor}</span>`)
    .join('');
}

function renderRecommendations() {
  recommendationList.innerHTML = recommendations.map((item) => `
    <article class="recommendation-card">
      <div class="recommendation-header">
        <h3>${item.problem}</h3>
        <div><span class="priority">${item.priority} priority</span><span class="difficulty">${item.difficulty}</span></div>
      </div>
      <dl>
        <div><dt>Why it matters</dt><dd>${item.why}</dd></div>
        <div><dt>Recommended action</dt><dd>${item.action}</dd></div>
        <div><dt>Expected impact</dt><dd>${item.impact}</dd></div>
      </dl>
    </article>
  `).join('');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const companyName = document.querySelector('#company-name').value.trim() || 'Your company';
  const competitors = document.querySelector('#competitors').value;
  renderStatus(companyName);
  renderCompetitors(competitors);
});

renderScoreCards();
renderStatus();
renderPipeline();
renderCompetitors(document.querySelector('#competitors').value);
renderRecommendations();

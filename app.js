const app = document.getElementById('app');
const modalRoot = document.getElementById('modalRoot');
const toastRoot = document.getElementById('toastRoot');

const laneMeta = {
  emergency: {
    label: 'Emerjénsia',
    title: 'Halo pedidu koordenasaun urjente',
    short: 'Koordenasaun imediata',
    icon: '!',
    tone: 'emergency',
    copy: 'Bainhira presiza koordenasaun agora ho dalan emerjénsia ofisiál.'
  },
  maternity: {
    label: 'Planeamentu maternidade',
    title: 'Planea kuidadu maternidade',
    short: 'Planeamentu maternidade',
    icon: '♡',
    tone: 'maternity',
    copy: 'Ba vizita ka kontaktu maternidade planeadu.'
  },
  medicine: {
    label: 'Aimoruk',
    title: 'Koordena pedidu aimoruk',
    short: 'Koordenasaun aimoruk',
    icon: '+',
    tone: 'medicine',
    copy: 'Ba informasaun kona-ba disponibilidade ka halibur aimoruk.'
  },
  routine: {
    label: 'Kuidadu rutina',
    title: 'Husu koordenasaun ba kuidadu rutina',
    short: 'Kuidadu rutina',
    icon: '↗',
    tone: 'routine',
    copy: 'Ba vizita rutina, akompañamentu, ka servisu disponivel.'
  }
};

const state = {
  mode: 'community',
  online: false,
  selectedRequest: 'req-4',
  activeFilter: 'Pedidu hotu',
  search: '',
  responseKind: 'Resposta servisu',
  responseDraft: '',
  responseDraftKey: '',
  demoStory: {
    active: false,
    step: 0,
    requestKey: 'demo-maternity',
    paused: false,
    syncing: false,
    responseCategory: 'Bele simu / avalia',
    responseText: 'Servisu saúde responsavel bele simu no avalia pedidu maternidade de Maria iha Remexio. Pasu tuir mai mak koordenasaun ho servisu lokal. Ida-ne’e la’ós diagnóstiku ka garantia rezultadu.'
  },
  requests: [
    {
      key: 'req-1',
      updatedAt: 5,
      id: 'HSA-0421',
      lane: 'maternity',
      title: 'Planea vizita maternidade tuir mai',
      location: 'Laclubar · Manatuto',
      requester: 'Halo husi Autoridade Komunidade ba Maria S. (ezemplu)',
      created: 'Ohin · 08:42',
      time: '08:42',
      lastUpdated: 'Ohin · 09:18',
      status: 'Resposta disponivel',
      tone: 'success',
      summary: 'Pedidu ba kontaktu tuir mai ne’ebé disponivel ba kuidadu maternidade planeadu.',
      quote: 'Favór konfirma kontaktu ka vizita tuir mai ne’ebé disponivel ba kuidadu maternidade planeadu.',
      response: 'Servisu hatán katak kontaktu ba kuidadu planeadu bele koordena liuhusi postu saúde lokal. Uza referénsia HSA-0421 bainhira koalia ho servisu.',
      timeline: [
        { title: 'Resposta disponivel', detail: 'Resposta servisu saúde sincronizadu · Ohin, 09:18' },
        { title: 'Simu ona — hein revizaun', detail: 'Servisu saúde simu pedidu no tau iha fila revizaun · Ohin, 08:50' },
        { title: 'Haruka ba servisu saúde', detail: 'Haruka ba servisu saúde responsavel · Ohin, 08:47' },
        { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Rejistadu husi Autoridade Komunidade · Ohin, 08:42' },
        { title: 'Pedidu kria ona', detail: 'Informasaun orijinal rejistadu ho seguransa · Ohin, 08:42' }
      ]
    },
    {
      key: 'req-2',
      updatedAt: 2,
      id: 'HSA-0422',
      lane: 'medicine',
      title: 'Haree disponibilidade aimoruk',
      location: 'Ainaro Vila · Ainaro',
      requester: 'Membru komunidade ba Ana S. (ezemplu)',
      created: 'Loron rua liu ona · 09:03',
      time: 'Loron rua liu ona',
      lastUpdated: 'Loron rua liu ona',
      status: 'Rai iha dispozitivu — seidauk haruka',
      tone: 'warning',
      summary: 'Pedidu hein sincronizasaun kleur; se presiza, uza prosedimentu alternativa lokal verifikadu.',
      quote: 'Servisu saúde bele konfirma ka lae katak aimoruk ne’ebé husu disponivel agora?',
      response: '',
      timeline: [
        { title: 'Hein sincronizasaun', detail: 'Pedidu hein koneksaun atu haruka · Loron rua liu ona' },
        { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Rejistadu iha aplikasaun komunidade · Loron rua liu ona' },
        { title: 'Pedidu kria ona', detail: 'Informasaun orijinal rai iha dispozitivu · Loron rua liu ona' }
      ]
    },
    {
      key: 'req-3',
      updatedAt: 6,
      id: 'HSA-0420',
      lane: 'routine',
      title: 'Koordena akompañamentu rutina',
      location: 'Baucau Vila · Baucau',
      requester: 'Membru komunidade ba Ana S. (ezemplu)',
      created: 'Horiseik · 16:20',
      time: 'Horiseik',
      lastUpdated: 'Ohin · 10:14',
      status: 'Presiza informasaun liután',
      tone: 'warning',
      summary: 'Servisu saúde husu informasaun liután molok bele kontinua pedidu.',
      quote: 'Favór hatete dalan tuir mai ne’ebé disponivel atu koordena akompañamentu rutina ida-ne’e.',
      response: '',
      moreInfoQuestion: 'Ita bele hatete tempu preferidu liután ka loron ne’ebé ita hakarak simu akompañamentu rutina?',
      moreInfoAskedBy: 'Responsavel servisu saúde (ezemplu)',
      moreInfoAskedAt: 'Ohin, 10:14',
      communityReply: '',
      replyStatus: '',
      timeline: [
        { title: 'Presiza informasaun liután', detail: 'Servisu saúde husu tempu preferidu no loron akompañamentu · Ohin, 10:14' },
        { title: 'Simu ona — hein revizaun', detail: 'Servisu saúde simu pedidu atu halo revizaun · Horiseik, 16:28' },
        { title: 'Haruka ba servisu saúde', detail: 'Haruka ba servisu saúde responsavel · Horiseik, 16:24' },
        { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Rejistadu husi membru komunidade · Horiseik, 16:20' },
        { title: 'Pedidu kria ona', detail: 'Informasaun orijinal rejistadu husi membru komunidade · Horiseik, 16:20' }
      ]
    },
    {
      key: 'req-4',
      updatedAt: 3,
      id: 'HSA-0418',
      lane: 'emergency',
      title: 'Pedidu koordenasaun urjente',
      location: 'Ermera Vila · Ermera',
      requester: 'Halo husi Autoridade Komunidade ba Maria S. (ezemplu)',
      created: 'Horiseik · 14:06',
      time: 'Horiseik',
      lastUpdated: 'Horiseik · 14:11',
      status: 'Simu ona — hein revizaun',
      tone: 'coral',
      emergencyStage: 'received',
      emergencyPathway: 'Seidauk rejista',
      emergencyNextStep: 'Seidauk rejista',
      summary: 'Pedidu urjente iha fila servisu atu reviza.',
      quote: 'Favór reviza pedidu koordenasaun urjente ida-ne’e no rejista resposta servisu.',
      response: '',
      timeline: [
        { title: 'Simu ona — hein revizaun', detail: 'Tau iha fila atu servisu saúde reviza · Horiseik, 14:11' },
        { title: 'Haruka ba servisu saúde', detail: 'Haruka liuhusi dalan emerjénsia ofisiál · Horiseik, 14:11' },
        { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Rejistadu husi Autoridade Komunidade · Horiseik, 14:06' },
        { title: 'Pedidu kria ona', detail: 'Informasaun orijinal rejistadu husi Autoridade Komunidade · Horiseik, 14:06' }
      ]
    },
    {
      key: 'req-5',
      updatedAt: 4,
      id: 'HSA-0416',
      lane: 'medicine',
      title: 'Estadu disponibilidade aimoruk',
      location: 'Same · Manufahi',
      requester: 'Atualizasaun servisu saúde',
      created: 'Horiseik · 11:30',
      time: 'Horiseik',
      lastUpdated: 'Horiseik · 11:35',
      status: 'Resposta disponivel',
      tone: 'success',
      resourceStatus: 'Aimoruk ezemplu — La hatene',
      resourceUpdated: '18 Set',
      summary: 'Aimoruk ezemplu — La hatene (atualiza ikus: 18 Set).',
      quote: 'Atualizasaun kona-ba vizibilidade rekursu husi servisu responsavel.',
      response: 'Informasaun disponibilidade atualiza ona husi servisu responsavel. Hamutuk Saúde la fahe no la fó resepita ba aimoruk.',
      timeline: [
        { title: 'Resposta disponivel', detail: 'Atualizasaun estadu rekursu fahe ona · Horiseik, 11:35' },
        { title: 'Atualizasaun rekursu rejista ona', detail: 'Ekipa servisu saúde · Horiseik, 11:30' },
        { title: 'Pedidu kria ona', detail: 'Informasaun rekursu rejistadu · Horiseik, 11:30' }
      ]
    }
  ]
};

function h(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[character]));
}

function getRequest(key) {
  return state.requests.find((request) => request.key === key) || state.requests[0];
}

function statusPill(label, tone = 'neutral') {
  return `<span class="pill ${h(tone)}">${h(label)}</span>`;
}

function laneIcon(lane, extra = '') {
  const meta = laneMeta[lane] || laneMeta.routine;
  return `<span class="request-mini-icon ${meta.tone} ${extra}">${meta.icon}</span>`;
}

function timelineMarkup(items, compact = false) {
  if (!items || !items.length) return '<div class="empty-state">Seidauk iha eventu iha istória.</div>';
  const chronological = [...items].reverse();
  return `<div class="timeline ${compact ? 'modal-timeline' : ''}">${chronological.map((item, index) => `
    <div class="timeline-item ${index === chronological.length - 1 ? 'current' : ''}">
      <div class="timeline-dot"></div>
      <div class="timeline-copy"><strong>${h(item.title)}</strong><span>${h(item.detail)}</span></div>
    </div>`).join('')}</div>`;
}

function renderCommunity() {
  const pinnedOrder = { 'req-3': 3, 'req-1': 2, 'req-2': 1 };
  const visibleRequests = state.requests
    .filter((request) => request.communityVisible !== false && request.requester !== 'Atualizasaun servisu saúde')
    .sort((a, b) => (b.updatedAt || pinnedOrder[b.key] || 0) - (a.updatedAt || pinnedOrder[a.key] || 0));
  const activeCount = visibleRequests.filter((request) => !['Resposta disponivel', 'Completu'].includes(request.status)).length;
  return `
    <div class="community-layout clean-home-layout">
      <section class="phone-frame" aria-label="Inisiu aplikasaun Hamutuk Saúde ba komunidade">
        <div class="phone-screen">
          <div class="phone-statusbar">
            <span>09:41</span>
            <span class="phone-statusbar-right">
              <span>${state.online ? 'iha koneksaun' : 'la iha koneksaun'}</span>
              <span class="signal-bars" aria-hidden="true"><span></span><span></span><span></span></span>
              <span>▰</span>
            </span>
          </div>
          <div class="mobile-header">
            <div class="mobile-brand"><span class="mobile-brand-mark" aria-hidden="true"></span>Hamutuk Saúde</div>
            <button class="mobile-connection" data-action="toggle-network" type="button"><span class="connection-dot"></span>${state.online ? 'Iha koneksaun' : 'La iha koneksaun'}</button>
          </div>
          <div class="mobile-scroll">
            <div class="mobile-greeting clean-greeting">
              <div>
                <div class="eyebrow">Inisiu</div>
                <h2>Bondia, Maria</h2>
                <p>Ita-nia pedidu sira rai seguru iha dispozitivu ida-ne’e.</p>
              </div>
              <div class="location-chip"><span class="location-pin">⌖</span> Aileu · Remexio</div>
            </div>

            ${!state.online ? `<div class="offline-banner"><div class="banner-icon">!</div><div><strong>La iha koneksaun · pedidu sira sei iha dispozitivu ida-ne’e.</strong><p>Ita bele kria pedidu nafatin. Nia sei la hatudu hanesan haruka ona to’o sincronizasaun susesu.</p><button class="text-button" data-action="open-offline-guide" type="button">Haree guia bainhira la iha koneksaun →</button><button class="text-button reconnect-link" data-action="simulate-reconnect" type="button">Simula koneksaun fila fali →</button></div></div>` : ''}

            <button class="home-primary-action" data-action="open-new-request" type="button"><span class="home-primary-icon">+</span><span><strong>Pedidu foun</strong><small>Hili tipu pedidu ida</small></span><span class="arrow">→</span></button>

            <div class="home-demo-strip"><div><span>Istória interativu</span><strong>Maria iha Remexio</strong></div><button class="text-button" data-action="demo-story" type="button">Haree demo →</button></div>

            <div class="mobile-section-heading clean-section-heading" id="communityRequests"><h3>Ita-nia pedidu sira</h3><span>${visibleRequests.length} pedidu</span></div>
            <div class="request-list clean-request-list">
              ${visibleRequests.length ? visibleRequests.map((request) => `
                <button class="mobile-request-card ${request.status === 'Presiza informasaun liután' ? 'needs-more-info' : ''}" data-action="view-request" data-id="${request.key}" type="button">
                  <div class="request-row">
                    <div class="request-card-title">${laneIcon(request.lane)}<span><small>${h(laneMeta[request.lane]?.label || 'Pedidu')}</small><strong>${h(request.title)}</strong></span></div>
                    <span class="request-card-status"><span class="status-lock" title="Estadu rejistadu iha istória">▣</span>${statusPill(request.status, request.tone)}</span>
                  </div>
                  <p>${h(request.status === 'Presiza informasaun liután' && request.moreInfoQuestion ? `Servisu saúde husu: ${request.moreInfoQuestion}` : request.summary)}</p>
                  ${request.status === 'Presiza informasaun liután' ? '<div class="mobile-more-info-needed"><strong>Servisu saúde husu informasaun liután</strong><span>Haree pergunta no hatán agora</span></div>' : ''}
                  ${request.lane === 'emergency' && request.status === 'Rai iha dispozitivu — seidauk haruka' ? '<div class="mobile-emergency-warning"><strong>KOMUNIKASAUN LA DISPONIVEL – pedidu seidauk to’o servisu saúde</strong><span>Seidauk iha konfirmasaun husi servisu.</span></div>' : ''}
                  <div class="mobile-request-origin">${h(request.requester)}</div>
                  <div class="mobile-request-meta"><span>${h(request.id)} · ${h(request.location)}</span><span>Atualizasaun ${h(request.lastUpdated || request.time || request.created)} · Haree ›</span></div>
                </button>`).join('') : '<div class="clean-empty-state"><span>▤</span><strong>Seidauk iha pedidu</strong><p>Hahú pedidu foun bainhira ita presiza koordenasaun ho servisu saúde.</p><button class="btn primary" data-action="open-new-request" type="button">Pedidu foun <span class="arrow">→</span></button></div>'}
            </div>
          </div>
          <nav class="mobile-footer-nav" aria-label="Navegasaun aplikasaun komunidade">
            <button class="mobile-nav-item active" data-action="community-home" type="button"><span>⌂</span><span>Inisiu</span></button>
            <button class="mobile-nav-item" data-action="community-requests" type="button"><span>▤</span><span>Pedidu sira</span></button>
            <button class="mobile-nav-item assist" data-action="community-assist" type="button"><span>+</span><span>Asiste</span></button>
            <button class="mobile-nav-item" data-action="open-help" type="button"><span>?</span><span>Ajuda</span></button>
          </nav>
        </div>
      </section>

      <section class="community-intro clean-home-intro">
        <div class="eyebrow">Inisiu · parte komunidade</div>
        <h1 class="page-title">Hamutuk Saúde liga komunidade ho servisu saúde.</h1>
        <p class="page-subtitle">Haree pedidu sira, status loos, no pasu tuir mai iha fatin ida.</p>
        <div class="home-intro-actions"><button class="btn primary" data-action="open-new-request" type="button">Pedidu foun <span class="arrow">→</span></button><span>${activeCount} pedidu presiza atensaun ka hein pasu tuir mai</span></div>

        <div class="home-status-card"><div class="home-status-icon ${state.online ? 'online' : 'offline'}">${state.online ? '✓' : '!'}</div><div><strong>${state.online ? 'Iha koneksaun' : 'La iha koneksaun'}</strong><p>${state.online ? 'Pedidu bele haruka bainhira ita konfirma.' : 'Pedidu foun sei rai lokalmente no la sei mosu hanesan haruka ona.'}</p></div></div>

        <div class="why-card home-principles-card">
          <div class="why-card-head"><span class="why-icon">i</span><div><h3>Saida mak ita haree iha inisiu?</h3><p>Status no pasu tuir mai mak iha oin. Detalhe hotu iha kada pedidu.</p></div></div>
          <div class="home-principles-grid"><div><strong>Estadu loos</strong><span>Rai lokal la’ós haruka ona.</span></div><div><strong>Koordenasaun</strong><span>Servisu saúde mak deside saida mak bele halo.</span></div><div><strong>Istória</strong><span>Kada pergunta no resposta hela iha rejistu.</span></div></div>
        </div>

        <div class="demo-card clean-demo-card">
          <h3>Haree istória kompletu (Demo)</h3>
          <p>Maria iha Remexio hahú pedidu maternidade la iha koneksaun, depois haree resposta servisu saúde.</p>
          <div class="demo-story-subtitle">La iha koneksaun → Haruka → Resposta iha minutu balu</div>
          <button class="btn secondary" data-action="demo-story" type="button">Hahú demo <span class="arrow">→</span></button>
        </div>

        <div class="authority-training-card compact-authority-card">
          <div class="authority-training-kicker">Formasaun Autoridade Komunidade</div>
          <h3>Asiste residente ho limite klaru</h3>
          <p>Bele rejista liafuan residente; labele halo diagnóstiku, fó resepita, hili ospitál, ka deside urjénsia.</p>
          <button class="text-button" data-action="community-assist" type="button">Haree modu ajuda →</button>
        </div>

        <div class="home-safety-note"><strong>Limite importante.</strong><span>Hamutuk Saúde la halo desizaun mediku. Ba perigu imediatu, uza dalan emerjénsia ofisiál.</span><small>Sistema ida-ne’e desenyu atu servisu iha suku ho koneksaun satélite partilhada no eletrisidade la stabile.</small></div>
      </section>
    </div>`;
}

function matchesServiceFilter(request) {
  const filter = state.activeFilter;
  if (filter === 'Pedidu hotu') return true;
  if (filter === 'Simu ona — hein revizaun') return ['Simu ona — hein revizaun', 'Revisaun iha prosesu', 'Haruka ba servisu saúde'].includes(request.status);
  if (filter === 'Presiza informasaun liután') return request.status === 'Presiza informasaun liután';
  if (filter === 'Resposta disponivel') return ['Resposta fahe ona', 'Resposta disponivel', 'Referénsia rejistada'].includes(request.status);
  if (filter === 'Fila bainhira la iha koneksaun') return ['Rai iha dispozitivu — seidauk haruka', 'Hein sincronizasaun'].includes(request.status);
  return true;
}

function filteredRequests() {
  const query = state.search.trim().toLowerCase();
  return state.requests.filter((request) => {
    if (!matchesServiceFilter(request)) return false;
    if (!query) return true;
    return [request.id, request.title, request.location, request.requester, request.status].join(' ').toLowerCase().includes(query);
  });
}

function serviceMetricData() {
  const newCount = state.requests.filter((request) => ['Simu ona — hein revizaun', 'Presiza resposta', 'Presiza informasaun liután'].includes(request.status)).length;
  const awaiting = state.requests.filter((request) => ['Revisaun iha prosesu', 'Haruka ba servisu saúde', 'Simu ona — hein revizaun'].includes(request.status)).length;
  const responseCount = state.requests.filter((request) => ['Resposta fahe ona', 'Resposta disponivel', 'Referénsia rejistada'].includes(request.status)).length;
  const offlineCount = state.requests.filter((request) => ['Rai iha dispozitivu — seidauk haruka', 'Hein sincronizasaun'].includes(request.status)).length;
  return [
    { label: 'Presiza revizaun', value: newCount, foot: 'Pedidu sira ne’ebé presiza resposta', icon: '!', tone: 'coral' },
    { label: 'Hein resposta', value: awaiting, foot: 'Haruka husi komunidade', icon: '↗', tone: 'blue' },
    { label: 'Resposta sira fahe ona', value: responseCount, foot: 'Komunidade bele haree', icon: '✓', tone: 'teal' },
    { label: 'Fila bainhira la iha koneksaun', value: offlineCount, foot: 'Seidauk haruka husi dispozitivu', icon: '◌', tone: 'amber' }
  ];
}

function renderInboxItem(request) {
  const selected = request.key === state.selectedRequest;
  return `<button class="inbox-item ${selected ? 'selected' : ''}" data-action="select-request" data-id="${request.key}" type="button">
    <div class="inbox-item-top">
      ${laneIcon(request.lane)}
      <div class="inbox-item-content">
        <div class="inbox-item-title"><strong>${h(request.title)}</strong><span class="inbox-time">${h(request.time)}</span></div>
    <p class="inbox-item-summary">${h(request.status === 'Presiza informasaun liután' && request.moreInfoQuestion ? `Presiza informasaun: ${request.moreInfoQuestion}` : request.summary)}</p>
    <div class="inbox-item-requester">${h(request.requester)}</div>
    <div class="inbox-item-foot"><span class="location">${h(request.id)} · ${h(request.location)}</span>${statusPill(request.status, request.tone)}</div>
      </div>
    </div>
  </button>`;
}

function renderEmergencyDetail(request) {
  const stage = request.emergencyStage || 'received';
  const stageIndex = stage === 'responded' ? 2 : stage === 'coordinating' ? 1 : 0;
  const pathway = request.emergencyPathway || 'Seidauk rejista';
  const nextStep = request.emergencyNextStep || 'Seidauk rejista';
  const stageLabels = ['Simu pedidu', 'Koordena', 'Fahe resposta'];
  const pathwayOptions = ['Seidauk rejista', 'Haruka ba dalan SNAEM ofisiál', 'Kontaktu servisu lokal responsavel', 'Presiza informasaun liután husi komunidade', 'La bele konfirma dalan ida-ne’e'];
  const nextStepOptions = ['Seidauk rejista', 'Servisu responsavel sei halo revizaun', 'Atualizasaun ba komunidade tuir mai', 'Hein informasaun liután', 'Referénsia rejistada'];
  return `<div class="emergency-detail">
    <div class="emergency-detail-header">
      <div class="emergency-heading"><span class="emergency-heading-icon">!</span><div><div class="eyebrow">Emerjénsia · fila servisu</div><h2>Pedidu koordenasaun urjente</h2><p>${h(request.id)} · ${h(request.location)} · ${h(request.created)}</p></div></div>
      ${statusPill(request.status, request.tone)}
    </div>
    <div class="emergency-alert"><strong>Pedidu emerjénsia presiza resposta tuir dalan ofisiál.</strong><span>Hamutuk Saúde rejista aksaun servisu no fahe resposta. Nia la halo avaliasaun klinika, la haruka ambulánsia, no la hili ospitál.</span></div>

    <div class="emergency-stepper">${stageLabels.map((label, index) => `<div class="emergency-stage ${index < stageIndex ? 'done' : ''} ${index === stageIndex ? 'current' : ''}"><span>${index < stageIndex ? '✓' : index + 1}</span><strong>${label}</strong></div>${index < stageLabels.length - 1 ? '<i>→</i>' : ''}`).join('')}</div>

    <div class="emergency-content-grid">
      <div class="emergency-main-column">
        <section class="emergency-card">
          <div class="emergency-card-heading"><div><h3>Saida mak komunidade husu?</h3><span>Liafuan ne’ebé servisu simu</span></div>${statusPill('Emerjénsia', 'coral')}</div>
          <p class="emergency-quote">“${h(request.quote)}”</p>
          <div class="emergency-meta"><span>Husi: <strong>${h(request.requester)}</strong></span><span>Fatin: <strong>${h(request.location)}</strong></span>${request.contact ? `<span>Kontaktu: <strong>${h(request.contact)}</strong></span>` : ''}</div>
          <div class="service-audit"><span>Rejistu responsabilidade</span><strong>Responsavel servisu: João S. (ezemplu)</strong><span>Ohin, 09:12</span></div>
        </section>

        <section class="emergency-card emergency-action-card">
          <div class="emergency-card-heading"><div><h3>Passu 1 · Konfirma pedidu simu</h3><span>Hatudu katak servisu iha pedidu no komesa revizaun.</span></div><span class="step-badge">1</span></div>
          <p class="emergency-helper">Konfirmasaun ida-ne’e la’ós desizaun mediku. Nia de’it kria rejistu klaru katak servisu simu pedidu ba revizaun.</p>
          <button class="btn ${stageIndex > 0 ? 'secondary' : 'primary'}" data-action="ack-emergency" data-id="${request.key}" type="button">${stageIndex > 0 ? 'Pedidu simu ona' : 'Konfirma pedidu simu'} <span class="arrow">→</span></button>
        </section>

        <section class="emergency-card emergency-action-card">
          <div class="emergency-card-heading"><div><h3>Passu 2 · Rejista dalan koordenasaun</h3><span>Hili de’it aksaun ne’ebé servisu halo ka konfirma ona.</span></div><span class="step-badge">2</span></div>
          <div class="emergency-form-grid"><label class="form-field"><span>Dalan ne’ebé rejista</span><select id="emergencyPathway">${pathwayOptions.map((option) => `<option ${option === pathway ? 'selected' : ''}>${option}</option>`).join('')}</select></label><label class="form-field"><span>Pasu tuir mai</span><select id="emergencyNextStep">${nextStepOptions.map((option) => `<option ${option === nextStep ? 'selected' : ''}>${option}</option>`).join('')}</select></label></div>
          <button class="btn secondary" data-action="record-emergency-action" data-id="${request.key}" type="button">Rejista aksaun koordenasaun <span class="arrow">→</span></button>
        </section>

        <section class="emergency-card emergency-response-card">
          <div class="emergency-card-heading"><div><h3>Passu 3 · Fahe resposta ba komunidade</h3><span>Uza liafuan klaru kona-ba buat ne’ebé servisu konfirma.</span></div><span class="step-badge">3</span></div>
          <div class="template-row"><span class="structured-label">Kategoria resposta emerjénsia:</span><button class="response-type" data-action="fill-emergency-template" data-id="${request.key}" data-template="received" type="button">Pedidu simu</button><button class="response-type" data-action="fill-emergency-template" data-id="${request.key}" data-template="pathway" type="button">Dalan ofisiál</button><button class="response-type" data-action="fill-emergency-template" data-id="${request.key}" data-template="more-info" type="button">Presiza informasaun</button></div>
          <textarea id="emergencyResponseMessage" placeholder="Hakerek resposta ne’ebé servisu bele konfirma...">${h(request.response || '')}</textarea>
          <div class="emergency-response-footer"><span>Komunidade sei haree resposta no estadu ikus iha istória.</span><button class="btn primary" data-action="share-emergency-response" data-id="${request.key}" type="button">Fahe resposta <span class="arrow">→</span></button></div>
        </section>
      </div>

      <aside class="emergency-side-column">
        <section class="emergency-card community-preview-card"><div class="emergency-card-heading"><div><h3>Komunidade sei haree</h3><span>Haree antes fahe</span></div><span class="preview-eye">◉</span></div><div class="preview-status"><span>Estadu</span>${statusPill(request.status, request.tone)}</div><p>${request.response ? h(request.response) : 'Seidauk iha resposta. Hamutuk Saúde sei la hatudu resposta to’o servisu rejista no fahe ida.'}</p><div class="preview-note">Ita-nia resposta tenke hatete saida mak konfirma ona, pasu tuir mai, no saida mak seidauk konfirma.</div></section>
        <section class="emergency-card emergency-boundary-card"><h3>Limite seguransa</h3><ul><li>La halo diagnóstiku</li><li>La fó resepita</li><li>La haruka ambulánsia</li><li>La hili ospitál</li><li>La promete resposta bainhira seidauk konfirma</li></ul></section>
        <section class="emergency-card emergency-timeline-card"><div class="emergency-card-heading"><div><h3>Istória atividade</h3><span>${request.timeline.length} eventu</span></div></div>${timelineMarkup(request.timeline)}</section>
      </aside>
    </div>
  </div>`;
}

function renderServiceDetail(request) {
  if (request && request.lane === 'emergency') return renderEmergencyDetail(request);
  if (!request) return '<div class="empty-state">Hili pedidu ida atu haree nia detalhe.</div>';
  const meta = laneMeta[request.lane];
  const isDemoRequest = state.demoStory.active && request.key === state.demoStory.requestKey;
  const savedDraft = state.responseDraftKey === request.key ? state.responseDraft : '';
  const defaultMessage = request.response || (isDemoRequest && state.demoStory.step >= 4 ? state.demoStory.responseText : savedDraft);
  return `<div class="detail-header">
    <div class="detail-header-top">
      <div class="detail-kicker">${laneIcon(request.lane)}<div><h2>${h(request.title)}</h2><div class="request-id">${h(request.id)} · ${h(meta.label)}</div></div></div>
      ${statusPill(request.status, request.tone)}
    </div>
    <div class="location-line"><span>⌖</span>${h(request.location)}<span>·</span><span>${h(request.created)}</span></div>
    <div class="service-audit-line">Rejistu haree husi <strong>Responsavel servisu: João S. (ezemplu)</strong> · Ohin, 09:12</div>
  </div>
  <div class="detail-body">
    <div class="info-grid">
      <div class="info-block"><label>Pedidu husi</label><strong>${h(request.requester)}</strong><p>Papel rejista ba responsabilidade, la’ós ba desizaun klinika.</p></div>
      <div class="info-block"><label>Dalan</label><strong>${h(meta.label)}</strong><p>${h(meta.copy)}</p></div>
      ${request.contact ? `<div class="info-block"><label>Numeru telefone kontaktu</label><strong>${h(request.contact)}</strong><p>Uza de’it ba koordenasaun ne’ebé rejista ona.</p></div>` : ''}
      ${request.lane === 'medicine' && request.resourceStatus ? `<div class="info-block resource-status-block"><label>Estadu rekursu</label><strong>${h(request.resourceStatus)}</strong><p>Atualiza ikus: ${h(request.resourceUpdated || 'La hatene')}</p></div>` : ''}
      ${request.pregnancyInfo ? `<div class="info-block"><label>Informasaun maternidade</label><strong>${h(request.pregnancyInfo)}</strong><p>Informasaun opcional husi komunidade.</p></div>` : ''}
      ${request.preferredTime ? `<div class="info-block"><label>Tempu preferidu</label><strong>${h(request.preferredTime)}</strong><p>Preferénsia komunidade, la’ós konfirmasaun oráriu.</p></div>` : ''}
      ${request.affectedCount ? `<div class="info-block"><label>Ema afetadu</label><strong>${h(request.affectedCount)}</strong><p>Dadus husi rejistu komunidade.</p></div>` : ''}
    </div>

    <div class="detail-section">
      <div class="detail-section-heading"><h3>Pedidu simu ona</h3><span>Liafuan komunidade</span></div>
      <p class="request-quote">“${h(request.quote)}”</p>
      ${request.receivedFromOffline ? '<div class="offline-origin-note"><strong>Origem pedidu:</strong> Rai iha dispozitivu bainhira la iha koneksaun; haruka de’it bainhira koneksaun fila fali.</div>' : ''}
      ${request.communityReply && request.replyStatus !== 'Rai iha dispozitivu — seidauk haruka' ? `<div class="community-reply-service-card"><div class="detail-section-heading"><h3>Resposta husi komunidade</h3>${statusPill(request.replyStatus || 'Resposta haruka ona — hein revizaun', 'info')}</div><p class="request-quote">“${h(request.communityReply)}”</p><small>Resposta ligadu ho pedidu ida-ne’e · ${h(request.replySyncedAt || 'Seidauk sincronizadu')}</small></div>` : ''}
      <div class="safeguard-note"><strong>Limite koordenasaun:</strong> hatán kona-ba buat ne’ebé servisu bele konfirma, pasu koordenasaun tuir mai, no referénsia ne’ebé rejista. Labele uza fila pedidu ida-ne’e atu halo diagnóstiku, fó resepita, haruka ambulánsia, ka hili ospitál.</div>
      <div class="response-checklist">
        <div class="detail-section-heading"><h3>Molok fahe resposta</h3><span>3 buat klaru</span></div>
        <div class="checklist-list">
          <div class="checklist-row"><span class="checklist-number">1</span><div><strong>Saida mak servisu bele konfirma?</strong><span>Uza informasaun ne’ebé loos no atual.</span></div></div>
          <div class="checklist-row"><span class="checklist-number">2</span><div><strong>Saida mak pasu tuir mai?</strong><span>Hatete ba komunidade saida mak sei akontese depois.</span></div></div>
          <div class="checklist-row"><span class="checklist-number">3</span><div><strong>Iha referénsia ka rekursu rejistadu?</strong><span>Hatama de’it buat ne’ebé servisu konfirma ona.</span></div></div>
        </div>
      </div>
    </div>

    <div class="response-composer">
      <h3>Rejista resposta</h3>
      <div class="response-types">
        ${['Resposta servisu', 'Presiza informasaun liután', 'Referénsia rejistada', 'Atualizasaun rekursu'].map((kind) => `<button class="response-type ${state.responseKind === kind ? 'active' : ''}" data-action="set-response-kind" data-kind="${h(kind)}" type="button">${h(kind)}</button>`).join('')}
      </div>
      ${request.lane === 'maternity' ? `<div class="structured-response-row demo-response-category-row"><span>Kategoria resposta maternidade:</span><button class="response-type ${state.demoStory.responseCategory === 'Bele simu / avalia' ? 'active' : ''}" data-action="set-demo-response-category" data-category="Bele simu / avalia" type="button">Bele simu / avalia</button><button class="response-type ${state.demoStory.responseCategory === 'Presiza informasaun liután' ? 'active' : ''}" data-action="set-demo-response-category" data-category="Presiza informasaun liután" type="button">Presiza informasaun liután</button><button class="response-type ${state.demoStory.responseCategory === 'Servisu temporariamente la disponivel' ? 'active' : ''}" data-action="set-demo-response-category" data-category="Servisu temporariamente la disponivel" type="button">Servisu temporariamente la disponivel</button><button class="response-type ${state.demoStory.responseCategory === 'Presiza koordenasaun referénsia' ? 'active' : ''}" data-action="set-demo-response-category" data-category="Presiza koordenasaun referénsia" type="button">Presiza koordenasaun referénsia</button></div>` : ''}
      <textarea id="responseMessage" aria-label="Mensajen resposta" placeholder="Hakerek resposta klaru no loos ba komunidade...">${h(defaultMessage)}</textarea>
      <div class="response-actions"><span class="helper">Komunidade sei haree resposta no oras rejistu nian.</span><div style="display:flex;gap:7px;align-items:center;"><button class="btn ghost" data-action="record-referral" data-id="${request.key}" type="button">Rejista referénsia</button><button class="btn primary" data-action="send-response" data-id="${request.key}" type="button">Fahe resposta <span class="arrow">→</span></button></div></div>
    </div>

    <div class="detail-section">
      <div class="detail-section-heading"><h3>Istória atividade ne’ebé la bele muda</h3><span>${request.timeline.length} eventu</span></div>
      ${timelineMarkup(request.timeline)}
    </div>
  </div>`;
}

function renderService() {
  const list = filteredRequests();
  const metrics = serviceMetricData();
  const selected = getRequest(state.selectedRequest);
  const filters = ['Pedidu hotu', 'Simu ona — hein revizaun', 'Presiza informasaun liután', 'Resposta disponivel', 'Fila bainhira la iha koneksaun'];
  return `<div class="service-shell">
    <aside class="service-sidebar">
      <div class="eyebrow" style="margin-left:10px;">Espasu servisu saúde</div>
      <div class="facility-card" style="margin-top:12px;"><span class="facility-symbol">+</span><div><strong>Servisu saúde ezemplu</strong><span>Timor-Leste · mesa koordenasaun</span></div></div>
      <div class="sidebar-label">Fila pedidu</div>
      <nav class="side-nav">
        ${filters.map((filter, index) => `<button class="${state.activeFilter === filter ? 'active' : ''}" data-action="set-filter" data-filter="${h(filter)}" type="button"><span class="nav-left"><span class="nav-glyph">${['▣', '!', '?', '✓', '◌'][index]}</span>${h(filter)}</span><span class="side-count">${index === 0 ? state.requests.length : index === 1 ? state.requests.filter((r) => ['Simu ona — hein revizaun', 'Presiza resposta', 'Revisaun iha prosesu', 'Haruka ba servisu saúde'].includes(r.status)).length : index === 2 ? state.requests.filter((r) => r.status === 'Presiza informasaun liután').length : index === 3 ? state.requests.filter((r) => ['Resposta fahe ona', 'Resposta disponivel', 'Referénsia rejistada'].includes(r.status)).length : state.requests.filter((r) => ['Rai iha dispozitivu — seidauk haruka', 'Hein sincronizasaun'].includes(r.status)).length}</span></button>`).join('')}
      </nav>
      <div class="sidebar-label">Limites no seguransa</div>
      <nav class="side-nav">
        <button data-action="open-help" type="button"><span class="nav-left"><span class="nav-glyph">◈</span>Orientasaun ba resposta</span><span class="nav-glyph">›</span></button>
        <button data-action="open-offline-guide" type="button"><span class="nav-left"><span class="nav-glyph">⌁</span>Estadu sincronizasaun</span><span class="nav-glyph">›</span></button>
      </nav>
      <div class="sidebar-bottom"><strong>Rai rejistu ho onestidade</strong><p>Mudansa estadu sira visível iha istória. Resposta ida la’ós desizaun mediku.</p><button data-action="open-help" type="button">Haree prinsipiu sira →</button></div>
    </aside>

    <main class="service-main">
      <div class="service-header">
        <div><div class="eyebrow">Fila pedidu servisu saúde · dadus ezemplu</div><h1 class="page-title">Haree pedidu no fahe resposta.</h1><p class="page-subtitle">Reviza pedidu sira, rejista buat ne’ebé servisu bele konfirma, no fahe pasu klaru fila ba komunidade.</p></div>
        <div class="service-header-actions"><span class="pill ${state.online ? 'success' : 'warning'}"><span class="connection-dot"></span>${state.online ? 'Iha koneksaun' : 'La iha koneksaun'}</span><button class="btn secondary" data-action="demo-story" type="button">Haree istória kompletu (Demo)</button><button class="btn secondary" data-action="open-community" type="button">Haree aplikasaun komunidade</button></div>
      </div>

      <div class="demo-entry-card service-demo-entry">
        <div><span class="demo-entry-kicker">Istória interativu · Maria iha Remexio</span><strong>Haree istória kompletu (Demo)</strong><p>La iha koneksaun → Haruka → Resposta iha minutu balu</p></div>
        <button class="btn primary" data-action="demo-story" type="button">Hahú demo <span class="arrow">→</span></button>
      </div>

      <div class="service-explainer">
        <div class="service-explainer-copy"><strong>Oinsá atu uza fila pedidu</strong><span>Haree informasaun, konfirma buat ne’ebé servisu bele halo, no fahe resposta.</span><small class="pilot-inline">Sistema ida-ne’e desenyu atu servisu iha suku ho koneksaun satélite partilhada no eletrisidade la stabile.</small></div>
        <div class="explainer-steps"><div class="explainer-step"><b>1</b>Haree pedidu</div><span class="explainer-arrow">→</span><div class="explainer-step"><b>2</b>Konfirma</div><span class="explainer-arrow">→</span><div class="explainer-step"><b>3</b>Fahe resposta</div></div>
      </div>

      <div class="metric-grid">${metrics.map((metric) => `<div class="metric-card"><div class="metric-top"><span class="metric-label">${h(metric.label)}</span><span class="metric-icon ${metric.tone}">${metric.icon}</span></div><strong class="metric-value">${metric.value}</strong><span class="metric-foot ${metric.tone === 'teal' ? 'good' : ''}">${h(metric.foot)}</span></div>`).join('')}</div>

      <div class="service-workspace">
        <section class="inbox-panel">
          <div class="panel-head"><div class="panel-head-row"><div><h2>Fila pedidu</h2><p>${list.length} pedidu iha haree ida-ne’e</p></div><span class="pill neutral">Dadus ezemplu</span></div><label class="search-box"><span>⌕</span><input id="inboxSearch" value="${h(state.search)}" placeholder="Buka liuhusi referénsia, fatin, ka dalan" aria-label="Buka iha fila pedidu" /></label><div class="filter-row">${filters.map((filter) => `<button class="filter-button ${state.activeFilter === filter ? 'active' : ''}" data-action="set-filter" data-filter="${h(filter)}" type="button">${h(filter)}</button>`).join('')}</div></div>
          <div class="inbox-list">${list.length ? list.map(renderInboxItem).join('') : '<div class="empty-state">La iha pedidu ne’ebé tuir haree ida-ne’e.</div>'}</div>
        </section>
        <section class="detail-panel" aria-label="Detalhe pedidu hili ona">${renderServiceDetail(selected)}</section>
      </div>
    </main>
  </div>`;
}

function updateNetworkChrome() {
  document.body.classList.toggle('is-online', state.online);
  const label = document.querySelector('[data-network-label]');
  if (label) label.textContent = state.online ? 'Iha koneksaun' : 'La iha koneksaun';
  document.querySelectorAll('.mode-button').forEach((button) => button.classList.toggle('active', button.dataset.mode === state.mode));
}

function renderApp() {
  app.innerHTML = `${state.mode === 'community' ? renderCommunity() : renderService()}${renderDemoStoryGuide()}`;
  updateNetworkChrome();
}

function showToast(title, detail = '', tone = '') {
  const toast = document.createElement('div');
  toast.className = `toast ${tone}`;
  toast.innerHTML = `<strong>${h(title)}</strong>${detail ? `<span>${h(detail)}</span>` : ''}`;
  toastRoot.appendChild(toast);
  window.setTimeout(() => toast.remove(), 4200);
}

function closeModal() {
  modalRoot.innerHTML = '';
}

function modalShell(title, subtitle, body, footer, options = {}) {
  const widthClass = options.wide ? 'wide' : '';
  return `<div class="modal-backdrop" role="presentation"><div class="modal-card ${widthClass}" role="dialog" aria-modal="true" aria-label="${h(title)}"><div class="modal-head"><div><h2>${h(title)}</h2>${subtitle ? `<p>${h(subtitle)}</p>` : ''}</div><button class="modal-close" data-action="close-modal" type="button" aria-label="Taka janela">×</button></div>${body}${footer ? `<div class="modal-footer">${footer}</div>` : ''}</div></div>`;
}

function requesterFormBlock(options = {}) {
  const helper = options.authorityHelper || 'Asiste ema seluk';
  const id = options.prefix || 'request';
  return `<div class="form-field full"><label>Se mak halo pedidu? <em>*</em></label><div class="radio-grid"><label class="radio-card"><input type="radio" name="requesterType" value="Membru komunidade" checked required /><span><strong>Membru komunidade</strong><span>Halo pedidu ba an rasik.</span></span></label><label class="radio-card"><input type="radio" name="requesterType" value="Autoridade Komunidade" /><span><strong>Autoridade Komunidade</strong><span>${h(helper)}</span></span></label></div></div><div class="form-field full authority-name-field" data-authority-name hidden><label for="${id}AssistedName">Naran ema ne’ebé ita asiste <em>*</em></label><input id="${id}AssistedName" name="assistedName" placeholder="Ezemplu: Maria" /><small class="field-help">Naran ida-ne’e sei mosu iha rejistu hanesan “Halo husi Autoridade Komunidade ba [naran]”.</small></div>`;
}

function emergencyRequestGuidance() {
  return `<div class="modal-callout urgent"><strong>Hamutuk Saúde de’it rejista no haruka pedidu.</strong>Nia la haruka ambulánsia, la halo desizaun mediku, no la hili ospitál. Bainhira la iha koneksaun, uza kontaktu emerjénsia ofisiál.</div>${!state.online ? `<div class="emergency-connection-warning"><strong>KOMUNIKASAUN LA DISPONIVEL. Pedidu sei rai iha dispozitivu. Uza dalan emerjénsia ofisiál agora.</strong><span>Pedidu ida-ne’e seidauk to’o servisu saúde.</span><p>Kontaktu/prosedimentu lokal verifikadu: seidauk hatama. Servisu responsavel tenke konfirma dadus ofisiál antes pilotu; la iha numeru inventadu.</p></div>` : ''}<div class="emergency-offline-card"><h3>Bainhira koneksaun la stabile, komunidade sei simu saida?</h3><p>Hamutuk Saúde sei hatudu klaru saida mak akontese ona no saida mak seidauk akontese.</p><ul class="emergency-offline-list"><li><div><strong>Estadu loos:</strong> “Rai iha dispozitivu — seidauk haruka” to’o sincronizasaun konfirma.</div></li><li><div><strong>Rejistu pedidu:</strong> Detalhe pedidu no referénsia sei rai iha dispozitivu ida-ne’e.</div></li><li><div><strong>Guia alternativa:</strong> Instrusaun lokal verifikadu no kontaktu ofisiál ne’ebé servisu saúde aprova.</div></li><li><div><strong>Notifikasaun:</strong> Bainhira koneksaun fila fali, ita bele hatene se pedidu haruka ho susesu ka seidauk.</div></li></ul><div class="emergency-note">Ita sei la simu resposta servisu to’o pedidu haruka ho susesu. Estadu “seidauk haruka” la’ós resposta no la’ós garantia katak servisu simu ona.</div></div>`;
}

function offlineFormNotice() {
  return state.online ? '' : `<div class="offline-form-notice"><strong>La iha koneksaun.</strong>Pedidu sei rai iha dispozitivu no sei la hatudu hanesan haruka ona to’o sincronizasaun konfirma.</div>`;
}

function openNewRequestTypeModal() {
  const options = [
    { lane: 'emergency', title: 'Emerjénsia', copy: 'Koordenasaun urjente tuir dalan ofisiál.', icon: '!', tone: 'emergency' },
    { lane: 'maternity', title: 'Planeamentu maternidade', copy: 'Kontaktu ka avaliasaun planeadu.', icon: '♡', tone: 'maternity' },
    { lane: 'medicine', title: 'Aimoruk', copy: 'Haree rekursu ka husu koordinasaun.', icon: '+', tone: 'medicine' },
    { lane: 'routine', title: 'Kuidadu rutina', copy: 'Vizita ka akompañamentu la urjente.', icon: '↗', tone: 'routine' }
  ];
  const body = `<div class="modal-body"><div class="modal-callout"><strong>Hili tipu pedidu</strong>Hamutuk Saúde sei de’it rejista no koordena pedidu. Hili opsaun ida atu komesa.</div><div class="request-type-selector">${options.map((option) => `<button class="request-type-option ${option.tone}" data-action="begin-request" data-lane="${option.lane}" type="button"><span class="request-type-option-icon">${option.icon}</span><span><strong>${h(option.title)}</strong><small>${h(option.copy)}</small></span><span class="arrow">→</span></button>`).join('')}</div></div>`;
  modalRoot.innerHTML = modalShell('Pedidu foun', 'Hili dalan ne’ebé ita presiza', body, '<button class="btn ghost" data-action="close-modal" type="button">Kansela</button>', { wide: true });
}

function openRequestModal(lane) {
  if (lane === 'medicine') return openMedicineResourceModal();
  const meta = laneMeta[lane];
  const isEmergency = lane === 'emergency';
  const isMaternity = lane === 'maternity';
  const title = isEmergency ? 'Halo pedidu koordenasaun urjente' : isMaternity ? 'Halo pedidu planeamentu maternidade' : 'Halo pedidu kuidadu rutina';
  const helper = isEmergency
    ? emergencyRequestGuidance()
    : isMaternity
      ? `${offlineFormNotice()}<div class="modal-callout"><strong>Pedidu ida-ne’e ba kontaktu ka avalia saun maternidade planeadu.</strong>Servisu saúde mak deside saida mak bele halo.</div>`
      : `${offlineFormNotice()}<div class="modal-callout"><strong>Pedidu ba vizita, akompañamentu, ka servisu ne’ebé la urjente.</strong>Servisu saúde mak fó orientasaun.</div>`;
  const fields = isEmergency ? `
      ${requesterFormBlock({ authorityHelper: 'Asiste ema seluk' })}
      <div class="form-field full"><label for="requestFullName">Naran kompletu <em>*</em></label><input id="requestFullName" name="fullName" required placeholder="Ezemplu: Maria S." /></div>
      <div class="form-field"><label for="requestLocation">Fatin atual (vila/suku) <em>*</em></label><input id="requestLocation" name="location" required placeholder="Ezemplu: Remexio, Aileu" /></div>
      <div class="form-field"><label for="requestContact">Numeru telefone kontaktu <em>*</em></label><input id="requestContact" name="contact" type="tel" inputmode="tel" required placeholder="Ezemplu: 7xx xxx xxx" /></div>
      <div class="form-field full"><label for="requestNote">Deskrisaun badak kona-ba situasaun urjente <em>*</em></label><textarea id="requestNote" name="note" required placeholder="Uza liafuan badak kona-ba situasaun. Labele hatama diagnóstiku ka pedidu resepita."></textarea></div>
      <div class="form-field"><label for="requestAffected">Ema nain hira mak afetadu?</label><input id="requestAffected" name="affectedCount" type="number" min="1" inputmode="numeric" placeholder="Opsionál" /></div>` : isMaternity ? `
      ${requesterFormBlock()}
      <div class="form-field full"><label for="requestFullName">Naran kompletu <em>*</em></label><input id="requestFullName" name="fullName" required placeholder="Ezemplu: Maria S." /></div>
      <div class="form-field"><label for="requestPregnancyInfo">Semana isin-rua (aproksimadu) ka data esperadu</label><input id="requestPregnancyInfo" name="pregnancyInfo" placeholder="Opsionál — ezemplu: semana 28 ka 12 fulan Setembru" /></div>
      <div class="form-field"><label for="requestLocation">Fatin (vila/suku) <em>*</em></label><input id="requestLocation" name="location" required placeholder="Ezemplu: Remexio, Aileu" /></div>
      <div class="form-field"><label for="requestContact">Numeru telefone kontaktu <em>*</em></label><input id="requestContact" name="contact" type="tel" inputmode="tel" required placeholder="Ezemplu: 7xx xxx xxx" /></div>
      <div class="form-field full"><label for="requestNote">Nota adisionál</label><textarea id="requestNote" name="note" placeholder="Informasaun ne’ebé servisu saúde husu ona, se iha."></textarea></div>` : `
      ${requesterFormBlock()}
      <div class="form-field full"><label for="requestFullName">Naran kompletu <em>*</em></label><input id="requestFullName" name="fullName" required placeholder="Ezemplu: Ana S." /></div>
      <div class="form-field full"><label for="requestNote">Razãun badak ba vizita <em>*</em></label><textarea id="requestNote" name="note" required placeholder="Hatete badak tanba sá ita presiza vizita ka akompañamentu."></textarea></div>
      <div class="form-field"><label for="requestPreferredTime">Tempu preferidu</label><input id="requestPreferredTime" name="preferredTime" placeholder="Ex: dader, semana ne’e" /></div>
      <div class="form-field"><label for="requestLocation">Fatin (vila/suku) <em>*</em></label><input id="requestLocation" name="location" required placeholder="Ezemplu: Remexio, Aileu" /></div>
      <div class="form-field"><label for="requestContact">Numeru telefone kontaktu <em>*</em></label><input id="requestContact" name="contact" type="tel" inputmode="tel" required placeholder="Ezemplu: 7xx xxx xxx" /></div>`;
  const submitLabel = isEmergency ? 'Haruka pedidu emerjénsia' : isMaternity ? 'Haruka pedidu maternidade' : 'Haruka pedidu rutina';
  const body = `<form id="newRequestForm" data-request-lane="${h(lane)}"><div class="modal-body">${helper}<input type="hidden" name="lane" value="${h(lane)}" /><div class="form-grid">${fields}</div><label class="check-row"><input type="checkbox" name="boundary" required /> <span>Hau komprende katak Hamutuk Saúde sei de’it simu no koordena pedidu ida-ne’e. Nia sei la halo desizaun mediku, la fó resepita, no la garante resposta servisu.</span></label></div><div class="modal-footer"><button class="btn ghost" data-action="close-modal" type="button">Kansela</button><button class="btn ${isEmergency ? 'danger' : 'primary'}" type="submit">${submitLabel} <span class="arrow">→</span></button></div></form>`;
  modalRoot.innerHTML = modalShell(title, `${meta.label} · ${state.online ? 'koneksaun disponivel' : 'rejistu seguru bainhira la iha koneksaun'}`, body, null, { wide: true });
}

function medicineResourceItems() {
  return [
    { name: 'Aimoruk ezemplu', status: 'La hatene', updated: '18 Set', tone: 'warning', action: true },
    { name: 'Aimoruk ezemplu B', status: 'Limitadu', updated: '16 Set', tone: 'amber', action: true },
    { name: 'Aimoruk ezemplu C', status: 'La iha', updated: '14 Set', tone: 'danger', action: true },
    { name: 'Aimoruk ezemplu D', status: 'Disponivel', updated: '20 Set', tone: 'success', action: false }
  ];
}

function openMedicineResourceModal() {
  const items = medicineResourceItems();
  const body = `<div class="modal-body">${offlineFormNotice()}<div class="modal-callout"><strong>Visibilidade rekursu de’it.</strong>Estadu aimoruk bele muda. Hamutuk Saúde la’ós farmásia iha liña, la fó resepita, no la garante katak aimoruk sei disponivel.</div><div class="medicine-resource-list">${items.map((item) => `<div class="medicine-resource-item"><div class="medicine-resource-top"><div><strong>${h(item.name)}</strong><span>Atualiza ikus: ${h(item.updated)}</span></div><span class="resource-status ${h(item.tone)}">Estadu aktual: ${h(item.status)}</span></div>${item.action ? `<button class="btn secondary" data-action="open-medicine-coordination" data-medicine="${h(item.name)}" type="button">Husu koordinasaun <span class="arrow">→</span></button>` : '<small class="resource-no-action">Estadu ne’ebé hatudu de’it; bele husu fali se informasaun muda.</small>'}</div>`).join('')}</div></div>`;
  modalRoot.innerHTML = modalShell('Haree disponibilidade aimoruk', 'Estadu rekursu · la’ós desizaun mediku', body, '<button class="btn primary" data-action="close-modal" type="button">Hotu</button>', { wide: true });
}

function openMedicineCoordinationModal(medicineName = '') {
  const body = `<form id="medicineCoordinationForm"><div class="modal-body"><div class="modal-callout"><strong>Koordenasaun de’it.</strong>Uza formuláriu ida-ne’e bainhira estadu aimoruk la klaru ka ita presiza orientasaun husi servisu saúde. Hamutuk Saúde la fó aimoruk.</div><div class="form-grid"><div class="form-field full"><label for="medicineName">Naran aimoruk <em>*</em></label><input id="medicineName" name="medicineName" value="${h(medicineName)}" required placeholder="Ezemplu: Aimoruk ezemplu" /></div><div class="form-field full"><label for="medicineNeed">Saida mak ita presiza? <em>*</em></label><textarea id="medicineNeed" name="note" required placeholder="Hatete pergunta kona-ba estadu aimoruk, la’ós pedidu resepita."></textarea></div><div class="form-field"><label for="medicineLocation">Fatin <em>*</em></label><input id="medicineLocation" name="location" required placeholder="Ezemplu: Remexio, Aileu" /></div><div class="form-field"><label for="medicineContact">Numeru telefone kontaktu <em>*</em></label><input id="medicineContact" name="contact" type="tel" inputmode="tel" required placeholder="Ezemplu: 7xx xxx xxx" /></div>${requesterFormBlock({ prefix: 'medicine', authorityHelper: 'Asiste ema seluk' })}</div><label class="check-row"><input type="checkbox" name="boundary" required /> <span>Hau komprende katak Hamutuk Saúde sei de’it haruka pergunta no koordena resposta. Nia la fó aimoruk no la fó resepita.</span></label></div><div class="modal-footer"><button class="btn ghost" data-action="close-modal" type="button">Kansela</button><button class="btn primary" type="submit">Haruka pergunta <span class="arrow">→</span></button></div></form>`;
  modalRoot.innerHTML = modalShell('Husu koordinasaun aimoruk', `${state.online ? 'Koneksaun disponivel' : 'Pedidu bele rai bainhira la iha koneksaun'}`, body, null, { wide: true });
}

function openSubmissionStatusModal(request) {
  const isLocal = request.status === 'Rai iha dispozitivu — seidauk haruka' || request.status === 'Hein sincronizasaun';
  const warning = request.lane === 'emergency' && isLocal ? `<div class="emergency-connection-warning"><strong>KOMUNIKASAUN LA DISPONIVEL. Pedidu sei rai iha dispozitivu. Uza dalan emerjénsia ofisiál agora.</strong><span>Pedidu seidauk to’o servisu saúde.</span></div>` : '';
  const message = isLocal ? 'Pedidu rai seguru. Nia sei la hatudu hanesan haruka ona to’o iha koneksaun.' : 'Pedidu haruka ba servisu saúde no agora iha fila atu reviza.';
  const body = `<div class="modal-body submission-status-modal">${warning}<div class="submission-status-icon ${isLocal ? 'local' : 'sent'}">${isLocal ? '◌' : '✓'}</div><div class="submission-status-copy"><span class="eyebrow">Pedidu rejistadu</span><h3>${h(request.title)}</h3><div class="submission-status-pill">${statusPill(request.status, request.tone)}</div><p>${h(message)}</p><small>${h(request.id)} · ${h(request.location)}</small></div><div class="submission-next-note"><strong>Saida mak ita bele halo agora?</strong><span>Haree pedidu no istória. Bainhira koneksaun fila fali, sincronizasaun sei hatudu estadu foun de’it bainhira konfirma.</span></div></div><div class="modal-footer"><button class="btn ghost" data-action="close-modal" type="button">Hotu</button><button class="btn primary" data-action="view-request" data-id="${h(request.key)}" type="button">Haree pedidu <span class="arrow">→</span></button></div>`;
  modalRoot.innerHTML = modalShell(isLocal ? 'Pedidu rai ona' : 'Pedidu haruka ona', 'Konfirmasaun no estadu loos', body, null, { wide: true });
}

function openOfflineGuideModal() {
  const body = `<div class="modal-body"><div class="modal-callout"><strong>Prosedimentu alternativa verifikadu.</strong>Protótipu ida-ne’e hatudu fatin ne’ebé instrusaun lokal aprovadu husi servisu sei rai. Nia la’ós protokolu mediku foun.</div><div class="verified-local-guidance"><strong>Kontaktu/prosedimentu lokal verifikadu</strong><span>Seidauk hatama iha protótipu</span><p>Numeru no pasu ofisiál sei konfirma husi servisu responsavel antes pilotu.</p></div><div class="guide-list"><div class="guide-step"><span class="guide-number">1</span><div><strong>Uza dalan kontaktu lokal ofisiál bainhira sinal disponivel.</strong><p>Hamutuk Saúde la troka dalan emerjénsia ka servisu saúde ne’ebé eziste ona.</p></div></div><div class="guide-step"><span class="guide-number">2</span><div><strong>Se seguru, kontaktu Autoridade Komunidade ne’ebé ita fiar ka fasilidade saúde ne’ebé ita hatene.</strong><p>Uza instrusaun lokal verifikadu ne’ebé kombina ona ho servisu responsavel.</p></div></div><div class="guide-step"><span class="guide-number">3</span><div><strong>Rejista pedidu de’it bainhira halo ida-ne’e seguru.</strong><p>Aplikasaun sei hatudu “Rai iha dispozitivu — seidauk haruka” to’o konfirma sincronizasaun susesu.</p></div></div></div><div class="modal-callout urgent" style="margin-top:15px;"><strong>Ba pedidu emerjénsia.</strong>Se perigu imediatu no sinal disponivel, uza dalan emerjénsia ofisiál. Labele hein Hamutuk Saúde atu haruka pedidu bainhira koneksaun la iha ka la stabile.</div></div>`;
  modalRoot.innerHTML = modalShell('Guia bainhira la iha koneksaun', 'Estadu loos no prosedimentu lokal verifikadu', body, '<button class="btn primary" data-action="close-modal" type="button">Hotu</button>');
}

function openAuthorityModal() {
  const body = `<form id="assistForm"><div class="modal-body"><div class="modal-callout"><strong>Ajuda Autoridade rai kontrolu iha liman residente nian.</strong>Uza modu ida-ne’e atu ajuda rejista pedidu. Autoridade Komunidade la halo diagnóstiku, la fó resepita, la hili ospitál, no la deside urjénsia ba residente.</div><div class="form-grid"><div class="form-field"><label for="assistVillage">Komunidade ka suku <em>*</em></label><input id="assistVillage" name="village" required placeholder="ezemplu: Remexio" /></div><div class="form-field"><label for="assistRole">Ita-nia papel <em>*</em></label><select id="assistRole" name="role" required><option value="Autoridade Komunidade">Autoridade Komunidade</option><option value="Ema ajuda ne’ebé fiar">Ema ajuda ne’ebé fiar</option></select></div><div class="form-field full"><label for="assistNote">Ajuda saida mak presiza? <em>*</em></label><textarea id="assistNote" name="note" required placeholder="Deskreve presiza koordenasaun ho liafuan rasik residente nian."></textarea></div></div><label class="check-row"><input type="checkbox" name="consent" required /> <span>Residente konkorda katak hau bele ajuda rejista pedidu ida-ne’e. Se regra la permite rai naran, uza kódigu residente ka uma kain.</span></label></div><div class="modal-footer"><button class="btn ghost" data-action="close-modal" type="button">Kansela</button><button class="btn primary" type="submit">Hahú modu ajuda <span class="arrow">→</span></button></div></form>`;
  modalRoot.innerHTML = modalShell('Modu ajuda Autoridade', 'Ba residente sira ne’ebé la bele uza sistema rasik', body, null);
}

function originalRequestMarkup(request) {
  const details = [
    ['Tipu pedidu', laneMeta[request.lane]?.label || 'Pedidu'],
    ['Rejistu orijinal', request.created || request.time || 'Agora daudaun'],
    ['Husi', request.requester || 'Membru komunidade'],
    request.fullName ? ['Naran kompletu', request.fullName] : null,
    request.assistedName ? ['Ema ne’ebé Autoridade asiste', request.assistedName] : null,
    request.contact ? ['Numeru telefone kontaktu', request.contact] : null,
    request.location ? ['Fatin', request.location] : null,
    request.pregnancyInfo ? ['Semana isin-rua/data esperadu', request.pregnancyInfo] : null,
    request.preferredTime ? ['Tempu preferidu', request.preferredTime] : null,
    request.affectedCount ? ['Ema afetadu', request.affectedCount] : null,
    request.resourceName ? ['Naran aimoruk', request.resourceName] : null
  ].filter(Boolean);
  return `<section class="original-request-card"><div class="detail-section-heading"><div><h3>Pedidu orijinal</h3><span>Informasaun ne’ebé komunidade haruka · la bele muda</span></div><span class="original-lock">▣</span></div><label class="original-quote-label">Liafuan orijinal</label><p class="request-quote">“${h(request.quote || request.summary || 'Pedidu rejistadu.') }”</p>${details.length ? `<div class="original-request-fields">${details.map(([label, value]) => `<div><label>${h(label)}</label><strong>${h(value)}</strong></div>`).join('')}</div>` : ''}</section>`;
}

function detailWaitingMarkup(request) {
  if (request.response || request.moreInfoQuestion) return '';
  const messages = {
    'Rai iha dispozitivu — seidauk haruka': 'Pedidu rai iha dispozitivu ida-ne’e. Nia seidauk to’o servisu saúde.',
    'Hein sincronizasaun': 'Pedidu hein koneksaun atu bele haruka. Status sei muda de’it bainhira sincronizasaun konfirma.',
    'Haruka ba servisu saúde': 'Pedidu haruka ona ba servisu saúde. Agora hein konfirmasaun no revizaun husi servisu.',
    'Simu ona — hein revizaun': 'Servisu saúde simu pedidu. Revizaun no koordenasaun sei kontinua.',
    'Resposta haruka ona — hein revizaun': 'Resposta haruka ona no hein revizaun husi servisu saúde.',
    'Revisaun iha prosesu': 'Pedidu iha revizaun husi servisu saúde. Sei iha atualizasaun bainhira pasu foun konfirma.',
    'Presiza resposta': 'Servisu saúde presiza hatán ka rejista informasaun ida atu pedidu bele kontinua.',
    'Resposta fahe ona': 'Resposta fahe ona no rai iha istória pedidu ida-ne’e.',
    'Referénsia rejistada': 'Referénsia servisu rejista ona iha istória pedidu.'
  };
  const message = messages[request.status] || 'Status ikus hatudu iha leten. Haree istória atu hatene pasu sira ne’ebé akontese ona.';
  return `<div class="detail-state-card"><strong>${h(request.status)}</strong><p>${h(message)}</p></div>`;
}

function communityMoreInfoMarkup(request) {
  if (!request.moreInfoQuestion) return '';
  const replyPending = request.replyStatus === 'Rai iha dispozitivu — seidauk haruka';
  const replySent = Boolean(request.communityReply) && !replyPending;
  const replyStatus = request.replyStatus ? statusPill(request.replyStatus, replyPending ? 'warning' : 'info') : '';
  const questionStatus = request.replyStatus || 'Presiza informasaun liután';
  const questionTone = request.replyStatus ? (replyPending ? 'warning' : 'info') : 'warning';
  const replyBlock = replySent
    ? `<div class="community-reply-history"><div class="more-info-subhead"><strong>Ita-nia resposta</strong>${replyStatus}</div><p>“${h(request.communityReply)}”</p><small>Haruka husi komunidade · ${h(request.replySyncedAt || 'Agora daudaun')}</small></div>`
    : `<div class="more-info-authority-note">Se Autoridade Komunidade mak halo pedidu, nia bele hatán pergunta ida-ne’e iha naran residente.</div><form id="communityReplyForm"><input type="hidden" name="requestKey" value="${h(request.key)}" /><label class="reply-label" for="communityReply">Ita-nia resposta <em>*</em></label><textarea id="communityReply" name="reply" required placeholder="Hakerek resposta ba pergunta servisu saúde...">${h(request.communityReply || '')}</textarea>${replyStatus ? `<div class="reply-local-status">${replyStatus}<span>Resposta sei nafatin iha dispozitivu to’o sincronizasaun konfirma.</span></div>` : ''}<div class="reply-form-actions"><span class="helper">Labele muda pedidu orijinal; hatán de’it pergunta ida-ne’e.</span><button class="btn primary" type="submit">Haruka resposta <span class="arrow">→</span></button></div></form>`;
  return `<section class="more-info-request-card"><div class="more-info-heading"><span class="more-info-icon">?</span><div><h3>Servisu saúde husu informasaun liután</h3><span>Hatán pergunta ida-ne’e atu pedidu bele kontinua.</span></div>${statusPill(questionStatus, questionTone)}</div><div class="more-info-question"><label>Pregunta servisu saúde</label><p>“${h(request.moreInfoQuestion)}”</p><small>Husu husi ${h(request.moreInfoAskedBy || 'Responsavel servisu saúde')} · ${h(request.moreInfoAskedAt || 'Agora daudaun')}</small></div>${replyBlock}</section>`;
}

function openRequestDetailModal(key) {
  const request = getRequest(key);
  const meta = laneMeta[request.lane];
  const originalBlock = originalRequestMarkup(request);
  const moreInfoBlock = communityMoreInfoMarkup(request);
  const responseBlock = request.response ? `<div class="detail-section response-highlight-section"><div class="detail-section-heading"><h3>Resposta servisu saúde</h3>${statusPill('Resposta disponivel', 'success')}</div><p class="request-quote">${h(request.response)}</p>${request.responseBy ? `<div class="response-attribution">Fahe husi <strong>${h(request.responseBy)}</strong> · ${h(request.responseAt || 'Agora daudaun')}</div>` : ''}${request.nextAction ? `<div class="next-action-note"><strong>Pasu tuir mai:</strong> ${h(request.nextAction)}</div>` : ''}</div>` : request.moreInfoQuestion ? '' : '';
  const waitingBlock = detailWaitingMarkup(request);
  const offlineFallback = request.status === 'Rai iha dispozitivu — seidauk haruka' ? `<div class="modal-callout urgent"><strong>Prosedimentu alternativa.</strong>Se presiza resposta urjente no sinal disponivel, uza dalan emerjénsia ofisiál ka instrusaun lokal verifikadu. Pedidu ida-ne’e seidauk to’o servisu saúde; sincroniza bainhira koneksaun fila fali.</div>` : '';
  const contextAction = request.moreInfoQuestion && (!request.communityReply || request.replyStatus === 'Rai iha dispozitivu — seidauk haruka')
    ? `<button class="btn primary" data-action="focus-community-reply" type="button">Haruka resposta <span class="arrow">→</span></button>`
    : request.response
      ? `<button class="btn secondary" data-action="close-modal" type="button">Haree resposta iha leten</button>`
      : request.status === 'Rai iha dispozitivu — seidauk haruka' && !state.online
        ? `<button class="btn secondary" data-action="open-offline-guide" type="button">Haree guia offline</button>`
        : ['Rai iha dispozitivu — seidauk haruka', 'Hein sincronizasaun'].includes(request.status) && state.online
          ? `<button class="btn primary" data-action="sync-now" type="button">Sincroniza agora <span class="arrow">→</span></button>`
          : '';
  const body = `<div class="modal-body request-detail-modal-body"><div class="detail-kicker" style="margin-bottom:16px;">${laneIcon(request.lane)}<div><h2 style="margin:0;font-size:15px;">${h(request.title)}</h2><div class="request-id" style="margin-top:4px;color:var(--muted);font-size:9px;">${h(request.id)} · ${h(meta.label)} · ${h(request.location)}</div><div class="request-origin-modal">${h(request.requester)}</div></div>${statusPill(request.status, request.tone)}</div>${originalBlock}${offlineFallback}${moreInfoBlock}${responseBlock}${waitingBlock}<div class="detail-section"><div class="detail-section-heading"><h3>Istória atividade</h3><span>${request.timeline.length} eventu</span></div>${timelineMarkup(request.timeline, true)}</div><div class="detail-bottom-actions">${contextAction}<button class="btn ghost" data-action="close-modal" type="button">Fila ba inisiu</button></div></div>`;
  modalRoot.innerHTML = modalShell('Detalhe pedidu', 'Status, informasaun orijinal no istória kompleta', body, null, { wide: true });
}

function openWhyModal() {
  const body = `<div class="modal-body"><div class="modal-callout"><strong>Hamutuk Saúde la troka telefone ka dalan emerjénsia.</strong>Telefone diretamente nafatin bele importante bainhira ita iha sinal no hatene kontaktu ofisiál. Hamutuk Saúde ajuda bainhira pedidu presiza rejistu, koordenasaun, akompañamentu, ka resposta ne’ebé komunidade hotu bele haree.</div><div class="comparison-list"><div class="comparison-row"><span class="comparison-number">1</span><div><strong>Pedidu ida iha rejistu klaru</strong><p>Informasaun prinsipál rai hamutuk, ho oras no fatin, atu servisu responsavel bele komprende pedidu.</p></div></div><div class="comparison-row"><span class="comparison-number">2</span><div><strong>Estadu loos iha kada momentu</strong><p>Ita bele hatene se pedidu rai de’it, haruka ona, ka resposta disponivel. Hamutuk Saúde la dehan pedidu haruka ona bainhira seidauk konfirma.</p></div></div><div class="comparison-row"><span class="comparison-number">3</span><div><strong>Resposta fila ba komunidade</strong><p>Servisu saúde bele rejista resposta, referénsia, ka informasaun rekursu iha forma ne’ebé komunidade bele haree.</p></div></div><div class="comparison-row"><span class="comparison-number">4</span><div><strong>Ajuda bainhira ema ida la bele uza sistema</strong><p>Autoridade Komunidade bele ajuda rejista pedidu ho konkordánsia residente, la halo desizaun mediku.</p></div></div></div><div class="modal-callout urgent" style="margin-top:15px;"><strong>Ba emerjénsia, la hein aplikasaun.</strong>Se iha perigu imediatu no sinal disponivel, uza dalan emerjénsia ofisiál. Hamutuk Saúde mak ajuda komunikasaun no koordenasaun; nia la haruka ambulánsia no la hili ospitál.</div></div>`;
  modalRoot.innerHTML = modalShell('Tanba sá uza Hamutuk Saúde?', 'Hamutuk Saúde no telefone diretamente iha papel diferente', body, '<button class="btn primary" data-action="close-modal" type="button">Komprende ona</button>');
}

function openHelpModal() {
  const body = `<div class="modal-body"><div class="modal-callout"><strong>Hamutuk Saúde mak sistema ligasaun komunikasaun.</strong>Nia hametin sistema saúde públika ezistente no nunka halo desizaun mediku.</div><div class="guide-list"><div class="guide-step"><span class="guide-number">↔</span><div><strong>Dalan haat ne’ebé klaru</strong><p>Membru komunidade, Autoridade Komunidade, sistema Hamutuk Saúde no servisu saúde ida-idak iha papel ketak.</p></div></div><div class="guide-step"><span class="guide-number">◌</span><div><strong>Estadu loos</strong><p>Rejistu bainhira la iha koneksaun nunka hatudu hanesan haruka ona. Sincronizasaun, resposta, no referénsia hotu-hotu visível iha istória.</p></div></div><div class="guide-step"><span class="guide-number">+</span><div><strong>Aimoruk mak visibilidade rekursu</strong><p>Dalan aimoruk de’it koordena informasaun kona-ba disponibilidade. Nia la’ós farmásia iha liña no la fó resepita.</p></div></div><div class="guide-step"><span class="guide-number">!</span><div><strong>Emerjénsia sei tuir dalan ofisiál</strong><p>Dalan emerjénsia haruka pedidu ba dalan ofisiál no fó fatin ba prosedimentu alternativa verifikadu bainhira la iha koneksaun.</p></div></div><div class="guide-step"><span class="guide-number">⌁</span><div><strong>Ba Android simples no bateria limitada</strong><p>Hamutuk Saúde uza textu no dadus ki’ik, ho sincronizasaun efisiente atu servisu iha telemovel ho kapasidade limitadu.</p></div></div><div class="guide-step"><span class="guide-number">≈</span><div><strong>Koneksaun partilhada no banda-larga limitadu</strong><p>Sistema ida-ne’e desenyu atu servisu iha suku ho koneksaun satélite partilhada no eletrisidade la stabile. Nia evita média todan no sincroniza dadus ki’ik.</p></div></div><div class="guide-step"><span class="guide-number">⌘</span><div><strong>Privasidade no kódigu</strong><p>Se regra nasional la permite rai naran, uza kódigu residente ka uma kain. Sistema presiza rai de’it informasaun ne’ebé presiza ba koordenasaun.</p></div></div></div></div>`;
  modalRoot.innerHTML = modalShell('Prinsípiu Hamutuk Saúde', 'Saida mak protótipu ida-ne’e hakarak proteje', body, '<button class="btn primary" data-action="close-modal" type="button">Komprende ona</button>');
}

function openReferralModal(key) {
  const request = getRequest(key);
  const body = `<form id="referralForm"><div class="modal-body"><div class="modal-callout"><strong>Rejista, la’ós deside.</strong>Uza formuláriu ida-ne’e atu rejista referénsia ne’ebé servisu ita nian halo. Nia la hili ospitál ka kria despaxu.</div><input type="hidden" name="requestKey" value="${h(request.key)}" /><div class="form-grid"><div class="form-field"><label for="referralDestination">Destinu referénsia <em>*</em></label><input id="referralDestination" name="destination" required placeholder="Naran servisu ka fasilidade" /></div><div class="form-field"><label for="referralStatus">Estadu referénsia <em>*</em></label><select id="referralStatus" name="status" required><option>Referénsia rejistada</option><option>Hein konfirmasaun</option><option>La bele konfirma</option></select></div><div class="form-field full"><label for="referralNote">Saida mak konfirma ona? <em>*</em></label><textarea id="referralNote" name="note" required placeholder="Rejista de’it pasu tuir mai ne’ebé servisu konfirma ona."></textarea></div></div></div><div class="modal-footer"><button class="btn ghost" data-action="close-modal" type="button">Kansela</button><button class="btn primary" type="submit">Rejista referénsia <span class="arrow">→</span></button></div></form>`;
  modalRoot.innerHTML = modalShell('Rejista referénsia', `${request.id} · rejistu iha istória`, body, null);
}

function simulateReconnect() {
  state.online = true;
  const pending = state.requests.find((request) => request.status === 'Rai iha dispozitivu — seidauk haruka');
  const pendingReply = state.requests.find((request) => request.replyStatus === 'Rai iha dispozitivu — seidauk haruka');
  if (pending) {
    pending.status = 'Hein sincronizasaun';
    pending.tone = 'warning';
    pending.updatedAt = Date.now();
    pending.lastUpdated = 'Agora daudaun';
    pending.timeline.unshift({ title: 'Hein sincronizasaun', detail: 'Koneksaun fila fali; pedidu prepara atu haruka · agora daudaun' });
  }
  renderApp();
  showToast('Hein sincronizasaun', 'Koneksaun fila fali; pedidu no resposta lokal prepara atu sincroniza.');
  if (pending || pendingReply) {
    window.setTimeout(() => {
      let sentCount = 0;
      if (pending) {
        pending.status = 'Haruka ba servisu saúde';
        pending.tone = 'info';
        pending.updatedAt = Date.now();
        pending.lastUpdated = 'Agora daudaun';
        pending.timeline.unshift({ title: 'Haruka ba servisu saúde', detail: 'Sincronizasaun husi Hamutuk Saúde konfirma ona · agora daudaun' });
        sentCount += 1;
      }
      if (pendingReply && syncCommunityReply(pendingReply)) sentCount += 1;
      renderApp();
      showToast(`${sentCount} rejistu sincronizadu`, 'Status foun hatudu de’it bainhira sincronizasaun konfirma ona.');
    }, 1100);
  }
}

function syncLocalRequests() {
  if (!state.online) {
    showToast('Seidauk iha koneksaun', 'La iha buat ida mak marka hanesan haruka. Fila lokal la muda.', 'warning');
    return;
  }
  const pending = state.requests.filter((request) => request.status === 'Rai iha dispozitivu — seidauk haruka');
  const pendingReplies = state.requests.filter((request) => request.replyStatus === 'Rai iha dispozitivu — seidauk haruka');
  if (!pending.length && !pendingReplies.length) {
    showToast('La iha buat foun atu sincroniza', 'Pedidu no resposta lokal hotu iha ona estadu sincronizasaun rejistadu.');
    return;
  }
  pending.forEach((request) => {
    request.status = 'Haruka ba servisu saúde';
    request.tone = 'info';
    request.updatedAt = Date.now();
    request.lastUpdated = 'Agora daudaun';
    request.timeline.unshift({ title: 'Haruka ba servisu saúde', detail: 'Sincronizasaun husi Hamutuk Saúde konfirma ona · agora daudaun' });
  });
  let replyCount = 0;
  pendingReplies.forEach((request) => {
    if (syncCommunityReply(request)) replyCount += 1;
  });
  renderApp();
  const total = pending.length + replyCount;
  showToast(`${total} rejistu sincronizadu`, 'Haree komunidade no servisu saúde agora hatudu estadu ne’ebé konfirma ona.');
}

function createRequest(form) {
  const data = new FormData(form);
  const lane = data.get('lane');
  const requesterType = data.get('requesterType');
  const assistedName = (data.get('assistedName') || '').trim();
  const fullName = (data.get('fullName') || '').trim();
  const location = (data.get('location') || '').trim();
  const contact = (data.get('contact') || '').trim();
  const note = (data.get('note') || '').trim();
  if (requesterType === 'Autoridade Komunidade' && !assistedName) {
    showToast('Hatama naran residente', 'Autoridade Komunidade presiza hatama ema ne’ebé nia asiste.', 'warning');
    return;
  }
  const numeric = 423 + state.requests.length;
  const key = `req-${Date.now()}`;
  const id = `HSA-${numeric}`;
  const sent = state.online;
  const title = lane === 'maternity' ? 'Planeamentu maternidade' : lane === 'routine' ? 'Pedidu kuidadu rutina' : laneMeta[lane].title;
  const extra = lane === 'emergency'
    ? (data.get('affectedCount') ? ` Ema afetadu: ${data.get('affectedCount')}.` : '')
    : lane === 'maternity'
      ? (data.get('pregnancyInfo') ? ` Informasaun tempu: ${data.get('pregnancyInfo')}.` : '')
      : (data.get('preferredTime') ? ` Tempu preferidu: ${data.get('preferredTime')}.` : '');
  const request = {
    key,
    id,
    lane,
    communityVisible: true,
    title,
    location,
    requester: requesterType === 'Autoridade Komunidade' ? `Halo husi Autoridade Komunidade ba ${assistedName}` : `Membru komunidade ba ${fullName}`,
    requesterType,
    fullName,
    assistedName,
    contact,
    created: 'Agora daudaun',
    time: 'Agora daudaun',
    lastUpdated: 'Agora daudaun',
    updatedAt: Date.now(),
    status: sent ? 'Haruka ba servisu saúde' : 'Rai iha dispozitivu — seidauk haruka',
    tone: sent ? 'info' : 'warning',
    summary: `${note || 'Pedidu rejistadu.'}${extra}`,
    quote: note || 'Pedidu koordenasaun rejistadu husi komunidade.',
    response: '',
    responseBy: '',
    responseAt: '',
    nextAction: '',
    pregnancyInfo: data.get('pregnancyInfo') || '',
    affectedCount: data.get('affectedCount') || '',
    preferredTime: data.get('preferredTime') || '',
    timeline: sent ? [
      { title: 'Haruka ba servisu saúde', detail: 'Sincronizasaun husi Hamutuk Saúde konfirma ona · agora daudaun' },
      { title: 'Pedidu kria ona', detail: 'Rejistadu iha aplikasaun komunidade · agora daudaun' }
    ] : [
      { title: 'Hein sincronizasaun', detail: 'Pedidu hein koneksaun atu haruka · agora daudaun' },
      { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Rejistadu iha aplikasaun komunidade · agora daudaun' },
      { title: 'Pedidu kria ona', detail: 'Liafuan komunidade rejistadu · agora daudaun' }
    ]
  };
  state.requests.unshift(request);
  state.selectedRequest = key;
  closeModal();
  renderApp();
  openSubmissionStatusModal(request);
  showToast(sent ? 'Pedidu haruka ba servisu saúde' : 'Pedidu rai iha dispozitivu ida-ne’e', sent ? 'Agora servisu bele reviza pedidu.' : 'Nia sei nafatin marka seidauk haruka to’o sincronizasaun susesu.');
}

function createMedicineCoordination(form) {
  const data = new FormData(form);
  const requesterType = data.get('requesterType');
  const assistedName = (data.get('assistedName') || '').trim();
  const medicineName = (data.get('medicineName') || '').trim();
  const note = (data.get('note') || '').trim();
  const location = (data.get('location') || '').trim();
  const contact = (data.get('contact') || '').trim();
  if (requesterType === 'Autoridade Komunidade' && !assistedName) {
    showToast('Hatama naran residente', 'Autoridade Komunidade presiza hatama ema ne’ebé nia asiste.', 'warning');
    return;
  }
  const numeric = 423 + state.requests.length;
  const key = `req-${Date.now()}`;
  const sent = state.online;
  const request = {
    key,
    id: `HSA-${numeric}`,
    lane: 'medicine',
    communityVisible: true,
    title: 'Husu koordinasaun aimoruk',
    location,
    requester: requesterType === 'Autoridade Komunidade' ? `Halo husi Autoridade Komunidade ba ${assistedName}` : 'Membru komunidade',
    requesterType,
    assistedName,
    contact,
    resourceName: medicineName,
    created: 'Agora daudaun',
    time: 'Agora daudaun',
    lastUpdated: 'Agora daudaun',
    updatedAt: Date.now(),
    status: sent ? 'Haruka ba servisu saúde' : 'Rai iha dispozitivu — seidauk haruka',
    tone: sent ? 'info' : 'warning',
    summary: `${medicineName}: ${note}`,
    quote: note,
    response: '',
    responseBy: '',
    responseAt: '',
    nextAction: '',
    timeline: sent ? [
      { title: 'Haruka ba servisu saúde', detail: 'Pergunta kona-ba rekursu sincronizadu · agora daudaun' },
      { title: 'Pedidu kria ona', detail: 'Husu koordinasaun aimoruk rejistadu · agora daudaun' }
    ] : [
      { title: 'Hein sincronizasaun', detail: 'Pergunta hein koneksaun atu haruka · agora daudaun' },
      { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Pergunta rai iha dispozitivu · agora daudaun' },
      { title: 'Pedidu kria ona', detail: 'Husu koordinasaun aimoruk rejistadu · agora daudaun' }
    ]
  };
  state.requests.unshift(request);
  state.selectedRequest = key;
  closeModal();
  renderApp();
  openSubmissionStatusModal(request);
  showToast(sent ? 'Pergunta haruka ba servisu saúde' : 'Pergunta rai iha dispozitivu', sent ? 'Agora servisu bele haree pergunta aimoruk.' : 'Pergunta sei nafatin marka seidauk haruka to’o sincronizasaun susesu.');
}

function submitCommunityReply(form) {
  const data = new FormData(form);
  const request = getRequest(data.get('requestKey'));
  const reply = (data.get('reply') || '').trim();
  if (!reply) {
    showToast('Hatama resposta uluk', 'Hakerek resposta ba pergunta servisu saúde molok haruka.', 'warning');
    return;
  }
  request.communityReply = reply;
  request.updatedAt = Date.now();
  request.lastUpdated = 'Agora daudaun';
  request.replyStatus = state.online ? 'Resposta haruka ona — hein revizaun' : 'Rai iha dispozitivu — seidauk haruka';
  request.replySyncedAt = state.online ? 'Agora daudaun' : '';
  request.tone = state.online ? 'info' : 'warning';
  if (state.online) {
    request.status = 'Simu ona — hein revizaun';
    request.timeline.unshift({ title: 'Resposta haruka ona — hein revizaun', detail: `Resposta komunidade haruka ba servisu saúde: ${reply} · agora daudaun` });
    request.replySyncedAt = 'Agora daudaun';
  } else {
    request.timeline.unshift({ title: 'Rai iha dispozitivu — seidauk haruka', detail: `Resposta komunidade rai lokal; seidauk haruka: ${reply} · agora daudaun` });
  }
  closeModal();
  renderApp();
  openRequestDetailModal(request.key);
  showToast(state.online ? 'Resposta haruka ona — hein revizaun' : 'Resposta rai iha dispozitivu', state.online ? 'Servisu saúde agora bele reviza resposta komunidade.' : 'Resposta sei rai iha dispozitivu to’o sincronizasaun konfirma.');
}

function syncCommunityReply(request) {
  if (request.replyStatus !== 'Rai iha dispozitivu — seidauk haruka' || !request.communityReply) return false;
  request.replyStatus = 'Resposta haruka ona — hein revizaun';
  request.updatedAt = Date.now();
  request.lastUpdated = 'Agora daudaun';
  request.replySyncedAt = 'Agora daudaun';
  request.status = 'Simu ona — hein revizaun';
  request.tone = 'info';
  request.timeline.unshift({ title: 'Resposta haruka ona — hein revizaun', detail: `Resposta komunidade sincronizadu ba servisu saúde: ${request.communityReply} · agora daudaun` });
  return true;
}

function recordReferral(form) {
  const data = new FormData(form);
  const request = getRequest(data.get('requestKey'));
  const destination = data.get('destination');
  const status = data.get('status');
  const note = data.get('note');
  request.status = status;
  request.tone = status === 'Referénsia rejistada' ? 'success' : 'info';
  request.response = `${note} Destinu rejistadu: ${destination}.`;
  request.timeline.unshift({ title: status, detail: `${destination} · agora daudaun` });
  closeModal();
  renderApp();
  showToast('Referénsia rejistada', 'Istória ne’ebé komunidade haree atualiza ona.');
}

const demoMaternityResponseOptions = {
  'Bele simu / avalia': 'Servisu saúde responsavel bele simu no avalia pedidu maternidade de Maria iha Remexio. Pasu tuir mai mak koordenasaun ho servisu lokal. Ida-ne’e la’ós diagnóstiku ka garantia rezultadu.',
  'Presiza informasaun liután': 'Servisu saúde presiza informasaun liután kona-ba pedidu maternidade de Maria molok bele konfirma pasu tuir mai.',
  'Servisu temporariamente la disponivel': 'Servisu maternidade temporariamente la disponivel iha momentu ida-ne’e. Servisu responsavel sei hatete bainhira iha informasaun foun.',
  'Presiza koordenasaun referénsia': 'Pedidu maternidade presiza koordenasaun referénsia ho servisu lokal. Pasu tuir mai sei rejista bainhira servisu responsavel konfirma.'
};

function getDemoRequest() {
  return state.requests.find((request) => request.key === state.demoStory.requestKey);
}

function demoEvent(request, title, detail) {
  if (!request.timeline.some((item) => item.title === title)) {
    request.timeline.unshift({ title, detail });
  }
}

function removeDemoEvent(request, title) {
  request.timeline = request.timeline.filter((item) => item.title !== title);
}

function removeDemoRequest() {
  state.requests = state.requests.filter((request) => request.key !== state.demoStory.requestKey);
  state.selectedRequest = 'req-1';
}

function startDemoStory() {
  removeDemoRequest();
  state.demoStory.active = true;
  state.demoStory.step = 1;
  state.demoStory.paused = false;
  state.demoStory.syncing = false;
  state.demoStory.responseCategory = 'Bele simu / avalia';
  state.demoStory.responseText = demoMaternityResponseOptions['Bele simu / avalia'];
  state.responseKind = 'Resposta servisu';
  state.responseDraft = '';
  state.responseDraftKey = '';
  state.online = false;
  state.activeFilter = 'Pedidu hotu';
  state.search = '';
  state.mode = 'community';
  renderApp();
  showToast('Istória demo hahú', 'Maria iha Remexio sei hahú pedidu maternidade bainhira la iha koneksaun.');
}

function openDemoMaternityModal() {
  const body = `<form id="demoMaternityForm"><div class="modal-body">
    <div class="modal-callout urgent"><strong>Etapa demo · la iha koneksaun</strong>Pedidu sei rai iha dispozitivu de’it. Nia sei la hatudu hanesan haruka ona to’o sincronizasaun konfirma.</div>
    <div class="demo-form-story-label"><span>Istória</span><strong>Maria iha Remexio · Planeamentu maternidade</strong></div>
    <div class="form-grid">
      <div class="form-field"><label for="demoResidentName">Naran residente <em>*</em></label><input id="demoResidentName" name="residentName" value="Maria" required /></div>
      <div class="form-field"><label for="demoLocation">Vila ka área <em>*</em></label><input id="demoLocation" name="location" value="Remexio · Aileu" required /></div>
      <div class="form-field full"><label for="demoNote">Saida mak Maria presiza? <em>*</em></label><textarea id="demoNote" name="note" required>Maria husu atu servisu konfirma pasu tuir mai ba planeamentu maternidade iha Remexio.</textarea></div>
    </div>
    <label class="check-row"><input type="checkbox" name="demoAuthority" checked /> <span>Autoridade Komunidade asiste Maria no rejista ho nia konkordánsia.</span></label>
    <label class="check-row"><input type="checkbox" name="demoBoundary" required /> <span>Hau komprende katak Hamutuk Saúde de’it rejista no koordena pedidu; nia la halo desizaun mediku.</span></label>
  </div><div class="modal-footer"><button class="btn ghost" data-action="close-modal" type="button">Kansela</button><button class="btn primary" type="submit">Rai pedidu iha dispozitivu <span class="arrow">→</span></button></div></form>`;
  modalRoot.innerHTML = modalShell('Maria iha Remexio', 'Planeamentu maternidade · Etapa 1', body, null, { wide: true });
}

function createDemoMaternity(form) {
  const data = new FormData(form);
  const name = data.get('residentName') || 'Maria';
  const location = data.get('location') || 'Remexio · Aileu';
  const note = data.get('note') || 'Maria husu atu servisu konfirma pasu tuir mai ba planeamentu maternidade iha Remexio.';
  const useAuthority = data.get('demoAuthority') === 'on';
  const request = {
    key: state.demoStory.requestKey,
    id: 'HSA-0423',
    lane: 'maternity',
    communityVisible: true,
    demoStory: true,
    title: 'Planeamentu maternidade ba Maria',
    location,
    requester: useAuthority ? `Halo husi Autoridade Komunidade ba ${name}` : `Membru komunidade ba ${name}`,
    created: 'Agora daudaun',
    time: 'Agora daudaun',
    lastUpdated: 'Agora daudaun',
    updatedAt: Date.now(),
    status: 'Rai iha dispozitivu — seidauk haruka',
    tone: 'warning',
    summary: note,
    quote: note,
    response: '',
    responseBy: '',
    responseAt: '',
    nextAction: '',
    timeline: [
      { title: 'Rai iha dispozitivu — seidauk haruka', detail: 'Pedidu rai iha dispozitivu iha Remexio · agora daudaun' },
      { title: 'Pedidu kria ona', detail: 'Maria rejista pedidu maternidade ho seguransa · agora daudaun' }
    ]
  };
  state.requests = state.requests.filter((item) => item.key !== request.key);
  state.requests.unshift(request);
  state.selectedRequest = request.key;
  state.demoStory.step = 2;
  state.demoStory.paused = false;
  state.demoStory.syncing = false;
  state.online = false;
  state.mode = 'community';
  closeModal();
  renderApp();
  showToast('Pedidu rai iha dispozitivu', 'Status loos mak “Rai iha dispozitivu — seidauk haruka”.');
}

function demoStoryReconnect() {
  const story = state.demoStory;
  const request = getDemoRequest();
  if (!story.active || story.step !== 2 || !request) return;
  if (story.syncing || request.status === 'Haruka ba servisu saúde') return;
  state.online = true;
  request.status = 'Hein sincronizasaun';
  request.tone = 'warning';
  story.syncing = true;
  demoEvent(request, 'Hein sincronizasaun', 'Koneksaun fila fali; sistema prepara sincronizasaun · agora daudaun');
  renderApp();
  showToast('Hein sincronizasaun', 'Koneksaun fila fali; pedidu prepara atu haruka.');
  window.setTimeout(() => {
    if (!story.active || story.step !== 2 || !getDemoRequest()) return;
    request.status = 'Haruka ba servisu saúde';
    request.tone = 'info';
    story.syncing = false;
    demoEvent(request, 'Haruka ba servisu saúde', 'Pedidu haruka ho susesu bainhira koneksaun fila fali · agora daudaun');
    renderApp();
    showToast('Haruka ba servisu saúde', 'Pedidu haruka ho susesu.');
  }, 950);
}

function demoStoryGoService() {
  const story = state.demoStory;
  const request = getDemoRequest();
  if (!request || request.status !== 'Haruka ba servisu saúde') {
    showToast('Hein sincronizasaun', 'Pedidu tenke haruka uluk molok haree iha servisu saúde.', 'warning');
    return;
  }
  request.status = 'Simu ona — hein revizaun';
  request.tone = 'warning';
  demoEvent(request, 'Simu ona — hein revizaun', 'Servisu saúde simu pedidu maternidade husi Maria · agora daudaun');
  request.receivedFromOffline = true;
  story.step = 3;
  story.paused = false;
  state.mode = 'service';
  state.selectedRequest = request.key;
  renderApp();
  showToast('Servisu saúde simu pedidu', 'Haree mensajen Maria no prepara resposta klaru.');
}

function demoStoryOpenResponse() {
  if (!state.demoStory.active || state.demoStory.step !== 3) return;
  state.demoStory.step = 4;
  renderApp();
  window.setTimeout(() => {
    const composer = document.querySelector('.response-composer');
    if (composer) composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 60);
  showToast('Etapa resposta', 'Hili kategoria maternidade no hakerek nota badak molok fahe.');
}

function demoStoryReturnCommunity() {
  const request = getDemoRequest();
  if (!request || state.demoStory.step !== 5) return;
  state.mode = 'community';
  state.online = true;
  renderApp();
  showToast('Resposta disponivel', 'Maria agora bele haree resposta servisu ho klaru.');
}

function demoStoryBack() {
  const story = state.demoStory;
  const request = getDemoRequest();
  if (!story.active || story.step <= 1) return;
  if (story.step === 2) {
    removeDemoRequest();
    state.online = false;
    state.mode = 'community';
    story.step = 1;
  } else if (story.step === 3 && request) {
    request.status = 'Haruka ba servisu saúde';
    request.tone = 'info';
    removeDemoEvent(request, 'Simu ona — hein revizaun');
    state.online = true;
    state.mode = 'community';
    story.step = 2;
  } else if (story.step === 4 && request) {
    request.status = 'Simu ona — hein revizaun';
    request.tone = 'warning';
    state.mode = 'service';
    state.selectedRequest = request.key;
    story.step = 3;
  } else if (story.step === 5 && request) {
    request.status = 'Simu ona — hein revizaun';
    request.tone = 'warning';
    request.response = '';
    request.responseBy = '';
    request.responseAt = '';
    request.nextAction = '';
    removeDemoEvent(request, 'Resposta disponivel');
    state.mode = 'service';
    state.selectedRequest = request.key;
    story.step = 4;
  }
  story.paused = false;
  renderApp();
}

function renderDemoStoryGuide() {
  const story = state.demoStory;
  if (!story.active) return '';
  const request = getDemoRequest();
  const step = story.step;
  const stepLabels = ['Komunidade', 'Koneksaun', 'Servisu saúde', 'Resposta', 'Komunidade'];
  let content = '';

  if (story.paused) {
    content = `<div class="demo-story-paused"><span class="demo-story-number">Ⅱ</span><div><h3>Istória demo pausa ona</h3><p>Ita bele kontinua bainhira prontu. Estadu pedidu sei nafatin loos.</p></div><button class="btn primary" data-action="resume-demo" type="button">Kontinua demo <span class="arrow">→</span></button></div>`;
  } else if (step === 1) {
    content = `<div class="demo-story-step"><span class="demo-story-number">01</span><div><div class="eyebrow">Etapa 1 · Komunidade</div><h3>Maria hahú pedidu maternidade bainhira la iha koneksaun</h3><p>Telemovel hatudu “La iha koneksaun”. Hili planeamentu maternidade, konfirma informasaun mínima, no rai pedidu ho seguru.</p><div class="demo-story-callout"><strong>Agora ita bele klik:</strong> “Planeamentu maternidade” iha telefone ka button iha kraik.</div></div></div><div class="demo-story-actions"><span class="pill warning"><span class="connection-dot"></span>La iha koneksaun</span><button class="btn primary" data-action="demo-open-maternity" type="button">Planeamentu maternidade <span class="arrow">→</span></button></div>`;
  } else if (step === 2 && request) {
    const isWaiting = request.status === 'Hein sincronizasaun';
    const isSent = request.status === 'Haruka ba servisu saúde';
    content = `<div class="demo-story-step"><span class="demo-story-number">02</span><div><div class="eyebrow">Etapa 2 · Koneksaun</div><h3>${isSent ? 'Pedidu haruka ho susesu' : isWaiting ? 'Koneksaun fila fali' : 'Pedidu rai iha dispozitivu'}</h3><p>${isSent ? 'Agora ita bele hatudu ba servisu saúde.' : isWaiting ? 'Sistema hein momentu badak atu confirma sincronizasaun.' : 'Pedidu rai seguru. Nia sei la hatudu hanesan haruka ona to’o iha koneksaun.'}</p></div></div><div class="demo-story-status-line">${statusPill(request.status, request.tone)}${request.receivedFromOffline ? '<span>Origem la iha koneksaun rejista ona</span>' : ''}</div><div class="demo-story-actions">${isSent ? '<button class="btn primary" data-action="demo-go-service" type="button">Haree iha Servisu Saúde <span class="arrow">→</span></button>' : `<button class="btn secondary" data-action="demo-view-request" type="button">Haree pedidu</button><button class="btn primary" data-action="demo-reconnect" type="button" ${story.syncing ? 'disabled' : ''}>${story.syncing ? 'Sincronizasaun…' : 'Simula koneksaun fila fali'} <span class="arrow">→</span></button>`}</div>`;
  } else if (step === 3 && request) {
    content = `<div class="demo-story-step"><span class="demo-story-number">03</span><div><div class="eyebrow">Etapa 3 · Servisu saúde</div><h3>Servisu saúde simu pedidu husi Maria</h3><p>Pedidu maternidade aparece iha fila pedidu ho status <strong>Simu ona — hein revizaun</strong>. Mensajen original no origem la iha koneksaun hela iha detalhe.</p></div></div><div class="demo-story-proof"><span>Pedidu husi</span><strong>${h(request.requester)}</strong><span>Origem: rai iha dispozitivu, depois haruka bainhira koneksaun fila fali.</span></div><div class="demo-story-actions"><button class="btn primary" data-action="demo-open-response" type="button">Hahú resposta <span class="arrow">→</span></button></div>`;
  } else if (step === 4 && request) {
    const categoryButtons = Object.keys(demoMaternityResponseOptions).map((category) => `<button class="demo-category-button ${story.responseCategory === category ? 'active' : ''}" data-action="set-demo-response-category" data-category="${h(category)}" type="button">${h(category)}</button>`).join('');
    content = `<div class="demo-story-step"><span class="demo-story-number">04</span><div><div class="eyebrow">Etapa 4 · Resposta servisu saúde</div><h3>Servisu hili resposta estruturada no hakerek nota</h3><p>Hili kategoria ida. Texto iha formuláriu bele troka molok servisu fahe resposta ba komunidade.</p></div></div><div class="demo-story-category-list">${categoryButtons}</div><div class="demo-story-draft"><span>Nota prontu</span><p>${h(story.responseText)}</p></div><div class="demo-story-actions"><button class="btn secondary" data-action="demo-focus-response" type="button">Haree formuláriu resposta</button><button class="btn primary" data-action="demo-send-response" type="button">Fahe resposta <span class="arrow">→</span></button><span class="demo-story-hint">Ita bele haree no troka nota iha pájina servisu molok fahe.</span></div>`;
  } else if (step === 5 && request) {
    content = `<div class="demo-story-step"><span class="demo-story-number">05</span><div><div class="eyebrow">Etapa 5 · Komunidade simu</div><h3>Maria haree resposta klaru</h3><p>Resposta servisu agora iha telefone. Nia bele haree ema/servisu ne’ebé fahe, oras, no pasu tuir mai.</p></div></div><div class="demo-story-final-response"><div>${statusPill(request.status, 'success')}</div><p>${h(request.response)}</p><small>Fahe husi ${h(request.responseBy || 'Responsavel servisu saúde')} · ${h(request.responseAt || 'Agora daudaun')}</small></div><div class="demo-story-summary"><strong>Saida mak istória ida-ne’e prova?</strong><div><span>✓</span> Pedidu hahu iha la iha koneksaun</div><div><span>✓</span> Haruka bainhira koneksaun fila fali</div><div><span>✓</span> Servisu saúde fó resposta</div><div><span>✓</span> Maria haree resposta ho klaru</div></div><div class="demo-story-actions">${state.mode === 'service' ? '<button class="btn primary" data-action="demo-return-community" type="button">Haree resposta iha komunidade <span class="arrow">→</span></button>' : '<button class="btn primary" data-action="demo-restart" type="button">Hahú fali demo <span class="arrow">↻</span></button><button class="btn secondary" data-action="demo-emergency" type="button">Haree demo emerjénsia</button>'}</div>`;
  }

  const dots = [1, 2, 3, 4, 5].map((item) => `<span class="demo-progress-dot ${item < step ? 'done' : ''} ${item === step ? 'current' : ''}" title="${h(stepLabels[item - 1])}"></span>`).join('');
  return `<section class="demo-story-layer" aria-label="Istória demo Hamutuk Saúde"><div class="demo-story-card"><div class="demo-story-header"><div><span class="demo-entry-kicker">Istória interativu · Maria iha Remexio</span><h2>Pedidu Maternidade bainhira la iha koneksaun</h2><p>La iha koneksaun → Haruka → Resposta iha minutu balu</p></div><button class="demo-story-close" data-action="close-demo-story" type="button" aria-label="Taka istória demo">×</button></div><div class="demo-story-progress"><span>Etapa ${step} husi 5 · ${h(stepLabels[Math.max(0, step - 1)])}</span><div class="demo-progress-dots">${dots}</div><button class="demo-story-pause" data-action="${story.paused ? 'resume-demo' : 'pause-demo'}" type="button">${story.paused ? 'Kontinua' : 'Pausa'}</button></div>${content}<div class="demo-story-footer">${step > 1 && step < 5 && !story.paused ? '<button class="demo-story-back" data-action="demo-back" type="button">← Fila etapa ida</button>' : '<span></span>'}<span>Dadus demo de’it · status sira sempre loos</span></div></div></section>`;
}

function handleAction(actionElement) {
  const action = actionElement.dataset.action;
  if (action === 'toggle-network') {
    state.online = !state.online;
    updateNetworkChrome();
    renderApp();
    showToast(state.online ? 'Koneksaun fila fali' : 'Modu la iha koneksaun loke ona', state.online ? 'Agora ita bele sincroniza pedidu ida.' : 'Pedidu foun sira sei rai lokalmente to’o sincronizasaun susesu.');
    return;
  }
  if (action === 'open-new-request') return openNewRequestTypeModal();
  if (action === 'focus-community-reply') {
    const reply = document.getElementById('communityReply');
    if (reply) {
      reply.focus();
      reply.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  if (action === 'demo-story') return startDemoStory();
  if (action === 'demo-open-maternity') return openDemoMaternityModal();
  if (action === 'demo-reconnect') return demoStoryReconnect();
  if (action === 'demo-view-request') return openRequestDetailModal(state.demoStory.requestKey);
  if (action === 'demo-go-service') return demoStoryGoService();
  if (action === 'demo-open-response') return demoStoryOpenResponse();
  if (action === 'demo-return-community') return demoStoryReturnCommunity();
  if (action === 'demo-focus-response') {
    const composer = document.querySelector('.response-composer');
    if (composer) composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (action === 'demo-send-response') {
    const textarea = document.getElementById('responseMessage');
    if (textarea && !textarea.value.trim()) textarea.value = state.demoStory.responseText;
    const responseButton = document.querySelector(`[data-action="send-response"][data-id="${state.demoStory.requestKey}"]`);
    if (responseButton) return handleAction(responseButton);
    return;
  }
  if (action === 'demo-back') return demoStoryBack();
  if (action === 'demo-restart') return startDemoStory();
  if (action === 'demo-emergency') {
    state.demoStory.active = false;
    state.mode = 'service';
    state.online = false;
    state.selectedRequest = 'req-4';
    renderApp();
    showToast('Demo emerjénsia', 'Haree pedidu emerjénsia iha fila servisu saúde.');
    return;
  }
  if (action === 'pause-demo') {
    state.demoStory.paused = true;
    renderApp();
    return;
  }
  if (action === 'resume-demo') {
    state.demoStory.paused = false;
    renderApp();
    return;
  }
  if (action === 'close-demo-story') {
    state.demoStory.active = false;
    state.demoStory.paused = false;
    renderApp();
    return;
  }
  if (action === 'simulate-reconnect') return simulateReconnect();
  if (action === 'open-help') return openHelpModal();
  if (action === 'open-why') return openWhyModal();
  if (action === 'open-offline-guide') return openOfflineGuideModal();
  if (action === 'open-medicine-coordination') return openMedicineCoordinationModal(actionElement.dataset.medicine || '');
  if (action === 'begin-request') {
    if (state.demoStory.active && state.demoStory.step === 1 && actionElement.dataset.lane === 'maternity') return openDemoMaternityModal();
    return openRequestModal(actionElement.dataset.lane);
  }
  if (action === 'community-assist') return openAuthorityModal();
  if (action === 'community-requests') {
    const target = document.getElementById('communityRequests');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  if (action === 'community-home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (action === 'sync-now') {
    closeModal();
    return syncLocalRequests();
  }
  if (action === 'view-request') return openRequestDetailModal(actionElement.dataset.id);
  if (action === 'select-request') {
    state.selectedRequest = actionElement.dataset.id;
    renderApp();
    return;
  }
  if (action === 'set-filter') {
    state.activeFilter = actionElement.dataset.filter;
    renderApp();
    return;
  }
  if (action === 'set-response-kind') {
    state.responseKind = actionElement.dataset.kind;
    renderApp();
    return;
  }
  if (action === 'set-demo-response-category') {
    const category = actionElement.dataset.category;
    if (demoMaternityResponseOptions[category]) {
      state.demoStory.responseCategory = category;
      state.demoStory.responseText = demoMaternityResponseOptions[category];
      state.responseDraftKey = state.selectedRequest;
      state.responseDraft = demoMaternityResponseOptions[category];
      const textarea = document.getElementById('responseMessage');
      if (textarea) textarea.value = state.demoStory.responseText;
      renderApp();
      window.setTimeout(() => {
        const composer = document.querySelector('.response-composer');
        if (composer && state.demoStory.step === 4) composer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
    return;
  }
  if (action === 'fill-response-template') {
    const templates = {
      'maternity-contact': 'Servisu saúde bele konfirma kontaktu ka vizita maternidade planeadu. Uza referénsia atu koalia ho servisu responsavel.',
      'maternity-referral': 'Referénsia ba kuidadu maternidade rejista ona. Servisu responsavel sei fó pasu tuir mai ne’ebé konfirma.',
      'maternity-more-info': 'Servisu saúde presiza informasaun liután molok bele konfirma kontaktu ka vizita maternidade planeadu.'
    };
    const textarea = document.getElementById('responseMessage');
    if (textarea) {
      textarea.value = templates[actionElement.dataset.template] || '';
      textarea.focus();
    }
    return;
  }
  if (action === 'send-response') {
    const request = getRequest(actionElement.dataset.id);
    const textarea = document.getElementById('responseMessage');
    const message = textarea ? textarea.value.trim() : '';
    if (!message) {
      showToast('Hatama resposta uluk', 'Hakerek buat ne’ebé servisu bele konfirma molok fahe.', 'warning');
      return;
    }
    request.response = message;
    if (state.demoStory.active && request.key === state.demoStory.requestKey) {
      request.status = 'Resposta disponivel';
      request.tone = 'success';
      request.responseBy = 'Responsavel servisu: Joana S. (ezemplu)';
      request.responseAt = 'Agora daudaun';
      request.nextAction = 'Maria bele uza referénsia pedidu bainhira koalia ho servisu maternidade lokal.';
      demoEvent(request, 'Resposta disponivel', 'Resposta servisu maternidade fahe ba komunidade · agora daudaun');
      state.demoStory.step = 5;
      state.demoStory.paused = false;
      state.mode = 'service';
      state.selectedRequest = request.key;
      renderApp();
      showToast('Resposta fahe ona ba komunidade', 'Agora ita bele haree resposta iha komunidade.');
      return;
    }
    if (state.responseKind === 'Presiza informasaun liután') {
      request.response = '';
      request.moreInfoQuestion = message;
      request.moreInfoAskedBy = 'Responsavel servisu saúde (ezemplu)';
      request.moreInfoAskedAt = 'Agora daudaun';
      request.communityReply = '';
      request.replyStatus = '';
      request.status = 'Presiza informasaun liután';
      request.tone = 'warning';
      request.timeline.unshift({ title: 'Presiza informasaun liután', detail: `Pergunta husi servisu saúde: ${message} · agora daudaun` });
      renderApp();
      showToast('Presiza informasaun liután', 'Komunidade agora bele haree pergunta no fó resposta.');
      return;
    }
    request.status = state.responseKind === 'Referénsia rejistada' ? 'Referénsia rejistada' : 'Resposta disponivel';
    request.tone = state.responseKind === 'Referénsia rejistada' ? 'success' : 'success';
    request.timeline.unshift({ title: request.status, detail: `${state.responseKind} fahe husi servisu ezemplu · agora daudaun` });
    renderApp();
    showToast('Resposta disponivel', 'Agora komunidade bele haree resposta ida-ne’e no nia rejistu iha istória.');
    return;
  }
  if (action === 'ack-emergency') {
    const request = getRequest(actionElement.dataset.id);
    if (request.emergencyStage !== 'received') {
      showToast('Pedidu simu ona', 'Revizaun servisu iha prosesu hela.');
      return;
    }
    request.emergencyStage = 'coordinating';
    request.status = 'Simu ona — hein revizaun';
    request.tone = 'warning';
    request.timeline.unshift({ title: 'Simu ona — hein revizaun', detail: 'Servisu saúde komesa revizaun · agora daudaun' });
    renderApp();
    showToast('Pedidu simu ona', 'Agora servisu bele rejista dalan koordenasaun tuir mai.');
    return;
  }
  if (action === 'record-emergency-action') {
    const request = getRequest(actionElement.dataset.id);
    const pathwaySelect = document.getElementById('emergencyPathway');
    const nextStepSelect = document.getElementById('emergencyNextStep');
    const pathway = pathwaySelect ? pathwaySelect.value : 'Seidauk rejista';
    const nextStep = nextStepSelect ? nextStepSelect.value : 'Seidauk rejista';
    if (pathway === 'Seidauk rejista' || nextStep === 'Seidauk rejista') {
      showToast('Hili dalan no pasu tuir mai', 'Rejista de’it buat ne’ebé servisu konfirma ona.', 'warning');
      return;
    }
    request.emergencyStage = 'coordinating';
    request.emergencyPathway = pathway;
    request.emergencyNextStep = nextStep;
    request.status = 'Haruka ba servisu saúde';
    request.tone = 'info';
    request.timeline.unshift({ title: 'Haruka ba servisu saúde', detail: `Dalan koordenasaun: ${pathway} · Pasu tuir mai: ${nextStep} · agora daudaun` });
    renderApp();
    showToast('Aksaun koordenasaun rejista ona', 'Agora bele prepara resposta ne’ebé komunidade bele haree.');
    return;
  }
  if (action === 'fill-emergency-template') {
    const templates = {
      received: 'Pedidu emerjénsia simu ona. Servisu responsavel agora halo revizaun tuir dalan ofisiál.',
      pathway: 'Pedidu emerjénsia haruka ba dalan SNAEM ofisiál. Hamutuk Saúde sei hatudu estadu no atualizasaun ne’ebé servisu rejista.',
      'more-info': 'Servisu saúde presiza informasaun liután molok bele rejista pasu tuir mai. Favór uza kontaktu ofisiál ne’ebé servisu hatudu.'
    };
    const emergencyRequest = getRequest(actionElement.dataset.id);
    emergencyRequest.emergencyResponseKind = actionElement.dataset.template;
    const textarea = document.getElementById('emergencyResponseMessage');
    if (textarea) {
      textarea.value = templates[actionElement.dataset.template] || '';
      textarea.focus();
    }
    return;
  }
  if (action === 'share-emergency-response') {
    const request = getRequest(actionElement.dataset.id);
    const textarea = document.getElementById('emergencyResponseMessage');
    const message = textarea ? textarea.value.trim() : '';
    if (!message) {
      showToast('Hatama resposta uluk', 'Hakerek buat ne’ebé servisu bele konfirma molok fahe.', 'warning');
      return;
    }
    if (request.emergencyResponseKind === 'more-info') {
      request.response = '';
      request.status = 'Presiza informasaun liután';
      request.tone = 'warning';
      request.emergencyStage = 'coordinating';
      request.moreInfoQuestion = message;
      request.moreInfoAskedBy = 'Responsavel servisu saúde (ezemplu)';
      request.moreInfoAskedAt = 'Agora daudaun';
      request.communityReply = '';
      request.replyStatus = '';
      request.timeline.unshift({ title: 'Presiza informasaun liután', detail: `Pergunta emerjénsia husi servisu saúde: ${message} · agora daudaun` });
      renderApp();
      showToast('Presiza informasaun liután', 'Komunidade agora bele haree pergunta no fó resposta.');
      return;
    }
    request.response = message;
    request.status = 'Resposta disponivel';
    request.tone = 'success';
    request.emergencyStage = 'responded';
    request.timeline.unshift({ title: 'Resposta disponivel', detail: 'Hatudu ba komunidade husi servisu saúde · agora daudaun' });
    renderApp();
    showToast('Resposta emerjénsia fahe ona', 'Komunidade agora bele haree resposta no istória atividade.');
    return;
  }
  if (action === 'record-referral') return openReferralModal(actionElement.dataset.id);
  if (action === 'open-community') {
    state.mode = 'community';
    renderApp();
    return;
  }
  if (action === 'close-modal') {
    if (actionElement.classList.contains('modal-backdrop') || actionElement.classList.contains('modal-close') || actionElement.tagName === 'BUTTON') closeModal();
  }
}

document.addEventListener('click', (event) => {
  const modeButton = event.target.closest('[data-mode]');
  if (modeButton && modeButton.classList.contains('mode-button')) {
    state.mode = modeButton.dataset.mode;
    renderApp();
    return;
  }
  const actionElement = event.target.closest('[data-action]');
  if (actionElement) handleAction(actionElement);
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal-backdrop')) closeModal();
});

document.addEventListener('change', (event) => {
  if (event.target.name !== 'requesterType') return;
  const form = event.target.form;
  if (!form) return;
  const authorityField = form.querySelector('[data-authority-name]');
  const authorityInput = authorityField ? authorityField.querySelector('input[name="assistedName"]') : null;
  const isAuthority = form.querySelector('input[name="requesterType"]:checked')?.value === 'Autoridade Komunidade';
  if (authorityField) authorityField.hidden = !isAuthority;
  if (authorityInput) {
    authorityInput.required = isAuthority;
    if (!isAuthority) authorityInput.value = '';
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'demoMaternityForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    createDemoMaternity(event.target);
    return;
  }
  if (event.target.id === 'medicineCoordinationForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    createMedicineCoordination(event.target);
    return;
  }
  if (event.target.id === 'communityReplyForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    submitCommunityReply(event.target);
    return;
  }
  if (event.target.id === 'newRequestForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    createRequest(event.target);
  }
  if (event.target.id === 'assistForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    closeModal();
    showToast('Modu ajuda prontu', 'Rejista pedidu residente ho nia liafuan rasik.');
  }
  if (event.target.id === 'referralForm') {
    event.preventDefault();
    if (!event.target.reportValidity()) return;
    recordReferral(event.target);
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id !== 'inboxSearch') return;
  state.search = event.target.value;
  const cursor = event.target.selectionStart;
  renderApp();
  const next = document.getElementById('inboxSearch');
  if (next) {
    next.focus();
    next.setSelectionRange(cursor, cursor);
  }
});

renderApp();

const DEFAULT_CONFIG = {
  owner: 'RAYMAN720',
  repo: 'atelier-koka-site',
  branch: 'main'
};

const PAGE_OPTIONS = [
  { label: 'Home', path: 'index.html' },
  { label: 'Artist profile', path: 'artists/akasteve.html' },
  { label: 'Artists index', path: 'artists/index.html' },
  { label: 'Archive', path: 'blog/index.html' },
  { label: 'Dates', path: 'events/index.html' },
  { label: 'Contact', path: 'contact/index.html' }
];

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

const CONFIRMATION_CONTACTS = {
  rayann: {
    name: 'Rayann',
    phone: '+393890588610',
    whatsapp: '393890588610'
  },
  steve: {
    name: 'Steve',
    phone: '+41766815702',
    whatsapp: '41766815702'
  }
};

const HOME_EDITOR_SECTIONS = [
  {
    title: 'Page details',
    description: 'What appears in the browser tab and search previews.',
    fields: [
      { label: 'Browser tab title', selector: 'title', kind: 'short' },
      { label: 'Search description', selector: 'meta[name="description"]', attribute: 'content', kind: 'long' }
    ]
  },
  {
    title: 'Top announcement bar',
    description: 'The red strip at the very top of the website.',
    fields: [
      { label: 'Left text', selector: '.topbar span:nth-of-type(1)', kind: 'short' },
      { label: 'Right text', selector: '.topbar span:nth-of-type(2)', kind: 'short' }
    ]
  },
  {
    title: 'Header menu',
    description: 'The navigation people use to move around the site.',
    fields: [
      { label: 'Artist menu label', selector: '.nav-links > a:nth-child(1)', kind: 'short' },
      { label: 'Work menu label', selector: '.nav-links > a:nth-child(2)', kind: 'short' },
      { label: 'Dates menu label', selector: '.nav-links > a:nth-child(3)', kind: 'short' },
      { label: 'Archive menu label', selector: '.nav-links > a:nth-child(4)', kind: 'short' },
      { label: 'Contact menu label', selector: '.nav-links > a:nth-child(5)', kind: 'short' },
      { label: 'Instagram button label', selector: '.nav-links > a:nth-child(6)', kind: 'short' },
      { label: 'Instagram button link', selector: '.nav-links > a:nth-child(6)', attribute: 'href', kind: 'url' }
    ]
  },
  {
    title: 'Hero first screen',
    description: 'The first thing visitors see when they open the site.',
    fields: [
      { label: 'Small red label', selector: '.hero .kicker', kind: 'short' },
      { label: 'Main big title', selector: '.hero h1', kind: 'short' },
      { label: 'Stamp label', selector: '.hero-stamp', kind: 'short' },
      { label: 'Intro paragraph', selector: '.hero-copy', kind: 'long' },
      { label: 'Main button text', selector: '.hero .btn-row a:nth-child(1)', kind: 'short' },
      { label: 'Main button link', selector: '.hero .btn-row a:nth-child(1)', attribute: 'href', kind: 'url' },
      { label: 'Second button text', selector: '.hero .btn-row a:nth-child(2)', kind: 'short' },
      { label: 'Second button link', selector: '.hero .btn-row a:nth-child(2)', attribute: 'href', kind: 'url' }
    ]
  },
  {
    title: 'Atelier story',
    description: 'The section explaining the feeling of the studio.',
    fields: [
      { label: 'Section label', selector: 'main > section:nth-of-type(2) .section-head .kicker', kind: 'short' },
      { label: 'Big section title', selector: 'main > section:nth-of-type(2) .section-head h2', kind: 'long' },
      { label: 'Section paragraph', selector: 'main > section:nth-of-type(2) .section-head p', kind: 'long' },
      { label: 'First card label', selector: 'main > section:nth-of-type(2) .poster:nth-child(1) .smallcaps', kind: 'short' },
      { label: 'First card title', selector: 'main > section:nth-of-type(2) .poster:nth-child(1) h3', kind: 'short' },
      { label: 'First card text', selector: 'main > section:nth-of-type(2) .poster:nth-child(1) p', kind: 'long' },
      { label: 'Second card label', selector: 'main > section:nth-of-type(2) .poster:nth-child(2) .smallcaps', kind: 'short' },
      { label: 'Second card title', selector: 'main > section:nth-of-type(2) .poster:nth-child(2) h3', kind: 'short' },
      { label: 'Second card text', selector: 'main > section:nth-of-type(2) .poster:nth-child(2) p', kind: 'long' }
    ]
  },
  {
    title: 'Work cards',
    description: 'The selected work area with tattoo, drawing, and flash cards.',
    fields: [
      { label: 'Section label', selector: '#work .section-head .kicker', kind: 'short' },
      { label: 'Big section title', selector: '#work .section-head h2', kind: 'short' },
      { label: 'Section paragraph', selector: '#work .section-head p', kind: 'long' },
      { label: 'Card 1 category', selector: '#work .card:nth-child(1) .meta span:nth-child(1)', kind: 'short' },
      { label: 'Card 1 archive label', selector: '#work .card:nth-child(1) .meta span:nth-child(2)', kind: 'short' },
      { label: 'Card 1 title', selector: '#work .card:nth-child(1) h3', kind: 'short' },
      { label: 'Card 1 text', selector: '#work .card:nth-child(1) p', kind: 'long' },
      { label: 'Card 2 category', selector: '#work .card:nth-child(2) .meta span:nth-child(1)', kind: 'short' },
      { label: 'Card 2 archive label', selector: '#work .card:nth-child(2) .meta span:nth-child(2)', kind: 'short' },
      { label: 'Card 2 title', selector: '#work .card:nth-child(2) h3', kind: 'short' },
      { label: 'Card 2 text', selector: '#work .card:nth-child(2) p', kind: 'long' },
      { label: 'Card 3 category', selector: '#work .card:nth-child(3) .meta span:nth-child(1)', kind: 'short' },
      { label: 'Card 3 archive label', selector: '#work .card:nth-child(3) .meta span:nth-child(2)', kind: 'short' },
      { label: 'Card 3 title', selector: '#work .card:nth-child(3) h3', kind: 'short' },
      { label: 'Card 3 text', selector: '#work .card:nth-child(3) p', kind: 'long' },
      { label: 'Work button text', selector: '#work .btn-row a', kind: 'short' },
      { label: 'Work button link', selector: '#work .btn-row a', attribute: 'href', kind: 'url' }
    ]
  },
  {
    title: 'Artist spotlight',
    description: 'The section that introduces AKASTEVE.',
    fields: [
      { label: 'Section label', selector: 'main > section:nth-of-type(4) .kicker', kind: 'short' },
      { label: 'Big title', selector: 'main > section:nth-of-type(4) h2', kind: 'long' },
      { label: 'Paragraph', selector: 'main > section:nth-of-type(4) .lede', kind: 'long' },
      { label: 'Button text', selector: 'main > section:nth-of-type(4) .btn', kind: 'short' },
      { label: 'Button link', selector: 'main > section:nth-of-type(4) .btn', attribute: 'href', kind: 'url' }
    ]
  },
  {
    title: 'Instagram band',
    description: 'The red callout for current work and updates.',
    fields: [
      { label: 'Small label', selector: 'main > section:nth-of-type(5) .smallcaps', kind: 'short' },
      { label: 'Instagram handle', selector: 'main > section:nth-of-type(5) .social-big', kind: 'short' },
      { label: 'Instagram link', selector: 'main > section:nth-of-type(5) .social-big', attribute: 'href', kind: 'url' },
      { label: 'Paragraph', selector: 'main > section:nth-of-type(5) .lede', kind: 'long' }
    ]
  },
  {
    title: 'Booking section',
    description: 'The contact area and the appointment call to action.',
    fields: [
      { label: 'Section label', selector: '#booking .kicker', kind: 'short' },
      { label: 'Big title', selector: '#booking h2', kind: 'short' },
      { label: 'Paragraph', selector: '#booking .lede', kind: 'long' },
      { label: 'Instagram button text', selector: '#booking .btn-row a', kind: 'short' },
      { label: 'Instagram button link', selector: '#booking .btn-row a', attribute: 'href', kind: 'url' },
      { label: 'Form note', selector: '#booking [data-form-status]', kind: 'long' }
    ]
  },
  {
    title: 'Images',
    description: 'Choose image files that already exist in the website assets folder.',
    fields: [
      { label: 'Header logo', selector: 'header .brand-logo', attribute: 'src', kind: 'image' },
      { label: 'Header logo description', selector: 'header .brand-logo', attribute: 'alt', kind: 'short' },
      { label: 'Hero logo image', selector: '.hero-logo', attribute: 'src', kind: 'image' },
      { label: 'Hero logo description', selector: '.hero-logo', attribute: 'alt', kind: 'short' },
      { label: 'Work card logo image', selector: '#work .logo-media img', attribute: 'src', kind: 'image' },
      { label: 'Work card logo description', selector: '#work .logo-media img', attribute: 'alt', kind: 'short' },
      { label: 'Footer logo', selector: 'footer .brand-logo', attribute: 'src', kind: 'image' },
      { label: 'Footer logo description', selector: 'footer .brand-logo', attribute: 'alt', kind: 'short' }
    ]
  },
  {
    title: 'Footer',
    description: 'The information at the bottom of the site.',
    fields: [
      { label: 'First footer text', selector: '.footer-grid > div:nth-child(1) p', kind: 'long' },
      { label: 'Studio title', selector: '.footer-grid > div:nth-child(2) strong', kind: 'short' },
      { label: 'Studio text', selector: '.footer-grid > div:nth-child(2) p', kind: 'long' },
      { label: 'Online title', selector: '.footer-grid > div:nth-child(3) strong', kind: 'short' },
      { label: 'Instagram footer text', selector: '.footer-grid > div:nth-child(3) p a:nth-of-type(1)', kind: 'short' },
      { label: 'Instagram footer link', selector: '.footer-grid > div:nth-child(3) p a:nth-of-type(1)', attribute: 'href', kind: 'url' },
      { label: 'Contact footer text', selector: '.footer-grid > div:nth-child(3) p a:nth-of-type(2)', kind: 'short' },
      { label: 'Contact footer link', selector: '.footer-grid > div:nth-child(3) p a:nth-of-type(2)', attribute: 'href', kind: 'url' },
      { label: 'Copyright line', selector: '.footer small', kind: 'short' }
    ]
  }
];

const state = {
  config: loadConfig(),
  token: loadToken(),
  assets: [],
  currentPage: {
    path: '',
    sha: '',
    document: null,
    textElements: [],
    imageElements: []
  },
  translations: {
    sha: '',
    source: '',
    object: null,
    literalStart: 0,
    literalEnd: 0
  },
  siteContent: {
    sha: '',
    source: '',
    object: null,
    literalStart: 0,
    literalEnd: 0
  },
  homeEditor: {
    path: 'index.html',
    sha: '',
    document: null,
    lastSavedAt: '',
    lastCommitMessage: ''
  }
};

const els = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  bindNavigation();
  bindForms();
  bindSiteContentTools();
  bindPageTools();
  bindTranslationTools();
  hydrateControls();
  updateConnectionStatus();
});

function cacheElements() {
  [
    'connectionStatus',
    'connectForm',
    'ownerInput',
    'repoInput',
    'branchInput',
    'tokenInput',
    'rememberTokenInput',
    'clearSessionBtn',
    'refreshImagesBtn',
    'uploadForm',
    'imageFileInput',
    'imageNameInput',
    'imageCommitInput',
    'assetGrid',
    'pageSelect',
    'customPagePathInput',
    'loadPageBtn',
    'savePageBtn',
    'pageTitleInput',
    'pageDescriptionInput',
    'pageCommitInput',
    'textBlocks',
    'imageBlocks',
    'textCount',
    'imageRefCount',
    'pagePreview',
    'previewStatus',
    'loadSiteContentBtn',
    'saveSiteContentBtn',
    'sectionTypeSelect',
    'addSectionBtn',
    'siteContentCommitInput',
    'siteSectionCount',
    'siteSectionList',
    'visualPreview',
    'publicSiteLink',
    'homeEditorStatus',
    'homePreviewFrame',
    'confirmRecipientSelect',
    'confirmAfterSaveInput',
    'confirmationCard',
    'confirmationState',
    'confirmationMessageInput',
    'sendWhatsappConfirmBtn',
    'sendSmsConfirmBtn',
    'copyConfirmMessageBtn',
    'loadTranslationsBtn',
    'saveTranslationsBtn',
    'translationSearchInput',
    'translationCommitInput',
    'addTranslationForm',
    'newTranslationKeyInput',
    'newTranslationValueInput',
    'translationList',
    'toast'
  ].forEach(id => {
    els[id] = document.getElementById(id);
  });
}

function bindNavigation() {
  document.querySelectorAll('[data-panel-target]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-panel-target]').forEach(item => item.classList.remove('is-active'));
      document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('is-active'));
      button.classList.add('is-active');
      document.getElementById(button.dataset.panelTarget)?.classList.add('is-active');
    });
  });
}

function bindForms() {
  els.connectForm.addEventListener('submit', async event => {
    event.preventDefault();
    state.config = {
      owner: els.ownerInput.value.trim() || DEFAULT_CONFIG.owner,
      repo: els.repoInput.value.trim() || DEFAULT_CONFIG.repo,
      branch: els.branchInput.value.trim() || DEFAULT_CONFIG.branch
    };
    state.token = els.tokenInput.value.trim() || state.token;

    saveConfig(state.config);
    saveToken(state.token, els.rememberTokenInput.checked);

    await runTask('Connecting to GitHub...', async () => {
      const repo = await githubRequest(`/repos/${state.config.owner}/${state.config.repo}`);
      updateConnectionStatus(true);
      showToast(`Connected to ${repo.full_name}`);
      await loadAssets();
    });
  });

  els.clearSessionBtn.addEventListener('click', () => {
    sessionStorage.removeItem('atelierKokaAdminToken');
    localStorage.removeItem('atelierKokaAdminToken');
    state.token = '';
    els.tokenInput.value = '';
    updateConnectionStatus(false);
    showToast('Session cleared');
  });

  els.refreshImagesBtn.addEventListener('click', () => runTask('Loading images...', loadAssets));

  els.uploadForm.addEventListener('submit', async event => {
    event.preventDefault();
    const file = els.imageFileInput.files?.[0];
    if (!file) {
      showToast('Choose an image file first');
      return;
    }

    await runTask('Uploading image...', async () => {
      const fileName = sanitizeFileName(els.imageNameInput.value || file.name);
      const targetPath = `assets/${fileName}`;
      const existing = await getOptionalContent(targetPath);
      if (existing && !window.confirm(`${targetPath} already exists. Replace it?`)) return;

      const content = await arrayBufferToBase64(await file.arrayBuffer());
      await putContent(targetPath, content, els.imageCommitInput.value.trim() || `Add ${fileName}`, existing?.sha);
      els.imageFileInput.value = '';
      els.imageNameInput.value = '';
      await loadAssets();
      showToast(`Uploaded ${targetPath}`);
    });
  });

  els.imageFileInput.addEventListener('change', () => {
    const file = els.imageFileInput.files?.[0];
    if (file && !els.imageNameInput.value) els.imageNameInput.value = sanitizeFileName(file.name);
  });
}

function bindSiteContentTools() {
  els.loadSiteContentBtn?.addEventListener('click', () => runTask('Loading homepage...', loadHomeEditor));
  els.saveSiteContentBtn?.addEventListener('click', () => runTask('Saving homepage...', saveHomeEditor));
  els.siteContentCommitInput?.addEventListener('input', () => updateConfirmationMessage());
  els.confirmRecipientSelect?.addEventListener('change', () => updateConfirmationMessage());
  els.copyConfirmMessageBtn?.addEventListener('click', copyConfirmationMessage);
  els.sendWhatsappConfirmBtn?.addEventListener('click', () => openConfirmationMessage('whatsapp'));
  els.sendSmsConfirmBtn?.addEventListener('click', () => openConfirmationMessage('sms'));
}

function bindPageTools() {
  els.pageSelect.addEventListener('change', () => {
    if (els.pageSelect.value !== '__custom__') els.customPagePathInput.value = '';
  });

  els.loadPageBtn.addEventListener('click', () => runTask('Loading page...', loadPage));
  els.savePageBtn.addEventListener('click', () => runTask('Saving page...', savePage));
}

function bindTranslationTools() {
  els.loadTranslationsBtn.addEventListener('click', () => runTask('Loading French text...', loadTranslations));
  els.saveTranslationsBtn.addEventListener('click', () => runTask('Saving French text...', saveTranslations));
  els.translationSearchInput.addEventListener('input', renderTranslations);
  els.addTranslationForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!state.translations.object) {
      showToast('Load the FR text first');
      return;
    }
    const key = els.newTranslationKeyInput.value.trim();
    const value = els.newTranslationValueInput.value.trim();
    if (!key || !value) {
      showToast('Add both English and French text');
      return;
    }
    state.translations.object.fr = state.translations.object.fr || {};
    state.translations.object.fr[key] = value;
    els.newTranslationKeyInput.value = '';
    els.newTranslationValueInput.value = '';
    renderTranslations();
  });
}

function hydrateControls() {
  els.ownerInput.value = state.config.owner;
  els.repoInput.value = state.config.repo;
  els.branchInput.value = state.config.branch;
  els.tokenInput.value = state.token;

  PAGE_OPTIONS.forEach(page => {
    const option = document.createElement('option');
    option.value = page.path;
    option.textContent = `${page.label} (${page.path})`;
    els.pageSelect.appendChild(option);
  });
  const customOption = document.createElement('option');
  customOption.value = '__custom__';
  customOption.textContent = 'Custom path';
  els.pageSelect.appendChild(customOption);

  renderHomeEditorSections();
  renderHomePreview();
  updateConfirmationMessage();
}

function loadConfig() {
  try {
    return { ...DEFAULT_CONFIG, ...JSON.parse(localStorage.getItem('atelierKokaAdminConfig') || '{}') };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

function saveConfig(config) {
  localStorage.setItem('atelierKokaAdminConfig', JSON.stringify(config));
}

function loadToken() {
  return sessionStorage.getItem('atelierKokaAdminToken') || localStorage.getItem('atelierKokaAdminToken') || '';
}

function saveToken(token, remember) {
  sessionStorage.setItem('atelierKokaAdminToken', token);
  if (remember) {
    localStorage.setItem('atelierKokaAdminToken', token);
  } else {
    localStorage.removeItem('atelierKokaAdminToken');
  }
}

function updateConnectionStatus(online = Boolean(state.token)) {
  els.connectionStatus.textContent = online
    ? `${state.config.owner}/${state.config.repo}:${state.config.branch}`
    : 'Not connected';
  els.connectionStatus.classList.toggle('is-online', online);
}

async function githubRequest(path, options = {}) {
  if (!state.token) throw new Error('Connect with a GitHub token first');
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${state.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    let message = `${response.status} ${response.statusText}`;
    try {
      const body = await response.json();
      if (body.message) message = body.message;
    } catch {
      /* Keep the status text fallback. */
    }
    throw new Error(message);
  }

  if (response.status === 204) return null;
  return response.json();
}

function contentsPath(path) {
  return `/repos/${state.config.owner}/${state.config.repo}/contents/${encodeGitPath(path)}`;
}

function encodeGitPath(path) {
  return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

async function getContent(path) {
  return githubRequest(`${contentsPath(path)}?ref=${encodeURIComponent(state.config.branch)}`);
}

async function getOptionalContent(path) {
  try {
    return await getContent(path);
  } catch (error) {
    if (/not found/i.test(error.message)) return null;
    throw error;
  }
}

async function putContent(path, content, message, sha) {
  return githubRequest(contentsPath(path), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content,
      branch: state.config.branch,
      ...(sha ? { sha } : {})
    })
  });
}

async function deleteContent(path, sha, message) {
  return githubRequest(contentsPath(path), {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      sha,
      branch: state.config.branch
    })
  });
}

async function loadAssets() {
  const entries = await githubRequest(`${contentsPath('assets')}?ref=${encodeURIComponent(state.config.branch)}`);
  state.assets = entries
    .filter(item => item.type === 'file' && IMAGE_EXTENSIONS.test(item.name))
    .map(item => ({
      name: item.name,
      path: item.path,
      sha: item.sha,
      size: item.size,
      rawUrl: rawUrl(item.path)
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
  renderAssets();
  refreshImageSelects();
  showToast(`Loaded ${state.assets.length} images`);
}

function renderAssets() {
  els.assetGrid.innerHTML = '';
  if (!state.assets.length) {
    els.assetGrid.innerHTML = '<div class="tool-card">No images loaded yet.</div>';
    return;
  }

  state.assets.forEach(asset => {
    const card = document.createElement('article');
    card.className = 'asset-card';
    card.innerHTML = `
      <div class="asset-thumb">${asset.name.endsWith('.svg') ? '<span>SVG</span>' : `<img alt="" src="${asset.rawUrl}">`}</div>
      <div class="asset-meta">${asset.path}<br>${formatBytes(asset.size)}</div>
      <div class="action-row">
        <button class="ghost-btn" type="button" data-copy-asset="${asset.path}">Copy path</button>
        <button class="ghost-btn" type="button" data-delete-asset="${asset.path}">Delete</button>
      </div>
    `;
    els.assetGrid.appendChild(card);
  });

  els.assetGrid.querySelectorAll('[data-copy-asset]').forEach(button => {
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(button.dataset.copyAsset);
      showToast('Image path copied');
    });
  });

  els.assetGrid.querySelectorAll('[data-delete-asset]').forEach(button => {
    button.addEventListener('click', async () => {
      const asset = state.assets.find(item => item.path === button.dataset.deleteAsset);
      if (!asset) return;
      if (!window.confirm(`Delete ${asset.path}? This creates a GitHub commit.`)) return;
      await runTask('Deleting image...', async () => {
        await deleteContent(asset.path, asset.sha, `Delete ${asset.name}`);
        await loadAssets();
        showToast(`Deleted ${asset.path}`);
      });
    });
  });
}

async function loadPage() {
  if (!state.assets.length) await loadAssets();

  const pagePath = getSelectedPagePath();
  if (!pagePath) {
    showToast('Choose a page first');
    return;
  }

  const file = await getContent(pagePath);
  const html = decodeBase64(file.content);
  const doc = new DOMParser().parseFromString(html, 'text/html');

  state.currentPage = {
    path: pagePath,
    sha: file.sha,
    document: doc,
    textElements: extractTextElements(doc),
    imageElements: Array.from(doc.querySelectorAll('img'))
  };

  els.pageTitleInput.value = doc.title || '';
  els.pageDescriptionInput.value = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  renderTextBlocks();
  renderImageBlocks();
  renderPreview();
  showToast(`Loaded ${pagePath}`);
}

function getSelectedPagePath() {
  const customPath = els.customPagePathInput.value.trim().replace(/^\/+/, '');
  if (customPath) return customPath;
  return els.pageSelect.value === '__custom__' ? '' : els.pageSelect.value;
}

function extractTextElements(doc) {
  const roots = [
    ...doc.querySelectorAll('.topbar'),
    ...doc.querySelectorAll('main'),
    ...doc.querySelectorAll('.footer')
  ];
  const seen = new Set();
  const elements = [];
  const selector = 'h1,h2,h3,p,a,span,label,option,button,small,strong,.kicker,.smallcaps';

  roots.forEach(root => {
    root.querySelectorAll(selector).forEach(element => {
      if (seen.has(element)) return;
      seen.add(element);
      if (element.closest('script,style,template,noscript,.marquee-track')) return;
      if (element.classList.contains('number')) return;
      const text = getEditableText(element).trim();
      if (!text || text.length > 800) return;
      elements.push(element);
    });
  });

  return elements;
}

function getEditableText(element) {
  return Array.from(element.childNodes).map(node => {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
    if (node.nodeName === 'BR') return '\n';
    if (node.nodeType === Node.ELEMENT_NODE) return node.textContent;
    return '';
  }).join('').replace(/\n{3,}/g, '\n\n');
}

function setEditableText(element, text) {
  element.replaceChildren();
  text.split('\n').forEach((line, index) => {
    if (index) element.appendChild(element.ownerDocument.createElement('br'));
    element.appendChild(element.ownerDocument.createTextNode(line));
  });
}

function renderTextBlocks() {
  els.textBlocks.innerHTML = '';
  els.textCount.textContent = String(state.currentPage.textElements.length);

  state.currentPage.textElements.forEach((element, index) => {
    const block = document.createElement('div');
    block.className = 'edit-block';
    const label = describeElement(element, index);
    block.innerHTML = `
      <div class="block-label"><span>${label}</span><span>${element.tagName.toLowerCase()}</span></div>
      <textarea data-text-index="${index}" rows="3"></textarea>
    `;
    const textarea = block.querySelector('textarea');
    textarea.value = getEditableText(element);
    textarea.addEventListener('input', () => {
      setEditableText(element, textarea.value);
      renderPreview();
    });
    els.textBlocks.appendChild(block);
  });
}

function renderImageBlocks() {
  els.imageBlocks.innerHTML = '';
  els.imageRefCount.textContent = String(state.currentPage.imageElements.length);

  state.currentPage.imageElements.forEach((image, index) => {
    const currentPath = image.getAttribute('src') || '';
    const resolvedPath = resolveSitePath(currentPath, state.currentPage.path);
    const block = document.createElement('div');
    block.className = 'edit-block';
    block.innerHTML = `
      <div class="block-label"><span>Image ${index + 1}</span><span>${currentPath}</span></div>
      <div class="image-row">
        <img alt="" src="${previewImageUrl(currentPath, state.currentPage.path)}">
        <div class="form-stack">
          <label>Source <select data-image-src="${index}"></select></label>
          <label>Alt text <input data-image-alt="${index}" value=""></label>
        </div>
      </div>
    `;

    const select = block.querySelector('[data-image-src]');
    select.appendChild(new Option('Keep current image', currentPath));
    state.assets.forEach(asset => {
      select.appendChild(new Option(asset.path, asset.path));
    });
    if (state.assets.some(asset => asset.path === resolvedPath)) select.value = resolvedPath;

    select.addEventListener('change', () => {
      if (select.value && select.value !== currentPath) {
        image.setAttribute('src', relativePath(state.currentPage.path, select.value));
        block.querySelector('img').src = rawUrl(select.value);
      }
      renderPreview();
    });

    const altInput = block.querySelector('[data-image-alt]');
    altInput.value = image.getAttribute('alt') || '';
    altInput.addEventListener('input', () => {
      image.setAttribute('alt', altInput.value);
      renderPreview();
    });

    els.imageBlocks.appendChild(block);
  });
}

function refreshImageSelects() {
  if (state.currentPage.document) renderImageBlocks();
  if (state.homeEditor.document) renderHomeEditorSections();
}

async function loadHomeEditor() {
  if (!state.assets.length) await loadAssets();

  const file = await getContent(state.homeEditor.path);
  const html = decodeBase64(file.content);
  const doc = new DOMParser().parseFromString(html, 'text/html');

  state.homeEditor = {
    ...state.homeEditor,
    sha: file.sha,
    document: doc,
    lastSavedAt: '',
    lastCommitMessage: ''
  };

  els.homeEditorStatus.textContent = 'Homepage loaded. Open a block below and edit the fields.';
  renderHomeEditorSections();
  renderHomePreview();
  updateConfirmationMessage();
  showToast('Homepage loaded');
}

function renderHomeEditorSections() {
  els.siteSectionList.innerHTML = '';
  els.siteSectionCount.textContent = String(HOME_EDITOR_SECTIONS.length);

  if (!state.homeEditor.document) {
    els.siteSectionList.innerHTML = `
      <div class="empty-editor">
        <strong>Start here</strong>
        <p>Click Load homepage. The editor will open simple blocks for the text, links, buttons, and images on the public homepage.</p>
      </div>
    `;
    return;
  }

  HOME_EDITOR_SECTIONS.forEach((section, sectionIndex) => {
    const details = document.createElement('details');
    details.className = 'shop-section-card';
    if (sectionIndex === 0) details.open = true;

    const missingCount = section.fields.filter(field => !getHomeFieldElement(field)).length;
    const completeCount = section.fields.length - missingCount;
    details.innerHTML = `
      <summary>
        <span class="shop-section-number">${sectionIndex + 1}</span>
        <span>
          <strong>${escapeHtml(section.title)}</strong>
          <small>${escapeHtml(section.description)}</small>
        </span>
        <em>${completeCount}/${section.fields.length}</em>
      </summary>
      <div class="shop-field-grid"></div>
    `;

    const grid = details.querySelector('.shop-field-grid');
    section.fields.forEach((field, fieldIndex) => {
      grid.appendChild(renderHomeField(field, `${sectionIndex}-${fieldIndex}`));
    });

    els.siteSectionList.appendChild(details);
  });
}

function renderHomeField(field, key) {
  const element = getHomeFieldElement(field);
  const row = document.createElement('label');
  row.className = 'shop-field';
  if (!element) row.classList.add('is-missing');

  const currentValue = element ? readHomeFieldValue(field, element) : '';
  const controlId = `home-field-${key}`;
  const help = field.attribute === 'href'
    ? 'Use a page path like contact/index.html or a full link like https://...'
    : field.kind === 'image'
      ? 'Choose an uploaded image from the website assets folder.'
      : 'This is visible website text.';

  row.innerHTML = `
    <span>${escapeHtml(field.label)}</span>
    ${element ? renderHomeFieldControl(field, controlId, currentValue) : '<div class="missing-field">This block is not on the current page.</div>'}
    <small>${escapeHtml(help)}</small>
  `;

  const control = row.querySelector('[data-home-field]');
  if (control) {
    control.addEventListener('input', () => updateHomeField(field, control.value));
    control.addEventListener('change', () => updateHomeField(field, control.value));
  }

  return row;
}

function renderHomeFieldControl(field, controlId, value) {
  const escapedValue = escapeAttribute(value);
  if (field.kind === 'long') {
    return `<textarea id="${controlId}" data-home-field rows="4">${escapeHtml(value)}</textarea>`;
  }

  if (field.kind === 'image') {
    const resolvedPath = resolveSitePath(value, state.homeEditor.path);
    const options = ['<option value="">No image selected</option>'];
    if (value && !state.assets.some(asset => asset.path === resolvedPath)) {
      options.push(`<option value="${escapedValue}" selected>Keep current image (${escapeHtml(value)})</option>`);
    }
    state.assets.forEach(asset => {
      const selected = asset.path === resolvedPath ? ' selected' : '';
      options.push(`<option value="${escapeAttribute(asset.path)}"${selected}>${escapeHtml(asset.path)}</option>`);
    });
    return `<select id="${controlId}" data-home-field>${options.join('')}</select>`;
  }

  const inputType = 'text';
  return `<input id="${controlId}" data-home-field type="${inputType}" value="${escapedValue}">`;
}

function getHomeFieldElement(field) {
  return state.homeEditor.document?.querySelector(field.selector) || null;
}

function readHomeFieldValue(field, element) {
  if (field.attribute) return element.getAttribute(field.attribute) || '';
  return getEditableText(element).trim();
}

function updateHomeField(field, value) {
  const element = getHomeFieldElement(field);
  if (!element) return;

  if (field.attribute) {
    const nextValue = field.kind === 'image' && value && !/^https?:|^data:/i.test(value)
      ? relativePath(state.homeEditor.path, value)
      : value;
    element.setAttribute(field.attribute, nextValue);
  } else {
    setEditableText(element, value);
  }

  els.homeEditorStatus.textContent = 'Unsaved changes. Press Save changes when ready.';
  renderHomePreview();
  updateConfirmationMessage();
}

function renderHomePreview() {
  if (!els.homePreviewFrame) return;
  if (!state.homeEditor.document) {
    els.homePreviewFrame.srcdoc = '<!doctype html><html><body><p>Load the homepage to see a preview.</p></body></html>';
    return;
  }

  const clone = new DOMParser().parseFromString(serializeDocument(state.homeEditor.document), 'text/html');
  const base = clone.createElement('base');
  base.setAttribute('href', rawRootUrl());
  clone.head.prepend(base);
  clone.querySelectorAll('script').forEach(script => script.remove());
  els.homePreviewFrame.srcdoc = serializeDocument(clone);
}

function saveHomeEditor() {
  if (!state.homeEditor.document) {
    showToast('Load the homepage before saving');
    return Promise.resolve();
  }

  const commitMessage = els.siteContentCommitInput.value.trim() || 'Update homepage content';
  const html = serializeDocument(state.homeEditor.document);
  return putContent(
    state.homeEditor.path,
    encodeBase64(html),
    commitMessage,
    state.homeEditor.sha
  ).then(result => {
    state.homeEditor.sha = result.content.sha;
    state.homeEditor.lastSavedAt = new Date().toISOString();
    state.homeEditor.lastCommitMessage = commitMessage;
    els.homeEditorStatus.textContent = 'Saved. Render will publish the update from GitHub.';
    renderHomePreview();
    updateConfirmationMessage();
    showToast('Homepage saved');
    if (els.confirmAfterSaveInput.checked) {
      els.confirmationCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

function updateConfirmationMessage() {
  if (!els.confirmationMessageInput) return;
  const contact = getSelectedConfirmationContact();
  const savedText = state.homeEditor.lastSavedAt
    ? `Saved at ${formatConfirmationTime(state.homeEditor.lastSavedAt)}`
    : 'Ready to send after you save';
  const commitText = state.homeEditor.lastCommitMessage || els.siteContentCommitInput?.value.trim() || 'Homepage update';
  const message = [
    `Hi ${contact.name}, Atelier Koka homepage changes are ready.`,
    savedText,
    `Change note: ${commitText}`,
    'Public site: https://atelier-koka-site.onrender.com/',
    'Please check it when Render has finished publishing.'
  ].join('\n');

  els.confirmationMessageInput.value = message;
  els.confirmationState.textContent = state.homeEditor.lastSavedAt ? `For ${contact.name}` : 'Ready after save';
}

function getSelectedConfirmationContact() {
  return CONFIRMATION_CONTACTS[els.confirmRecipientSelect?.value] || CONFIRMATION_CONTACTS.rayann;
}

function copyConfirmationMessage() {
  const message = els.confirmationMessageInput?.value || '';
  if (!message) return;
  navigator.clipboard.writeText(message)
    .then(() => showToast('Confirmation message copied'))
    .catch(() => showToast('Could not copy message'));
}

function openConfirmationMessage(channel) {
  const contact = getSelectedConfirmationContact();
  const message = encodeURIComponent(els.confirmationMessageInput?.value || '');
  const url = channel === 'whatsapp'
    ? `https://wa.me/${contact.whatsapp}?text=${message}`
    : `sms:${contact.phone}?&body=${message}`;
  window.open(url, '_blank', 'noopener');
}

function formatConfirmationTime(isoDate) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

async function loadSiteContent() {
  const file = await getContent('site-content.js');
  const source = decodeBase64(file.content);
  const extracted = extractObjectLiteral(source, 'window.ATELIER_CONTENT =');
  const content = Function(`"use strict"; return (${extracted.literal});`)();

  state.siteContent = {
    sha: file.sha,
    source,
    object: content,
    literalStart: extracted.start,
    literalEnd: extracted.end
  };

  getHomepageSections();
  renderSiteSections();
  renderVisualPreview();
  showToast('Loaded homepage sections');
}

function getHomepageSections() {
  const content = state.siteContent.object || {};
  content.home = content.home && typeof content.home === 'object' ? content.home : {};
  content.home.sections = Array.isArray(content.home.sections) ? content.home.sections : [];
  state.siteContent.object = content;
  return content.home.sections;
}

function renderSiteSections() {
  els.siteSectionList.innerHTML = '';
  if (!state.siteContent.object) {
    els.siteSectionCount.textContent = '0';
    els.siteSectionList.innerHTML = '<div class="tool-card">Load the homepage to see its current sections.</div>';
    renderVisualPreview();
    return;
  }

  const sections = getHomepageSections();
  els.siteSectionCount.textContent = String(sections.length);

  if (!sections.length) {
    els.siteSectionList.innerHTML = '<div class="tool-card">No sections yet. Add one above.</div>';
    renderVisualPreview();
    return;
  }

  sections.forEach((section, index) => {
    const card = document.createElement('article');
    card.className = 'site-section-card';
    const title = section.title || section.heading || section.label || `Section ${index + 1}`;
    const description = section.body || section.text || section.description || section.subtitle || summarizeSectionItems(section);
    card.innerHTML = `
      <div class="site-section-summary">
        <div>
          <span class="site-section-type">${escapeHtml(section.type || 'section')}</span>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(description)}</p>
        </div>
        <div class="section-actions">
          <button class="ghost-btn" type="button" data-section-action="up" ${index === 0 ? 'disabled' : ''}>Up</button>
          <button class="ghost-btn" type="button" data-section-action="down" ${index === sections.length - 1 ? 'disabled' : ''}>Down</button>
          <button class="ghost-btn" type="button" data-section-action="duplicate">Duplicate</button>
          <button class="ghost-btn" type="button" data-section-action="delete">Delete</button>
        </div>
      </div>
      <textarea class="site-section-json" data-section-json="${index}" rows="14" spellcheck="false"></textarea>
      <div class="action-row">
        <button class="secondary-btn" type="button" data-section-action="apply">Apply edit</button>
      </div>
    `;

    const textarea = card.querySelector('[data-section-json]');
    textarea.value = JSON.stringify(section, null, 2);
    textarea.addEventListener('input', () => textarea.classList.remove('is-invalid'));

    card.querySelectorAll('[data-section-action]').forEach(button => {
      button.addEventListener('click', () => {
        const action = button.dataset.sectionAction;
        if (action === 'apply') applySectionJson(index, textarea.value);
        if (action === 'duplicate') duplicateSection(index);
        if (action === 'up') moveSection(index, -1);
        if (action === 'down') moveSection(index, 1);
        if (action === 'delete') deleteSection(index);
      });
    });

    els.siteSectionList.appendChild(card);
  });
}

function summarizeSectionItems(section) {
  const collections = [section.items, section.steps, section.actions].filter(Array.isArray);
  if (!collections.length) return '';
  return collections
    .flat()
    .slice(0, 3)
    .map(item => item.title || item.label || item.heading || item.name)
    .filter(Boolean)
    .join(' / ');
}

function applySectionJson(index, value) {
  try {
    const parsed = JSON.parse(value);
    if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error('Section must be an object');
    const sections = getHomepageSections();
    sections[index] = parsed;
    renderSiteSections();
    renderVisualPreview();
    showToast('Section updated');
  } catch (error) {
    els.siteSectionList.querySelector(`[data-section-json="${index}"]`)?.classList.add('is-invalid');
    showToast(error.message || 'Fix this section JSON');
  }
}

function duplicateSection(index) {
  if (!syncSiteSectionEditors()) return;
  const sections = getHomepageSections();
  const copy = JSON.parse(JSON.stringify(sections[index]));
  copy.id = uniqueSectionId(`${copy.id || copy.type || 'section'}-copy`);
  sections.splice(index + 1, 0, copy);
  renderSiteSections();
  renderVisualPreview();
  showToast('Section duplicated');
}

function moveSection(index, direction) {
  if (!syncSiteSectionEditors()) return;
  const sections = getHomepageSections();
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= sections.length) return;
  [sections[index], sections[nextIndex]] = [sections[nextIndex], sections[index]];
  renderSiteSections();
  renderVisualPreview();
}

function deleteSection(index) {
  if (!window.confirm('Delete this homepage section?')) return;
  if (!syncSiteSectionEditors()) return;
  getHomepageSections().splice(index, 1);
  renderSiteSections();
  renderVisualPreview();
  showToast('Section deleted');
}

function syncSiteSectionEditors() {
  if (!state.siteContent.object) return false;
  const editors = Array.from(els.siteSectionList.querySelectorAll('[data-section-json]'));
  if (!editors.length) return true;
  const sections = [];

  for (const editor of editors) {
    try {
      const parsed = JSON.parse(editor.value);
      if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') throw new Error('Section must be an object');
      sections.push(parsed);
      editor.classList.remove('is-invalid');
    } catch {
      editor.classList.add('is-invalid');
      showToast(`Fix JSON in section ${Number(editor.dataset.sectionJson) + 1}`);
      return false;
    }
  }

  state.siteContent.object.home.sections = sections;
  return true;
}

function renderVisualPreview() {
  if (!els.visualPreview) return;
  els.publicSiteLink.href = `https://${state.config.repo === 'atelier-koka-site' ? 'atelier-koka-site' : state.config.repo}.onrender.com/`;
  els.visualPreview.innerHTML = '';

  if (!state.siteContent.object) {
    els.visualPreview.innerHTML = '<div class="visual-preview-copy">Load the homepage to preview the current public sections.</div>';
    return;
  }

  const sections = getHomepageSections();
  if (!sections.length) {
    els.visualPreview.innerHTML = '<div class="visual-preview-copy">No homepage sections yet.</div>';
    return;
  }

  sections.forEach(section => {
    const image = getSectionImage(section);
    const title = section.title || section.heading || section.label || section.type || 'Section';
    const text = section.body || section.text || section.description || section.subtitle || summarizeSectionItems(section);
    const card = document.createElement('article');
    card.className = 'visual-preview-card';
    card.innerHTML = `
      ${image ? `<img alt="" src="${escapeAttribute(previewSiteAsset(image))}">` : '<div class="visual-preview-image-empty"></div>'}
      <div class="visual-preview-copy">
        <span>${escapeHtml(section.type || 'section')}</span>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    els.visualPreview.appendChild(card);
  });
}

function getSectionImage(section) {
  if (section.primaryImage) return section.primaryImage;
  if (section.image) return section.image;
  if (Array.isArray(section.items)) {
    const item = section.items.find(entry => entry.image || entry.primaryImage);
    if (item) return item.image || item.primaryImage;
  }
  return '';
}

function previewSiteAsset(path) {
  if (!path || /^https?:|^data:/i.test(path)) return path;
  return rawUrl(path.replace(/^\/+/, ''));
}

function uniqueSectionId(base) {
  const normalized = String(base || 'section')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
  const existing = new Set(getHomepageSections().map(section => section.id).filter(Boolean));
  if (!existing.has(normalized)) return normalized;
  let suffix = 2;
  while (existing.has(`${normalized}-${suffix}`)) suffix += 1;
  return `${normalized}-${suffix}`;
}

function sectionTemplate(type) {
  const id = uniqueSectionId(`${type}-${Date.now().toString(36).slice(-5)}`);
  const templates = {
    hero: {
      id,
      type: 'hero',
      kicker: 'New homepage story',
      title: 'Atelier Koka',
      body: 'Rewrite this hero with a sharper message for the studio.',
      primaryAction: { label: 'Book a tattoo', href: 'contact/' },
      secondaryAction: { label: 'View work', href: 'artists/' },
      primaryImage: 'assets/koka-studio-table.jpg',
      primaryAlt: 'Atelier Koka studio table',
      secondaryImage: 'assets/koka-process-collage.jpg',
      secondaryAlt: 'Atelier Koka process collage'
    },
    manifesto: {
      id,
      type: 'manifesto',
      kicker: 'Point of view',
      title: 'A new section title',
      items: [
        { title: 'One', text: 'Describe the first idea.' },
        { title: 'Two', text: 'Describe the second idea.' },
        { title: 'Three', text: 'Describe the third idea.' }
      ]
    },
    gallery: {
      id,
      type: 'gallery',
      kicker: 'Image wall',
      title: 'New gallery section',
      body: 'Add studio, tattoo, drawing or flash images here.',
      items: [
        { title: 'Image one', text: 'Short caption.', image: 'assets/koka-studio-table.jpg', alt: 'Atelier Koka image' },
        { title: 'Image two', text: 'Short caption.', image: 'assets/koka-flash-wall.jpg', alt: 'Atelier Koka image' }
      ]
    },
    editorial: {
      id,
      type: 'editorial',
      kicker: 'Editorial block',
      title: 'New editorial split',
      body: 'Use this for a strong text and image moment.',
      image: 'assets/koka-paper-archive.jpg',
      alt: 'Atelier Koka paper archive',
      notes: ['Rewrite note one', 'Rewrite note two']
    },
    process: {
      id,
      type: 'process',
      kicker: 'Process',
      title: 'A new process band',
      steps: [
        { title: 'Consult', text: 'Describe this step.' },
        { title: 'Draw', text: 'Describe this step.' },
        { title: 'Tattoo', text: 'Describe this step.' }
      ]
    },
    booking: {
      id,
      type: 'booking',
      kicker: 'Booking',
      title: 'Ready to start?',
      body: 'Invite visitors to book, ask a question or share a tattoo idea.',
      buttonLabel: 'Start a request',
      buttonHref: 'contact/'
    }
  };
  return templates[type] || templates.editorial;
}

function saveSiteContent() {
  if (!state.siteContent.object) {
    showToast('Load the homepage before saving');
    return Promise.resolve();
  }
  if (!syncSiteSectionEditors()) return Promise.resolve();

  const nextSource = `${state.siteContent.source.slice(0, state.siteContent.literalStart)}${JSON.stringify(state.siteContent.object, null, 2)}${state.siteContent.source.slice(state.siteContent.literalEnd)}`;
  return putContent(
    'site-content.js',
    encodeBase64(nextSource),
    els.siteContentCommitInput.value.trim() || 'Update homepage sections',
    state.siteContent.sha
  ).then(result => {
    state.siteContent.sha = result.content.sha;
    state.siteContent.source = nextSource;
    const extracted = extractObjectLiteral(nextSource, 'window.ATELIER_CONTENT =');
    state.siteContent.literalStart = extracted.start;
    state.siteContent.literalEnd = extracted.end;
    renderSiteSections();
    renderVisualPreview();
    showToast('Saved homepage sections');
  });
}

function savePage() {
  if (!state.currentPage.document || !state.currentPage.path) {
    showToast('Load a page before saving');
    return Promise.resolve();
  }

  state.currentPage.document.title = els.pageTitleInput.value.trim();
  const metaDescription = state.currentPage.document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', els.pageDescriptionInput.value.trim());
  } else if (els.pageDescriptionInput.value.trim()) {
    const meta = state.currentPage.document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', els.pageDescriptionInput.value.trim());
    state.currentPage.document.head.appendChild(meta);
  }

  const html = serializeDocument(state.currentPage.document);
  return putContent(
    state.currentPage.path,
    encodeBase64(html),
    els.pageCommitInput.value.trim() || `Update ${state.currentPage.path}`,
    state.currentPage.sha
  ).then(result => {
    state.currentPage.sha = result.content.sha;
    showToast(`Saved ${state.currentPage.path}`);
  });
}

async function loadTranslations() {
  const file = await getContent('script.js');
  const source = decodeBase64(file.content);
  const extracted = extractObjectLiteral(source, 'const translations =');
  const translations = Function(`"use strict"; return (${extracted.literal});`)();

  state.translations = {
    sha: file.sha,
    source,
    object: translations,
    literalStart: extracted.start,
    literalEnd: extracted.end
  };
  state.translations.object.fr = state.translations.object.fr || {};
  renderTranslations();
  showToast('Loaded French dictionary');
}

function renderTranslations() {
  els.translationList.innerHTML = '';
  if (!state.translations.object) {
    els.translationList.innerHTML = '<div class="tool-card">Load the French text dictionary first.</div>';
    return;
  }

  const filter = els.translationSearchInput.value.trim().toLowerCase();
  const entries = Object.entries(state.translations.object.fr)
    .filter(([key, value]) => !filter || `${key} ${value}`.toLowerCase().includes(filter))
    .sort(([a], [b]) => a.localeCompare(b));

  entries.forEach(([key, value]) => {
    const row = document.createElement('div');
    row.className = 'translation-row';
    row.innerHTML = `
      <label>English source<textarea readonly rows="4"></textarea></label>
      <label>French text<textarea data-translation-key="${escapeAttribute(key)}" rows="4"></textarea></label>
      <button class="ghost-btn" type="button" data-remove-translation="${escapeAttribute(key)}">Remove</button>
    `;
    row.querySelector('label:first-child textarea').value = key;
    const valueInput = row.querySelector('[data-translation-key]');
    valueInput.value = value;
    valueInput.addEventListener('input', () => {
      state.translations.object.fr[key] = valueInput.value;
    });
    row.querySelector('[data-remove-translation]').addEventListener('click', () => {
      delete state.translations.object.fr[key];
      renderTranslations();
    });
    els.translationList.appendChild(row);
  });
}

function saveTranslations() {
  if (!state.translations.object) {
    showToast('Load the FR text before saving');
    return Promise.resolve();
  }
  const nextSource = `${state.translations.source.slice(0, state.translations.literalStart)}${JSON.stringify(state.translations.object, null, 2)}${state.translations.source.slice(state.translations.literalEnd)}`;
  return putContent(
    'script.js',
    encodeBase64(nextSource),
    els.translationCommitInput.value.trim() || 'Update French website text',
    state.translations.sha
  ).then(result => {
    state.translations.sha = result.content.sha;
    state.translations.source = nextSource;
    const extracted = extractObjectLiteral(nextSource, 'const translations =');
    state.translations.literalStart = extracted.start;
    state.translations.literalEnd = extracted.end;
    showToast('Saved French dictionary');
  });
}

function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`Could not find ${marker}`);
  const start = source.indexOf('{', markerIndex);
  if (start < 0) throw new Error('Could not find translations object');

  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = '';
      }
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') depth -= 1;
    if (depth === 0) {
      return {
        start,
        end: index + 1,
        literal: source.slice(start, index + 1)
      };
    }
  }
  throw new Error('Could not parse translations object');
}

function renderPreview() {
  if (!state.currentPage.document) {
    els.previewStatus.textContent = 'No page loaded';
    return;
  }
  els.previewStatus.textContent = state.currentPage.path;
  const clone = new DOMParser().parseFromString(serializeDocument(state.currentPage.document), 'text/html');
  const base = clone.createElement('base');
  base.setAttribute('href', previewBaseUrl());
  clone.head.prepend(base);
  els.pagePreview.srcdoc = serializeDocument(clone);
}

function serializeDocument(doc) {
  return `<!doctype html>\n${doc.documentElement.outerHTML}`;
}

function describeElement(element, index) {
  const className = element.className && typeof element.className === 'string'
    ? `.${element.className.trim().split(/\s+/).slice(0, 2).join('.')}`
    : '';
  return `${index + 1}. ${element.tagName.toLowerCase()}${className}`;
}

function rawRootUrl() {
  return `https://raw.githubusercontent.com/${encodeURIComponent(state.config.owner)}/${encodeURIComponent(state.config.repo)}/${encodeURIComponent(state.config.branch)}/`;
}

function previewBaseUrl() {
  const directory = state.currentPage.path.split('/').slice(0, -1).map(segment => encodeURIComponent(segment)).join('/');
  return `${rawRootUrl()}${directory ? `${directory}/` : ''}`;
}

function rawUrl(path) {
  return `${rawRootUrl()}${path.split('/').map(segment => encodeURIComponent(segment)).join('/')}`;
}

function previewImageUrl(src, pagePath) {
  const sitePath = resolveSitePath(src, pagePath);
  return sitePath && !/^https?:|^data:/i.test(sitePath) ? rawUrl(sitePath) : src;
}

function resolveSitePath(src, pagePath) {
  if (!src || /^https?:|^data:|^mailto:/i.test(src)) return src;
  const base = new URL(pagePath, 'https://atelier-koka.local/');
  return new URL(src, base).pathname.replace(/^\/+/, '');
}

function relativePath(fromFile, targetPath) {
  const fromParts = fromFile.split('/').slice(0, -1);
  const targetParts = targetPath.split('/');
  while (fromParts.length && targetParts.length && fromParts[0] === targetParts[0]) {
    fromParts.shift();
    targetParts.shift();
  }
  return `${'../'.repeat(fromParts.length)}${targetParts.join('/')}`;
}

function sanitizeFileName(name) {
  const fallback = `image-${Date.now()}.jpg`;
  const clean = (name || fallback)
    .toLowerCase()
    .replace(/\.[^.]+$/, extension => extension)
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
  if (!IMAGE_EXTENSIONS.test(clean)) return `${clean || `image-${Date.now()}`}.jpg`;
  return clean;
}

function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(unitIndex ? 1 : 0)} ${units[unitIndex]}`;
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function decodeBase64(base64) {
  const binary = atob(base64.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });
  return Promise.resolve(btoa(binary));
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

async function runTask(label, task) {
  setBusy(true);
  try {
    showToast(label);
    await task();
  } catch (error) {
    console.error(error);
    showToast(error.message || 'Something went wrong');
  } finally {
    setBusy(false);
  }
}

function setBusy(isBusy) {
  document.querySelectorAll('button').forEach(button => {
    if (button.classList.contains('nav-item')) return;
    button.disabled = isBusy;
  });
}

let toastTimer;
function showToast(message) {
  window.clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add('is-visible');
  toastTimer = window.setTimeout(() => {
    els.toast.classList.remove('is-visible');
  }, 3600);
}

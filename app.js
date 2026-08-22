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
  }
};

const els = {};

document.addEventListener('DOMContentLoaded', () => {
  cacheElements();
  bindNavigation();
  bindForms();
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

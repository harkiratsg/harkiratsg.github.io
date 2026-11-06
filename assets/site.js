const root = document.documentElement.dataset.root || './';
const page = document.documentElement.dataset.page;

async function mountSharedLayout() {
  const response = await fetch(`${root}base.html`);
  if (!response.ok) throw new Error('Could not load the shared layout.');
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  const headerTemplate = doc.querySelector('#site-header');
  const footerTemplate = doc.querySelector('#site-footer');
  if (!headerTemplate || !footerTemplate) throw new Error('Shared layout template is missing.');
  const header = headerTemplate.content.cloneNode(true);
  header.querySelectorAll('a[href]').forEach(link => {
    const path = link.getAttribute('href');
    if (path.startsWith('/')) link.href = `${root}${path.slice(1)}`;
  });
  const current = header.querySelector(`[data-page="${page}"]`);
  if (current) current.setAttribute('aria-current', 'page');
  document.querySelector('#header-mount').replaceWith(header);
  const footer = footerTemplate.content.cloneNode(true);
  footer.querySelector('[data-current-year]').textContent = new Date().getFullYear();
  document.querySelector('#footer-mount').replaceWith(footer);
  if (window.location.hash === '#contact') document.querySelector('#contact').scrollIntoView();
}

mountSharedLayout().catch(error => console.error(error));

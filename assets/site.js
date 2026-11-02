const root = document.documentElement.dataset.root || './';
const page = document.documentElement.dataset.page;

async function mountHeader() {
  const response = await fetch(`${root}base.html`);
  if (!response.ok) throw new Error('Could not load the shared navigation.');
  const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
  const template = doc.querySelector('#site-header');
  if (!template) throw new Error('Shared navigation template is missing.');
  const header = template.content.cloneNode(true);
  header.querySelectorAll('a[href]').forEach(link => {
    const path = link.getAttribute('href');
    if (path.startsWith('/')) link.href = `${root}${path.slice(1)}`;
  });
  const current = header.querySelector(`[data-page="${page}"]`);
  if (current) current.setAttribute('aria-current', 'page');
  document.querySelector('#header-mount').replaceWith(header);
}

mountHeader().catch(error => console.error(error));
document.querySelectorAll('[data-current-year]').forEach(year => {
  year.textContent = new Date().getFullYear();
});

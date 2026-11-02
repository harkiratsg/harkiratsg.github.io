const modal = document.querySelector('.modal');
const modalImage = document.querySelector('#modal-image');
const modalTitle = document.querySelector('#modal-title');
let trigger;

document.querySelectorAll('.art-open').forEach(button => {
  button.addEventListener('click', () => {
    trigger = button;
    const image = button.querySelector('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = button.dataset.title;
    modal.showModal();
  });
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
modal.addEventListener('close', () => trigger?.focus());

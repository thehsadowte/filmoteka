const openModalBtn = document.querySelector('[data-modal-open]');
const modal = document.querySelector('.backdrop');
const closeModalBtn = document.querySelector('[data-loginmodal-close]');

if (openModalBtn) {
  openModalBtn.addEventListener('click', openModal);
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

function openModal(event) {
  event.preventDefault();
  modal.classList.remove('is-hidden');
  document.addEventListener('keydown', closeOnEsc);
  document.addEventListener('click', closeOnBackdrop);
  //   event => {
  //   console.log('key: ', event.key);
  //   console.log('code: ', event.code);
  //   if (event.code === 'Escape') {
  //     closeModal(event);
  //   }
  // });
}

function closeModal(event) {
  event.preventDefault();

  modal.classList.add('is-hidden');
  document.removeEventListener('keydown', closeOnEsc);
  document.removeEventListener('click', closeOnBackdrop);
}

function closeOnEsc(event) {
  event.preventDefault();
  console.log('key: ', event.key);
  console.log('code: ', event.code);
  if (event.code === 'Escape') {
    closeModal(event);
    document.removeEventListener('keydown', closeOnEsc);
  }
}

function closeOnBackdrop(event) {
  event.preventDefault();
  if (event.target === modal) {
    closeModal(event);
    document.removeEventListener('click', closeOnBackdrop);
  }
}

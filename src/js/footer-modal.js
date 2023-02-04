const refs = {
  openModalFooter: document.querySelector('[data-modal-open]'),
  closeModalFooter: document.querySelector('[data-modal-close]'),
  modalFooter: document.querySelector('[data-modal]'),
  backdropFooter: document.querySelector('.backdrop-footer'),
};

refs.openModalFooter.addEventListener('click', onOpenFooterModal);
refs.closeModalFooter.addEventListener('click', onCloseFooterModal);
refs.backdropFooter.addEventListener('click', onBackdropCloseFooterModal);

function onOpenFooterModal() {
  refs.modalFooter.classList.remove('is-hidden-footer');
  window.addEventListener('keydown', onTargetKeydownFooter);
  document.body.style.overflow = 'hidden';
}

function onCloseFooterModal() {
  refs.modalFooter.classList.add('is-hidden-footer');
  window.removeEventListener('keydown', onTargetKeydownFooter);
  document.body.style.overflow = '';
}

function onBackdropCloseFooterModal(e) {
  if (e.currentTarget === e.target) {
    onCloseFooterModal();
  }
}

function onTargetKeydownFooter(e) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = e.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseFooterModal();
    window.removeEventListener('keydown', onTargetKeydownFooter);
  }
}

const buttonSearch = window.document.querySelector('#page-home main a');
const closeModal = window.document.querySelector('.header a');

buttonSearch.addEventListener('click', () => {
    document.getElementById('modal').classList.remove('hide');
})

closeModal.addEventListener('click', () => {
    document.getElementById('modal').classList.add('hide');
})
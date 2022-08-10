const settingsButtonEl = document.querySelector('#settingsButton')
const settingsPage = function() {
    console.log('imhit');
    window.location.href = `/settings`}
settingsButtonEl.addEventListener('click',settingsPage)
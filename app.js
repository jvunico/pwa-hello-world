let deferredPrompt;

const installBtn = document.getElementById('installBtn');
const appStatus = document.getElementById('appStatus');

function checkDisplayMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
    || window.navigator.standalone 
    || document.referrer.includes('android-app://');

    if(isStandalone) {
        appStatus.innerHTML = "<strong> Modo Standalone </strong>";
        installBtn.style.display = 'none';
    } 
    else {
        appStatus.innerHTML = "<strong> Modo Navegador </strong>";
    }
        
}

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.style.display = 'inline-block';
})

installBtn.addEventListener('click', async () => {
    if(deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Escolha do Usuário: ${outcome}`);

    deferredPrompt = null;

    installBtn.style.display = 'none';

})

window.addEventListener('DOMContentLoaded', checkDisplayMode);
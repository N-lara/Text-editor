const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// ///////////: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    // ////////////: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
        event.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'installing!';
    });
});

// ////////////: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    butInstall.textContent = 'Installed!';
    console.log('app installed', event);
});

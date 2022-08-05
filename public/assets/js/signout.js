const signoutBtn = document.getElementById('signoutBtn');

signoutBtn?.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/signout', {
            method: 'POST',
        });

        await response.json();
        window.location.href = '/';
    } catch (error) {
        alert(error);
    }
});
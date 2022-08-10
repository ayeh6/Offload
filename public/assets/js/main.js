const settingsButtonHeaderEl = document.getElementById('settings-button-header');
const signOutButtonHeaderEl = document.getElementById('sign-out-button-header');
const signInButtonHeaderEl = document.getElementById('sign-in-button-header');
const signUpButtonHeaderEl = document.getElementById('sign-up-button-header');

const goToSettingsPage = function() {
    window.location.href = `/settings`;
}

const signOutUser = async (event) => {
    event.preventDefault();
    console.log('signing out');
    try{
        const res = await fetch('/api/users/signout', {
            method: 'POST'
        });
        await res.json();
    } catch(error) {
        console.error(error);
        alert(error);
    }
    window.location.href = '/signin';
}

const goToSignInPage = (event) => {
    event.preventDefault();
    window.location.href = '/signin';
}

const goToSignUpPage = (event) => {
    event.preventDefault();
    window.location.href = '/signup';
}

settingsButtonHeaderEl?.addEventListener('click', goToSettingsPage);
signOutButtonHeaderEl?.addEventListener('click', signOutUser);
signInButtonHeaderEl?.addEventListener('click', goToSignInPage);
signUpButtonHeaderEl?.addEventListener('click', goToSignUpPage);

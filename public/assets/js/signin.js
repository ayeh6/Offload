const signInButtonEl = document.getElementById('sign-in-button');
const signinUsernameInputEl = document.getElementById('username-input');
const signinPasswordInputEl = document.getElementById('password-input');

const signInUser = async (event) => {
    event.preventDefault();
    console.log('clicked');
    const username = signinUsernameInputEl.value;
    const password = signinPasswordInputEl.value;

    // checks to make sure username is not empty
    if(username.trim().length === 0){
        alert('Please enter a valid username');
        return;
    }
    // checks that password is greater than 6 characters
    if(password.trim().length < 6){
        alert('Please enter a valid password. Password must be 6 characters long.');
        return;
    }

    // posts the user input to the /api/signup endpoint
    try {
        const response = await fetch('/api/users/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        });
        
        const responseData = await response.json();
        console.log(responseData);
        // change user window to the /users endpoint
        window.location.href = '/';
    } catch (error) {
        alert(error);
    }
}

signInButtonEl?.addEventListener('click', signInUser);
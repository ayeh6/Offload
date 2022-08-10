const usernameHeaderEl = document.getElementById("h1-username");
const aboutPEl = document.getElementById("p-about");
const phonePEl = document.getElementById("p-phone");
const emailPEl = document.getElementById("p-email");

const setUserData = async () => {
    const user = window.location.pathname.substring(1);
    const body = {
        username: user,
    }
    const userData = await fetch(`/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => response.json())
    .then((data) => {
        console.log(data);
        usernameHeaderEl.textContent = data.username;
        aboutPEl.textContent = data.about;
        phonePEl.textContent = data.phone;
        emailPEl.textContent = data.email;
    });
}

const getPostsFromUser = async () => {

}

setUserData();
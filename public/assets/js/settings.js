const savePasswordButtonEl = document.getElementById("save-new-password-button");
const inputCurrentPasswordEl = document.getElementById("current-password-input");
const inputNewPasswordEl = document.getElementById("new-password-input");
const inputConfirmPasswordEl = document.getElementById("confirm-password-input");

const inputAboutYouEl = document.getElementById("about-you-input");
const saveAboutYouButtonEl = document.getElementById("save-about-you-button");

const inputEmailEl = document.getElementById("email-input");
const inputPhoneNumberEl = document.getElementById("phone-number-input");
const saveContactButtonEl = document.getElementById("save-contact-button");

const changePassword = async (event) => {
    event.preventDefault();
    console.log("here");
    const newPasswordBody = {
        currentPassword: inputCurrentPasswordEl.value,
        newPassword: inputNewPasswordEl.value,
        confirmPassword: inputConfirmPasswordEl.value
    }
    try {
        const response = await fetch('/api/users/password', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPasswordBody)
        });

        await response.json();
        window.location.reload();
        alert("Your password has been changed successfully");
    } catch(error) {
        console.log(error);
        alert("An error has occured");
    }
}

const updateAboutYou = async (event) => {
    event.preventDefault();
    const aboutYou = {
        aboutYou: inputAboutYouEl.value,
    }
    try {
        const response = await fetch('/api/users/aboutyou', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(aboutYou)
        });
        await response.json();
        window.location.reload();
        alert("Your about information has been updated");
    } catch(error) {
        console.log(error);
        alert("An error has occured");
    }
}

const updateContactInfo = async (event) => {
    event.preventDefault();
    const contactInfo = {
        email: inputEmailEl.value,
        phone: inputPhoneNumberEl.value,
    }
    try {
        const response = await fetch('/api/users/contact', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contactInfo)
        });

        await response.json();
        window.location.reload();
        alert("Your contact info has been updated successfully");
    } catch(error) {
        console.log(error);
        alert("An error has occured");
    }
}

savePasswordButtonEl.addEventListener("click", changePassword);
saveAboutYouButtonEl.addEventListener("click", updateAboutYou);
saveContactButtonEl.addEventListener("click", updateContactInfo);



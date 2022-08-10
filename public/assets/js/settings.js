const savePasswordButtonEl = document.getElementById("save-new-password-button");
const inputCurrentPasswordEl = document.getElementById("current-password-input");
const inputNewPasswordEl = document.getElementById("new-password-input");
const inputConfirmPasswordEl = document.getElementById("confirm-password-input");

const inputAboutYouEl = document.getElementById("about-you-input");
const saveAboutYouButtonEl = document.getElementById("save-about-you-button");

const inputEmailEl = document.getElementById("email-input");
const inputPhoneNumberEl = document.getElementById("phone-number-input");
const saveContactButtonEl = document.getElementById("save-contact-button");

const changePassword = async () => {
    newPasswordBody = {
        currentPassword: inputCurrentPasswordEl.value,
        newPassword: inputNewPasswordEl.value,
        confirmPassword: inputConfirmPasswordEl.value
    }
    const response = await fetch('/api/users/password', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPasswordBody)
    });

    await response.json();
}

savePasswordButtonEl.addEventListener("click", changePassword);


const savePasswordBtn = document.querySelector(".saveNewpassword");
const inputCurrentPassword = document.querySelector("#currentPassword");
const inputNewPassword = document.querySelector("#newPassword");
const inputConfirmPassword = document.querySelector("#confirmPassword");

savePasswordBtn.addEventListener("click", () => {
  console.log("here");
  fetch("/api/users/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword: inputCurrentPassword.value,
      newPassword: inputNewPassword.value,
      confirmPassword: inputConfirmPassword.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});

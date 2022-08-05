const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const signUpBtn = document.getElementById('signUpBtn');
const signoutBtn = document.getElementById('signoutBtn');
const uploadBtn = document.getElementById('uploadBtn');
const cloudName = 'des5u6rpm';
const uploadPreset = 'demo_test';

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


signUpBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

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
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            })
        });

        await response.json();
        // change user window to the /users endpoint
        window.location.href = '/todos';
    } catch (error) {
        alert(error);
    }
});

uploadBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const myWidget = cloudinary.createUploadWidget({
        cloudName: cloudName,
        uploadPreset: uploadPreset},(error, result) => {
            if (!error && result && result.event === 'success') {
                console.log('Done! Here is the image info: ', result.info);
            }
        },false);

        // save image id to the database
        const imageID = result.info.public_id;
        const imagePath = result.info.url;
        // post the image id to the /api/images endpoint
        const data = {
            imagID: request.body.image,
          }
      
          // upload image here
          cloudinary.uploader.upload(data.image)
          .then((result) => {
            response.status(200).send({
              message: "success",
              result,
            });
          }).catch((error) => {
            response.status(500).send({
              message: "failure to upload image",
              error,
          });
        });
    });     
        // try {
        //     const response = await fetch('/api/images', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             imageID,
        //             imagePath,
        //         })
        //     });

        //     await response.json();
        //     // change user window to the /users endpoint
        //     window.location.href = '/todos';
        // }catch (error) {
        //     alert(error);
        // 

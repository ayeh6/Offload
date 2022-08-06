const uploadImgBtn = document.getElementById('uploadImgBtn');
const addTitleInput = document.getElementById('addTitleInput');
const addDescInput = document.getElementById('addDescInput');
const addLocationInput = document.getElementById('addLocationInput');
const createPostBtn = document.getElementById('submitPostButton');

const images = [];

const myWidget = cloudinary.createUploadWidget({
    cloudName: "dnlfrsnzw",
    uploadPreset: "offload",
    multiple: true,
    sources: [
        "local"
    ],
    cropping: false,
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
            const image = {
                imageID: result.info.public_id,
                imagePath: result.info.url,
            }
            images.push(image);
        }
    }
);

uploadImgBtn.addEventListener('click', () => {
    myWidget.open();
});

createPostBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const title = addTitleInput.value;
    const description = addDescInput.value;
    const location = addLocationInput.value;
    const post = {
        title: title,
        description: description,
        location: location,
        images: images,
    };
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        await response.json();
        window.location.href = '/content';
    } catch(error) {
        alert(error);
    }
});
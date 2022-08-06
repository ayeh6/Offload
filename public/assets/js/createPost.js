const uploadImgBtn = document.querySelector('#uploadImgBtn');
const addTitleInput = document.querySelector('#addTitleInput');
const addDescInput = document.querySelector('#addDescInput');
const addLocationInput = document.querySelector('#addLocationInput');
const createPostBtn = document.querySelector('#submitPostButton');

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


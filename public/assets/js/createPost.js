// require('dotenv').config();
// const cloudinary = require('../../../server');
var cl = new cloudinary.Cloudinary({cloud_name: "offload", secure: true});


const uploadImgBtn = document.querySelector('#uploadImgBtn');

const addTitleInput = document.querySelector('#addTitleInput');
const addTitleBtn = document.querySelector('#addTitleBtn');

const addDescInput = document.querySelector('#addDescInput');
const addDescBtn = document.querySelector('#addDescBtn');

const addLocationInput = document.querySelector('#addLocationInput');
const addLocationBtn = document.querySelector('#addLocationBtn');

uploadImgBtn?.addEventListener('click', async (event) => {
    const cloudName = 'offload'; //process.env.CLOUD_NAME; // replace with your own cloud name
    const uploadPreset = 'demo_test'; //process.env.UPLOAD_PRESET; // replace with your own upload preset

    const myWidget = cl.createUploadWidget(
    {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
    },
    (error, result) => {
        if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
    }
    );

    // POST REQUEST TO SAVE IMAGE TO THE DATABASE

    document.getElementById("upload_widget")?.addEventListener(
    "click",
    function () {
        myWidget.open();
    },
    false
    );
});

addTitleBtn?.addEventListener('click', () => {
    const title = addTitleInput.value;

    // POST REQUEST TO SAVE TITLE TO DATABASE
});

addDescBtn?.addEventListener('click', () => {
    const desc = addDescInput.value;

    // POST REQUEST TO SAVE Desc TO DATABASE
});

addLocationBtn?.addEventListener('click', () => {
    const location = addLocationInput.value;

    // POST REQUEST TO SAVE Desc TO DATABASE
});
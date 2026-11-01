document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registrationForm");

    if (!form) {
        return;
    }

    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const githubInput = document.getElementById("github");
    const avatarInput = document.getElementById("avatar");

    const uploadText = document.getElementById("uploadText");
    const uploadIcon = document.getElementById("uploadIcon");
    const formError = document.getElementById("formError");

    let avatarData = "";

    function showError(id, message) {
        document.getElementById(id).textContent = message;
    }

    function clearErrors() {

        ["nameError", "emailError", "githubError", "avatarError"]
            .forEach(function (id) {
                showError(id, "");
            });

        formError.textContent = "";

        form.querySelectorAll("input").forEach(function (input) {
            input.removeAttribute("aria-invalid");
        });
    }

    /* IMAGE UPLOAD */

    avatarInput.addEventListener("change", function () {

        const file = avatarInput.files[0];

        avatarData = "";

        uploadText.textContent = "Drag and drop or click to upload";

        uploadIcon.src = "../assets/images/icon-upload.svg";

        uploadIcon.classList.remove("upload-preview");

        showError("avatarError", "");

        if (!file) {
            return;
        }

        if (!["image/jpeg", "image/png"].includes(file.type)) {

            showError("avatarError", "Please choose a JPG or PNG image.");

            avatarInput.value = "";

            return;
        }

        if (file.size >= 500 * 1024) {

            showError("avatarError", "Image must be smaller than 500KB.");

            avatarInput.value = "";

            return;
        }

        const reader = new FileReader();

        reader.onload = function () {

            avatarData = reader.result;

            uploadText.textContent = file.name;

            uploadIcon.src = avatarData;

            uploadIcon.classList.add("upload-preview");

        };

        reader.onerror = function () {

            showError(
                "avatarError",
                "The image could not be read. Please try another file."
            );

        };

        reader.readAsDataURL(file);

    });

    /* FORM VALIDATION */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        clearErrors();

        let valid = true;

        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();
        const github = githubInput.value.trim();

        const emailPattern =
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        const githubPattern = /^@[A-Za-z0-9-]{1,39}$/;

        if (!fullName) {

            showError("nameError", "Full name is required.");

            nameInput.setAttribute("aria-invalid", "true");

            valid = false;
        }

        if (!emailPattern.test(email)) {

            showError(
                "emailError",
                "Enter a valid email address."
            );

            emailInput.setAttribute("aria-invalid", "true");

            valid = false;
        }

        if (!githubPattern.test(github)) {

            showError(
                "githubError",
                "GitHub username must start with @."
            );

            githubInput.setAttribute("aria-invalid", "true");

            valid = false;
        }

        const file = avatarInput.files[0];

        /* PHOTO IS OPTIONAL */

        if (file && !avatarData) {

            showError(
                "avatarError",
                "Please wait for your image to finish loading."
            );

            valid = false;
        }

        if (file && !["image/jpeg", "image/png"].includes(file.type)) {

            showError(
                "avatarError",
                "Please choose a JPG or PNG image."
            );

            valid = false;
        }

        if (file && file.size >= 500 * 1024) {

            showError(
                "avatarError",
                "Image must be smaller than 500KB."
            );

            valid = false;
        }

        if (!valid) {

            formError.textContent =
                "Please correct the highlighted fields and try again.";

            const firstInvalid =
                form.querySelector('[aria-invalid="true"]');

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }

        /* GENERATE TICKET NUMBER */

        const ticketNumber =
            "#" + String(Math.floor(10000 + Math.random() * 90000));

        /* USE DEFAULT AVATAR IF NO PHOTO WAS UPLOADED */

        const registration = {

            fullName: fullName,

            email: email,

            github: github,

            avatar: avatarData || "../assets/images/image-avatar.jpg",

            ticketId: ticketNumber

        };

        /* SAVE REGISTRATION */

        try {

            sessionStorage.setItem(
                "codingConfRegistration",
                JSON.stringify(registration)
            );

            window.location.href = "ticket.html";

        } catch (error) {

            formError.textContent =
                "Your registration could not be saved. Please try a smaller image.";

        }

    });

});
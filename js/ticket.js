document.addEventListener("DOMContentLoaded", function () {

    const savedRegistration =
        sessionStorage.getItem("codingConfRegistration");

    /* CHECK IF USER REGISTERED */

    if (!savedRegistration) {

        window.location.replace("index.html");

        return;
    }

    try {

        const attendee = JSON.parse(savedRegistration);

        if (
            !attendee.fullName ||
            !attendee.email ||
            !attendee.github ||
            !attendee.avatar ||
            !attendee.ticketId
        ) {

            throw new Error("Incomplete registration details");

        }

        /* DISPLAY ATTENDEE NAME */

        document.getElementById("confirmationName").textContent =
            "Congrats, " + attendee.fullName + "! Your ticket is ready.";

        /* DISPLAY EMAIL */

        document.getElementById("confirmationEmail").textContent =
            attendee.email;

        /* DISPLAY NAME ON TICKET */

        document.getElementById("attendeeName").textContent =
            attendee.fullName;

        /* DISPLAY AVATAR */

        document.getElementById("attendeeAvatar").src =
            attendee.avatar;

        /* DISPLAY TICKET NUMBER */

        document.getElementById("ticketId").textContent =
            attendee.ticketId;

        document.getElementById("stubTicketId").textContent =
            attendee.ticketId;

        /* DISPLAY GITHUB USERNAME */

        document.getElementById("attendeeGithub").textContent =
            attendee.github;

        /* CREATE GITHUB PROFILE LINK */

        document.getElementById("githubLink").href =
            "https://github.com/" + attendee.github.substring(1);

    } catch (error) {

        sessionStorage.removeItem("codingConfRegistration");

        window.location.replace("index.html");

    }

});
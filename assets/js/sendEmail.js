function sendMail(contactForm) {
    emailjs.send("gmail", "harro", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectDescription.value
    })
        .then(function (response) {
            console.log("SUCCESS!", response);
        }, function (error) {
            console.log("FAILED!", error);
        });
    return false;
}
document.addEventListener("DOMContentLoaded", function () {
    //Get all play buttons 
    const playButtons = document.querySelectorAll(".quiz-btn");

    //Loop through each play button
    playButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            //get target modal id
            const targetModalId = button.getAttribute("data-bs-target");

            //show modal corresponding to clicked play button
            const modal = new bootstrap.Modal(document.querySelector(targetModalId));
            modal.show
        });
    });
});
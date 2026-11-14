
var video = document.getElementById("makingVideo");
var playPauseBtn = document.getElementById("playPauseBtn");

function togglePlayPause() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    if (video.paused) {
        playPauseBtn.textContent = "▶ PLAY";
    } else {
        playPauseBtn.textContent = "❚❚ PAUSE";
    }
}

playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("click", togglePlayPause);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("ended", updateButton);



function updateCartCount() {

    let cart = JSON.parse(
        localStorage.getItem("chodapCart")
    ) || [];

    let totalItems = 0;

    for (let i = 0; i < cart.length; i++) {

        totalItems += Number(cart[i].quantity);

    }

    document.getElementById("cartCount").textContent = totalItems;

}

updateCartCount();


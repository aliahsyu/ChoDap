function getGreeting(hour) {
    if (hour < 12) {
        return "Good Morning! ☀️";
    } else if (hour < 18) {
        return "Good Afternoon! 🌤️";
    } else {
        return "Good Evening! 🌙";
    }
}

function getDayMessage(dayNumber) {
    switch (dayNumber) {
        case 0:
            return "Sunday treat: relax with something sweet.";
        case 1:
            return "Monday blues? Chocolate fixes everything.";
        case 5:
            return "It's Friday! Time to celebrate with chocolate.";
        case 6:
            return "Saturday is perfect for sharing sweet gifts.";
        default:
            return "A little chocolate makes any day better.";
    }
}

function showGreeting() {
    var now = new Date();
    document.getElementById("greeting").textContent = getGreeting(now.getHours());
    document.getElementById("dayMessage").textContent = getDayMessage(now.getDay());
}

function toggleText(button) {
    var paragraph = button.previousElementSibling;

    if (paragraph.classList.contains("collapsed")) {
        paragraph.classList.remove("collapsed");
        button.textContent = "Read Less";
    } else {
        paragraph.classList.add("collapsed");
        button.textContent = "Read More";
    }
}

function revealOnScroll() {
    var cards = document.querySelectorAll(".reveal");

    for (var i = 0; i < cards.length; i++) {
        var top = cards[i].getBoundingClientRect().top;

        if (top < window.innerHeight - 80) {
            cards[i].classList.add("visible");
        }
    }
}

function updateScrollUI() {
    var backBtn = document.getElementById("backToTop");
    var header = document.querySelector(".header");

    if (window.scrollY > 300) {
        backBtn.style.display = "block";
    } else {
        backBtn.style.display = "none";
    }

    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

document.addEventListener("DOMContentLoaded", function () {

    showGreeting();

    var cards = document.querySelectorAll(".product_information section");

    cards.forEach(function (card) {
        card.classList.add("reveal");

        card.addEventListener("mouseenter", function () {
            card.classList.add("card_hover");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("card_hover");
        });
    });

    var buttons = document.querySelectorAll(".toggle_btn");

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            toggleText(btn);
        });
    });

    document.getElementById("backToTop").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    revealOnScroll();
});

window.addEventListener("scroll", function () {
    revealOnScroll();
    updateScrollUI();
});

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
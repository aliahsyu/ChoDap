var collections = {
    collection_1: ["rubyRoseberry", "forestTruffle", "whiteLava"],
    collection_2: ["blushBerry", "kyotoDream", "midnightGolden"],
    collection_3: ["scarletBloom", "greenChoco", "toffeeCrunch"],
    collection_4: ["caramelCloud", "matchaDream", "amberBliss"]
};

var sortDirection = {};

function findProduct(id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
    return null;
}

function getPriceText(ids) {
    var lowest = Infinity;
    var highest = 0;
    var unit = "";

    for (var i = 0; i < ids.length; i++) {
        var item = findProduct(ids[i]);
        if (item === null) {
            continue;
        }
        if (item.price < lowest) { lowest = item.price; }
        if (item.price > highest) { highest = item.price; }
        unit = item.unit;
    }

    if (lowest === highest) {
        return "RM " + lowest.toFixed(2) + " per " + unit;
    } else {
        return "RM " + lowest.toFixed(2) + " - " + highest.toFixed(2) + " per " + unit;
    }
}

function showCollectionPrices() {
    for (var name in collections) {
        var section = document.querySelector("." + name);
        if (!section) { continue; }

        var tag = document.createElement("p");
        tag.className = "price_tag";
        tag.textContent = getPriceText(collections[name]);

        var button = section.querySelector("button");
        button.parentNode.insertBefore(tag, button);
    }
}

function getRatingClass(rating) {
    switch (rating) {
        case 1:  return "rate_1";
        case 2:  return "rate_2";
        case 3:  return "rate_3";
        case 4:  return "rate_4";
        case 5:  return "rate_5";
        default: return "";
    }
}

function colourRatings() {
    var rows = document.querySelectorAll(".products_table tr");

    for (var r = 1; r < rows.length; r++) {
        var cells = rows[r].querySelectorAll("td");

        for (var c = 1; c < cells.length; c++) {
            var value = parseInt(cells[c].textContent);
            cells[c].classList.add(getRatingClass(value));
        }
    }
}

function filterTable(text) {
    var rows = document.querySelectorAll(".products_table tr");
    var shown = 0;
    text = text.toLowerCase().trim();

    for (var r = 1; r < rows.length; r++) {
        var name = rows[r].cells[0].textContent.toLowerCase();

        if (name.indexOf(text) !== -1) {
            rows[r].style.display = "";
            shown++;
        } else {
            rows[r].style.display = "none";
        }
    }

    var message = document.getElementById("noResult");
    if (shown === 0) {
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}

function sortTable(columnIndex) {
    var table = document.querySelector(".products_table table");
    var body = table.tBodies[0];
    var rows = Array.prototype.slice.call(body.rows, 1);

    if (sortDirection[columnIndex] === "asc") {
        sortDirection[columnIndex] = "desc";
    } else {
        sortDirection[columnIndex] = "asc";
    }
    var direction = sortDirection[columnIndex];

    rows.sort(function (a, b) {
        var x = a.cells[columnIndex].textContent;
        var y = b.cells[columnIndex].textContent;
        var result;

        if (columnIndex === 0) {
            result = x.localeCompare(y);
        } else {
            result = Number(x) - Number(y);
        }

        if (direction === "desc") {
            result = -result;
        }
        return result;
    });

    for (var i = 0; i < rows.length; i++) {
        body.appendChild(rows[i]);
    }

    var headers = table.querySelectorAll("th");
    for (var h = 0; h < headers.length; h++) {
        headers[h].textContent = headers[h].textContent.replace(/ [▲▼]/, "");
    }
    headers[columnIndex].textContent += (direction === "asc") ? " ▲" : " ▼";
}

function updateBackToTop() {
    var button = document.getElementById("backToTop");
    if (window.scrollY > 300) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

function revealOnScroll() {
    var cards = document.querySelectorAll(".reveal");

    for (var i = 0; i < cards.length; i++) {
        if (cards[i].getBoundingClientRect().top < window.innerHeight - 80) {
            cards[i].classList.add("visible");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    showCollectionPrices();
    colourRatings();

    var images = document.querySelectorAll(".products_collection img");
    images.forEach(function (img) {
        img.addEventListener("mouseenter", function () {
            img.classList.add("img_zoom");
        });
        img.addEventListener("mouseleave", function () {
            img.classList.remove("img_zoom");
        });
    });

    document.querySelectorAll(".products_collection section").forEach(function (card) {
        card.classList.add("reveal");
    });
    revealOnScroll();

    document.getElementById("searchBox").addEventListener("input", function (e) {
        filterTable(e.target.value);
    });

    var headers = document.querySelectorAll(".products_table th");
    headers.forEach(function (th, index) {
        th.addEventListener("click", function () {
            sortTable(index);
        });
    });

    document.getElementById("backToTop").addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

window.addEventListener("scroll", function () {
    revealOnScroll();
    updateBackToTop();
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
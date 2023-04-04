// main.js
document.addEventListener("DOMContentLoaded", function () {
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
        currentYearElement.innerText = new Date().getFullYear();
    }
});


// navigation.js
const navbar = `
    <nav>
        <a href="index.html">Home</a>
        <div class="dropdown">
            <button class="dropdown-btn">Menu</button>
            <div class="dropdown-content">
                <a href="projects.html">Projects</a>
                <a href="photography.html">Photography Portfolio</a>
            </div>
        </div>
    </nav>
`;

document.querySelector("body").insertAdjacentHTML("afterbegin", navbar);

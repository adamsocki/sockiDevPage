// main.js
document.addEventListener("DOMContentLoaded", function () {
    const currentYearElement = document.getElementById("current-year");
    if (currentYearElement) {
        currentYearElement.innerText = new Date().getFullYear();
    }
});


const navbar = `
    <nav>
        <a href="index.html">Home</a>
        <a href="projects.html">Projects</a>
        <a href="photography.html">Photography Portfolio</a>
    </nav>
`;

document.querySelector("body").insertAdjacentHTML("afterbegin", navbar);
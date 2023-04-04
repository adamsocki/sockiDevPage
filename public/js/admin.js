// admin.js
const auth = firebase.auth();
const db = firebase.firestore();

// Google Sign-In provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Google Sign-In button
const googleSignInButton = document.getElementById("google-signin");
googleSignInButton.addEventListener("click", () => {
    auth.signInWithPopup(googleProvider).then((result) => {
        const user = result.user;
        if (user.email === "your-email@example.com") {
            // Show the add-project-form and hide the sign-in button
            document.getElementById("add-project-form").style.display = "block";
            googleSignInButton.style.display = "none";
        } else {
            alert("You are not authorized to access this page.");
            auth.signOut();
        }
    }).catch((error) => {
        console.error("Error signing in:", error);
    });
});
    

// Add a project to the Firestore
document.getElementById("add-project-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const tags = document.getElementById("tags").value.split(",");
    const text = document.getElementById("text").value;

    try {
        await db.collection("projects").add({
            title,
            date,
            tags,
            text
        });
        alert("Project added successfully!");
        event.target.reset();
    } catch (error) {
        console.error("Error adding project:", error);
        alert("Error adding project. Please try again.");
    }
});

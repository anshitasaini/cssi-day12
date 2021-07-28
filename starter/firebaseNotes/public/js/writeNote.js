window.onload = event => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const welcome = document.querySelector("#welcome");
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            welcome.innerHTML = 'Welcome, ' + user.displayName + '. What\'s on your mind?'
        } 
        else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
}

const labels = [];

const handleNoteSubmit = () => {
    const noteTitle = document.querySelector("#noteTitle");
    const noteText = document.querySelector("#noteText");
    const labelText = document.querySelector("#labelText");
    const time = Date();
    firebase.database().ref(`users/${googleUser.uid}`).push({
        title: noteTitle.value,
        text: noteText.value,
        label: labelText.value,
        created: time
    })
    .then(() => {
        labels.push(labelText.value)
        noteTitle.value = "";
        noteText.value = "";
        labelText.value = "";
    });
}
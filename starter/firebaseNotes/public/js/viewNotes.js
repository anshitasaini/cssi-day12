window.onload = event => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            const googleUserId = user.uid;
            getNotes(googleUserId)
        } 
        else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
}

const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        renderDataAsHtml(data);
    });
}

const renderDataAsHtml = data => {
    const add = document.querySelector("#app")
    let cards = '';
    for (const card in data) {
        cards += (genCard(data[card]))
    }
    add.innerHTML = cards;
};

const genCard = card => {
    let html = '<div class="column is-one-quarter"><div class="card"><header class="card-header"><p class="card-header-title">'
    html += card.title + '</p></header>'
    html += '<div class="card-content"><div class="content">'
    html += card.text + '</div></div></div></div>'
    return html;
};

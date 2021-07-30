let googleUserId;
let googleUser;
let savedId;

window.onload = event => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
            googleUserId = user.uid;
            console.log(googleUserId)
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
        document.querySelector("#app").innerHTML = "";
        const data = snapshot.val();
        renderDataAsHtml(data);
    });
}

const renderDataAsHtml = data => {
    const add = document.querySelector("#app")
    let cards = '';
    for (const card in data) {
        cards += (genCard(data[card], card))
    }
    add.innerHTML = cards;
};

const deleteNote = (noteId) => {
    firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
}

const genCard = (card, noteId) => {
    let html = `<div class="column is-one-quarter">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title">${card.title}</p>
                        </header>
                        <div class="card-content">
                            <div class="content">${card.text + googleUser.displayName}</div>
                        </div>
                        <footer class="card-footer">
                            <a href="#" class="card-footer-item" onclick="editNote('${noteId}')">Edit</a>
                            <a href="#" class="card-footer-item" onclick="deleteNote('${noteId}')">Delete</a>
                        </footer>
                    </div>
                </div>`
    return html;
};

const editNote = (noteId) => {
    console.log("Edit note: " + noteId);
    const noteToEditRef = firebase.database().ref(`users/${googleUserId}/${noteId}`)
    noteToEditRef.on('value', (snapshot) => {
        const note = snapshot.val();
        const editNoteModal = document.querySelector("#editNoteModal");
        const editNoteTitleInput = document.querySelector("#editTitleInput");
        editNoteTitleInput.value = note.title;

        const editNoteTextInput = document.querySelector("#editTextInput");
        editNoteTextInput.value = note.text;

        editNoteModal.classList.add('is-active');
    })    
}

const closeModal = (noteId) => {
    const editNoteModal = document.querySelector("#editNoteModal");
    editNoteModal.classList.remove('is-active');
};

const saveEditedNote = () => {
    const noteTitle = document.querySelector('#editTitleInput').value;
    const noteText = document.querySelector('#editTextInput').value;
    const noteEdits = {
        title: noteTitle,
        text: noteText
    };
    firebase.database().ref(`users/${googleUserId}/${noteId}`).update(noteEdits);
    closeEditModal();
};
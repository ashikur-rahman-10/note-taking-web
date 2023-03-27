
const notesTitleField = document.getElementById('note-title')
const notesDescriptionField = document.getElementById('note-description')
const saveBtn = document.getElementById('save-btn');
const homeBtn = document.getElementById('home-btn');
const home = document.getElementById('home-container');

// Home button toggle
homeBtn.addEventListener('click', function () {
    savedSecction.classList.add('hidden');
    home.classList.remove('hidden')
    favoritePage.classList.add('hidden');
})

// Create New Note
const saveNotes = () => {
    let notes = [];
    const noteTitle = notesTitleField.value;
    if (noteTitle == '') {
        alert('Notes must be have a title.')
        return;
    }
    const noteDescription = notesDescriptionField.value;
    const id = Math.floor(Math.random() * 100000) + '';
    console.log(id)

    const note = { id, noteTitle, noteDescription };
    if (localStorage.getItem('notes')) {
        notes = JSON.parse(localStorage.getItem('notes'))
    }
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    notesDescriptionField.value = '';
    notesTitleField.value = '';

}
// Save button Click handle
saveBtn.addEventListener('click', function () {
    saveNotes();
})
// Enter button Press hande
notesDescriptionField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        saveNotes();
    }
});


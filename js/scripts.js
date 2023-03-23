const container = document.getElementById('saved-notes-container');
const savedSecction = document.getElementById('saved-notes-section')
const notesTitleField = document.getElementById('note-title')
const notesDescriptionField = document.getElementById('note-description')
const saveBtn = document.getElementById('save-btn');
const saveNotesBtn = document.getElementById('saved-notes-btn');
const homeBtn = document.getElementById('home-btn');
const home = document.getElementById('home-container');

saveNotesBtn.addEventListener('click', function () {
    home.classList.add('hidden')
    savedSecction.classList.remove('hidden');
    // console.log('I am from saved notes')
    displaySavedNotes();
})

// Enter button save
notesDescriptionField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        saveNotes();
    }
});

homeBtn.addEventListener('click', function () {
    savedSecction.classList.add('hidden');
    home.classList.remove('hidden')
})
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

saveBtn.addEventListener('click', function () {
    saveNotes();
})

const displaySavedNotes = () => {
    container.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes'));

    for (let i = 0; i < notes.length; i++) {
        const note = { id, noteTitle, noteDescription } = notes[i];
        container.innerHTML += `
        <div class="shadow-lg p-4 m-4 rounded-lg hover:bg-slate-100 hover:shadow-2xl">   
        
        <p><small class="font-bold">ID:${id}</small></p>
        <h2 class="my-4 text-lg font-medium">Title: ${noteTitle}</h2>
       
        <label onclick="displayModal(${id})" for="my-modal-6" class="bg-rose-400 hover:bg-rose-300 text-white text-lg font-medium border-none py-2 px-3 rounded-md mt-4">Open</label>
        <!-- modal body -->
        
            </div>
        `;
    }
}
const notesBody = document.getElementById('notes-body');
const displayModal = (callId) => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    const selectedNote = notes.find(note => note.id == callId)

    notesBody.innerHTML =
        `
        <p><small class="font-bold">ID:${selectedNote.id}</small></p>
        <h2 class="text-lg font-medium mb-5">Title: ${selectedNote.noteTitle}</h2>
        <div>
        <h2 class=" mb-2 font-bold">Details:</h2>
        <p> ${selectedNote.noteDescription}</p>
        <div class="modal-action">
        <label 
            class="bg-sky-500 hover:bg-amber-300 text-white font-bold border-none flex justify-center items-center px-3 p-3 rounded-full">
            <i class="fa-solid fa-pencil"></i></label>
        <label for="my-modal-6"
            class="bg-red-500 hover:bg-sky-300 text-white font-bold border-none flex justify-center items-center px-3 p-3 rounded-full">
            <i onclick="deleteNote(${selectedNote.id})" class="fa-solid fa-trash"></i></label>
        <label 
            class="bg-yellow-500 hover:bg-amber-300 text-white font-bold border-none flex justify-center items-center px-3 p-3 rounded-full">
            <i class="fa-sharp fa-solid fa-heart"></i></label>
        <label for="my-modal-6"
            class="bg-gray-400 hover:bg-gray-300 text-white font-bold border-none flex justify-center items-center px-4 py-3 rounded-full">
            <i class="fa-solid fa-xmark"></i></label>
    </div>
        </div>
        `
}


// Delete 

const deleteNote = (callId) => {
    const sure = confirm('Are you sure?')
    if (sure == true) {
        const notes = JSON.parse(localStorage.getItem('notes'));
        const remainingNote = notes.filter(note => note.id != callId);
        localStorage.setItem('notes', JSON.stringify(remainingNote));
        displaySavedNotes();
    }
    else {
        return;
    }

}

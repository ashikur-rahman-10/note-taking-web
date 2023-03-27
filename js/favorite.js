const favoritesBtn = document.getElementById('favorites-btn');
const favoritePage = document.getElementById('favorites-section');
const favoriteContainer = document.getElementById('favorite-notes-container');

// Show Favourite page
favoritesBtn.addEventListener('click', function () {
    // console.log('Favourite Clicked')
    savedSecction.classList.add('hidden');
    home.classList.add('hidden')
    favoritePage.classList.remove('hidden');
    displayFavoriteNotes();
})
let favoriteNotes = [];
const moveToFavorite = (callId) => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const selectedNote = notes.filter(note => note.id == callId)

    const id = selectedNote[0].id
    const title = selectedNote[0].noteTitle;
    const noteDescription = selectedNote[0].noteDescription;


    const favorite = { id, title, noteDescription }
    console.log(favorite)
    if (localStorage.getItem('favorite-notes')) {
        favoriteNotes = JSON.parse(localStorage.getItem('favorite-notes'))
    }
    favoriteNotes.push(favorite);
    localStorage.setItem('favorite-notes', JSON.stringify(favoriteNotes))

    // Delete 
    const remainingNote = notes.filter(note => note.id != callId);
    localStorage.setItem('notes', JSON.stringify(remainingNote));
    displaySavedNotes();

}

const displayFavoriteNotes = () => {
    favoriteContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('favorite-notes'));
    for (let i = 0; i < notes.length; i++) {
        const favorite = { id, title, noteDescription } = notes[i];
        favoriteContainer.innerHTML += `
        <div class="shadow-lg p-4 rounded-lg hover:bg-slate-100 hover:shadow-2xl">   
        
        <p><small class="font-bold">ID:${id}</small></p>
        <h2 class="my-4 text-lg font-medium">Title: ${title}</h2>
       
        <label onclick="displayFavoriteModal(${id})" for="my-modal-7" class="bg-rose-400 hover:bg-rose-300 text-white text-lg font-medium border-none py-2 px-3 rounded-md mt-4">Open</label>
        <!-- modal body -->
        
            </div>
        `;
    }

}

const displayFavoriteModal = (callId) => {
    const favoriteNotesBody = document.getElementById('favorite-notes-body');
    const notes = JSON.parse(localStorage.getItem('favorite-notes'));
    const selectedNote = notes.filter(note => note.id == callId)

    console.log(selectedNote)
    favoriteNotesBody.innerHTML =
        `
        <p><small class="font-bold">ID:${selectedNote[0].id}</small></p>
        <h2 class="text-lg font-medium mb-5">Title: ${selectedNote[0].title}</h2>
        <div>
        <h2 class=" mb-2 font-bold">Details:</h2>
        <p> ${selectedNote[0].noteDescription}</p>
        <div class="modal-action">
        <label 
            class="bg-sky-500 hover:bg-amber-300 text-white font-bold border-none flex justify-center items-center px-3 p-3 rounded-full">
            <i class="fa-solid fa-pencil"></i></label>
        <label for="my-modal-7" onclick="deleteFavoriteNote(${selectedNote[0].id})"
            class="bg-red-500 hover:bg-sky-300 text-white font-bold border-none flex justify-center items-center px-3 p-3 rounded-full">
            <i class="fa-solid fa-trash"></i></label>
        <label for="my-modal-7"  
            class="bg-yellow-500 hover:bg-amber-300 text-white font-bold border-none flex justify-center items-center px-3 p-3 rounded-full">
            <i class="fa-solid fa-heart-crack"></i></label>
        <label for="my-modal-7"
            class="bg-gray-400 hover:bg-gray-300 text-white font-bold border-none flex justify-center items-center px-4 p-3 rounded-full">
            <i class="fa-sharp fa-solid fa-xmark"></i></label>
    </div>
        </div>
        `
}
// Delete a note from favorite 
const deleteFavoriteNote = (callId) => {
    const sure = confirm('Are you sure?')
    if (sure == true) {
        const notes = JSON.parse(localStorage.getItem('favorite-notes'));
        const remainingNote = notes.filter(note => note.id != callId);
        localStorage.setItem('favorite-notes', JSON.stringify(remainingNote));
        displayFavoriteNotes();
    }
    else {
        return;
    }
}
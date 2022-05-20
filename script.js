// Add note to local storage

let addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", function(e) {

  let addTitle = document.getElementById("note-title");
  let addTxt = document.getElementById("note-text");
  
    if (addTitle.value == "") {
        return alert("Please add Title!!!")
    }

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    title: addTitle.value,
    text: addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
});

// Function to show elements from localStorage

function showNotes() {
  var currentdate = new Date(); 
  var date = currentdate.getFullYear() + "/"  
              + currentdate.getMonth()+1  + "/" 
              + currentdate.getDate();

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
        <div class="note">
            <h3 class="note-title">${element.title} </h3>
            <p class="note-text">${element.text}</p>
            <button id="${index}"onclick="delNote(this.id)" class="del-btn">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="del-btn edit-btn">Edit Note</button>
            <p class='date'>Created on : ${date}</p>
        </div>
            `
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add Note" section for creating your notes`;
  }
}

// Function to delete a note

function delNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  
}

// Function to Edit the Note

function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addTxt = document.getElementById("note-text");

    
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    

    notesObj.findIndex((element, index) => {
      addTitle.value = element.title;
      addTxt.value = element.text;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}


showNotes();
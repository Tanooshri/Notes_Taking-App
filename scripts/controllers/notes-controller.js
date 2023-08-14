// Main work of the controller is about input/output + events + it will talk to service
import{noteOperation} from '../services/note-service.js'
window.addEventListener('load', init);
function init() {
     showCount();
     bindEvents();
     // disablebutton();
}
const disablebutton = () => document.querySelector('#delete').disabled = true;
const enablebutton = () => document.querySelector('#delete').disabled = false;


function bindEvents() {
     document.querySelector('#add').addEventListener('click', addNote);
     document.querySelector('#delete').addEventListener('click', deleteMarked);
     document.querySelector('#search').addEventListener('click', search);
     document.querySelector('#clearall').addEventListener('click',removeall);
     document.querySelector('#sort').addEventListener('click', sorted);
     document.querySelector('#update').addEventListener('click', updateData);
     // document.querySelector('#save').addEventListener('click', );
     // document.querySelector('#load').addEventListener('click', );
}

function deleteMarked() {
     noteOperation.remove();
     printNotes(noteOperation.getnotes());
}

function showCount() {
     noteOperation.markTotal() > 0 ? enablebutton() : disablebutton();
     document.querySelector('#total').innerText = noteOperation.total();
     document.querySelector('#mark').innerText = noteOperation.markTotal();
     document.querySelector('#unmark').innerText = noteOperation.unmarkTotal();
}
// this window.addeventlistner will be used in the total record and mark or un-mark records

function addNote() {
     // read id , description, important, title, date of completion
     const fields = ['id', 'title', 'desc', 'cdate', 'importance'];
     const noteObject = {};
     for(let field of fields){
        noteObject[field] = document.querySelector(`#${field}`).value;
     }
     noteOperation.add(noteObject);
     printNote(noteObject); 
     showCount();
}

function printIcon(myclassName ='trash fa-shake', fn, id) {
     // <i class="fa-solid fa-trash fa-bounce"></i>
     // <i class="fa-solid fa-user-pen fa-beat"></i>
     const iTag = document.createElement('i');
     iTag.setAttribute('note-id', id);
     iTag.className = `fa-solid fa-${myclassName} me-4 hand`;
     iTag.addEventListener('click', fn);
     return iTag;
}
function togglemark() {
     const icon = this;
     const id = this.getAttribute('note-id'); 
      noteOperation.toggleMark(id);
     const tr = icon.parentNode.parentNode;
     tr.classList.toggle("table-danger");
     showCount();
}

function edit() {
     console.log("edit"  );
}

function printNotes(notes) {
     const tbody = document.querySelector('#notes');
     tbody.innerHTML = '';
     notes.forEach(note => printNote(note));
     showCount();
}

export function printNote(noteObject) {
   const tbody = document.querySelector('#notes');
    const row = tbody.insertRow(); // it will make a <tr>
    for(let key in noteObject){
          if(key == 'isMarked'){
               continue;
          }
         const td = row.insertCell(); // it will make a td
         td.innerText = noteObject[key];
    }
    const td = row.insertCell();
    td.appendChild(printIcon('trash fa-shake',togglemark, noteObject.id));
    td.appendChild(printIcon('user-pen fa-bounce', edit, noteObject.id));
}
function search(){
     const value = prompt("Enter id");
     if(value == ""){
          alert("write proper input !!");
     }
     else{
          noteOperation.search(value);
     }
}

function removeall() {
     noteOperation.clearall();
}

function sorted(){
     noteOperation.sort();
     printNotes(noteOperation.getnotes());
}

function updateData(obj){
     const fields = ['id', 'title', 'desc', 'date', 'imp'];

     for(let field of fields){
          document.getElementById(`${field}`).value = obj[field];
     }
}
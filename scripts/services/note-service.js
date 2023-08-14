// Actual Crud operation happen here main logic will be here
import Note from "../models/note.js";
import { printNote } from "../controllers/notes-controller.js";
export const noteOperation = {
    notes: [],
    add(noteObject){
        const note = new Note(noteObject);
        this.notes.push(note);
    },

    total(){
        return this.notes.length;
    },

    searchById(id){
        return this.notes.find(note => note.id == id)
    },

    toggleMark(id){
        this.searchById(id).toggleMark();
        // const noteObject = this.searchById(id);
        // noteObject.isMarked = !noteObject.isMarked;
    },

    markTotal(){
        return this.notes.filter(note => note.isMarked).length;
    },

    unmarkTotal(){
        return this.total() - this.markTotal();
    },

    getnotes(){
        return this.notes;
    },

    remove(){
        this.notes = this.notes.filter(note => !note.isMarked)
    },

    search(id){
        const searchele = this.notes.filter(e => e.id === id);
        const tbody = document.querySelector('#notes');
        tbody.innerHTML = "";
        if(!searchele.length == 0){
            for(let key of searchele){
                printNote(key);
            }
        }
    },

    clearall(){
        const tbody = document.querySelector('#notes');
        tbody.innerHTML = "";
        // printNote();
    },

    sort(){
        this.notes = this.notes.sort((a, b) => {
            return a.id - b.id;
        })
    },

    update(id){
        const obj = this.notes.find((e) =>(e.find === id));
        this.remove(id);
        this.updateData(obj);
    },

    save(){

    },

    load(){

    }
};

// For delete
// 1. Icon must be clickable
// 2. Add click event(this) - icon -> icon -> parent -> td -> parent -> tr, tr color set to red
// 3. Every object has key is-marked = false
// 4. icon has id, so fetch the id and search it in array eg. find, u get an object, object is-marked = true
// 5. county mark - count those object in array whose is-marked = true, opposite un-mark
//  total-count-mark
// delete button by default disable when count mark is > 0 then only delete button enable
// when delete button click so it will delete those records whose is-marked  =m true
// Hint : filter is used to delete 
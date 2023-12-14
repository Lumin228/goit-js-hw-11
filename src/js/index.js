import { foo } from "./links";

const refs = {
    form: document.querySelector('form')
};

refs.form.addEventListener('submit', inputFunc);

function inputFunc(event) {
    event.preventDefault(); 
    const formElements = event.currentTarget.elements;
    const inputValue = formElements['searchQuery'].value;
    console.log(inputValue);
}

async function loadPage(v) {

}

const q = "yellow+flowers";

foo()
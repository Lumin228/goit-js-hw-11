import { foo } from './links';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  form: document.querySelector('form'),
  imageDiv: document.querySelector('.gallery'),
  buttonLoad: document.querySelector('button[type="button"]'),
};

const TXT_CACHE_LOCAL = "TXT_CAHE";

let i = 1;


refs.form.addEventListener('submit', inputFunc);
refs.buttonLoad.addEventListener('click', loadMoreFunc);

async function inputFunc(event) {
  event.preventDefault();
  refs.buttonLoad.classList.replace("is-hidden", "load-more");
  const formElements = event.currentTarget.elements;
  const inputValue = formElements['searchQuery'].value;
  localStorage.setItem(TXT_CACHE_LOCAL, JSON.stringify(inputValue))
  refs.imageDiv.innerHTML = '';
  i = 1;
  try {
    
    const data = await foo(inputValue, i);
    refs.imageDiv.classList.remove('is-hidden');
    
    data.map(key => {
      const createImgDiv = `
        <div class="photo-card">
          <img src="${key.webformatURL}" alt="${key.user}" loading="lazy" width="285" height="250" class="image" >
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <b>${key.likes}</b>
            </p>
            <p class="info-item">
              <b>Views</b>
              <b>${key.views}</b>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <b>${key.comments}</b>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <b>${key.downloads}</b>
            </p>
          </div>
        </div>`;

      refs.imageDiv.innerHTML += createImgDiv;
      
    });
    Notiflix.Notify.success(`You've found ${localStorage.getItem(TXT_CACHE_LOCAL)}`);
  } catch (error) {
    Notiflix.Notify.failure(`Sorry, but there is no such images as ${localStorage.getItem(TXT_CACHE_LOCAL)}`);
  }
}



async function loadMoreFunc() {
    i ++;
    try {

        const data = await foo(localStorage.getItem(TXT_CACHE_LOCAL), i);
        Notiflix.Notify.success(`You've loaded ${localStorage.getItem(TXT_CACHE_LOCAL)} in count of ${data.length}`);
        if (data.length == 0) {
          console.log("no more images")
        }
    
        data.map(key => {
          const createImgDiv = `
            <div class="photo-card">
              <img src="${key.previewURL}" alt="${key.user}" loading="lazy" width="285" height="250" class="image" >
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>
                  <b>${key.likes}</b>
                </p>
                <p class="info-item">
                  <b>Views</b>
                  <b>${key.views}</b>
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  <b>${key.comments}</b>
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  <b>${key.downloads}</b>
                </p>
              </div>
            </div>`;
    
          refs.imageDiv.innerHTML += createImgDiv;
          console.log(i)
        });
      } catch (error) {
        console.error(error);
      }
}


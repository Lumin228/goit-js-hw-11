import axios from "axios";

const orientetion = 'horizontal';
const safesearch = 'true';

export async function foo(que, page) {

  
  const value = await axios.get(`https://pixabay.com/api/?key=41243216-d0c3aacbdbd6d0005d29ac5a4&q=${que}&image_type=photo&page=${page}&per_page=40&orientation=${orientetion}&safesearch=${safesearch}`)
  .then(response => {
    if(response.data.hits.length >= 20) {
  return response.data.hits;
}
   else{
    throw Error
   }
  })
  .catch(error => {
    console.error(error);
  });
  return value
}


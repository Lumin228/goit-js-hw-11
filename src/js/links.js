import axios from "axios";

export function foo() {
    axios.get(`https://pixabay.com/api/?key=41243216-d0c3aacbdbd6d0005d29ac5a4&q=yellow+flowers&image_type=photo&per_page=40`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

}

import query from '@/utils/query'
import { BASE_URL } from '../variable'
import axios from 'axios';
const name = query.get('name');
const filePath = BASE_URL + `${name}/${name}.md`;

const contentPromise = axios({
  url: `${filePath}`
})
document.addEventListener('DOMContentLoaded',function(){
  contentPromise.then(res => {
    console.log(res);
    document.getElementById('content').innerHTML = marked(res.data);
  })
});



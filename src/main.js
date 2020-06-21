import query from '@/utils/query'
import { BASE_URL } from '../variable'
import axios from 'axios';
const name = query.get('name');
const filePath = BASE_URL + `${name}/${name}.md`;

const base = document.createElement('base');
base.href = `/html/markdown/${name}/`
document.getElementsByTagName('head')[0].appendChild(base)
const contentPromise = axios({
  url: `${filePath}`
})
document.addEventListener('DOMContentLoaded',function(){
  setTimeout(() => {
    contentPromise.then(res => {
      console.log(res);
      document.getElementById('content').innerHTML = marked(res.data);
    })
  }, 1000)
});



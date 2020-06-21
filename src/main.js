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
      const contentDom = document.getElementById('content');
      const markdownText = marked(res.data);
      contentDom.innerHTML = markdownText; 
      // 统计img加载
      let imgLoadCount = 0;
      const imgList = [...document.body.innerHTML.matchAll('<img')];
      if (imgList.length) {
        contentDom.querySelectorAll('img').forEach(item => {
          item.addEventListener('load', () => {
            imgLoadCount++;
            if (imgList.length <= imgLoadCount) {
              resetHeight();
            }
          })
        })
      } else {
        // 没图片情况
        resetHeight();
      }
    })
  }, 700)
});

function resetHeight () {
  const iframe = window.parent.document.querySelector('#md-iframe');
  const height = document.documentElement.scrollHeight || document.body.scrollHeight;
  iframe.style.height = height + 'px';
}



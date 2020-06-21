const query = {
  get () {
    const search = location.search;
    const res = /\?.*?=([^&]*)/.exec(search);
    if (res && res[1]) {
      return res[1];
    } else {
      return ''
    }
  }
}

export default query
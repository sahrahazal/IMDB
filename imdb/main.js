function IMDB(selector) {
  this.endpoint = "https://imdb8.p.rapidapi.com/auto-complete";
  this.selector = selector;
}

IMDB.prototype.searchWithAxios = function(keyword) {
  axios.get(`${this.endpoint}?q=${keyword}`, {
  headers: {
    "x-rapidapi-host": "imdb8.p.rapidapi.com",
    "x-rapidapi-key": "1de5775c2emsh3539119aebd0959p17d90fjsn02748edac489"
  }
  }).then((response) => {
    this.print(response.data);
  });
}

IMDB.prototype.searchWithjQuery = function(keyword) {
  jQuery.ajax(`${this.endpoint}?q=${keyword}`, {
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": "1de5775c2emsh3539119aebd0959p17d90fjsn02748edac489"
    },
    success: (data) => {
      this.print(data);
    },
    error: (err) => {
      console.log('Error Occurred :', err);
    }
  });
 
}

IMDB.prototype.searchWithXHR = function (keyword) {
  var success = (response) => {
    var data = JSON.parse(response.srcElement.responseText);
    this.print(data);
    
  }
  var error = (err) => {
    console.log('Error Occurred :', err);
  }

  var xhr = new XMLHttpRequest();
  xhr.onload = success;
  xhr.onerror = error;
  xhr.open("GET", `${this.endpoint}?q=${keyword}`);
  xhr.setRequestHeader("x-rapidapi-host", "imdb8.p.rapidapi.com");
  xhr.setRequestHeader("x-rapidapi-key", "1de5775c2emsh3539119aebd0959p17d90fjsn02748edac489");
  xhr.send();

}

IMDB.prototype.search = function (keyword) {
  fetch(`${this.endpoint}?q=${keyword}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "1de5775c2emsh3539119aebd0959p17d90fjsn02748edac489"
      }
    })
    .then(response => response.json())
    .then(data => {
      this.print(data);
    })
    .catch(err => {
      console.error(err);
    });
}

IMDB.prototype.print = function (data) {
  document.querySelector(this.selector).innerHTML = "";
  var list = data.d;
  list.map((item) => {
    var name = item.l;
    var poster = item.i.imageUrl;
    var movie = `<li><a onclick="window.open('https://www.imdb.com/title/${item.id}', '_blank', 'location=yes,height=750,width=800,scrollbars=yes,status=yes');"><img src="${poster}"></a> <h2>${name}</h2></li>`
    document.querySelector(this.selector).innerHTML += movie;
  });
  document.querySelector(".search").disabled = false;
  document.querySelector(".search").style = "background: #340404";
}

export default IMDB;

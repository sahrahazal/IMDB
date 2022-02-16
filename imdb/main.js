fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "imdb8.p.rapidapi.com",
		"x-rapidapi-key": "1de5775c2emsh3539119aebd0959p17d90fjsn02748edac489"
	}
})
.then(response => response.json())
.then(data => {
    var list = data.d;

    list.map((item) => {
        var name= item.l;
        var poster = item.i.imageUrl;
        var movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`
        document.querySelector('.movies').innerHTML += movie;
    })
})
.catch(err => {
	console.error(err);
});
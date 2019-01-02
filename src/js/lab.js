var apod ={

  randomDate: function(start,end){
    let date = new Date(
      start.getTime() + Math.random() *
      (end.getTime() - start.getTime())
    );

    //let date = new Date(2013,5,6);
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();

    if(m<10){
      m = '0' + m;
    }

    if(d<10){
      d = '0' + d;
    }

    return `${y}-${m}-${d}`;

  },

  nasaAPI : function(result){

    document.getElementById("apodTitle").innerHTML = result.title;
    if(result.media_type === 'video'){
      document.getElementById("apodImg").style.display = 'none';
      let vid = document.getElementById("apodVideo > iframe");
      vid.src = result.url;
      document.createElement("apodVideo").style.display = 'block';
    }
    else{
      document.getElementById("apodVideo").style.display = 'none';
      let img = document.getElementById("apodImg");
      img.src = result.url;
      img.style.display = 'block';
    }
    if(result.copyright !=undefined){
      document.getElementById("apodCopyright").innerHTML = 'Copyright: ' + result.copyright;
    }
    document.getElementById("apodDate").innerHTML = 'Date: ' + result.date;
    document.getElementById("apodDesc").innerHTML = result.explanation;
  },

  getRequest: function() {
    let key = 'unFyWy2GcWsTLzxbvxao9hIVuG1dB7xlOtyNnjfa';
    var url = `https://api.nasa.gov/planetary/apod?api_key=${key}`;

    var _this = this;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
      let result = JSON.parse(xhr.response);

      _this.nasaAPI(result);
    }
  }
};





document.querySelector('btnRandApod').addEventListener('click', function(){
  apod.getRequest();
});

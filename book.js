
// --body--

const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar__"),
      contentbar = body.querySelector(".section__"),
      toggle = body.querySelector(".toggle"),
      textmode = body.querySelector(".textmode"),
      modeSwitch = body.querySelector(".toggle__switch");

      toggle.addEventListener("click", () =>{
        sidebar.classList.toggle("close"),
        contentbar.classList.toggle("close");
      });

      modeSwitch.addEventListener("click", () =>{
        body.classList.toggle("dark");
      });



// --music--

const music = new Audio();

const songs = [
  {
    id:'1',
    songName:`Faded <br>
    <div class="subtitle">Alan Walker</div>`,
    poster: "img/1.jpg"
  },
  {
    id:'2',
    songName:`lovely <br>
    <div class="subtitle">Billie Eilish</div>`,
    poster: "img/2.jpg"
  },
  {
    id:'3',
    songName:`Mockingbird <br>
    <div class="subtitle">Eminem</div>`,
    poster: "img/3.jpg"
  },
  {
    id:'4',
    songName:`Endless Love  <br>
    <div class="subtitle"> The Myth OST</div>`,
    poster: "img/4.jpg"
  },
  {
    id:'5',
    songName:`Sadness And Sorrow <br>
    <div class="subtitle">Naruto</div>`,
    poster: "img/5.jpg"
  },
  {
    id:'6',
    songName:`River flows in you <br>
    <div class="subtitle">Yiruma</div>`,
    poster: "img/6.jpg"
  },
  {
    id:'7',
    songName:`Take me to church <br>
    <div class="subtitle">Hozier</div>`,
    poster: "img/7.jpg"
  },
  {
    id:'8',
    songName:`Love Story <br>
    <div class="subtitle">Taylor Swift</div>`,
    poster: "img/8.jpg"
  },
  {
    id:'9',
    songName:`Another Love <br>
    <div class="subtitle">Tom Odell</div>`,
    poster: "img/9.jpg"
  }

]

Array.from(document.getElementsByClassName('songitem')).forEach((Element, i)=>{
  Element.getElementsByTagName('img')[0].src = songs[i].poster;
  Element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
  if (music.paused || music.currentTime <=0) {
    music.play();
    masterPlay.classList.remove('bx-play');
    masterPlay.classList.add('bx-pause');
    wave.classList.add('active2');
  } else{
    music.pause();
    masterPlay.classList.add('bx-play');
    masterPlay.classList.remove('bx-pause');
    wave.classList.remove('active2');
  }
} )

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('PlaylistPlay')).forEach((Element)=>{
  })
}

const makeAllbackgrounds = () => {
  Array.from(document.getElementsByClassName('songitem')).forEach((Element)=>{
    Element.style.background = "var(--sidebar-color)";
  })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('PlaylistPlay')).forEach((Element)=>{
  Element.addEventListener('click', (e)=>{
    index = e.target.id;
    makeAllPlays();
    music.src = `mp3/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
      return ele.id == index;
    })

    song_title.forEach(ele =>{
      let {songName} = ele;
      title.innerHTML = songName;
    })
    masterPlay.classList.remove('bx-play');
    masterPlay.classList.add('bx-pause');
    wave.classList.add('active2');
    music.addEventListener('ended',()=>{
      masterPlay.classList.add('bx-play');
      masterPlay.classList.remove('bx-pause');
      wave.classList.remove('active2');
    })
    makeAllbackgrounds();
    Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "var(--primary-color)";
  })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur/60);
  let sec = Math.floor(music_dur%60);
  if (sec<10) {
    sec = `0${sec}`
  }
  currentEnd.innerText = `${min}:${sec}`;

  let min1 = Math.floor(music_curr/60);
  let sec1 = Math.floor(music_curr%60);
  if (sec1<10) {
    sec = `0${sec1}`
  }
  currentStart.innerText = `${min1}:${sec1}`;

  let progressbar = parseInt((music.currentTime/music.duration)*100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`
  dot.style.left = `${seekbar}%`
})

seek.addEventListener('change', ()=>{
  music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
  masterPlay.classList.add('bx-play');
  masterPlay.classList.remove('bx-pause');
  wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
  if (vol.value == 0){
    vol_icon.classList.remove('bx-volume-full');
    vol_icon.classList.add('bx-volume-mute');
    vol_icon.classList.remove('bx-volume-low');
  }
  if (vol.value > 0){
    vol_icon.classList.remove('bx-volume-full');
    vol_icon.classList.remove('bx-volume-mute');
    vol_icon.classList.add('bx-volume-low');
  }
  if (vol.value > 50){
    vol_icon.classList.add('bx-volume-full');
    vol_icon.classList.remove('bx-volume-mute');
    vol_icon.classList.remove('bx-volume-low');
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
  index -= 1;
  if (index < 1){
    index = Array.from(document.getElementsByClassName('songitem')).length;
  }
  music.src = `mp3/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
      return ele.id == index;
    })

    song_title.forEach(ele =>{
      let {songName} = ele;
      title.innerHTML = songName;
    })

    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bx-play');
    document.getElementById(`${index}`).classList.add('bx-pause');
    makeAllbackgrounds();
    Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "var(--primary-color)";
})

next.addEventListener('click', ()=>{
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName('songitem')).length){
    index = 1;
  }
  music.src = `mp3/${index}.mp3`;
    poster_master_play.src = `img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
      return ele.id == index;
    })

    song_title.forEach(ele =>{
      let {songName} = ele;
      title.innerHTML = songName;
    })

    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bx-play');
    document.getElementById(`${index}`).classList.add('bx-pause');
    makeAllbackgrounds();
    Array.from(document.getElementsByClassName('songitem'))[`${index-1}`].style.background = "var(--primary-color)";
})


// --phone--

function toggleP(){
  let sidebar__ = document.getElementsByClassName("sidebar__");
  if (sidebar.style.visibility === "visible"){
      sidebar.style.visibility = "hidden";
  } else {
    sidebar.style.visibility = "visible";
  }
}
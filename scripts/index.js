/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
  let lastClicked = document.getElementsByClassName("b");
 if (lastClicked.length > 0) lastClicked[0].className = "a";
  document.getElementById(songId).className = "b";
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [`title: ${title}`, `album: ${album}`, `artist: ${artist}`, `duration: ${convertDur(duration)}`]
    const classes = ["a"]
    const attrs = { onclick: `playSong(${id})`}
    let obj = createElement("div", children,classes, attrs);
    obj.id=id;
    return obj;

}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [`id: ${id}`, `name: ${name}`, playlistDuration(id)];
    const classes = []
    const attrs = {}
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
       let tag = document.createElement(tagName);
        classes.forEach(a => tag.classList.add(a));
        tag.append(children);
        for (let key in attributes){
            tag.setAttribute(key, attributes[key]);
        }
       // li.appendChild(img);
       
       return tag;

    // Your code here
}
function playlistDuration(id) {
    let counter = 0;
    let index = searchId(id, player.playlists);
    let indexS;
    let arrS = player.playlists[index].songs;
    for (let i = 0; i < arrS.length; i++){
      indexS = searchId(arrS[i], player.songs);
      counter = counter + player.songs[indexS].duration;
    }
    return counter;
    // your code here
  }
  function searchId (id, objArr){         //helping function
    for(let i = 0; i < objArr.length; i++){
      if (objArr[i].id === id)
      return i
    }
    return -1;
  }
function convertDur (num){   //helping function
    let ss = num;
    let mm = 0;
    while (ss > 60){
      ss -= 60;
      mm++;
    }
      if (mm < 10){
      mm = "0"+mm;
      }
      if (ss < 10){
      ss = "0"+ss;
      }
      return mm + ":" + ss;
    }

// You can write more code below this line
const songs = document.getElementById("songs")
const playlists = document.getElementById("playlists")
player.songs.forEach((song) => {
const songsUl = createSongElement(song)
songs.appendChild(songsUl);
let image = document.createElement("img")
image.setAttribute("src", song.coverArt)
songsUl.append(image); 
});
player.playlists.forEach((playlist) => {
    const playlistUl = createPlaylistElement(playlist);
    playlists.appendChild(playlistUl);
});



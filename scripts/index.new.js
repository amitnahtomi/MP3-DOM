/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    let lastClicked = document.getElementsByClassName("b");
    if (lastClicked.length > 0) lastClicked[0].className = "a";
     document.getElementById(songId).className = "b";
    // Your code here
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(Id) {
    // Your code here
    let song = document.getElementById(Id);
  song.style.display = "none";
  player.songs.splice(searchId(id, player.songs), 1);
  for (let i = 0; i < player.playlists.length; i++) {
   if (player.playlists[i].songs.indexOf(id) >= 0)
   player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id), 1)
  }
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({id, title, album, artist, duration, coverArt }) {
  player.songs.push({"id": id, "title": title, "album": album, "artist": artist, "duration": duration, "coverArt": coverArt});

    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
        if (event.target.value === "play") {
        playSong(event.target.parentNode.id);
        }
        if (event.target.value === "remove") {
            removeSong(event.target.parentNode.id);
            } 
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent() {
    let title = document.getElementsByName("title")[0].value;
    let album = document.getElementsByName("album")[0].value;
    let artist = document.getElementsByName("artist")[0].value;
    let duration = document.getElementsByName("duration")[0].value;
    let coverArt = document.getElementsByName("cover-art")[0].value;
    let id = getId();
    addSong({id, title, album, artist, duration});
    let newSong = createSongElement({id, title, album, artist, duration, coverArt});
    songs.append(newSong);

    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const children = [`title: ${title}`, `album: ${album}`, `artist: ${artist}`, `duration: ${convertDur(duration)}`]
    const classes = ["a"]
    const attrs = {}
    const eventListeners = {}
    let obj = createElement("div", children,classes, attrs, eventListeners);
    obj.id=id;
    let play = createElement("input", [], [], {value: "play", type: "button"}, {});
    let remove = createElement("input",[] ,[] ,{value: "remove", type: "button"}, {});
    let image = createElement("img", [], [], {src: coverArt});
    obj.append(remove, play, image);
    return obj;
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = [`id: ${id}`, `name: ${name}`, playlistDuration(id)]
    const classes = ["c"]
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    let tag = document.createElement(tagName);
        classes.forEach(a => tag.classList.add(a));
        tag.append(children);
        for (let key in attributes){
            tag.setAttribute(key, attributes[key]);
        }
        for(let event in eventListeners){
            tag.addEventListener(event, eventListeners[event])
        }
       return tag;
    // Your code here
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songs = document.getElementById("songs")
player.songs.forEach((song) => {
const songsUl = createSongElement(song)
songs.appendChild(songsUl);
songs.addEventListener("click", handleSongClickEvent)

});

    // Your code here
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
  const playlists = document.getElementById("playlists")
  player.playlists.forEach((playlist) => {
    const playlistUl = createPlaylistElement(playlist);
    playlists.appendChild(playlistUl);
});
    // Your code here
}
function getId(id){
if (id === undefined){
    id = 0;
    while (searchId(id, player.songs) >= 0)
    {
      id++;
    }
  }
  return id;
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


// Creating the page structure
generateSongs()
generatePlaylists()

// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)


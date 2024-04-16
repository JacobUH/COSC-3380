import { createPlaylist, selectPlaylists, selectPlaylistSongs, addTrackToPlaylist } from "../../database/queries/dbPlaylistQueries.js";
import { extractUserID, errorMessage } from '../../util/utilFunctions.js';

export async function uploadPlaylistEntry(req, res) {
    const { playlistName, playlistDescription, coverArtURL, sessionToken}  = req.body;
    const userID = await extractUserID(req);

    try {
        const playlistCreation = await createPlaylist(userID, playlistName, playlistDescription, coverArtURL);
        if (playlistCreation !== false) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({ message: 'playlist creation successful'})
            );  
          } else {
            res.writeHead(409, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Already Have Playlist Name.' }));
          }
    } catch(error) {
        errorMessage(res, error, 'Error fetching playlist songs');

    }
}

export async function fetchPlaylists(req, res) {
    const userID = await extractUserID(req);
    try {
         const playlists = await selectPlaylists(userID);
         if (playlists !== false) {
             console.log(playlists);
             res.writeHead(200, { 'Content-Type': 'application/json' });
             res.end(JSON.stringify(playlists));
           } else {
             errorMessage(res, 'Error fetching playlists', 'Error');
           }
     } catch(error) {
         errorMessage(res, error, 'Error fetching playlists');
 
     }
 }

export async function fetchPlaylistSongs(req, res) {
   const { sessionToken, playlistName}  = req.body;
   const userID = await extractUserID(req);

   try {
        const playlistSongs = await selectPlaylistSongs(userID, playlistName);
        if (playlistSongs !== false) {
            console.log(playlistSongs);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(playlistSongs));
          } else {
            errorMessage(res, 'Error fetching playlist songs', 'Error');
          }
    } catch(error) {
        errorMessage(res, error, 'Error fetching playlist songs');

    }
}

export async function addSongToPlaylist(req, res) {
  const { playlistID, trackID } = req.body;
  
  try {
    const addSong = await addTrackToPlaylist (playlistID, trackID);
    if (addSong !== false) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(              
        JSON.stringify({ message: 'song added to playlist successful'})
      );
    } else {
      errorMessage(res, 'Error adding song to playlist', 'Error');
    }
  } catch(error) {
  errorMessage(res, error, 'Error adding song to playlist');

  }
 }
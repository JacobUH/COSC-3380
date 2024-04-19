import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import backendBaseUrl from '../../../apiConfig';
import { SubscriptionScreen } from './SubscriptionScreen';
import Logo from '/images/Logo.svg';

interface Playlist {
  playlistID: number;
  userID: number;
  firstName: string;
  lastName: string;
  playlistName: string;
  playlistArt: string;
}

interface HandleClose {
  onClose: () => void; // Specify the type of onClose prop
  playlist: Playlist | null;
}

export const PlaylistPopup: React.FC<HandleClose> = ({ onClose, playlist }) => {
  const handleNo = () => {
    onClose();
  };

  const storedToken = localStorage.getItem('sessionToken');

  const deletePlaylist = async () => {
    try {
      const response = await axios.post(
        `${backendBaseUrl}/api/playlist/deletePlaylistEntry`,
        {
          playlistID: playlist?.playlistID,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      refreshPage();
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-60"></div>{' '}
        {/* Increased z-index to 60 */}
        <div className="md:ml-[400px] bg-[#3E3C3C] text-white rounded-lg px-14 pt-8 pb-14 shadow-md z-50 flex flex-col items-center">
          <img
            className="w-[35px] h-[35px] mb-8"
            src={Logo}
            alt="coogify logo"
          />
          <p className="text-4xl mb-10">Are You Sure?</p>
          <div className="flex">
            <button
              className="bg-[#656262] hover:bg-[#9E67E4] text-white font-bold mt-4 mr-2 py-2 px-10 rounded"
              onClick={deletePlaylist}
            >
              Yes
            </button>

            <button
              className="bg-[#683f9c] hover:bg-[#9E67E4] text-white font-bold mt-4 py-2 px-10 rounded"
              onClick={handleNo}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import backendBaseUrl from '../../apiConfig';

interface Song {
  songName: string;
  coverArt: string;
  songURL: string;
  albumName: string;
  artistName: string;
}

interface Props {
  title: string;
}

export const RapMusicRows = ({ title }: Props) => {
  const [rapSongs, setRapSongs] = useState<Song[]>([]);

  const storedToken = localStorage.getItem('sessionToken');

  useEffect(() => {
    // Fetch data from backend API for rap songs
    const fetchRapSongs = async () => {
      try {
        const response = await axios.get(
          `${backendBaseUrl}/api/home/fetchRapSongs`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        setRapSongs(response.data);
      } catch (error) {
        console.error('Error fetching rap songs:', error);
      }
    };

    fetchRapSongs();
  }, []);

  return (
    <div className="w-full flex flex-col md:gap-4 gap-6 px-2">
      <div className="w-full flex items-center justify-between">
        <span className="text-[22px]">{title}</span>
        <a href="#" className="text-[#9E67E4] text-[15px] font-medium">
          See More
        </a>
      </div>
      <div className="w-full flex items-center overflow-x-auto overflow-y-auto md:pb-0 pb-5">
        <div className="flex items-center gap-2">
          {rapSongs.map((song: Song) => {
            return (
              <div
                key={song.songName}
                className="flex flex-col items-center gap-[6px] cursor-pointer"
                style={{ minWidth: '200px' }} // Adjust the minimum width of each song item
              >
                <div className=" bg-[#656262] rounded-lg p-5 bg-center bg-cover">
                  <img
                    className="w-[140px] h-[140px] rounded-xl"
                    src={song.coverArt}
                    alt={song.songName}
                  />
                  <div className="pt-2 text-white text-[15px] font-medium whitespace-nowrap">
                    {song.songName.length > 20
                      ? song.songName.slice(0, 17) + '...'
                      : song.songName}
                  </div>
                  <div className="pt-1 text-[#BA85FE] text-[13px]">
                    {song.artistName}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
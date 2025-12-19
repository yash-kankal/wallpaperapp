"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  type photoDataType = {
    id: string;
    author: string;
    download_url: string;
  };

  const [photoData, setPhotoData] = useState<photoDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://picsum.photos/v2/list?page=1&limit=200");
      setPhotoData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0e1111] text-white">
        <p className="text-2xl">Loading the wallpapers...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center  font-sans bg-[#0e1111]">
      <div className="min-h-screen p-8 grid grid-cols-4 gap-8">
        {photoData.map((pd) => (
          <div
            key={pd.id}
            className="
              group relative overflow-hidden rounded-2xl
              bg-white dark:bg-zinc-900
              shadow-md hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]
              dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.12)]
              transition-shadow duration-300
            "
            >
            <img
              src={`https://picsum.photos/id/${pd.id}/350/500`}
              alt={pd.author}
              className="
                w-full h-full object-cover
                transition-transform duration-300
                group-hover:scale-105
              "
            />

            <p
              className="
                absolute bottom-5 left-4
                text-white font-bold text-sm
                opacity-0 transition-opacity duration-300
                group-hover:opacity-100
              "
            >
              {pd.author}
            </p>
           <a
  href={pd.download_url}
  download
  target="_blank"
  rel="noopener noreferrer"
  className="
    absolute bottom-4 right-4
    bg-green-600 text-white text-sm font-semibold
    rounded px-3 py-1
    opacity-0 transition-opacity duration-300
    group-hover:opacity-100
  "
>
  Download
</a>


            
          </div>
        ))}
      </div>
    </div>
  );
}

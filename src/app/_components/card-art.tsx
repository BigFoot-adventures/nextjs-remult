"use client" 
import { ArtPiece } from '../_shared/art';
import { Artist } from '../_shared/artist';
import { useState, useEffect } from 'react';
import { remult } from 'remult';
import Link from 'next/link';
import Image from 'next/image';

const artistRepo = remult.repo(Artist);

export default function ArtCard({ art }: { art: ArtPiece }) {
  const [artist, setArtist] = useState<Artist>();
  useEffect(() => {
    try {
      artistRepo.findFirst({ id: art.artistId }).then(setArtist);
    } catch (error) {
      console.error(error);
    }
  }, [art.artistId]);
  return (
    <div className='m-4 w-72 p-4 border border-black rounded-lg' key={art.id}>
      <h3>{art.title}</h3>
      <Image src={art.imageUrl} width={100} height={200} alt={art.title} className='float-right relative -top-8 border border-black' priority={true} />
      <p className='overflow-auto h-16'>{art.description}</p>
      <p>{artist?.firstName}</p>
      <p>{art.medium}</p>
      <button className='btn-gray'>
        <Link href={`/art/${art.id}`}>View</Link>
      </button>
    </div>
  )
}
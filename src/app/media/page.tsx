"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Media } from '../_shared/media';
import Head from 'next/head';
import MediaCard from '../_components/card-media';
import '../globals.css'

//const mediaRepo = remult.repo(Media);

export default function MediaPage() {
 const [media, setMedia] = useState<Media[]>([]);
  const router = useRouter();

  //useEffect(() => { mediaRepo.find().then(setMedia) }, []);

  return (
    <div>
      <Head>
        <title>View Media</title>
      </Head>
      
      <div>
        <h1 className="text-center justify-text-3xl font-bold p-12 dark:text-white">Media will go here!</h1>
      </div>
      <div className="col-span-3">
          <a href="../media/create"><button className="ml-10 bg-emerald-500 text-white rounded-md  mt-3 p-1 hover:bg-emerald-600 hover:shadow">
              Add Media
          </button></a>
        </div>
    </div>
  );
}
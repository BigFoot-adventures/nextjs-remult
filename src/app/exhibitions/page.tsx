"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Exhibit } from '../shared/exhibit';
import Head from 'next/head';
import ExhibitCard from '../components/ExhibitCard';
import '../globals.css'

const exhibitRepo = remult.repo(Exhibit);

export default function ExhibitPage() {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);

  useEffect(() => {
    async function fetchExhibits() {
      const allExhibits = await exhibitRepo.find();
      setExhibits(allExhibits);
    }
    fetchExhibits();
  }, []);

  return (
    <div>
      <Head>
        <title>Exhibits</title>
      </Head>
      <div className='flex flex-col mx-auto mt-10 pl-8'><h1>Exhibits</h1></div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
            <label htmlFor="date-filter" className="text-gray-600">Date:</label>
            <input
            type="date"
            id="date-filter"
            placeholder="Select date"
            className="p-2 rounded-lg border border-gray-400 focus:outline-none"
            />
            <label htmlFor="location-filter" className="text-gray-600">Location:</label>
            <input
            type="text"
            id="location-filter"
            placeholder="Enter location"
            className="p-2 rounded-lg border border-gray-400 focus:outline-none"
            />
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
            Edit
        </button>
        </div>

      <div className='flex flex-col justify-center items-center mx-auto mt-10'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-8 m-8">
            {exhibits.map((exhibit) => (
            <ExhibitCard key={exhibit.id} exhibit={exhibit} />
            ))}
        </div>
      </div>
    </div>
  );
}
"use client"
import { useEffect, useState } from 'react';
import { remult } from 'remult';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArtPiece } from '../../_shared/art';
import { Artist, Type } from '../../_shared/artist';
import SizeInput from '../../_components/sizeInput';
import YearPicker from '../../_components/yearPicker';

export default function UpdateArt({params} : { params: {edit: string}}) {
  const [successMessage, setSuccessMessage] = useState('');
  const [art, setArt] = useState<Partial<ArtPiece>>({
    id: 0,
    catalogNum: 0,
    title: '',
    artist: undefined,
    aquired: '',
    created: '',
    description: '',
    imageUrl: '',
    type: Type.Painting,
    medium: '',
    height: '',
    width: '',
    depth: '',
    location: ''
  });
  const [artists, setArtists] = useState<Artist[]>();
  const artRepo = remult.repo(ArtPiece);
  const artistRepo = remult.repo(Artist);
  const router = useRouter();

  async function deleteArt() {
    try { await artRepo.delete(art!) }
    catch (error) { console.error(error)}
  }
  
  function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = e.target;
    setArt((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // check for exisiting catalog number
    // let dates be input as just years/months
    // let artist and type be dropdowns
    // imageURL be a file upload
    setArt({
      ...art,
      catalogNum: form.catalogNum.value,
      title: form.artTitle.value,
      artist: form.artist.value,
      aquired: form.aquired.value,
      created: form.created.value,
      description: form.description.value,
      imageUrl: form.imageUrl.value,
      type: form.artType.value,
      medium: form.medium.value,
      height: form.height.value,
      width: form.width.value,
      depth: form.depth.value,
      location: form.location.value
    });
    await artRepo.save(art).then(() => setSuccessMessage('Exhibition created successfully!'));
    router.push('./');
  }

  useEffect(() => {
    if (params.edit)
      artRepo.findFirst({ id: parseInt(params.edit) }).then(setArt);
    artistRepo.find({}).then(setArtists);
    document.getElementById(`${art.artist?.id}`)?.setAttribute('selected', 'true');
  }, [params.edit, artRepo, artistRepo, art.artist?.id]);
 
  if (!art) return <div className='flex font-bold text-2xl items-center justify-center h-96 max-w-'><div>Loading...</div></div>;
  
  return (
    <main className="mx-auto p-10">
      <button className="fixed btn-gray h-fit self-end right-4 top-20" onClick={() => router.push('./')}>Back</button>
      <button className="btn-red fixed right-4 bottom-4" onClick={deleteArt}>Delete</button>
      {successMessage && (
        <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
      )}
      {art.imageUrl && <Image src={art.imageUrl} width={200} height={200} alt={art.title!} className='float-right mt-14 border border-black' priority={true} />}
      <form className='form !flex flex-wrap w-3/5 md:w-[600px]' onSubmit={handleSubmit}>
        <div className='input w-32'>
          <label htmlFor="catalogNum">Catalog Number</label>
          <input
            type="text"
            id="catalogNum"
            name="catalogNum"
            placeholder='001'
            className="text-center"
            value={art.catalogNum || ''}
            onChange={handleChange}
          />
        </div>
        <div className='input col-span-3 man grow'>
          <label htmlFor="artTitle">Title</label>
          <input
            type="text"
            id="artTitle"
            name="artTitle"
            placeholder='Title'
            value={art.title || ''}
            onChange={(e) => setArt({ ...art, title: e.target.value })}
          />
        </div>
        <div className='input grow'>
          <label htmlFor="artist">Artist</label>
          <select name="artist" id="artist" className='bg-white border border-emerald-950 text-sm rounded focus:outline-none focus:ring-black focus:border-emerald-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
            <option selected value={undefined}>Unknown</option>
            {artists?.map(artist => (
              <option value={artist.id} id={`${artist.id}`} key={artist.id}>{artist.name}</option>
            ))}
          </select>
        </div>
        <YearPicker id="Aquired" />
        <YearPicker id="Created" />
        <div className='input grow'>
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            id="image"
            className='overflow-visible'
            onChange={handleChange}
          />
        </div>
        <div className='input w-full'>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder='Description'
            className="border border-black text-sm rounded-md focus:outline-none
            focus:ring-black focus:border-emerald-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:text-white !min-h-[52px]"
            value={art.description}
            onChange={() => handleChange}
          />
        </div>
        <div className='input'>
          <label htmlFor="artType">Type</label>
          <input
            type="text"
            id="artType"
            placeholder='Painting'
            
          />
        </div>
        <div className='input'>
          <label htmlFor="medium">Medium</label>
          <input
            type="text"
            id="medium"
            placeholder='Oil'
            value={art.medium}
            onChange={handleChange}
          />
        </div>
        <SizeInput id='Height' />
        <SizeInput id='Width' />
        <SizeInput id='Depth' />
        <div className='input'>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder='Location'
            value={art.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn-green h-fit self-end justify-self-end">Add Art</button>
        {/* create and add sale button, takes user to new sale form once art is inserted
        <button type="button" onClick={createAndAddSale} className="btn-green h-fit self-end justify-self-end">Add Sale</button> */}
      </form>
  </main>
  );
}
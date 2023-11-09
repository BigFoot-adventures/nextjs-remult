"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { Exhibit } from '../../shared/exhibit';
import '../../globals.css'

const exhibitRepo = remult.repo(Exhibit);

export default function ExhibitRegistration() {
    const [formData, setFormData] = useState({
      name: '',
      location: '',
      startDate: new Date,
      endDate: new Date,
    });
  
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      exhibitRepo.insert(formData);
      router.push('/exhibitions');
      setSuccessMessage('Exhibition created successfully!');
    };
  
    return (
      <div className="flex flex-col justify-center items-center mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-6 dark:text-white">Add Exhibition</h1>
        {successMessage && (
          <div className="bg-green-500 text-white p-4 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="input">
            <label htmlFor="name">
              Name of Exhibition
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="email">
              Location of Exhibition
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="startDate">
              Exhibition Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="endDate">
              Exhibition End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Exhibition
          </button>
        </form>
      </div>
    );
  }
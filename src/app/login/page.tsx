"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { remult } from 'remult';
import { User } from '../shared/user';
import '../globals.css'

const userRepo = remult.repo(User);

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            userRepo.findFirst({ email: email, password: password }).then((user) => {
                if (user) {
                  alert('Login successful');
                  router.push('/artist');
                } else {
                    alert('Login failed');
                }
            });
        } catch (err) {
            alert('Login failed');
        }
    }

    return (
    <div className="flex flex-col justify-center items-center mx-auto mt-10">
      <h1 className='dark:text-white margin-auto text-3xl font-semibold mb-6'>Login</h1>
      <form onSubmit={login} className='form'>
        <div className='input'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='example@example.org'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className='bg-emerald-500 text-white p-1 px-2 rounded-lg'>Login</button>
      </form>
    </div>
    );
}

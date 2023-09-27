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

    const login = async () => {
        const loginInfo = {
            email: email,
            password: password,
        };
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
        });
        const data = await response.json();
        if (data.success) {
            router.replace('/art');
        } else {
            alert('Login failed');
        }
    }

    return (
        <div>
      <h1 className='margin-auto'>Login</h1>
      <form onSubmit={login} className='flex flex-col justify-center items-center content-start text-slate-100 dark:text-slate-950'>
        <div className='input'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-transparent border-b-2 border-slate-900 ml-2'
          />
        </div>
        <div className='input'>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-transparent border-b-2 border-slate-900 ml-2'
          />
        </div>
        <button type="submit" className='bg-gray-200 p-1 px-2 rounded-lg'>Login</button>
      </form>
    </div>
    );
}

"use client";

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        axios.post("http://localhost:3001/login", formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            .then((response) => {
                console.info(response.data);
                router.push("/");
            })
            .catch((error) => {
                console.error(error.response?.data || error);
            });
    }

    async function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = event.target;
        setFormData( prevState => ({ ...prevState, [id]: value}));
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/logo-circle.png" alt="Jonah Marc logo" />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-primary">Sign in to your account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                    <label htmlFor="username" className="block text-sm/6 font-medium text-primary">Email address</label>
                    <div className="mt-2">
                        <input
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6"
                            type="username"
                            name="username"
                            id="username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    </div>

                    <div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm/6 font-medium text-primary">Password</label>
                        <div className="text-sm">
                        <a href="#" className="font-semibold text-accent hover:text-hover">Forgot password?</a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <input
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-accent sm:text-sm/6"
                            type="password"
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    </div>

                    <div>
                        <button type="submit" className="flex w-full justify-center rounded-md bg-accent px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">Sign in</button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-sec">
                    Don&apos;t have an account yet?
                    <a href="#" className="font-semibold text-accent hover:text-hover"> Sign Up</a>
                </p>
            </div>
        </div>
    )
}

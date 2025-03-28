'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"

export default function Form() {
    const [error, setError] = useState("")
    const router = useRouter()

    async function submitHandler(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const response = await signIn('credentials', {
            initials: formData.get('initials')?.toString(),
            password: formData.get('password')?.toString(),
            redirect: false
        })

        if (response?.error) {
            setError("Неверные учетные данные")
        } else {
            router.push('/admin')
        }
    }

    return (
        <form className='border p-5 w-1/2 flex flex-col mx-auto mt-[30px]' onSubmit={submitHandler}>
            <input
                className='border p-3 my-3 rounded-md'
                required
                type="text"
                name="initials"
                placeholder="Инициалы"
            />
            <input
                className='border p-3 my-3 rounded-md'
                required
                type="password"
                name="password"
                placeholder="Пароль"
            />
            <button
                type="submit"
                className='button mx-auto'
            >
                Войти
            </button>
            {error && (
                <p className='text-red-500 mt-3 text-center'>{error}</p>
            )}
        </form>
    )
}

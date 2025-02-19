'use client'
import { useForm } from "react-hook-form"


export default function CallbackForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)


    return (
        <form className="flex flex-col gap-y-10" onSubmit={handleSubmit(onSubmit)}>
            <input className="formFields" {...register("firstName", { required: true, maxLength: 20 })} />
            <input className="formFields" {...register("email", { pattern: /^[A-Za-z]+$/i })} />
            <select className="formFields" {...register("subject")}>
                <option value="cooperation">Сотрудничество</option>
                <option value="troubleOrder">Проблема с заказом</option>
                <option value="other">Что-то потом придумаю</option>
            </select>
            <textarea className="formFields" {...register("message")} />
            <input type="submit" />
        </form>
    )
}
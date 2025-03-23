'use client'
import { useForm } from "react-hook-form"


export default function CallbackForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)


    return (
        <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
            <label>Ваше имя</label>
            <input className="formFields" placeholder="Иван Иванов" {...register("firstName", { required: true, maxLength: 50 })} />
            <label>Электронная почта</label>
            <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="formFields" placeholder="example@mail.com" {...register("email")} />
            <label>Причина обращения</label>
            <select className="formFields" {...register("subject")}>
                <option value="cooperation">Сотрудничество</option>
                <option value="troubleOrder">Проблема с заказом</option>
                <option value="other">Другое</option>
            </select>
            <label>Дополнительно</label>
            <textarea className="formFields" placeholder="Необязательно к заполнению" {...register("message")} />
            <input className=" border w-fit mx-auto py-[12px] px-[30px] rounded-lg cursor-pointer" type="submit" />
        </form>
    )
}
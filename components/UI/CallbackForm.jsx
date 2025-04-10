'use client'
import { useForm } from "react-hook-form"


export default function CallbackForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)


    return (
        <form className="callback_form flex flex-col " onSubmit={handleSubmit(onSubmit)}>
            <label className="callback_form-label">Ваше имя</label>
            <input className="formFields" placeholder="Иван Иванов" {...register("firstName", { required: true, maxLength: 50 })} />

            <label className="callback_form-label">Электронная почта</label>
            <input className='formFields' type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="example@mail.com" {...register("email")} />

            <label className="callback_form-label">Причина обращения</label>
            <select className="formFields" {...register("subject")}>
                <option value="cooperation">Сотрудничество</option>
                <option value="troubleOrder">Проблема с заказом</option>
                <option value="other">Другое</option>
            </select>

            <label className="callback_form-label">Дополнительно</label>
            <textarea className="formFields" placeholder="Необязательно к заполнению" {...register("message")} />

            <input className="callback_form-btn border w-fit mx-auto py-[12px] px-[30px] rounded-lg cursor-pointer" type="submit" />
        </form>
    )
}
'use client'
import { useForm } from "react-hook-form"


export default function CallbackForm() {
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        try {
            await fetch("/api/callback", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log('Сообщение отправлено');
            } else {
                console.error('Ошибка при отправке данных в телеграмме');
            }
        } catch (error) {
            console.error("Ошибка при отправке данных в телеграмме", error)
        }
    }



    return (
        <form className="callback_form flex items-center flex-col " onSubmit={handleSubmit(onSubmit)}>
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



export async function POST(request) {
    try {
        const data = await request.json();


        const subjectMap = {
            cooperation: 'Сотрудничество',
            troubleOrder: 'Проблема с заказом',
            other: 'Другое'
        };

        const subject = subjectMap[data.subject] || 'Не указано';

        const TOKEN = "7367196107:AAGtPzr_4mqNXe-m6K8LpuxvRTlr04Smoz8"; //убрать в енв
        const CHAT_ID = "-4711805139";
        const text = `
Имя: ${data.firstName} %0A
%0A
Электронная почта: ${data.email} %0A
%0A
Причина запроса: ${subject} %0A
%0A
Дополнительная информация: ${data.message || '—'} %0A
        `;

        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`);
        const result = await response.json();

        if (response.ok) {
            return new Response(JSON.stringify({ result: 'OK' }), { status: 200 });
        } else {
            console.error("Ошибка при отправке сообщения в Telegram", result);
            return new Response(JSON.stringify({ result: 'Error', message: result.description }), { status: 500 });
        }
    } catch (error) {
        console.error("Ошибка при обработке запроса", error);
        return new Response(JSON.stringify({ result: 'Error', message: error.message }), { status: 500 });
    }
}

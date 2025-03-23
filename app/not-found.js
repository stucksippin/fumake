import { Result } from "antd";
import Link from "next/link";


export default function NotFound() {
    return (
        <div>
          <Result
            status="404"
            title="404"
            subTitle="Что-то пошло не так, страница не найдена."
            extra={<Link className="button hover:text-black" href={'/catalog'} type="primary">Вернуться в каталог</Link >}
          />
        </div>
    );
}
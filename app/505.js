import { Link, Result } from 'antd';
export default function Custom500() {
    return (
        <Result
        status="500"
        title="500"
        subTitle="Технические проблемы."
        extra={<Link type="primary">Главная страница</Link>}
      />
    )
  }

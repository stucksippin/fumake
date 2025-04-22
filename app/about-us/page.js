import React from "react";

export default function AboutUs() {
    return (
        <div className="about-container">
            <section className="about-content">
                <div className="about-text">
                    <h1>О НАШЕМ ПРОИЗВОДСТВЕ</h1>
                    <h2>НАША ИСТОРИЯ</h2>
                    <p>
                        Начав с небольшой мастерской, мы выросли в современное производство
                        полного цикла. Каждый день мы создаем мебель, которая делает жизнь
                        наших клиентов комфортнее.
                    </p>
                    <p>
                        Мы контролируем весь процесс - от выбора материалов до финальной
                        сборки. Это позволяет гарантировать высочайшее качество нашей
                        продукции.
                    </p>
                    <p>
                        За 13 лет работы мы изготовили более 25 000 предметов мебели для
                        домов и офисов по всей стране.
                    </p>
                </div>
                <div className="about-image">
                    <img
                        src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                        alt="Наше производство"
                        loading="lazy"
                    />
                </div>
            </section>

            <section className="features">
                <h2>НАШИ ПРЕИМУЩЕСТВА</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-chess-knight"></i>
                        </div>
                        <h3>СОБСТВЕННОЕ ПРОИЗВОДСТВО</h3>
                        <p>Полный контроль качества на всех этапах</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-tree"></i>
                        </div>
                        <h3>ЭКОЛОГИЧНЫЕ МАТЕРИАЛЫ</h3>
                        <p>Используем только безопасные материалы</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-ruler-combined"></i>
                        </div>
                        <h3>ИНДИВИДУАЛЬНЫЕ РЕШЕНИЯ</h3>
                        <p>Изготовим мебель по вашим размерам</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-award"></i>
                        </div>
                        <h3>ГАРАНТИЯ 5 ЛЕТ</h3>
                        <p>Уверены в качестве нашей продукции</p>
                    </div>
                </div>
            </section>

            <section className="team">
                <h2>НАША КОМАНДА</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                            alt="Директор"
                            loading="lazy"
                        />
                        <div className="member-info">
                            <h3>АЛЕКСЕЙ ИВАНОВ</h3>
                            <p>Основатель и директор</p>
                        </div>
                    </div>
                    <div className="team-member">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                            alt="Технолог"
                            loading="lazy"
                        />
                        <div className="member-info">
                            <h3>ЕЛЕНА СМИРНОВА</h3>
                            <p>Главный технолог</p>
                        </div>
                    </div>
                    <div className="team-member">
                        <img
                            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                            alt="Дизайнер"
                            loading="lazy"
                        />
                        <div className="member-info">
                            <h3>ДМИТРИЙ ПЕТРОВ</h3>
                            <p>Ведущий дизайнер</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contacts">
                <h2>наше расположение</h2>
                <div className="contacts-map">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?ll=39.715520%2C47.236903&mode=poi&poi%5Bpoint%5D=39.712075%2C47.237653&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D48887648014&z=15"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex={0}
                        title="Карта с расположением Конгресс-холла ДГТУ"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
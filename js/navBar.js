document.addEventListener("DOMContentLoaded", ()=>{
    const field = document.querySelector("#navbar-main")
    
    if (field){

        field.innerHTML = ''

        field.innerHTML = `
        <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand big-screen-element" href="">АИИС ЭГЗ</a>
                </div>
                <div id="main-nav" class="navbar-collapse collapse">
                                    <ul class="nav navbar-nav"><li><a href="pages/profile.html">Главная</a></li><li><a href="">Справка</a></li><li class="dropdown"><a data-id="181" href="" class="dropdown-toggle" data-toggle="dropdown">Реестры <b class="caret"></b> </a><ul class="dropdown-menu"><li><a href="">Реестр жалоб</a></li><li><a href="">Реестр недобросовестных участников ГЗ</a></li><li><a href="">Реестр опытов работы</a></li><li><a href="">Реестр недобросовестных участников закупок</a></li><li><a href="">Реестр участников ГЗ </a></li><li><a href="">Планы ГЗ</a></li><li><a href="">Реестр договоров</a></li><li><a href="">Реестр квалифицированных поставщиков</a></li></ul></li><li class="dropdown"><a data-id="66" href="" class="dropdown-toggle" data-toggle="dropdown">Закупки <b class="caret"></b> </a><ul class="dropdown-menu"><li><a href="pages/search_lots.html">Поиск лотов</a></li><li><a href="pages/search_announce.html">Поиск объявлений</a></li></ul></li><li><a href=""><b>Тренажер</b> </a></li></ul><ul class="nav navbar-nav navbar-right">
                    <li><a href="">Қаз</a></li>
                    <li><a href="">Рус</a></li>
                        <li class="dropdown">
                        <a href="" class="dropdown-toggle" data-toggle="dropdown">
                            Фамилия Имя Отчество                    
                            <b class="caret"></b>
                        </a>
                        
                        <ul class="dropdown-menu">
                            <li><a href="pages/profile.html">Кабинет</a></li>
                            <li class="divider"></li>
                            <li><a href="">Избранное</a></li>
                            <li class="divider"></li>
                            <li><a href="index.html">Выход</a></li>

                        </ul>
                    </li></ul>
                    <ul id="navbar-notice" class="nav navbar-nav navbar-right">                        
                        <li class="dropdown" id="mainNav">
                        </li>
                    <li class="dropdown">
                        <a href="" class="dropdown-toggle no-hover fa-lg" data-toggle="dropdown"><span class="label label-danger"><i class="far fa-bell"></i></span>&nbsp;</a><ul class="dropdown-menu menu-sm" id="notify-container">
                            <li><a href="">Все уведомления</a></li>
                            <li><a href="">Управление уведомлениями</a></li>
                        </ul>
                    </li></ul>
                </div>
            </div>
        `
    }
})

document.addEventListener("DOMContentLoaded", function () {
    const field = document.querySelector("#cabinet_nav");
    const memberFlag = localStorage.getItem("userMember");

    if (field) {
        field.innerHTML = "";

        // --- Вариант для зарегистрированного пользователя ---
        const memberNavbar = `
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a data-id="30" href="" class="dropdown-toggle" data-toggle="dropdown">Личные данные <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">Регистрационные данные</a></li>
                        <li><a href="">Паспортные данные</a></li>
                        <li><a href="">Контактные данные</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a data-id="2076" href="" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Избранное <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">Объявления</a></li>
                    </ul>
                </li>
            </ul>
        `;

        // --- Вариант для гостя (не участника) ---
        const guestNavbar = `
            <ul class="nav navbar-nav">
                <li class="dropdown">
                    <a data-id="47" href="" class="dropdown-toggle" data-toggle="dropdown">Рабочий кабинет <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">Электронные договора страхования</a></li>
                        <li><a href="pages/search_lots.html">Поиск объявлений (общий)</a></li>
                        <li class="dropdown-sub-menu">
                            <a data-id="2135" href="" class="dropdown-toggle" data-toggle="dropdown">Договоры</a>
                            <ul class="dropdown-menu">
                                <li><a href="pages/menu/contracts.html">Мои договоры (Поставщик)</a></li>
                                <li><a href="">Многосторонние договора</a></li>
                                <li><a href="">Передача прав</a></li>
                                <li><a href="">Мои договоры (Консорциум)</a></li>
                                <li><a href="">Накладные</a></li>
                            </ul>
                        </li>
                        <li><a href="">Отправка заявки на корректировку</a></li>
                        <li><a href="pages/menu/search_for_lots.html">Поиск по актам</a></li>
                        <li><a href="pages/menu/my_application.html">Мои заявки</a></li>
                        <li><a href="">Включение в реестр квалифицированных поставщиков </a></li>
                        <li><a href="">Электронные банковские гарантии</a></li>
                        <li><a href="">Изменение создателя объявления</a></li>
                        <li><a href="">Реестр опытов работы</a></li>
                        <li><a href="">Обращения</a></li>
                        <li><a href="">Мои жалобы</a></li>
                        <li class="dropdown-sub-menu">
                            <a data-id="2141" href="" class="dropdown-toggle" data-toggle="dropdown">Передача прав</a>
                            <ul class="dropdown-menu">
                                <li><a href="">Передача/Отзыв прав по закупкам</a></li>
                                <li><a href="">Подтверждение/Отклонение передачи прав по закупкам</a></li>
                            </ul>
                        </li>
                        <li class="dropdown-sub-menu">
                            <a data-id="2314" href="" class="dropdown-toggle" data-toggle="dropdown">Журнал</a>
                            <ul class="dropdown-menu">
                                <li><a href="">Журнал поручений</a></li>
                                <li><a href="">Журнал жалоб по решениям</a></li>
                            </ul>
                        </li>
                        <li><a href="">Комм. предложения/Запросы(Поставщик)</a></li>
                        <li><a href="">Поиск по актам (Тех. надзор/Автор. надзор)</a></li>
                    </ul>
                </li>

                <li class="dropdown">
                    <a data-id="30" href="" class="dropdown-toggle" data-toggle="dropdown">Личные данные <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">Регистрационные данные</a></li>
                        <li><a href="">Паспортные данные</a></li>
                        <li><a href="">Контактные данные</a></li>
                    </ul>
                </li>

                <li class="dropdown">
                    <a data-id="31" href="" class="dropdown-toggle" data-toggle="dropdown">Профиль участника <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">Обновление регистрационных данных</a></li>
                        <li><a href="pages/menu/conn_rate_main.html">Лицевой счет</a></li>
                        <li><a href="">Уведомления</a></li>
                        <li><a href="">Регистрационные данные</a></li>
                        <li><a href="">Атрибуты участника</a></li>
                        <li><a href="">Контактные данные</a></li>
                        <li><a href="pages/menu/вank_accounts.html">Банковские счета</a></li>
                        <li><a href="">Сотрудники организации</a></li>
                        <li><a href="">Органы налоговой регистрации</a></li>
                        <li><a href="">Данные об учредителях</a></li>
                        <li><a href="">Данные о руководителе</a></li>
                        <li><a href="">Данные о филиалах</a></li>
                        <li><a href="">Данные о налоговой задолженности</a></li>
                        <li><a href="">Данные о наличии признака инвалидов</a></li>
                        <li><a href="">Мои электронные лицензии</a></li>
                        <li><a href="">Мои разрешительные документы</a></li>
                        <li><a href="">Мои заявки на регистрацию банка</a></li>
                        <li><a href="">Выпуск токенов (для разработчиков)</a></li>
                        <li><a href="">Финансовая устойчивость</a></li>
                    </ul>
                </li>

                <li class="dropdown">
                    <a data-id="1161" href="" class="dropdown-toggle" data-toggle="dropdown">Внешние сервисы <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">ИС "ЭСФ"</a></li>
                        <li><a href="">Судебный кабинет (сайт Верховного суда РК)</a></li>
                        <li><a href="">ИС "ЕНС ТРУ"</a></li>
                        <li><a href="">Сервис проверки признака "Плательщик НДС" (сайт КГД МФ РК)</a></li>
                        <li><a href="">NCA eCabinet</a></li>
                        <li><a href="">Списки несостоятельных должников (сайт КГД МФ РК)</a></li>
                        <li><a href="">Поиск налогоплательщиков, находящихся на стадии ликвидации (сайт КГД МФ РК)</a></li>
                        <li><a href="">Интернет-магазин стандартов Казахстанский институт стандартизации и метрологии</a></li>
                        <li><a href="">Интернет-портал "Казахстанское содержание" </a></li>
                    </ul>
                </li>

                <li class="dropdown">
                    <a data-id="2076" href="" class="dropdown-toggle" data-toggle="dropdown">Избранное <b class="caret"></b> </a>
                    <ul class="dropdown-menu">
                        <li><a href="">Объявления</a></li>
                    </ul>
                </li>
            </ul>
        `;

        if (memberFlag === 'false') {
            field.innerHTML = memberNavbar;
        } else {
            field.innerHTML = guestNavbar;
        }
    }
    
});

document.addEventListener("DOMContentLoaded", () => {
    const field = document.querySelector("#mainNav");
    const schetFlag = localStorage.getItem("userSchet");
    const memberFlag = localStorage.getItem("userMember");

    if (field){
        field.innerHTML = "";

        const schetIconTrue = `
            <a href="pages/menu/conn_rate_main.html" class="dropdown-toggle no-hover fa-lg" data-toggle="dropdown">
                <span class="label label-success"><i class="far fa-credit-card"></i> <span class="big-screen-element">Тариф активен</span></span>
            </a>

            <ul class="dropdown-menu menu-sm" id="notify-container">
                <li><a href="pages/menu/conn_rate_main.html"><strong>Сумма заявки на участие в закупке не будет превышать 1 миллиона тенге</strong></a></li>
            </ul>
            `;

        const schetIconFalse = `
            <a href="pages/menu/conn_rate_main.html" class="fa-lg no-hover">
                <span class="label label-danger"><i class="far fa-credit-card"></i> Подключить тариф</span>
            </a>
`;
        if (memberFlag !== 'false') {
            if (schetFlag === 'false') {
                field.innerHTML = schetIconFalse;
            } else {
                field.innerHTML = schetIconTrue;
            }
        }
    }
   
});


document.addEventListener("DOMContentLoaded", ()=>{
    const field = document.querySelector("#alertField")
    const memberFlag = localStorage.getItem("userMember")
    const schetFlag = localStorage.getItem("userSchet")

    if (field){
        field.innerHTML = ''

        const memberAlert = `
            <div class="alert alert-warning">Вы не зарегистрированы в качестве участника государственных закупок. <a href="pages/menu/member_reg_full.html">Зарегистрировать участника</a></div>
            `
    
        const schetAlert = `
            <div class="alert alert-warning">Хотите получить данные из ИСНА о банковских реквизитах.<br><a href="pages/menu/conn_rate_main.html">Да, получить данные</a></div>
            `
    
        if (memberFlag === "false") {
            field.innerHTML = memberAlert
        } else if (schetFlag === "false"){
            field.innerHTML = schetAlert
        }
    }
    
})
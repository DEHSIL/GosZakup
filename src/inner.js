// document.addEventListener("DOMContentLoaded", function () {
//     const depth = window.location.pathname.split("/").length - 2;
//     const basePath = `${"../".repeat(depth)}`;

//     // let headerPlaceholder = document.getElementById("header-placeholder");
//     // if (!headerPlaceholder) {
//     //     headerPlaceholder = document.createElement("div");
//     //     headerPlaceholder.id = "header-placeholder";
//     //     document.body.prepend(headerPlaceholder);
//     // }

//     function fixAttributePath(element, attr) {
//         const value = element.getAttribute(attr);
//         if (!value || value.startsWith("http") || value.startsWith("/") || value.startsWith("data:"))
//             return; // Пропускаем внешние и абсолютные пути
//         element.setAttribute(attr, basePath + value);
//     }

//     // 3️⃣ Исправляем пути в разных элементах
//     document.querySelectorAll("a[href]").forEach(el => fixAttributePath(el, "href"));
//     console.log(document.querySelectorAll("a[href]"))
//     // headerPlaceholder.innerHTML = `
//     //     <header class="main-header">
//     //         <nav class="navbar">
//     //             <a href="${basePath}index.html" class="nav-item">Главная</a>
//     //             <a href="${basePath}pages/about.html" class="nav-item">О компании</a>
//     //             <a href="${basePath}pages/contacts/info.html" class="nav-item">Контакты</a>
//     //         </nav>
//     //     </header>
//     // `;
// });

(function() {
  // Определяем базовый путь проекта (GitHub Pages поддержка)
  const { origin, pathname } = window.location;
  const repoName = pathname.split('/')[1]; // имя репозитория
  const basePath = origin + (repoName ? `/${repoName}/` : '/');

  document.querySelectorAll('[src], [href]').forEach(el => {
    const attr = el.hasAttribute('src') ? 'src' : 'href';
    const value = el.getAttribute(attr);

    if (!value || /^(https?:|mailto:|tel:|#)/.test(value)) return;

    // если ссылка относительная (например "../images/logo.png" или "img/logo.png")
    if (!value.startsWith(basePath)) {
      // удаляем все ../ и ./ в начале пути
      const cleanPath = value.replace(/^(\.\/|\.\.\/)*/g, '');
      el.setAttribute(attr, basePath + "GosZakup" + cleanPath);
    }
  });
})();
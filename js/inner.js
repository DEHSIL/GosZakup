function create_routs() {
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
      el.setAttribute(attr, basePath + cleanPath);
    }
  });
};

document.addEventListener('DOMContentLoaded', create_routs)

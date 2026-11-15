'use strict';

/* ================= утилиты ================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function esc(str) {
  return String(str ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function simpleHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return 'h' + h.toString(36);
}

let toastTimer = null;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
}

function plural(n, forms) {
  const a = Math.abs(n) % 100, b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

/* ================= i18n ================= */
const I18N = {
  ru: {
    tagline: 'Магическая кулинарная книга',
    login: 'Вход', register: 'Регистрация', resetTab: 'Сброс пароля',
    email: 'Почта', password: 'Пароль', name: 'Имя', newPassword: 'Новый пароль',
    signIn: 'Войти', signUp: 'Создать аккаунт', resetBtn: 'Сбросить пароль',
    forgot: 'Забыли пароль?', backToLogin: '← Назад ко входу',
    resetInfo: 'Демо-режим: письмо не отправляется — пароль меняется сразу после ввода почты.',
    errFill: 'Заполните все поля',
    errEmail: 'Введите корректную почту',
    errEmailUsed: 'Эта почта уже зарегистрирована',
    errNoUser: 'Пользователь с такой почтой не найден',
    errWrongPass: 'Неверный пароль',
    errShortPass: 'Пароль должен быть не короче 4 символов',
    welcomeBack: 'С возвращением, {name}!',
    accountCreated: 'Добро пожаловать в Lunorka, {name}!',
    passwordChanged: 'Пароль изменён',
    navRecipes: 'Рецепты', navFav: 'Избранное', navShopping: 'Покупки', navProfile: 'Профиль',
    myRecipes: 'Мои рецепты', favoritesTitle: 'Избранные рецепты',
    searchPh: 'Найти зелье...',
    all: 'Все', favorites: 'Избранное',
    min: 'мин', servingsForms: ['порция', 'порции', 'порций'],
    emptyAll: 'Пока пусто. Добавьте свой первый рецепт!',
    emptyFav: 'Здесь появятся любимые рецепты',
    nothingFound: 'Ничего не найдено',
    cat_all: 'Все',
    cat_breakfasts: 'Завтраки', cat_soups: 'Супы', cat_salads: 'Салаты',
    cat_mains: 'Основные блюда', cat_desserts: 'Десерты', cat_drinks: 'Напитки',
    cat_snacks: 'Закуски', cat_baking: 'Выпечка',
    addTitle: 'Новый рецепт', editTitle: 'Редактировать рецепт',
    dishName: 'Название блюда', dishNamePh: 'Например, «Лунный суп»',
    photo: 'Фотография', photoHint: 'Нажмите, чтобы загрузить фото', photoChange: 'Нажмите, чтобы заменить фото',
    category: 'Категория', time: 'Время приготовления (мин)', servingsN: 'Количество порций',
    ingredients: 'Ингредиенты', ingredientPh: 'Ингредиент', amountPh: 'Количество',
    addIngredient: '+ Добавить ингредиент',
    steps: 'Пошаговое приготовление', stepPh: 'Опишите шаг...', addStep: '+ Добавить шаг',
    save: 'Сохранить', cancel: 'Отмена',
    savedToast: 'Рецепт сохранён', errNeedName: 'Укажите название блюда',
    toShopping: '🛒 В покупки', edit: '✏️ Изменить', del: '🗑 Удалить',
    delConfirm: 'Удалить рецепт безвозвратно?',
    addedToShopping: 'Ингредиенты добавлены в покупки',
    deletedToast: 'Рецепт удалён',
    favAdded: 'Добавлено в избранное', favRemoved: 'Убрано из избранного',
    shoppingTitle: 'Список покупок',
    manualPh: 'Добавить продукт...', add: 'Добавить',
    clearBought: 'Убрать купленное', clearAll: 'Очистить всё',
    emptyShopping: 'Список пуст. Добавьте продукты из рецепта или вручную.',
    boughtProgress: 'Куплено {done} из {total}',
    profileTitle: 'Профиль',
    stats: 'Статистика', recipesCount: 'Рецептов', favCount: 'Избранных', shoppingCount: 'В покупках',
    theme: 'Тема оформления', dark: '🌙 Тёмная', light: '☀️ Светлая',
    language: 'Язык',
    changePassword: 'Смена пароля', currentPassword: 'Текущий пароль', savePassword: 'Сменить пароль',
    errWrongCurrent: 'Неверный текущий пароль',
    saveName: 'Сохранить имя', nameSaved: 'Имя сохранено',
    logout: 'Выйти из аккаунта',
  },
  en: {
    tagline: 'A magical cookbook',
    login: 'Sign in', register: 'Sign up', resetTab: 'Reset password',
    email: 'Email', password: 'Password', name: 'Name', newPassword: 'New password',
    signIn: 'Sign in', signUp: 'Create account', resetBtn: 'Reset password',
    forgot: 'Forgot password?', backToLogin: '← Back to sign in',
    resetInfo: 'Demo mode: no email is sent — the password changes right away.',
    errFill: 'Please fill in all fields',
    errEmail: 'Enter a valid email',
    errEmailUsed: 'This email is already registered',
    errNoUser: 'No user with this email',
    errWrongPass: 'Wrong password',
    errShortPass: 'Password must be at least 4 characters',
    welcomeBack: 'Welcome back, {name}!',
    accountCreated: 'Welcome to Lunorka, {name}!',
    passwordChanged: 'Password changed',
    navRecipes: 'Recipes', navFav: 'Favorites', navShopping: 'Shopping', navProfile: 'Profile',
    myRecipes: 'My recipes', favoritesTitle: 'Favorite recipes',
    searchPh: 'Find a potion...',
    all: 'All', favorites: 'Favorites',
    min: 'min', servingsForms: ['serving', 'servings', 'servings'],
    emptyAll: 'Nothing here yet. Add your first recipe!',
    emptyFav: 'Your favorite recipes will appear here',
    nothingFound: 'Nothing found',
    cat_all: 'All',
    cat_breakfasts: 'Breakfasts', cat_soups: 'Soups', cat_salads: 'Salads',
    cat_mains: 'Main dishes', cat_desserts: 'Desserts', cat_drinks: 'Drinks',
    cat_snacks: 'Snacks', cat_baking: 'Baking',
    addTitle: 'New recipe', editTitle: 'Edit recipe',
    dishName: 'Dish name', dishNamePh: 'E.g. "Moon Soup"',
    photo: 'Photo', photoHint: 'Click to upload a photo', photoChange: 'Click to change the photo',
    category: 'Category', time: 'Cooking time (min)', servingsN: 'Servings',
    ingredients: 'Ingredients', ingredientPh: 'Ingredient', amountPh: 'Amount',
    addIngredient: '+ Add ingredient',
    steps: 'Step-by-step instructions', stepPh: 'Describe the step...', addStep: '+ Add step',
    save: 'Save', cancel: 'Cancel',
    savedToast: 'Recipe saved', errNeedName: 'Please enter the dish name',
    toShopping: '🛒 To shopping list', edit: '✏️ Edit', del: '🗑 Delete',
    delConfirm: 'Delete this recipe permanently?',
    addedToShopping: 'Ingredients added to the shopping list',
    deletedToast: 'Recipe deleted',
    favAdded: 'Added to favorites', favRemoved: 'Removed from favorites',
    shoppingTitle: 'Shopping list',
    manualPh: 'Add a product...', add: 'Add',
    clearBought: 'Remove purchased', clearAll: 'Clear all',
    emptyShopping: 'The list is empty. Add products from a recipe or manually.',
    boughtProgress: 'Purchased {done} of {total}',
    profileTitle: 'Profile',
    stats: 'Statistics', recipesCount: 'Recipes', favCount: 'Favorites', shoppingCount: 'In shopping list',
    theme: 'Theme', dark: '🌙 Dark', light: '☀️ Light',
    language: 'Language',
    changePassword: 'Change password', currentPassword: 'Current password', savePassword: 'Change password',
    errWrongCurrent: 'Wrong current password',
    saveName: 'Save name', nameSaved: 'Name saved',
    logout: 'Sign out',
  },
};

const CATEGORIES = ['breakfasts', 'soups', 'salads', 'mains', 'desserts', 'drinks', 'snacks', 'baking'];

function t(key) {
  const lang = (currentUser && data?.settings?.lang) || localStorage.getItem('lunorka_lang') || 'ru';
  return (I18N[lang] && I18N[lang][key]) ?? I18N.ru[key] ?? key;
}

function getLang() {
  return (currentUser && data?.settings?.lang) || localStorage.getItem('lunorka_lang') || 'ru';
}

/* ================= хранилище ================= */
function getUsers() {
  try { return JSON.parse(localStorage.getItem('lunorka_users')) || []; }
  catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem('lunorka_users', JSON.stringify(users));
}
function getSession() { return localStorage.getItem('lunorka_session'); }
function setSession(email) {
  if (email) localStorage.setItem('lunorka_session', email);
  else localStorage.removeItem('lunorka_session');
}
function dataKey(email) { return 'lunorka_data_' + email; }

function loadData(email) {
  try {
    const d = JSON.parse(localStorage.getItem(dataKey(email)));
    if (d && Array.isArray(d.recipes)) return d;
  } catch { /* ignore */ }
  return { recipes: [], shopping: [], settings: { theme: localStorage.getItem('lunorka_theme') || 'dark', lang: localStorage.getItem('lunorka_lang') || 'ru' }, seeded: false };
}
function saveData() {
  if (!currentUser) return;
  localStorage.setItem(dataKey(currentUser.email), JSON.stringify(data));
}

/* ================= состояние ================= */
let currentUser = null;
let data = null;

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('lunorka_theme', theme);
}

/* ================= стартовые рецепты ================= */
function seedRecipes() {
  return [
    {
      id: uid() + 'a', name: 'Лунный суп из тыквы', photo: '', emoji: '🎃',
      category: 'soups', time: 35, servings: 4, favorite: true, createdAt: Date.now() - 4000,
      ingredients: [
        { name: 'Тыква', amount: '500 г' },
        { name: 'Лук', amount: '1 шт.' },
        { name: 'Сливки', amount: '200 мл' },
        { name: 'Овощной бульон', amount: '500 мл' },
        { name: 'Мускатный орех', amount: 'щепотка' },
      ],
      steps: [
        'Нарежьте тыкву и лук, слегка обжарьте на сливочном масле.',
        'Залейте бульоном и варите 20 минут до мягкости.',
        'Взбейте блендером, влейте сливки, добавьте мускатный орех.',
        'Подавайте при свечах, украсив тыквенными семечками.',
      ],
    },
    {
      id: uid() + 'b', name: 'Эликсир лесных ягод', photo: '', emoji: '🍇',
      category: 'drinks', time: 10, servings: 2, favorite: false, createdAt: Date.now() - 3000,
      ingredients: [
        { name: 'Смесь замороженных ягод', amount: '300 г' },
        { name: 'Мёд', amount: '1 ст. л.' },
        { name: 'Вода или сок', amount: '300 мл' },
        { name: 'Мята', amount: 'несколько листиков' },
      ],
      steps: [
        'Сложите ягоды в блендер.',
        'Добавьте мёд и воду, взбейте до гладкости.',
        'Разлейте по бокалам и украсьте мятой.',
      ],
    },
    {
      id: uid() + 'c', name: 'Печенье «Звёздная пыль»', photo: '', emoji: '✨',
      category: 'baking', time: 40, servings: 6, favorite: false, createdAt: Date.now() - 2000,
      ingredients: [
        { name: 'Мука', amount: '250 г' },
        { name: 'Сливочное масло', amount: '120 г' },
        { name: 'Сахар', amount: '100 г' },
        { name: 'Яйцо', amount: '1 шт.' },
        { name: 'Корица', amount: '1 ч. л.' },
      ],
      steps: [
        'Растопите масло и смешайте с сахаром и яйцом.',
        'Добавьте муку с корицей, замесите тесто.',
        'Вырежьте звёздочки и выпекайте 12–15 минут при 180°C.',
      ],
    },
    {
      id: uid() + 'd', name: 'Завтрак «Рассвет ведьмы»', photo: '', emoji: '🌅',
      category: 'breakfasts', time: 15, servings: 1, favorite: false, createdAt: Date.now() - 1000,
      ingredients: [
        { name: 'Овсянка', amount: '50 г' },
        { name: 'Молоко', amount: '200 мл' },
        { name: 'Банан', amount: '1 шт.' },
        { name: 'Черника', amount: 'горсть' },
      ],
      steps: [
        'Сварите овсянку на молоке.',
        'Выложите в миску, украсьте бананом и черникой в виде полумесяца.',
      ],
    },
  ];
}

/* ================= звёзды на фоне ================= */
function makeStars() {
  const wrap = $('#stars');
  wrap.innerHTML = '';
  for (let i = 0; i < 70; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const size = Math.random() * 2.4 + 0.8;
    s.style.width = s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.setProperty('--dur', (Math.random() * 4 + 2) + 's');
    s.style.setProperty('--delay', (Math.random() * 5) + 's');
    wrap.appendChild(s);
  }
}

/* ================= авторизация ================= */
function renderAuth(mode = 'login') {
  const app = $('#app');
  const tabs = mode !== 'reset' ? `
    <div class="auth-tabs">
      <button class="${mode === 'login' ? 'active' : ''}" data-mode="login">${t('login')}</button>
      <button class="${mode === 'register' ? 'active' : ''}" data-mode="register">${t('register')}</button>
    </div>` : '';

  let body = '';
  if (mode === 'login') {
    body = `
      <form id="auth-form" novalidate>
        <div class="field"><label>${t('email')}</label><input type="email" name="email" autocomplete="email" required></div>
        <div class="field"><label>${t('password')}</label><input type="password" name="password" autocomplete="current-password" required></div>
        <div class="auth-error" id="auth-error"></div>
        <button class="btn btn--block" type="submit">${t('signIn')}</button>
      </form>
      <div class="auth-links"><button class="link-btn" id="to-reset">${t('forgot')}</button></div>`;
  } else if (mode === 'register') {
    body = `
      <form id="auth-form" novalidate>
        <div class="field"><label>${t('name')}</label><input type="text" name="name" autocomplete="name" required></div>
        <div class="field"><label>${t('email')}</label><input type="email" name="email" autocomplete="email" required></div>
        <div class="field"><label>${t('password')}</label><input type="password" name="password" autocomplete="new-password" required></div>
        <div class="auth-error" id="auth-error"></div>
        <button class="btn btn--block" type="submit">${t('signUp')}</button>
      </form>`;
  } else {
    body = `
      <div class="auth-note">${t('resetInfo')}</div>
      <form id="auth-form" novalidate>
        <div class="field"><label>${t('email')}</label><input type="email" name="email" autocomplete="email" required></div>
        <div class="field"><label>${t('newPassword')}</label><input type="password" name="password" autocomplete="new-password" required></div>
        <div class="auth-error" id="auth-error"></div>
        <button class="btn btn--block" type="submit">${t('resetBtn')}</button>
      </form>
      <div class="auth-links"><button class="link-btn" id="to-login">${t('backToLogin')}</button></div>`;
  }

  app.innerHTML = `
    <div class="auth-wrap">
      <img class="auth-logo" src="design/Lunorka_logo.svg" alt="Lunorka">
      <div class="auth-tagline">${t('tagline')}</div>
      <div class="auth-card card">${tabs}${body}</div>
    </div>`;

  $$('.auth-tabs button', app).forEach(b =>
    b.addEventListener('click', () => renderAuth(b.dataset.mode)));
  $('#to-reset')?.addEventListener('click', () => renderAuth('reset'));
  $('#to-login')?.addEventListener('click', () => renderAuth('login'));

  $('#auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = (fd.get('email') || '').trim().toLowerCase();
    const password = fd.get('password') || '';
    const name = (fd.get('name') || '').trim();
    const errEl = $('#auth-error');
    const fail = (msg) => { errEl.textContent = msg; };

    if (!email || !password || (mode === 'register' && !name)) return fail(t('errFill'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail(t('errEmail'));
    if (password.length < 4) return fail(t('errShortPass'));

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (mode === 'register') {
      if (user) return fail(t('errEmailUsed'));
      users.push({ name, email, passHash: simpleHash(password), createdAt: Date.now() });
      saveUsers(users);
      loginAs(users[users.length - 1]);
      data.recipes = seedRecipes();
      data.seeded = true;
      saveData();
      toast(t('accountCreated').replace('{name}', name));
      navigate('#/recipes');
    } else if (mode === 'login') {
      if (!user) return fail(t('errNoUser'));
      if (user.passHash !== simpleHash(password)) return fail(t('errWrongPass'));
      loginAs(user);
      toast(t('welcomeBack').replace('{name}', user.name));
      navigate('#/recipes');
    } else {
      if (!user) return fail(t('errNoUser'));
      user.passHash = simpleHash(password);
      saveUsers(users);
      toast(t('passwordChanged'));
      renderAuth('login');
    }
  });
}

function loginAs(user) {
  currentUser = user;
  setSession(user.email);
  data = loadData(user.email);
  localStorage.setItem('lunorka_lang', data.settings.lang || 'ru');
  applyTheme(data.settings.theme || 'dark');
}

function logout() {
  currentUser = null;
  data = null;
  setSession(null);
  location.hash = '';
  renderAuth('login');
}

/* ================= каркас приложения ================= */
function navigate(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function renderShell(activePage, viewHtml) {
  const app = $('#app');
  const navBtn = (page, ico, label) =>
    `<button class="nav-item ${activePage === page ? 'active' : ''}" data-nav="#/${page}">
       <span class="nav-ico">${ico}</span><span>${label}</span>
     </button>`;

  app.innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <img class="logo-icon" src="design/Lunorka_icon.svg" alt="Lunorka">
        <span class="logo-name">Lunorka</span>
      </header>
      <main id="view">${viewHtml}</main>
    </div>
    <nav class="bottom-nav">
      ${navBtn('recipes', '📖', t('navRecipes'))}
      ${navBtn('favorites', '⭐', t('navFav'))}
      <div class="nav-fab-wrap"><button class="nav-fab" data-nav="#/add" aria-label="${t('navRecipes')}">+</button></div>
      ${navBtn('shopping', '🛒', t('navShopping'))}
      ${navBtn('profile', '🧙', t('navProfile'))}
    </nav>`;

  $$('[data-nav]', app).forEach(b =>
    b.addEventListener('click', () => navigate(b.dataset.nav)));
}

/* ================= роутер ================= */
function render() {
  if (!currentUser) { renderAuth('login'); return; }
  const parts = (location.hash || '#/recipes').replace(/^#\//, '').split('/');
  const page = parts[0] || 'recipes';
  const arg = decodeURIComponent(parts[1] || '');

  switch (page) {
    case 'recipes': viewRecipes('all'); break;
    case 'favorites': viewRecipes('fav'); break;
    case 'add': viewRecipeForm(null); break;
    case 'edit': viewRecipeForm(arg); break;
    case 'recipe': viewRecipeDetail(arg); break;
    case 'shopping': viewShopping(); break;
    case 'profile': viewProfile(); break;
    default: viewRecipes('all');
  }
  window.scrollTo(0, 0);
}

/* ================= главная: мои рецепты ================= */
let listState = { search: '', category: 'all', tab: 'all' };

function recipeEmoji(r) {
  return r.emoji || { breakfasts: '🍳', soups: '🍲', salads: '🥗', mains: '🍝', desserts: '🍰', drinks: '🍹', snacks: '🥨', baking: '🥐' }[r.category] || '🍽';
}

function recipeCardHtml(r) {
  const photo = r.photo
    ? `<img src="${r.photo}" alt="${esc(r.name)}">`
    : `<span class="ph-emoji">${recipeEmoji(r)}</span>`;
  return `
    <div class="recipe-card card" data-open="${r.id}">
      <div class="recipe-photo">${photo}
        <button class="recipe-fav ${r.favorite ? 'on' : ''}" data-fav="${r.id}" aria-label="${t('favorites')}">${r.favorite ? '★' : '☆'}</button>
      </div>
      <div class="recipe-info">
        <div class="recipe-name">${esc(r.name)}</div>
        <div class="recipe-meta">
          <span>⏱ ${r.time} ${t('min')}</span>
          <span>🍽 ${r.servings} ${plural(r.servings, t('servingsForms'))}</span>
        </div>
      </div>
    </div>`;
}

function viewRecipes(mode) {
  if (mode === 'fav') listState.tab = 'fav';
  renderShell(mode === 'fav' ? 'favorites' : 'recipes', `
    <h2 class="page-title">${mode === 'fav' ? t('favoritesTitle') : t('myRecipes')}</h2>
    <div class="search-box"><input id="search" type="search" placeholder="${t('searchPh')}" value="${esc(listState.search)}"></div>
    <div class="fav-toggle">
      <button data-tab="all" class="${listState.tab === 'all' ? 'active' : ''}">${t('all')}</button>
      <button data-tab="fav" class="${listState.tab === 'fav' ? 'active' : ''}">${t('favorites')}</button>
    </div>
    <div class="chips" id="chips">
      <button class="chip ${listState.category === 'all' ? 'active' : ''}" data-cat="all">${t('cat_all')}</button>
      ${CATEGORIES.map(c => `<button class="chip ${listState.category === c ? 'active' : ''}" data-cat="${c}">${t('cat_' + c)}</button>`).join('')}
    </div>
    <div class="recipe-grid" id="grid"></div>`);

  const grid = $('#grid');
  const draw = () => {
    const q = listState.search.trim().toLowerCase();
    let list = data.recipes.slice().sort((a, b) => b.createdAt - a.createdAt);
    if (listState.tab === 'fav') list = list.filter(r => r.favorite);
    if (listState.category !== 'all') list = list.filter(r => r.category === listState.category);
    if (q) list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(q)));

    if (!list.length) {
      const msg = q || listState.category !== 'all' ? t('nothingFound')
        : listState.tab === 'fav' ? t('emptyFav') : t('emptyAll');
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span class="empty-moon">🌘</span>${msg}</div>`;
      return;
    }
    grid.innerHTML = list.map(recipeCardHtml).join('');
    $$('[data-open]', grid).forEach(c =>
      c.addEventListener('click', (e) => {
        if (e.target.closest('[data-fav]')) return;
        navigate('#/recipe/' + c.dataset.open);
      }));
    $$('[data-fav]', grid).forEach(b =>
      b.addEventListener('click', () => toggleFavorite(b.dataset.fav)));
  };

  $('#search').addEventListener('input', (e) => { listState.search = e.target.value; draw(); });
  $$('.fav-toggle [data-tab]').forEach(b =>
    b.addEventListener('click', () => {
      listState.tab = b.dataset.tab;
      $$('.fav-toggle [data-tab]').forEach(x => x.classList.toggle('active', x === b));
      draw();
    }));
  $$('#chips .chip').forEach(b =>
    b.addEventListener('click', () => {
      listState.category = b.dataset.cat;
      $$('#chips .chip').forEach(x => x.classList.toggle('active', x === b));
      draw();
    }));

  draw();
}

function toggleFavorite(id) {
  const r = data.recipes.find(x => x.id === id);
  if (!r) return;
  r.favorite = !r.favorite;
  saveData();
  toast(r.favorite ? t('favAdded') : t('favRemoved'));
  render();
}

/* ================= добавить / редактировать рецепт ================= */
function ingRowHtml(ing = { name: '', amount: '' }) {
  return `
    <div class="ing-row">
      <input class="ing-name" placeholder="${t('ingredientPh')}" value="${esc(ing.name)}">
      <input class="ing-amount" placeholder="${t('amountPh')}" value="${esc(ing.amount)}">
      <button type="button" class="icon-btn row-del" aria-label="✕">✕</button>
    </div>`;
}
function stepRowHtml(text = '') {
  return `
    <div class="step-row">
      <span class="step-num"></span>
      <textarea class="step-text" placeholder="${t('stepPh')}">${esc(text)}</textarea>
      <button type="button" class="icon-btn row-del" aria-label="✕">✕</button>
    </div>`;
}
function renumberSteps() {
  $$('#steps-list .step-num').forEach((n, i) => { n.textContent = i + 1; });
}

function viewRecipeForm(id) {
  const r = id ? data.recipes.find(x => x.id === id) : null;
  if (id && !r) { navigate('#/recipes'); return; }
  const draft = r || {
    name: '', photo: '', category: 'mains', time: 30, servings: 2,
    ingredients: [{ name: '', amount: '' }],
    steps: [''],
  };
  let photoData = draft.photo || '';

  renderShell('recipes', `
    <h2 class="page-title">${r ? t('editTitle') : t('addTitle')}</h2>
    <form class="form-card card" id="recipe-form" novalidate>
      <div class="field">
        <label>${t('dishName')}</label>
        <input name="name" placeholder="${t('dishNamePh')}" value="${esc(draft.name)}">
      </div>
      <div class="field">
        <label>${t('photo')}</label>
        <div class="photo-picker" id="photo-picker">
          ${photoData ? `<img src="${photoData}" alt="">` : '<span class="ph-ico">📷</span>'}
          <span class="ph-hint">${photoData ? t('photoChange') : t('photoHint')}</span>
          <input type="file" id="photo-input" accept="image/*" hidden>
        </div>
      </div>
      <div class="field">
        <label>${t('category')}</label>
        <select name="category">
          ${CATEGORIES.map(c => `<option value="${c}" ${draft.category === c ? 'selected' : ''}>${t('cat_' + c)}</option>`).join('')}
        </select>
      </div>
      <div class="field-row">
        <div class="field"><label>${t('time')}</label><input name="time" type="number" min="1" value="${draft.time}"></div>
        <div class="field"><label>${t('servingsN')}</label><input name="servings" type="number" min="1" value="${draft.servings}"></div>
      </div>
      <div class="field">
        <label>${t('ingredients')}</label>
        <div id="ings-list">${draft.ingredients.map(i => ingRowHtml(i)).join('')}</div>
        <button type="button" class="add-row-btn" id="add-ing">${t('addIngredient')}</button>
      </div>
      <div class="field">
        <label>${t('steps')}</label>
        <div id="steps-list">${draft.steps.map(s => stepRowHtml(s)).join('')}</div>
        <button type="button" class="add-row-btn" id="add-step">${t('addStep')}</button>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn--ghost" id="cancel-btn">${t('cancel')}</button>
        <button type="submit" class="btn">${t('save')}</button>
      </div>
    </form>`);

  renumberSteps();

  const picker = $('#photo-picker');
  const fileInput = $('#photo-input');
  picker.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      photoData = reader.result;
      picker.innerHTML = `<img src="${photoData}" alt=""><span class="ph-hint">${t('photoChange')}</span>`;
      picker.appendChild(fileInput);
    };
    reader.readAsDataURL(file);
  });

  const bindRowDel = (container) => {
    $$('.row-del', container).forEach(b => b.onclick = () => {
      if (container.children.length > 1) { b.closest('.ing-row, .step-row').remove(); renumberSteps(); }
      else { $$('input, textarea', b.parentElement).forEach(i => i.value = ''); }
    });
  };
  bindRowDel($('#ings-list'));
  bindRowDel($('#steps-list'));

  $('#add-ing').addEventListener('click', () => {
    $('#ings-list').insertAdjacentHTML('beforeend', ingRowHtml());
    bindRowDel($('#ings-list'));
  });
  $('#add-step').addEventListener('click', () => {
    $('#steps-list').insertAdjacentHTML('beforeend', stepRowHtml());
    bindRowDel($('#steps-list'));
    renumberSteps();
  });

  $('#cancel-btn').addEventListener('click', () => history.back());

  $('#recipe-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = (fd.get('name') || '').trim();
    if (!name) { toast(t('errNeedName')); return; }

    const ingredients = $$('#ings-list .ing-row')
      .map(row => ({
        name: $('.ing-name', row).value.trim(),
        amount: $('.ing-amount', row).value.trim(),
      }))
      .filter(i => i.name);
    const steps = $$('#steps-list .step-text')
      .map(ta => ta.value.trim())
      .filter(Boolean);

    const recipe = {
      id: r ? r.id : uid(),
      name,
      photo: photoData,
      emoji: r?.emoji || '',
      category: fd.get('category'),
      time: Math.max(1, parseInt(fd.get('time'), 10) || 1),
      servings: Math.max(1, parseInt(fd.get('servings'), 10) || 1),
      ingredients,
      steps,
      favorite: r ? r.favorite : false,
      createdAt: r ? r.createdAt : Date.now(),
    };

    if (r) {
      const idx = data.recipes.findIndex(x => x.id === r.id);
      data.recipes[idx] = recipe;
    } else {
      data.recipes.push(recipe);
    }
    saveData();
    toast(t('savedToast'));
    navigate('#/recipe/' + recipe.id);
  });
}

/* ================= страница рецепта ================= */
function viewRecipeDetail(id) {
  const r = data.recipes.find(x => x.id === id);
  if (!r) { navigate('#/recipes'); return; }

  const hero = r.photo
    ? `<img src="${r.photo}" alt="${esc(r.name)}">`
    : `<span>${recipeEmoji(r)}</span>`;

  renderShell('recipes', `
    <div class="detail-hero">${hero}
      <button class="back-btn" id="back-btn">←</button>
      <button class="recipe-fav ${r.favorite ? 'on' : ''}" id="fav-btn">${r.favorite ? '★' : '☆'}</button>
    </div>
    <h2 class="detail-title">${esc(r.name)}</h2>
    <div class="detail-meta">
      <span>📂 ${t('cat_' + r.category)}</span>
      <span>⏱ ${r.time} ${t('min')}</span>
      <span>🍽 ${r.servings} ${plural(r.servings, t('servingsForms'))}</span>
    </div>
    <div class="detail-actions">
      <button class="btn" id="to-shopping">${t('toShopping')}</button>
      <button class="btn btn--ghost" id="edit-btn">${t('edit')}</button>
      <button class="btn btn--danger" id="del-btn">${t('del')}</button>
    </div>
    <div class="detail-section card">
      <h3>${t('ingredients')}</h3>
      <ul class="ing-list">
        ${r.ingredients.map(i => `<li><span>${esc(i.name)}</span><span class="ing-amt">${esc(i.amount)}</span></li>`).join('') || `<li>${t('emptyAll')}</li>`}
      </ul>
    </div>
    <div class="detail-section card">
      <h3>${t('steps')}</h3>
      <ol class="steps-list">
        ${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}
      </ol>
    </div>`);

  $('#back-btn').addEventListener('click', () => history.back());
  $('#fav-btn').addEventListener('click', () => toggleFavorite(r.id));
  $('#edit-btn').addEventListener('click', () => navigate('#/edit/' + r.id));
  $('#del-btn').addEventListener('click', () => {
    if (!confirm(t('delConfirm'))) return;
    data.recipes = data.recipes.filter(x => x.id !== r.id);
    saveData();
    toast(t('deletedToast'));
    navigate('#/recipes');
  });
  $('#to-shopping').addEventListener('click', () => {
    r.ingredients.forEach(i => {
      data.shopping.push({ id: uid(), name: i.name, amount: i.amount, done: false, from: r.name });
    });
    saveData();
    toast(t('addedToShopping'));
  });
}

/* ================= список покупок ================= */
function viewShopping() {
  const items = data.shopping;
  const done = items.filter(i => i.done).length;
  const pct = items.length ? Math.round(done / items.length * 100) : 0;

  renderShell('shopping', `
    <h2 class="page-title">${t('shoppingTitle')}</h2>
    <div class="shop-progress"><div style="width:${pct}%"></div></div>
    <div class="shop-progress-label">${t('boughtProgress').replace('{done}', done).replace('{total}', items.length)}</div>
    <form class="shop-add" id="shop-add-form">
      <input id="shop-add-input" placeholder="${t('manualPh')}">
      <button class="btn" type="submit">${t('add')}</button>
    </form>
    <div id="shop-list"></div>
    <div class="shop-actions">
      <button class="btn btn--ghost btn--small" id="clear-bought">${t('clearBought')}</button>
      <button class="btn btn--danger btn--small" id="clear-all">${t('clearAll')}</button>
    </div>`);

  const list = $('#shop-list');
  const drawList = () => {
    if (!items.length) {
      list.innerHTML = `<div class="empty"><span class="empty-moon">🧺</span>${t('emptyShopping')}</div>`;
      return;
    }
    list.innerHTML = items.map(i => `
      <div class="shop-item card ${i.done ? 'done' : ''}" data-id="${i.id}">
        <button class="shop-check" data-check="${i.id}">✓</button>
        <div class="shop-name">
          ${esc(i.name)}
          ${i.from ? `<span class="shop-from">📖 ${esc(i.from)}</span>` : ''}
        </div>
        <span class="shop-amt">${esc(i.amount)}</span>
        <button class="icon-btn" data-del="${i.id}">✕</button>
      </div>`).join('');

    $$('[data-check]', list).forEach(b => b.addEventListener('click', () => {
      const item = items.find(x => x.id === b.dataset.check);
      item.done = !item.done;
      saveData();
      viewShopping();
    }));
    $$('[data-del]', list).forEach(b => b.addEventListener('click', () => {
      data.shopping = data.shopping.filter(x => x.id !== b.dataset.del);
      saveData();
      viewShopping();
    }));
  };
  drawList();

  $('#shop-add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#shop-add-input');
    const name = input.value.trim();
    if (!name) return;
    data.shopping.push({ id: uid(), name, amount: '', done: false, from: '' });
    saveData();
    viewShopping();
  });
  $('#clear-bought').addEventListener('click', () => {
    data.shopping = data.shopping.filter(i => !i.done);
    saveData();
    viewShopping();
  });
  $('#clear-all').addEventListener('click', () => {
    data.shopping = [];
    saveData();
    viewShopping();
  });
}

/* ================= профиль и настройки ================= */
function viewProfile() {
  const s = data.settings;
  const favCount = data.recipes.filter(r => r.favorite).length;

  renderShell('profile', `
    <h2 class="page-title">${t('profileTitle')}</h2>
    <div class="profile-head card">
      <div class="profile-avatar"><img src="design/Lunorka_icon.svg" alt=""></div>
      <div>
        <div class="p-name">${esc(currentUser.name)}</div>
        <div class="p-email">${esc(currentUser.email)}</div>
      </div>
    </div>

    <h3 class="page-title" style="font-size:22px">${t('stats')}</h3>
    <div class="stats-grid">
      <div class="stat-card card"><div class="stat-num">${data.recipes.length}</div><div class="stat-label">${t('recipesCount')}</div></div>
      <div class="stat-card card"><div class="stat-num">${favCount}</div><div class="stat-label">${t('favCount')}</div></div>
      <div class="stat-card card"><div class="stat-num">${data.shopping.length}</div><div class="stat-label">${t('shoppingCount')}</div></div>
    </div>

    <div class="settings-card card">
      <h3>${t('name')}</h3>
      <div class="shop-add">
        <input id="name-input" value="${esc(currentUser.name)}">
        <button class="btn" id="save-name">${t('saveName')}</button>
      </div>
    </div>

    <div class="settings-card card">
      <div class="settings-row">
        <label>${t('theme')}</label>
        <div class="seg" id="theme-seg">
          <button data-theme="dark" class="${s.theme === 'dark' ? 'active' : ''}">${t('dark')}</button>
          <button data-theme="light" class="${s.theme === 'light' ? 'active' : ''}">${t('light')}</button>
        </div>
      </div>
      <div class="settings-row">
        <label>${t('language')}</label>
        <div class="seg" id="lang-seg">
          <button data-lang="ru" class="${s.lang === 'ru' ? 'active' : ''}">Русский</button>
          <button data-lang="en" class="${s.lang === 'en' ? 'active' : ''}">English</button>
        </div>
      </div>
    </div>

    <div class="settings-card card">
      <h3>${t('changePassword')}</h3>
      <form id="pass-form" novalidate>
        <div class="field"><label>${t('currentPassword')}</label><input type="password" name="current" autocomplete="current-password"></div>
        <div class="field"><label>${t('newPassword')}</label><input type="password" name="next" autocomplete="new-password"></div>
        <div class="auth-error" id="pass-error"></div>
        <button class="btn btn--block" type="submit">${t('savePassword')}</button>
      </form>
    </div>

    <button class="btn btn--ghost btn--block" id="logout-btn">${t('logout')}</button>`);

  $('#save-name').addEventListener('click', () => {
    const name = $('#name-input').value.trim();
    if (!name) return;
    currentUser.name = name;
    const users = getUsers();
    const u = users.find(x => x.email === currentUser.email);
    if (u) { u.name = name; saveUsers(users); }
    toast(t('nameSaved'));
    viewProfile();
  });

  $$('#theme-seg button').forEach(b => b.addEventListener('click', () => {
    data.settings.theme = b.dataset.theme;
    applyTheme(b.dataset.theme);
    saveData();
    viewProfile();
  }));
  $$('#lang-seg button').forEach(b => b.addEventListener('click', () => {
    data.settings.lang = b.dataset.lang;
    localStorage.setItem('lunorka_lang', b.dataset.lang);
    document.documentElement.lang = b.dataset.lang;
    saveData();
    viewProfile();
  }));

  $('#pass-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const errEl = $('#pass-error');
    const users = getUsers();
    const u = users.find(x => x.email === currentUser.email);
    if (!fd.get('current') || !fd.get('next')) { errEl.textContent = t('errFill'); return; }
    if (u.passHash !== simpleHash(fd.get('current'))) { errEl.textContent = t('errWrongCurrent'); return; }
    if (fd.get('next').length < 4) { errEl.textContent = t('errShortPass'); return; }
    u.passHash = simpleHash(fd.get('next'));
    saveUsers(users);
    e.target.reset();
    errEl.textContent = '';
    toast(t('passwordChanged'));
  });

  $('#logout-btn').addEventListener('click', logout);
}

/* ================= запуск ================= */
makeStars();
applyTheme(localStorage.getItem('lunorka_theme') || 'dark');
document.documentElement.lang = getLang();

const sessionEmail = getSession();
if (sessionEmail) {
  const user = getUsers().find(u => u.email === sessionEmail);
  if (user) loginAs(user);
}

window.addEventListener('hashchange', render);
render();

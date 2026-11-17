'use strict';

/* ================= Supabase ================= */
const SUPABASE_URL = 'https://kpuccjrlvpfuqmcxwcjl.supabase.co';
const SUPABASE_KEY = 'sb_publishable_spJjBUqtqFyI5RMZfMY3Ow_3S34W_sc';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
    signIn: 'Войти', signUp: 'Создать аккаунт', resetBtn: 'Отправить письмо',
    forgot: 'Забыли пароль?', backToLogin: '← Назад ко входу',
    resetInfo: 'Мы отправим на почту ссылку для сброса пароля.',
    newPassTitle: 'Придумайте новый пароль',
    saveNewPass: 'Сохранить пароль',
    checkEmail: 'Мы отправили письмо — подтвердите почту и войдите.',
    resetSent: 'Письмо для сброса пароля отправлено.',
    errFill: 'Заполните все поля',
    errEmail: 'Введите корректную почту',
    errEmailUsed: 'Эта почта уже зарегистрирована',
    errNoUser: 'Пользователь с такой почтой не найден',
    errWrongPass: 'Неверная почта или пароль',
    errShortPass: 'Пароль должен быть не короче 6 символов',
    errGeneric: 'Что-то пошло не так. Попробуйте ещё раз.',
    errLoad: 'Не удалось загрузить данные. Проверьте интернет и обновите страницу.',
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
    description: 'Описание', descriptionPh: 'Пара слов о блюде — настроение, история, секреты...',
    tags: 'Теги', tagCustomPh: 'Свой тег...',
    tag_russian: 'Русская кухня', tag_georgian: 'Грузинская кухня', tag_italian: 'Итальянская кухня',
    tag_french: 'Французская кухня', tag_ukrainian: 'Украинская кухня', tag_asian: 'Азиатская кухня',
    tag_japanese: 'Японская кухня', tag_mexican: 'Мексиканская кухня', tag_homestyle: 'Домашняя кухня',
    tag_vegetarian: 'Вегетарианское', tag_vegan: 'Веганское', tag_quick: 'Быстрое',
    photo: 'Фотография', photoHint: 'Нажмите, чтобы загрузить фото', photoChange: 'Нажмите, чтобы заменить фото',
    category: 'Категория', time: 'Время приготовления (мин)', servingsN: 'Количество порций',
    ingredients: 'Ингредиенты', ingredientPh: 'Ингредиент', amountPh: 'Количество',
    addIngredient: '+ Добавить ингредиент',
    steps: 'Пошаговое приготовление', stepPh: 'Опишите шаг...', addStep: '+ Добавить шаг',
    save: 'Сохранить', cancel: 'Отмена',
    savedToast: 'Рецепт сохранён', errNeedName: 'Укажите название блюда',
    toShopping: '🛒 В покупки', edit: '✏️ Изменить', del: '🗑 Удалить',
    exportPdf: '📄 PDF', exportPng: '🖼 PNG', exportJpg: '🖼 JPG',
    copyText: '📋 Скопировать', printBtn: '🖨 Печать',
    copiedToast: 'Рецепт скопирован в буфер обмена',
    prepFile: 'Готовлю файл...',
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
    menus: 'Меню', menusTitle: 'Мои меню', newMenu: '+ Создать меню',
    menuName: 'Название меню', menuNamePh: 'Например, «Меню на ужин»',
    selectRecipes: 'Выберите рецепты', emptyMenus: 'Пока нет ни одного меню. Создайте первое!',
    menuSaved: 'Меню сохранено', menuDeleted: 'Меню удалено',
    delMenuConfirm: 'Удалить это меню? Рецепты останутся.',
    errNeedMenuName: 'Укажите название меню',
    errNeedRecipes: 'Выберите хотя бы один рецепт',
    recipesForms: ['рецепт', 'рецепта', 'рецептов'],
    backToMenus: '← К списку меню',
    retryBtn: '⟳ Повторить загрузку',
    share: '🔗 Поделиться', shareCopy: '📋 Копировать', shareRevoke: 'Отозвать',
    shareRevoked: 'Ссылка отозвана', linkCopied: 'Ссылка скопирована в буфер обмена',
    shareInfo: 'По этой ссылке рецепт сможет увидеть любой, у кого она есть.',
    shareInfoMenu: 'По этой ссылке меню и все его рецепты сможет увидеть любой, у кого она есть.',
    shareNotFound: 'Ссылка недействительна или доступ отозван.',
    addToAccount: '➕ Добавить к себе',
    loginToAdd: 'Войдите или зарегистрируйтесь — рецепт добавится к вам автоматически',
    recipeAdded: 'Рецепт добавлен в вашу книгу',
    menuAdded: 'Меню добавлено в вашу книгу',
    copyingRecipes: 'Добавляю рецепты к вам...',
    sharedWithYou: 'С вами поделились рецептом',
    sharedMenuWithYou: 'С вами поделились меню',
  },
  en: {
    tagline: 'A magical cookbook',
    login: 'Sign in', register: 'Sign up', resetTab: 'Reset password',
    email: 'Email', password: 'Password', name: 'Name', newPassword: 'New password',
    signIn: 'Sign in', signUp: 'Create account', resetBtn: 'Send email',
    forgot: 'Forgot password?', backToLogin: '← Back to sign in',
    resetInfo: 'We will email you a password reset link.',
    newPassTitle: 'Choose a new password',
    saveNewPass: 'Save password',
    checkEmail: 'We sent you an email — confirm it and sign in.',
    resetSent: 'Password reset email sent.',
    errFill: 'Please fill in all fields',
    errEmail: 'Enter a valid email',
    errEmailUsed: 'This email is already registered',
    errNoUser: 'No user with this email',
    errWrongPass: 'Wrong email or password',
    errShortPass: 'Password must be at least 6 characters',
    errGeneric: 'Something went wrong. Please try again.',
    errLoad: 'Could not load your data. Check the connection and refresh the page.',
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
    description: 'Description', descriptionPh: 'A few words about the dish — mood, story, secrets...',
    tags: 'Tags', tagCustomPh: 'Custom tag...',
    tag_russian: 'Russian cuisine', tag_georgian: 'Georgian cuisine', tag_italian: 'Italian cuisine',
    tag_french: 'French cuisine', tag_ukrainian: 'Ukrainian cuisine', tag_asian: 'Asian cuisine',
    tag_japanese: 'Japanese cuisine', tag_mexican: 'Mexican cuisine', tag_homestyle: 'Homestyle',
    tag_vegetarian: 'Vegetarian', tag_vegan: 'Vegan', tag_quick: 'Quick',
    photo: 'Photo', photoHint: 'Click to upload a photo', photoChange: 'Click to change the photo',
    category: 'Category', time: 'Cooking time (min)', servingsN: 'Servings',
    ingredients: 'Ingredients', ingredientPh: 'Ingredient', amountPh: 'Amount',
    addIngredient: '+ Add ingredient',
    steps: 'Step-by-step instructions', stepPh: 'Describe the step...', addStep: '+ Add step',
    save: 'Save', cancel: 'Cancel',
    savedToast: 'Recipe saved', errNeedName: 'Please enter the dish name',
    toShopping: '🛒 To shopping list', edit: '✏️ Edit', del: '🗑 Delete',
    exportPdf: '📄 PDF', exportPng: '🖼 PNG', exportJpg: '🖼 JPG',
    copyText: '📋 Copy', printBtn: '🖨 Print',
    copiedToast: 'Recipe copied to clipboard',
    prepFile: 'Preparing the file...',
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
    menus: 'Menus', menusTitle: 'My menus', newMenu: '+ Create menu',
    menuName: 'Menu name', menuNamePh: 'E.g. "Dinner menu"',
    selectRecipes: 'Choose recipes', emptyMenus: 'No menus yet. Create your first one!',
    menuSaved: 'Menu saved', menuDeleted: 'Menu deleted',
    delMenuConfirm: 'Delete this menu? The recipes will stay.',
    errNeedMenuName: 'Please enter the menu name',
    errNeedRecipes: 'Choose at least one recipe',
    recipesForms: ['recipe', 'recipes', 'recipes'],
    backToMenus: '← Back to menus',
    retryBtn: '⟳ Retry loading',
    share: '🔗 Share', shareCopy: '📋 Copy', shareRevoke: 'Revoke',
    shareRevoked: 'Link revoked', linkCopied: 'Link copied to clipboard',
    shareInfo: 'Anyone with this link can view the recipe.',
    shareInfoMenu: 'Anyone with this link can view the menu and all its recipes.',
    shareNotFound: 'The link is invalid or access has been revoked.',
    addToAccount: '➕ Add to my book',
    loginToAdd: 'Sign in or sign up — it will be added automatically',
    recipeAdded: 'Recipe added to your book',
    menuAdded: 'Menu added to your book',
    copyingRecipes: 'Adding the recipes to your book...',
    sharedWithYou: 'A recipe was shared with you',
    sharedMenuWithYou: 'A menu was shared with you',
  },
};

const CATEGORIES = ['breakfasts', 'soups', 'salads', 'mains', 'desserts', 'drinks', 'snacks', 'baking'];
const BUILT_IN_TAGS = [
  'tag_russian', 'tag_georgian', 'tag_italian', 'tag_french', 'tag_ukrainian', 'tag_asian',
  'tag_japanese', 'tag_mexican', 'tag_homestyle', 'tag_vegetarian', 'tag_vegan', 'tag_quick',
];

function getLang() {
  return (currentUser && data?.settings?.lang) || localStorage.getItem('lunorka_lang') || 'ru';
}
function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) ?? I18N.ru[key] ?? key;
}

/* ================= состояние ================= */
let currentUser = null; // {id, email, name, meta}
let data = null;        // {recipes, shopping, menus, settings:{theme, lang}}
let lastLoadInfo = null; // диагностика последней загрузки (показывается в профиле)

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('lunorka_theme', theme);
}

/* ================= стартовые рецепты ================= */
function seedRecipes() {
  return [
    {
      name: 'Лунный суп из тыквы', photo: '', emoji: '🎃',
      category: 'soups', time: 35, servings: 4, favorite: true,
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
      name: 'Эликсир лесных ягод', photo: '', emoji: '🍇',
      category: 'drinks', time: 10, servings: 2, favorite: false,
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
      name: 'Печенье «Звёздная пыль»', photo: '', emoji: '✨',
      category: 'baking', time: 40, servings: 6, favorite: false,
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
      name: 'Завтрак «Рассвет ведьмы»', photo: '', emoji: '🌅',
      category: 'breakfasts', time: 15, servings: 1, favorite: false,
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

/* ================= слой данных (Supabase) ================= */
function rowToRecipe(r) {
  return {
    id: r.id, name: r.name, photo: r.photo ?? null, emoji: r.emoji || '',
    description: r.description || '', tags: r.tags || [],
    category: r.category, time: r.time, servings: r.servings,
    ingredients: r.ingredients || [], steps: r.steps || [],
    favorite: !!r.favorite, isShared: !!r.is_shared, createdAt: new Date(r.created_at).getTime(),
  };
}
function rowToItem(i) {
  return { id: i.id, name: i.name, amount: i.amount || '', done: !!i.done, from: i.from_name || '' };
}
function rowToMenu(m) {
  return { id: m.id, name: m.name, recipeIds: m.recipe_ids || [], isShared: !!m.is_shared, createdAt: new Date(m.created_at).getTime() };
}

async function loadUserData() {
  const run = () => Promise.all([
    sb.from('recipes').select('id,name,emoji,description,tags,category,time,servings,ingredients,steps,favorite,is_shared,created_at').order('created_at', { ascending: false }),
    sb.from('shopping_items').select('*').order('created_at', { ascending: true }),
    sb.from('menus').select('*').order('created_at', { ascending: false }),
  ]);

  let results = null;
  let lastError = '';
  for (let attempt = 0; attempt < 3 && !results; attempt++) {
    try {
      const res = await run();
      if (res[0].error) {
        // ошибка ответа (например, протухший токен) — обновляем сессию и повторяем
        lastError = `${res[0].error.code || ''} ${res[0].error.message || ''}`.trim();
        console.error('Загрузка не удалась, обновляю сессию:', res[0].error);
        await sb.auth.refreshSession();
        continue;
      }
      results = res;
    } catch (e) {
      // сетевой сбой (fetch упал) — пауза и повторная попытка
      lastError = String(e && e.message || e);
      console.error('Сбой сети при загрузке, повтор:', e);
      await new Promise(r => setTimeout(r, 800));
    }
  }

  const [recipesRes, shoppingRes, menusRes] = results || [{ error: true }, { error: true }, { error: true }];
  if (recipesRes.error) console.error(recipesRes.error);
  if (shoppingRes.error) console.error(shoppingRes.error);
  if (menusRes.error) console.error(menusRes.error);
  data.recipes = (recipesRes.data || []).map(rowToRecipe);
  data.shopping = (shoppingRes.data || []).map(rowToItem);
  data.menus = (menusRes.data || []).map(rowToMenu);
  return { ok: !recipesRes.error && !shoppingRes.error, error: results ? '' : lastError };
}

/* Первый вход нового пользователя: переносим старые данные из localStorage
   или сеем стартовые рецепты. Метка хранится в аккаунте на сервере,
   поэтому удалённые рецепты не восстанавливаются ни на каком устройстве. */
async function migrateOrSeed(loadOk = true) {
  if (currentUser.meta.data_migrated) return;

  const isNewUser = Date.now() - new Date(currentUser.createdAt).getTime() < 10 * 60 * 1000;
  let imported = false;

  let old = null;
  try { old = JSON.parse(localStorage.getItem('lunorka_data_' + currentUser.email)); } catch { /* ignore */ }

  if (old && ((old.recipes && old.recipes.length) || (old.shopping && old.shopping.length))) {
    if (old.recipes && old.recipes.length) {
      await sb.from('recipes').insert(old.recipes.map(r => ({
        name: r.name, photo: r.photo || '', emoji: r.emoji || '',
        category: r.category || 'mains', time: r.time || 30, servings: r.servings || 2,
        ingredients: r.ingredients || [], steps: r.steps || [], favorite: !!r.favorite,
      })));
    }
    if (old.shopping && old.shopping.length) {
      await sb.from('shopping_items').insert(old.shopping.map(i => ({
        name: i.name, amount: i.amount || '', from_name: i.from || '', done: !!i.done,
      })));
    }
    localStorage.removeItem('lunorka_data_' + currentUser.email);
    imported = true;
  }

  if (!imported && isNewUser && !data.recipes.length && loadOk) {
    await sb.from('recipes').insert(seedRecipes());
  }

  await updateUserMeta({ data_migrated: true });
  await loadUserData();
}

/* ================= авторизация ================= */
function mapAuthError(msg) {
  if (!msg) return t('errGeneric');
  if (/invalid login credentials/i.test(msg)) return t('errWrongPass');
  if (/already registered|already been registered/i.test(msg)) return t('errEmailUsed');
  if (/user not found/i.test(msg)) return t('errNoUser');
  return t('errGeneric');
}

function renderAuth(mode = 'login') {
  const app = $('#app');
  const tabs = (mode === 'login' || mode === 'register') ? `
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
  } else if (mode === 'reset') {
    body = `
      <div class="auth-note">${t('resetInfo')}</div>
      <form id="auth-form" novalidate>
        <div class="field"><label>${t('email')}</label><input type="email" name="email" autocomplete="email" required></div>
        <div class="auth-error" id="auth-error"></div>
        <button class="btn btn--block" type="submit">${t('resetBtn')}</button>
      </form>
      <div class="auth-links"><button class="link-btn" id="to-login">${t('backToLogin')}</button></div>`;
  } else { // newpass — пришли по ссылке из письма
    body = `
      <div class="auth-note">${t('newPassTitle')}</div>
      <form id="auth-form" novalidate>
        <div class="field"><label>${t('newPassword')}</label><input type="password" name="password" autocomplete="new-password" required></div>
        <div class="auth-error" id="auth-error"></div>
        <button class="btn btn--block" type="submit">${t('saveNewPass')}</button>
      </form>`;
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

  $('#auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const email = (fd.get('email') || '').trim().toLowerCase();
    const password = fd.get('password') || '';
    const name = (fd.get('name') || '').trim();
    const errEl = $('#auth-error');
    const fail = (msg) => { errEl.textContent = msg; };
    const submitBtn = $('button[type="submit"]', e.target);
    submitBtn.disabled = true;
    const done = () => { submitBtn.disabled = false; };

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { done(); return fail(t('errEmail')); }
    if (mode !== 'reset') {
      if (!password || (mode === 'register' && (!name || !email)) || (mode === 'login' && !email)) { done(); return fail(t('errFill')); }
      if (password.length < 6) { done(); return fail(t('errShortPass')); }
    } else if (!email) { done(); return fail(t('errFill')); }

    if (mode === 'register') {
      const { data: res, error } = await sb.auth.signUp({ email, password, options: { data: { name } } });
      done();
      if (error) return fail(mapAuthError(error.message));
      if (!res.session) { errEl.textContent = ''; return fail(t('checkEmail')); }
      toast(t('accountCreated').replace('{name}', name));
    } else if (mode === 'login') {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      done();
      if (error) return fail(mapAuthError(error.message));
    } else if (mode === 'reset') {
      const { error } = await sb.auth.resetPasswordForEmail(email, {
        redirectTo: location.origin + location.pathname,
      });
      done();
      if (error) return fail(mapAuthError(error.message));
      errEl.textContent = '';
      toast(t('resetSent'));
      renderAuth('login');
    } else { // newpass
      const { error } = await sb.auth.updateUser({ password });
      done();
      if (error) return fail(mapAuthError(error.message));
      history.replaceState(null, '', location.pathname);
      toast(t('passwordChanged'));
      navigate('#/recipes');
    }
  });
}

async function loginAs(user) {
  const meta = user.user_metadata || {};
  currentUser = {
    id: user.id,
    email: user.email,
    createdAt: user.created_at,
    name: meta.name || user.email.split('@')[0],
    meta,
  };
  data = {
    recipes: [],
    shopping: [],
    menus: [],
    settings: {
      theme: meta.theme || localStorage.getItem('lunorka_theme') || 'dark',
      lang: meta.lang || localStorage.getItem('lunorka_lang') || 'ru',
    },
  };
  applyTheme(data.settings.theme);
  localStorage.setItem('lunorka_lang', data.settings.lang);
  const loadRes = await loadUserData();
  if (!loadRes.ok) {
    toast(t('errLoad'));
    // авто-повтор через несколько секунд — часто сбой кратковременный
    setTimeout(() => retryLoad(), 4000);
  }
  lastLoadInfo = {
    time: new Date().toLocaleTimeString(),
    ok: loadRes.ok,
    error: loadRes.error,
    recipes: data.recipes.length,
    shopping: data.shopping.length,
    menus: data.menus.length,
  };
  await migrateOrSeed(loadRes.ok);
}

async function retryLoad() {
  if (!currentUser) return;
  const loadRes = await loadUserData();
  lastLoadInfo = {
    time: new Date().toLocaleTimeString(),
    ok: loadRes.ok,
    error: loadRes.error,
    recipes: data.recipes.length,
    shopping: data.shopping.length,
    menus: data.menus.length,
  };
  if (!loadRes.ok) toast(t('errLoad'));
  render();
}

async function updateUserMeta(patch) {
  Object.assign(currentUser.meta, patch);
  await sb.auth.updateUser({ data: currentUser.meta });
}

async function logout() {
  await sb.auth.signOut();
  currentUser = null;
  data = null;
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
      <div class="nav-fab-wrap"><button class="nav-fab" data-nav="#/add" aria-label="+">+</button></div>
      ${navBtn('shopping', '🛒', t('navShopping'))}
      ${navBtn('profile', '🧙', t('navProfile'))}
    </nav>`;

  $$('[data-nav]', app).forEach(b =>
    b.addEventListener('click', () => navigate(b.dataset.nav)));
}

/* ================= роутер ================= */
function render() {
  // ссылки из писем Supabase приходят с токеном в hash — их обрабатывает клиент Supabase
  if (location.hash.includes('access_token') || location.hash.includes('type=recovery')) return;
  const parts = (location.hash || '#/recipes').replace(/^#\//, '').split('/');
  const page = parts[0] || 'recipes';
  const arg = decodeURIComponent(parts[1] || '');
  const arg2 = decodeURIComponent(parts[2] || '');

  // публичные ссылки работают и без входа
  if (page === 'share') { viewShare(arg, arg2); return; }

  if (!currentUser) { renderAuth('login'); return; }

  switch (page) {
    case 'recipes': viewRecipes('all'); break;
    case 'favorites': viewRecipes('fav'); break;
    case 'add': viewRecipeForm(null); break;
    case 'edit': viewRecipeForm(arg); break;
    case 'recipe': viewRecipeDetail(arg); break;
    case 'menus': viewMenus(); break;
    case 'menu': viewMenuDetail(arg); break;
    case 'menu-new': viewMenuForm(null); break;
    case 'menu-edit': viewMenuForm(arg); break;
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
    <div class="title-row">
      <h2 class="page-title">${mode === 'fav' ? t('favoritesTitle') : t('myRecipes')}</h2>
      <button class="btn btn--ghost btn--small" id="menus-btn">🗓 ${t('menus')}</button>
    </div>
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
      (r.description || '').toLowerCase().includes(q) ||
      (r.tags || []).some(tag => tag.toLowerCase().includes(q)) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(q)));

    if (!list.length) {
      const msg = q || listState.category !== 'all' ? t('nothingFound')
        : listState.tab === 'fav' ? t('emptyFav') : t('emptyAll');
      const failed = !q && listState.category === 'all' && listState.tab === 'all' && lastLoadInfo && !lastLoadInfo.ok;
      grid.innerHTML = `<div class="empty" style="grid-column:1/-1"><span class="empty-moon">🌘</span>${msg}
        ${failed ? `<br><button class="btn btn--small" id="retry-load-btn" style="margin-top:16px">${t('retryBtn')}</button>` : ''}</div>`;
      $('#retry-load-btn')?.addEventListener('click', retryLoad);
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
  $('#menus-btn').addEventListener('click', () => navigate('#/menus'));
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

async function toggleFavorite(id) {
  const r = data.recipes.find(x => x.id === id);
  if (!r) return;
  r.favorite = !r.favorite;
  toast(r.favorite ? t('favAdded') : t('favRemoved'));
  render();
  const { error } = await sb.from('recipes').update({ favorite: r.favorite }).eq('id', id);
  if (error) { r.favorite = !r.favorite; render(); toast(t('errGeneric')); }
}

/* ================= фото: сжатие и ленивая загрузка ================= */
/* Фото в списке рецептов не грузятся — только при открытии рецепта.
   При загрузке сжимаются до 1000px JPEG (~100–200 КБ вместо мегабайт),
   старые тяжёлые фото сжимаются автоматически при первом открытии. */
function compressImage(img, maxSide = 1000, quality = 0.8) {
  let { width, height } = img;
  if (width > maxSide || height > maxSide) {
    const k = maxSide / Math.max(width, height);
    width = Math.round(width * k);
    height = Math.round(height * k);
  }
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  c.getContext('2d').drawImage(img, 0, 0, width, height);
  return c.toDataURL('image/jpeg', quality);
}

function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const result = compressImage(img);
      URL.revokeObjectURL(img.src);
      resolve(result);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function compressDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(compressImage(img));
    img.onerror = reject;
    img.src = dataUrl;
  });
}

async function ensureRecipePhoto(r) {
  if (r.photo !== null && r.photo !== undefined) return;
  const { data: row, error } = await sb.from('recipes').select('photo').eq('id', r.id).single();
  r.photo = error ? '' : (row?.photo || '');
  if (r.photo.length > 600000) {
    try {
      const small = await compressDataUrl(r.photo);
      if (small.length < r.photo.length * 0.9) {
        r.photo = small;
        await sb.from('recipes').update({ photo: small }).eq('id', r.id);
      }
    } catch { /* оставляем оригинал */ }
  }
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
  if (r && (r.photo === null || r.photo === undefined)) {
    renderShell('recipes', `<div class="empty"><span class="empty-moon">🌙</span></div>`);
    ensureRecipePhoto(r).then(() => viewRecipeForm(id));
    return;
  }
  const draft = r || {
    name: '', photo: '', description: '', tags: [], category: 'mains', time: 30, servings: 2,
    ingredients: [{ name: '', amount: '' }],
    steps: [''],
  };
  let photoData = draft.photo || '';

  // теги: встроенные (по ключам) и свои (строки)
  const draftTags = draft.tags || [];
  const builtinLabels = BUILT_IN_TAGS.flatMap(k => [I18N.ru[k], I18N.en[k]]);
  const selectedBuiltin = new Set(BUILT_IN_TAGS.filter(k => draftTags.includes(I18N.ru[k]) || draftTags.includes(I18N.en[k])));
  const customTags = new Set(draftTags.filter(tag => !builtinLabels.includes(tag)));

  const customTagsHtml = () => [...customTags].map(tag =>
    `<span class="chip active chip--tag">${esc(tag)}<button type="button" class="tag-x" data-tagx="${esc(tag)}">✕</button></span>`).join('');

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
        <label>${t('description')}</label>
        <textarea name="description" placeholder="${t('descriptionPh')}">${esc(draft.description || '')}</textarea>
      </div>
      <div class="field">
        <label>${t('category')}</label>
        <select name="category">
          ${CATEGORIES.map(c => `<option value="${c}" ${draft.category === c ? 'selected' : ''}>${t('cat_' + c)}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label>${t('tags')}</label>
        <div class="chips chips--wrap" id="tags-preset">
          ${BUILT_IN_TAGS.map(k => `<button type="button" class="chip ${selectedBuiltin.has(k) ? 'active' : ''}" data-tagkey="${k}">${t(k)}</button>`).join('')}
        </div>
        <div class="tag-custom-add">
          <input id="tag-custom-input" placeholder="${t('tagCustomPh')}">
          <button type="button" class="btn btn--small" id="tag-custom-btn">${t('add')}</button>
        </div>
        <div class="chips chips--wrap" id="tags-custom">${customTagsHtml()}</div>
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

  $$('#tags-preset .chip').forEach(b => b.addEventListener('click', () => {
    const k = b.dataset.tagkey;
    if (selectedBuiltin.has(k)) { selectedBuiltin.delete(k); b.classList.remove('active'); }
    else { selectedBuiltin.add(k); b.classList.add('active'); }
  }));

  const redrawCustomTags = () => {
    const wrap = $('#tags-custom');
    wrap.innerHTML = customTagsHtml();
    $$('[data-tagx]', wrap).forEach(b => b.addEventListener('click', () => {
      customTags.delete(b.dataset.tagx);
      redrawCustomTags();
    }));
  };
  redrawCustomTags();

  const addCustomTag = () => {
    const input = $('#tag-custom-input');
    const value = input.value.trim();
    if (!value) return;
    customTags.add(value);
    input.value = '';
    redrawCustomTags();
    input.focus();
  };
  $('#tag-custom-btn').addEventListener('click', addCustomTag);
  $('#tag-custom-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); }
  });

  const picker = $('#photo-picker');
  const fileInput = $('#photo-input');
  picker.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;
    try {
      photoData = await compressImageFile(file);
    } catch {
      toast(t('errGeneric'));
      return;
    }
    picker.innerHTML = `<img src="${photoData}" alt=""><span class="ph-hint">${t('photoChange')}</span>`;
    picker.appendChild(fileInput);
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

  $('#recipe-form').addEventListener('submit', async (e) => {
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

    const payload = {
      name,
      photo: photoData,
      emoji: r?.emoji || '',
      description: (fd.get('description') || '').trim(),
      tags: [...selectedBuiltin].map(k => t(k)).concat([...customTags]),
      category: fd.get('category'),
      time: Math.max(1, parseInt(fd.get('time'), 10) || 1),
      servings: Math.max(1, parseInt(fd.get('servings'), 10) || 1),
      ingredients,
      steps,
    };

    const submitBtn = $('button[type="submit"]', e.target);
    submitBtn.disabled = true;

    if (r) {
      const { error } = await sb.from('recipes').update(payload).eq('id', r.id);
      submitBtn.disabled = false;
      if (error) { toast(t('errGeneric')); return; }
      Object.assign(r, payload);
      toast(t('savedToast'));
      navigate('#/recipe/' + r.id);
    } else {
      const { data: inserted, error } = await sb.from('recipes').insert(payload).select().single();
      submitBtn.disabled = false;
      if (error) { toast(t('errGeneric')); return; }
      data.recipes.unshift(rowToRecipe(inserted));
      toast(t('savedToast'));
      navigate('#/recipe/' + inserted.id);
    }
  });
}

/* ================= страница рецепта ================= */
function viewRecipeDetail(id) {
  const r = data.recipes.find(x => x.id === id);
  if (!r) { navigate('#/recipes'); return; }
  if (r.photo === null || r.photo === undefined) {
    ensureRecipePhoto(r).then(() => {
      if ((location.hash || '').includes(r.id)) render();
    });
  }

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
    ${r.description ? `<p class="detail-desc">${esc(r.description)}</p>` : ''}
    ${r.tags && r.tags.length ? `<div class="chips chips--wrap detail-tags">${r.tags.map(tag => `<span class="chip chip--static">${esc(tag)}</span>`).join('')}</div>` : ''}
    <div class="detail-actions">
      <button class="btn" id="to-shopping">${t('toShopping')}</button>
      <button class="btn btn--ghost" id="edit-btn">${t('edit')}</button>
      <button class="btn btn--danger" id="del-btn">${t('del')}</button>
    </div>
    <div class="detail-actions">
      <button class="btn btn--ghost btn--small" id="exp-pdf">${t('exportPdf')}</button>
      <button class="btn btn--ghost btn--small" id="exp-png">${t('exportPng')}</button>
      <button class="btn btn--ghost btn--small" id="exp-jpg">${t('exportJpg')}</button>
      <button class="btn btn--ghost btn--small" id="copy-btn">${t('copyText')}</button>
      <button class="btn btn--ghost btn--small" id="print-btn">${t('printBtn')}</button>
      <button class="btn btn--ghost btn--small" id="share-btn">${t('share')}</button>
    </div>
    <div id="share-slot">${r.isShared ? sharePanelHtml(shareUrl('recipe', r.id), 'shareInfo') : ''}</div>
    <div class="detail-section card">
      <h3>${t('ingredients')}</h3>
      <ul class="ing-list">
        ${r.ingredients.map(i => `<li><span>${esc(i.name)}</span><span class="ing-amt">${esc(i.amount)}</span></li>`).join('')}
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
  $('#del-btn').addEventListener('click', async () => {
    if (!confirm(t('delConfirm'))) return;
    const { error } = await sb.from('recipes').delete().eq('id', r.id);
    if (error) { toast(t('errGeneric')); return; }
    data.recipes = data.recipes.filter(x => x.id !== r.id);
    toast(t('deletedToast'));
    navigate('#/recipes');
  });
  $('#to-shopping').addEventListener('click', async () => {
    if (!r.ingredients.length) return;
    const rows = r.ingredients.map(i => ({ name: i.name, amount: i.amount || '', from_name: r.name }));
    const { data: inserted, error } = await sb.from('shopping_items').insert(rows).select();
    if (error) { toast(t('errGeneric')); return; }
    data.shopping.push(...inserted.map(rowToItem));
    toast(t('addedToShopping'));
  });

  $('#exp-png').addEventListener('click', () => exportRecipeImage(r, 'png'));
  $('#exp-jpg').addEventListener('click', () => exportRecipeImage(r, 'jpg'));
  $('#exp-pdf').addEventListener('click', () => exportRecipePdf(r));
  $('#copy-btn').addEventListener('click', () => copyRecipeText(r));
  $('#print-btn').addEventListener('click', () => printRecipe(r));

  $('#share-btn').addEventListener('click', async () => {
    if (r.isShared) return;
    if (!await setRecipeShared(r, true)) return;
    await copyText(shareUrl('recipe', r.id));
    toast(t('linkCopied'));
    render();
  });
  $('#share-copy')?.addEventListener('click', async () => {
    await copyText($('#share-url-input').value);
    toast(t('linkCopied'));
  });
  $('#share-revoke')?.addEventListener('click', async () => {
    if (!await setRecipeShared(r, false)) return;
    toast(t('shareRevoked'));
    render();
  });
}

/* ================= экспорт рецепта ================= */
function exportCardHtml(r) {
  return `
    <div class="export-card">
      <div class="ec-head"><img src="design/Lunorka_icon.svg" alt=""><span>Lunorka</span></div>
      <h1 class="ec-title">${esc(r.name)}</h1>
      ${r.photo ? `<img class="ec-photo" src="${r.photo}" alt="">` : ''}
      <div class="ec-meta">📂 ${t('cat_' + r.category)}&nbsp;&nbsp;·&nbsp;&nbsp;⏱ ${r.time} ${t('min')}&nbsp;&nbsp;·&nbsp;&nbsp;🍽 ${r.servings} ${plural(r.servings, t('servingsForms'))}</div>
      ${r.description ? `<p class="ec-desc">${esc(r.description)}</p>` : ''}
      ${r.tags && r.tags.length ? `<div class="ec-tags">${r.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>` : ''}
      <h2 class="ec-h">${t('ingredients')}</h2>
      <ul class="ec-ings">
        ${r.ingredients.map(i => `<li><span>${esc(i.name)}</span><span class="ec-amt">${esc(i.amount)}</span></li>`).join('')}
      </ul>
      <h2 class="ec-h">${t('steps')}</h2>
      <ol class="ec-steps">
        ${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}
      </ol>
      <div class="ec-foot">🌙 Lunorka — ${t('tagline')}</div>
    </div>`;
}

function mountExportHtml(html) {
  const holder = document.createElement('div');
  holder.className = 'export-holder';
  holder.innerHTML = html;
  document.body.appendChild(holder);
  return holder;
}

function safeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, '').trim() || 'recipe';
}

function downloadBlob(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

async function renderExportCanvas(html) {
  const holder = mountExportHtml(html);
  try {
    return await html2canvas(holder.firstElementChild, {
      scale: 2,
      backgroundColor: '#FAEFDF',
      useCORS: true,
      logging: false,
    });
  } finally {
    holder.remove();
  }
}

async function exportImage(html, filename, format) {
  toast(t('prepFile'));
  try {
    const canvas = await renderExportCanvas(html);
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, filename + '.' + format);
      else toast(t('errGeneric'));
    }, mime, 0.92);
  } catch (err) {
    console.error(err);
    toast(t('errGeneric'));
  }
}

async function exportPdf(html, filename) {
  toast(t('prepFile'));
  try {
    const canvas = await renderExportCanvas(html);
    const pdf = new window.jspdf.jsPDF('p', 'pt', 'a4');
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const margin = 24;
    const imgW = pageW - margin * 2;

    // высота одной страницы в пикселях исходного canvas
    const sliceH = Math.floor((pageH - margin * 2) * canvas.width / imgW);
    const cuts = findCleanCuts(canvas, sliceH);

    for (let i = 0; i < cuts.length - 1; i++) {
      const y0 = cuts[i];
      const h = cuts[i + 1] - y0;
      const slice = document.createElement('canvas');
      slice.width = canvas.width;
      slice.height = h;
      slice.getContext('2d').drawImage(canvas, 0, y0, canvas.width, h, 0, 0, canvas.width, h);
      const sliceImgH = h * imgW / canvas.width;
      if (i > 0) pdf.addPage();
      pdf.addImage(slice.toDataURL('image/jpeg', 0.95), 'JPEG', margin, margin, imgW, sliceImgH);
    }
    pdf.save(filename + '.pdf');
  } catch (err) {
    console.error(err);
    toast(t('errGeneric'));
  }
}

function exportRecipeImage(r, format) {
  return exportImage(exportCardHtml(r), safeFileName(r.name), format);
}
function exportRecipePdf(r) {
  return exportPdf(exportCardHtml(r), safeFileName(r.name));
}

/* Точки разрыва страниц: рядом с идеальной границей ищем полностью
   пустую строку фона, чтобы не резать текст посередине. */
function findCleanCuts(canvas, sliceH) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const bg = [250, 239, 223]; // #FAEFDF
  const maxScan = Math.min(300, Math.floor(sliceH * 0.2));
  const cuts = [0];

  const isBlankRow = (y) => {
    const row = ctx.getImageData(0, y, width, 1).data;
    for (let x = 0; x < width; x += 5) {
      const i = x * 4;
      if (Math.abs(row[i] - bg[0]) > 12 || Math.abs(row[i + 1] - bg[1]) > 12 || Math.abs(row[i + 2] - bg[2]) > 12) {
        return false;
      }
    }
    return true;
  };

  let y = sliceH;
  while (y < height) {
    let cut = y;
    for (let dy = 0; dy <= maxScan; dy++) {
      if (y - dy > cuts[cuts.length - 1] && isBlankRow(y - dy)) { cut = y - dy; break; }
      if (y + dy < height && isBlankRow(y + dy)) { cut = y + dy; break; }
    }
    // не допускаем слишком коротких хвостов
    if (height - cut < sliceH * 0.08) break;
    cuts.push(cut);
    y = cut + sliceH;
  }
  cuts.push(height);
  return cuts;
}

function recipePlainText(r) {
  const lines = [];
  lines.push(`🌙 ${r.name}`);
  lines.push(`${t('cat_' + r.category)} · ${r.time} ${t('min')} · ${r.servings} ${plural(r.servings, t('servingsForms'))}`);
  if (r.tags && r.tags.length) lines.push(`${t('tags')}: ${r.tags.join(', ')}`);
  if (r.description) { lines.push(''); lines.push(r.description); }
  lines.push('');
  lines.push(`${t('ingredients')}:`);
  r.ingredients.forEach(i => lines.push(`— ${i.name}${i.amount ? ' — ' + i.amount : ''}`));
  lines.push('');
  lines.push(`${t('steps')}:`);
  r.steps.forEach((s, idx) => lines.push(`${idx + 1}. ${s}`));
  lines.push('');
  lines.push('🌙 Lunorka');
  return lines.join('\n');
}

async function copyRecipeText(r) {
  const text = recipePlainText(r);
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast(t('copiedToast'));
}

function printRecipe(r) {
  const area = $('#print-area');
  area.innerHTML = exportCardHtml(r);
  window.print();
}

/* ================= меню ================= */
function menuRecipes(m) {
  return m.recipeIds.map(rid => data.recipes.find(r => r.id === rid)).filter(Boolean);
}

function viewMenus() {
  renderShell('recipes', `
    <h2 class="page-title">${t('menusTitle')}</h2>
    <button class="btn btn--block" id="menu-new" style="margin-bottom:16px">${t('newMenu')}</button>
    <div id="menus-list"></div>`);

  $('#menu-new').addEventListener('click', () => navigate('#/menu-new'));

  const list = $('#menus-list');
  const menus = data.menus.slice().sort((a, b) => b.createdAt - a.createdAt);
  if (!menus.length) {
    list.innerHTML = `<div class="empty"><span class="empty-moon">🗓</span>${t('emptyMenus')}</div>`;
    return;
  }
  list.innerHTML = menus.map(m => `
    <div class="card menu-card" data-open="${m.id}">
      <div class="menu-card-name">${esc(m.name)}</div>
      <div class="recipe-meta"><span>🍽 ${m.recipeIds.length} ${plural(m.recipeIds.length, t('recipesForms'))}</span></div>
    </div>`).join('');
  $$('[data-open]', list).forEach(c =>
    c.addEventListener('click', () => navigate('#/menu/' + c.dataset.open)));
}

function viewMenuForm(id) {
  const m = id ? data.menus.find(x => x.id === id) : null;
  if (id && !m) { navigate('#/menus'); return; }
  const selected = new Set(m ? m.recipeIds : []);

  renderShell('recipes', `
    <h2 class="page-title">${m ? t('editTitle') : t('newMenu').replace('+ ', '')}</h2>
    <div class="form-card card">
      <div class="field">
        <label>${t('menuName')}</label>
        <input id="menu-name" placeholder="${t('menuNamePh')}" value="${esc(m?.name || '')}">
      </div>
      <div class="field">
        <label>${t('selectRecipes')}</label>
        <div id="menu-recipes"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn--ghost" id="menu-cancel">${t('cancel')}</button>
        <button class="btn" id="menu-save">${t('save')}</button>
      </div>
    </div>`);

  const wrap = $('#menu-recipes');
  const draw = () => {
    if (!data.recipes.length) {
      wrap.innerHTML = `<div class="empty">${t('emptyAll')}</div>`;
      return;
    }
    wrap.innerHTML = data.recipes.map(r => `
      <div class="menu-recipe-row ${selected.has(r.id) ? 'selected' : ''}" data-id="${r.id}">
        <span class="menu-check">${selected.has(r.id) ? '✓' : ''}</span>
        <span class="menu-rname">${recipeEmoji(r)} ${esc(r.name)}</span>
        <span class="menu-rtime">⏱ ${r.time} ${t('min')}</span>
      </div>`).join('');
    $$('.menu-recipe-row', wrap).forEach(row => row.addEventListener('click', () => {
      if (selected.has(row.dataset.id)) selected.delete(row.dataset.id);
      else selected.add(row.dataset.id);
      draw();
    }));
  };
  draw();

  $('#menu-cancel').addEventListener('click', () => history.back());
  $('#menu-save').addEventListener('click', async () => {
    const name = $('#menu-name').value.trim();
    if (!name) { toast(t('errNeedMenuName')); return; }
    if (!selected.size) { toast(t('errNeedRecipes')); return; }
    const recipeIds = data.recipes.filter(r => selected.has(r.id)).map(r => r.id);

    const btn = $('#menu-save');
    btn.disabled = true;
    if (m) {
      const { error } = await sb.from('menus').update({ name, recipe_ids: recipeIds }).eq('id', m.id);
      btn.disabled = false;
      if (error) { toast(t('errGeneric')); return; }
      m.name = name;
      m.recipeIds = recipeIds;
      toast(t('menuSaved'));
      navigate('#/menu/' + m.id);
    } else {
      const { data: inserted, error } = await sb.from('menus').insert({ name, recipe_ids: recipeIds }).select().single();
      btn.disabled = false;
      if (error) { toast(t('errGeneric')); return; }
      data.menus.unshift(rowToMenu(inserted));
      toast(t('menuSaved'));
      navigate('#/menu/' + inserted.id);
    }
  });
}

function viewMenuDetail(id) {
  const m = data.menus.find(x => x.id === id);
  if (!m) { navigate('#/menus'); return; }
  const recipes = menuRecipes(m);

  renderShell('recipes', `
    <h2 class="detail-title">${esc(m.name)}</h2>
    <div class="detail-meta"><span>🍽 ${recipes.length} ${plural(recipes.length, t('recipesForms'))}</span></div>
    <div class="detail-actions">
      <button class="btn btn--ghost btn--small" id="menu-back">${t('backToMenus')}</button>
      <button class="btn btn--ghost btn--small" id="menu-edit">${t('edit')}</button>
      <button class="btn btn--danger btn--small" id="menu-del">${t('del')}</button>
    </div>
    <div class="detail-actions">
      <button class="btn btn--ghost btn--small" id="exp-pdf">${t('exportPdf')}</button>
      <button class="btn btn--ghost btn--small" id="exp-png">${t('exportPng')}</button>
      <button class="btn btn--ghost btn--small" id="exp-jpg">${t('exportJpg')}</button>
      <button class="btn btn--ghost btn--small" id="copy-btn">${t('copyText')}</button>
      <button class="btn btn--ghost btn--small" id="print-btn">${t('printBtn')}</button>
      <button class="btn btn--ghost btn--small" id="share-btn">${t('share')}</button>
    </div>
    <div id="share-slot">${m.isShared ? sharePanelHtml(shareUrl('menu', m.id), 'shareInfoMenu') : ''}</div>
    <div class="recipe-grid" id="menu-grid">
      ${recipes.map(recipeCardHtml).join('')}
    </div>`);

  $('#menu-back').addEventListener('click', () => navigate('#/menus'));
  $('#menu-edit').addEventListener('click', () => navigate('#/menu-edit/' + m.id));
  $('#menu-del').addEventListener('click', async () => {
    if (!confirm(t('delMenuConfirm'))) return;
    const { error } = await sb.from('menus').delete().eq('id', m.id);
    if (error) { toast(t('errGeneric')); return; }
    data.menus = data.menus.filter(x => x.id !== m.id);
    toast(t('menuDeleted'));
    navigate('#/menus');
  });

  const grid = $('#menu-grid');
  $$('[data-open]', grid).forEach(c =>
    c.addEventListener('click', (e) => {
      if (e.target.closest('[data-fav]')) return;
      navigate('#/recipe/' + c.dataset.open);
    }));
  $$('[data-fav]', grid).forEach(b =>
    b.addEventListener('click', () => toggleFavorite(b.dataset.fav)));

  $('#exp-png').addEventListener('click', () => exportImage(exportMenuCardHtml(m, recipes), safeFileName(m.name), 'png'));
  $('#exp-jpg').addEventListener('click', () => exportImage(exportMenuCardHtml(m, recipes), safeFileName(m.name), 'jpg'));
  $('#exp-pdf').addEventListener('click', () => exportPdf(exportMenuCardHtml(m, recipes), safeFileName(m.name)));
  $('#copy-btn').addEventListener('click', () => copyMenuText(m, recipes));
  $('#print-btn').addEventListener('click', () => {
    $('#print-area').innerHTML = exportMenuCardHtml(m, recipes);
    window.print();
  });

  $('#share-btn').addEventListener('click', async () => {
    if (m.isShared) return;
    if (!await setMenuShared(m, true)) return;
    await copyText(shareUrl('menu', m.id));
    toast(t('linkCopied'));
    render();
  });
  $('#share-copy')?.addEventListener('click', async () => {
    await copyText($('#share-url-input').value);
    toast(t('linkCopied'));
  });
  $('#share-revoke')?.addEventListener('click', async () => {
    if (!await setMenuShared(m, false)) return;
    toast(t('shareRevoked'));
    render();
  });
}

function exportMenuCardHtml(m, recipes) {
  return `
    <div class="export-card">
      <div class="ec-head"><img src="design/Lunorka_icon.svg" alt=""><span>Lunorka</span></div>
      <h1 class="ec-title">${esc(m.name)}</h1>
      <div class="ec-meta">🍽 ${recipes.length} ${plural(recipes.length, t('recipesForms'))}</div>
      ${recipes.map((r, i) => `
        <h2 class="ec-h">${i + 1}. ${esc(r.name)}</h2>
        <div class="ec-meta">📂 ${t('cat_' + r.category)}&nbsp;&nbsp;·&nbsp;&nbsp;⏱ ${r.time} ${t('min')}&nbsp;&nbsp;·&nbsp;&nbsp;🍽 ${r.servings} ${plural(r.servings, t('servingsForms'))}</div>
        ${r.description ? `<p class="ec-desc">${esc(r.description)}</p>` : ''}
        ${r.tags && r.tags.length ? `<div class="ec-tags">${r.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>` : ''}
        <h3 class="ec-sub">${t('ingredients')}</h3>
        <ul class="ec-ings">
          ${r.ingredients.map(ing => `<li><span>${esc(ing.name)}</span><span class="ec-amt">${esc(ing.amount)}</span></li>`).join('')}
        </ul>
        <h3 class="ec-sub">${t('steps')}</h3>
        <ol class="ec-steps">
          ${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}
        </ol>`).join('')}
      <div class="ec-foot">🌙 Lunorka — ${t('tagline')}</div>
    </div>`;
}

function menuPlainText(m, recipes) {
  const lines = [];
  lines.push(`🌙 ${m.name}`);
  lines.push('');
  recipes.forEach((r, i) => {
    lines.push(`${i + 1}. ${r.name} (${r.time} ${t('min')}, ${r.servings} ${plural(r.servings, t('servingsForms'))})`);
    if (r.description) lines.push(r.description);
    lines.push(`   ${t('ingredients')}:`);
    r.ingredients.forEach(ing => lines.push(`   — ${ing.name}${ing.amount ? ' — ' + ing.amount : ''}`));
    lines.push(`   ${t('steps')}:`);
    r.steps.forEach((s, idx) => lines.push(`   ${idx + 1}. ${s}`));
    lines.push('');
  });
  lines.push('🌙 Lunorka');
  return lines.join('\n');
}

async function copyMenuText(m, recipes) {
  const text = menuPlainText(m, recipes);
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast(t('copiedToast'));
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

    $$('[data-check]', list).forEach(b => b.addEventListener('click', async () => {
      const item = items.find(x => x.id === b.dataset.check);
      item.done = !item.done;
      viewShopping();
      const { error } = await sb.from('shopping_items').update({ done: item.done }).eq('id', item.id);
      if (error) { item.done = !item.done; viewShopping(); toast(t('errGeneric')); }
    }));
    $$('[data-del]', list).forEach(b => b.addEventListener('click', async () => {
      const { error } = await sb.from('shopping_items').delete().eq('id', b.dataset.del);
      if (error) { toast(t('errGeneric')); return; }
      data.shopping = data.shopping.filter(x => x.id !== b.dataset.del);
      viewShopping();
    }));
  };
  drawList();

  $('#shop-add-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = $('#shop-add-input');
    const name = input.value.trim();
    if (!name) return;
    const { data: inserted, error } = await sb.from('shopping_items').insert({ name }).select().single();
    if (error) { toast(t('errGeneric')); return; }
    data.shopping.push(rowToItem(inserted));
    viewShopping();
  });
  $('#clear-bought').addEventListener('click', async () => {
    const { error } = await sb.from('shopping_items').delete().eq('done', true);
    if (error) { toast(t('errGeneric')); return; }
    data.shopping = data.shopping.filter(i => !i.done);
    viewShopping();
  });
  $('#clear-all').addEventListener('click', async () => {
    const { error } = await sb.from('shopping_items').delete().not('id', 'is', null);
    if (error) { toast(t('errGeneric')); return; }
    data.shopping = [];
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

    <button class="btn btn--ghost btn--block" id="logout-btn">${t('logout')}</button>
    ${lastLoadInfo ? `<div class="debug-line">⚙ ${lastLoadInfo.time} · ${lastLoadInfo.ok ? 'ok' : 'error'} · r${lastLoadInfo.recipes}/s${lastLoadInfo.shopping}/m${lastLoadInfo.menus} · ${currentUser.id.slice(0, 8)}${lastLoadInfo.error ? `<br><span class="debug-err">${esc(lastLoadInfo.error.slice(0, 120))}</span>` : ''}</div>` : ''}`);

  $('#save-name').addEventListener('click', async () => {
    const name = $('#name-input').value.trim();
    if (!name) return;
    currentUser.name = name;
    await updateUserMeta({ name });
    toast(t('nameSaved'));
    viewProfile();
  });

  $$('#theme-seg button').forEach(b => b.addEventListener('click', async () => {
    data.settings.theme = b.dataset.theme;
    applyTheme(b.dataset.theme);
    viewProfile();
    await updateUserMeta({ theme: b.dataset.theme });
  }));
  $$('#lang-seg button').forEach(b => b.addEventListener('click', async () => {
    data.settings.lang = b.dataset.lang;
    localStorage.setItem('lunorka_lang', b.dataset.lang);
    document.documentElement.lang = b.dataset.lang;
    viewProfile();
    await updateUserMeta({ lang: b.dataset.lang });
  }));

  $('#pass-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const errEl = $('#pass-error');
    const current = fd.get('current') || '';
    const next = fd.get('next') || '';
    if (!current || !next) { errEl.textContent = t('errFill'); return; }
    if (next.length < 6) { errEl.textContent = t('errShortPass'); return; }
    const { error: checkError } = await sb.auth.signInWithPassword({ email: currentUser.email, password: current });
    if (checkError) { errEl.textContent = t('errWrongCurrent'); return; }
    const { error } = await sb.auth.updateUser({ password: next });
    if (error) { errEl.textContent = t('errGeneric'); return; }
    e.target.reset();
    errEl.textContent = '';
    toast(t('passwordChanged'));
  });

  $('#logout-btn').addEventListener('click', logout);
}

/* ================= поделиться по ссылке ================= */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
}

function shareUrl(type, id) {
  return location.origin + location.pathname + '#/share/' + type + '/' + id;
}

function sharePanelHtml(url, infoKey) {
  return `
    <div class="share-panel card">
      <input readonly value="${esc(url)}" id="share-url-input">
      <button class="btn btn--small" id="share-copy">${t('shareCopy')}</button>
      <button class="btn btn--danger btn--small" id="share-revoke">${t('shareRevoke')}</button>
    </div>
    <div class="share-info">${t(infoKey)}</div>`;
}

async function setRecipeShared(r, shared) {
  const { error } = await sb.from('recipes').update({ is_shared: shared }).eq('id', r.id);
  if (error) { toast(t('errGeneric')); return false; }
  r.isShared = shared;
  return true;
}

async function setMenuShared(m, shared) {
  const { error } = await sb.from('menus').update({ is_shared: shared }).eq('id', m.id);
  if (error) { toast(t('errGeneric')); return false; }
  // рецепты меню тоже становятся видимыми по ссылке / скрываются
  if (m.recipeIds.length) {
    await sb.from('recipes').update({ is_shared: shared }).in('id', m.recipeIds);
    data.recipes.forEach(r => { if (m.recipeIds.includes(r.id)) r.isShared = shared; });
  }
  m.isShared = shared;
  return true;
}

function shareShell(contentHtml) {
  $('#app').innerHTML = `
    <div class="app-shell">
      <header class="app-header">
        <img class="logo-icon" src="design/Lunorka_icon.svg" alt="Lunorka">
        <span class="logo-name">Lunorka</span>
      </header>
      <main id="view">${contentHtml}</main>
    </div>`;
}

async function viewShare(type, id) {
  shareShell(`<div class="empty"><span class="empty-moon">🌙</span></div>`);
  window.scrollTo(0, 0);

  if (type === 'recipe') {
    const { data: row, error } = await sb.from('recipes').select('*').eq('id', id).single();
    if (error || !row || !row.is_shared) {
      shareShell(`<div class="empty"><span class="empty-moon">🌘</span>${t('shareNotFound')}</div>`);
      return;
    }
    const r = rowToRecipe(row);
    shareShell(`
      <div class="share-note">${t('sharedWithYou')}</div>
      <div class="detail-hero">${r.photo ? `<img src="${r.photo}" alt="${esc(r.name)}">` : `<span>${recipeEmoji(r)}</span>`}</div>
      <h2 class="detail-title">${esc(r.name)}</h2>
      <div class="detail-meta">
        <span>📂 ${t('cat_' + r.category)}</span>
        <span>⏱ ${r.time} ${t('min')}</span>
        <span>🍽 ${r.servings} ${plural(r.servings, t('servingsForms'))}</span>
      </div>
      ${r.description ? `<p class="detail-desc">${esc(r.description)}</p>` : ''}
      ${r.tags && r.tags.length ? `<div class="chips chips--wrap detail-tags">${r.tags.map(tag => `<span class="chip chip--static">${esc(tag)}</span>`).join('')}</div>` : ''}
      <div class="detail-actions">
        <button class="btn" id="share-add">${t('addToAccount')}</button>
      </div>
      <div class="detail-section card">
        <h3>${t('ingredients')}</h3>
        <ul class="ing-list">
          ${r.ingredients.map(i => `<li><span>${esc(i.name)}</span><span class="ing-amt">${esc(i.amount)}</span></li>`).join('')}
        </ul>
      </div>
      <div class="detail-section card">
        <h3>${t('steps')}</h3>
        <ol class="steps-list">${r.steps.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
      </div>`);
    $('#share-add').addEventListener('click', () => addSharedRecipe(row));
  } else if (type === 'menu') {
    const { data: menuRow, error } = await sb.from('menus').select('*').eq('id', id).single();
    if (error || !menuRow || !menuRow.is_shared) {
      shareShell(`<div class="empty"><span class="empty-moon">🌘</span>${t('shareNotFound')}</div>`);
      return;
    }
    const ids = menuRow.recipe_ids || [];
    // лёгкий запрос без фото — публичная страница открывается быстро даже на слабой сети
    const { data: recipeRows } = ids.length
      ? await sb.from('recipes').select('id,name,emoji,description,tags,category,time,servings,ingredients,steps,favorite,is_shared,created_at').in('id', ids)
      : { data: [] };
    const recipes = ids.map(rid => (recipeRows || []).find(rr => rr.id === rid)).filter(Boolean).map(rowToRecipe);
    shareShell(`
      <div class="share-note">${t('sharedMenuWithYou')}</div>
      <h2 class="detail-title">${esc(menuRow.name)}</h2>
      <div class="detail-meta"><span>🍽 ${recipes.length} ${plural(recipes.length, t('recipesForms'))}</span></div>
      <div class="detail-actions">
        <button class="btn" id="share-add">${t('addToAccount')}</button>
      </div>
      <div class="recipe-grid">
        ${recipes.map(recipeCardHtml).join('')}
      </div>`);
    $('#share-add').addEventListener('click', () => addSharedMenu(menuRow));
  } else {
    navigate('#/recipes');
  }
}

function recipeSharePayload(row) {
  return {
    name: row.name, photo: row.photo || '', emoji: row.emoji || '',
    description: row.description || '', tags: row.tags || [],
    category: row.category, time: row.time, servings: row.servings,
    ingredients: row.ingredients || [], steps: row.steps || [],
  };
}

async function addSharedRecipe(row) {
  if (!currentUser) {
    sessionStorage.setItem('lunorka_pending_share', JSON.stringify({ type: 'recipe', id: row.id }));
    toast(t('loginToAdd'));
    location.hash = '';
    renderAuth('login');
    return;
  }
  const { data: inserted, error } = await sb.from('recipes').insert(recipeSharePayload(row)).select().single();
  if (error) { toast(t('errGeneric')); return; }
  data.recipes.unshift(rowToRecipe(inserted));
  toast(t('recipeAdded'));
  navigate('#/recipe/' + inserted.id);
}

async function addSharedMenu(menuRow) {
  if (!currentUser) {
    sessionStorage.setItem('lunorka_pending_share', JSON.stringify({ type: 'menu', id: menuRow.id }));
    toast(t('loginToAdd'));
    location.hash = '';
    renderAuth('login');
    return;
  }
  const ids = menuRow.recipe_ids || [];
  // копируем порциями, чтобы не упереться в таймаут на тяжёлых фото
  toast(t('copyingRecipes'));
  const idToNewId = {};
  for (let i = 0; i < ids.length; i += 3) {
    const chunk = ids.slice(i, i + 3);
    const { data: rows } = await sb.from('recipes').select('*').in('id', chunk);
    for (const rr of rows || []) {
      let photo = rr.photo || '';
      if (photo.length > 600000) {
        try { photo = await compressDataUrl(photo); } catch { /* оставляем оригинал */ }
      }
      const { data: ins, error } = await sb.from('recipes')
        .insert({ ...recipeSharePayload(rr), photo })
        .select().single();
      if (!error) {
        idToNewId[rr.id] = ins.id;
        data.recipes.unshift(rowToRecipe(ins));
      }
    }
  }
  const newIds = ids.map(rid => idToNewId[rid]).filter(Boolean);
  const { data: menuIns, error } = await sb.from('menus').insert({ name: menuRow.name, recipe_ids: newIds }).select().single();
  if (error) { toast(t('errGeneric')); return; }
  data.menus.unshift(rowToMenu(menuIns));
  toast(t('menuAdded'));
  navigate('#/menu/' + menuIns.id);
}

/* После входа/регистрации по ссылке-приглашению — добавляем автоматически */
async function handlePendingShare() {
  let p = null;
  try { p = JSON.parse(sessionStorage.getItem('lunorka_pending_share')); } catch { /* ignore */ }
  if (!p) return;
  sessionStorage.removeItem('lunorka_pending_share');
  if (p.type === 'recipe') {
    const { data: row } = await sb.from('recipes').select('*').eq('id', p.id).single();
    if (row && row.is_shared) await addSharedRecipe(row);
    else navigate('#/recipes');
  } else if (p.type === 'menu') {
    const { data: row } = await sb.from('menus').select('*').eq('id', p.id).single();
    if (row && row.is_shared) await addSharedMenu(row);
    else navigate('#/recipes');
  }
}

/* ================= запуск ================= */
/* Единая точка входа — событие INITIAL_SESSION: оно приходит, когда клиент
   уже восстановил и при необходимости обновил токен, так что запросы к базе
   не упадут с просроченным токеном после обновления страницы. */
sb.auth.onAuthStateChange(async (event, session) => {
  if (event === 'PASSWORD_RECOVERY') {
    renderAuth('newpass');
    return;
  }
  if (event === 'SIGNED_OUT') {
    currentUser = null;
    data = null;
    location.hash = '';
    renderAuth('login');
    return;
  }
  if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')
      && session?.user && !currentUser) {
    try {
      await loginAs(session.user);
      if (event === 'SIGNED_IN') toast(t('welcomeBack').replace('{name}', currentUser.name));
      if (event === 'SIGNED_IN') await handlePendingShare();
    } catch (e) {
      console.error('Ошибка входа в приложение:', e);
      toast(t('errLoad'));
    }
    render();
  }
});

(function init() {
  makeStars();
  applyTheme(localStorage.getItem('lunorka_theme') || 'dark');
  document.documentElement.lang = getLang();
  window.addEventListener('hashchange', render);
  render();
})();

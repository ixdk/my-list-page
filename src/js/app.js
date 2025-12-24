/* ================= МАСКА ТЕЛЕФОНА ================= */
function initPhoneMask() {
  if (typeof IMask === 'undefined' || typeof $ === 'undefined') return;

  $('input[type=tel]').each(function() {
    const element = this;

    const mask = IMask(element, {
      mask: [
        { mask: '+7 (000) 000-00-00', startsWith: '+7', country: 'Russia' },
        { mask: '+7 (000) 000-00-00', startsWith: '7', country: 'Russia' },
        { mask: '8 (000) 000-00-00', startsWith: '8', country: 'Russia' },
        { mask: '+7 (000) 000-00-00', startsWith: '', country: 'unknown' },
      ],
      dispatch(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return dynamicMasked.compiledMasks.find(
          (m) => number.indexOf(m.startsWith) === 0,
        );
      },
    });

    $(element).on('blur', function() {
      const value = mask.unmaskedValue;
      const minLength = value.charAt(0) === '8' ? 11 : 10;
      if (value.length < minLength) mask.value = '';
    });
  });
}

/* ================= РЕДИРЕКТ НА РЕГИСТРАЦИЮ ================= */
function initRegistrationRedirect() {
  const registrationUrl = 'https://ixdk.github.io/my-auth-page/';

  // Обработчик для кнопки в guest-prompt
  const guestRedirectBtn = document.getElementById('show-register-form');
  if (guestRedirectBtn) {
    guestRedirectBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(registrationUrl, '_blank');
    });
  }

  // Обработчик для кнопки в конце редактора
  document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'register-btn-bottom') {
      e.preventDefault();
      window.open(registrationUrl, '_blank');
    }
  });

  checkRegistrationSuccess();
}

/* ================= ПРОВЕРКА УСПЕШНОЙ РЕГИСТРАЦИИ ================= */
function checkRegistrationSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const registrationSuccess = urlParams.get('registration') === 'success';
  const isRegistered = localStorage.getItem('userRegistered') === 'true';

  if (registrationSuccess || isRegistered) {
    localStorage.setItem('userRegistered', 'true');
    updateUIAfterRegistration();
  }
}

/* ================= ОБНОВЛЕНИЕ UI ПОСЛЕ РЕГИСТРАЦИИ ================= */
function updateUIAfterRegistration() {
  // Скрываем guest prompt
  const guestPrompt = document.getElementById('guest-prompt');
  if (guestPrompt) {
    guestPrompt.style.display = 'none';
    guestPrompt.classList.add('hidden');
  }

  // Делаем редактор доступным для редактирования
  const editorWrap = document.querySelector('.editor-wrap');
  const editorBox = document.querySelector('.editor-box');

  if (editorWrap) {
    editorWrap.style.display = 'flex';
    editorWrap.classList.add('editor-wrap--visible');
  }

  if (editorBox) {
    editorBox.setAttribute('contenteditable', 'true');
    editorBox.classList.add('editor-box--editable');

    // Убираем кнопку регистрации в конце редактора
    const registerBtn = editorBox.querySelector('#register-btn-bottom');
    if (registerBtn) registerBtn.remove();

    // Инициализируем редактор
    initEditor();
  }

  // Показываем FAB кнопку
  const fab = document.querySelector('.fab');
  if (fab) {
    fab.classList.add('fab--visible', 'fab--active');
  }

  // Обновляем заголовок
  const userName = localStorage.getItem('userName') || 'Мой список';
  const logo = document.querySelector('.header .logo');
  if (logo) {
    logo.textContent = userName;
  }
}

/* ================= УПРАВЛЕНИЕ СОСТОЯНИЕМ UI ================= */
function updateUIState() {
  const guestPrompt = document.getElementById('guest-prompt');
  const editorWrap = document.querySelector('.editor-wrap');
  const editorBox = document.querySelector('.editor-box');
  const fab = document.querySelector('.fab');

  const isRegistered = localStorage.getItem('userRegistered') === 'true';

  // ВАЖНО: Редактор ВСЕГДА должен быть виден
  if (editorWrap) {
    editorWrap.style.display = 'flex';
    editorWrap.classList.add('editor-wrap--visible');
  }

  if (isRegistered) {
    // После регистрации - скрываем guest prompt
    if (guestPrompt) {
      guestPrompt.style.display = 'none';
      guestPrompt.classList.add('hidden');
    }

    // Делаем редактор доступным для редактирования
    if (editorBox) {
      editorBox.setAttribute('contenteditable', 'true');
      editorBox.classList.add('editor-box--editable');

      // Убираем кнопку регистрации в конце редактора
      const registerBtn = editorBox.querySelector('#register-btn-bottom');
      if (registerBtn) registerBtn.remove();

      // Инициализируем редактор
      setTimeout(() => initEditor(), 100);
    }

    // Показываем FAB кнопку
    if (fab) {
      fab.classList.add('fab--visible', 'fab--active');
    }

    // Обновляем заголовок
    const userName = localStorage.getItem('userName') || 'Новогодний список';
    const logo = document.querySelector('.header .logo');
    if (logo) logo.textContent = userName;

    // Добавляем дефолтный контент если редактор пустой
    if (editorBox && !editorBox.hasAttribute('data-initialized')) {
      editorBox.innerHTML = getDefaultEditorContent();
      editorBox.setAttribute('data-initialized', 'true');

      // Добавляем кнопку регистрации в конец (будет видна только если не зарегистрирован)
      if (!isRegistered) {
        addRegisterButtonToEditor();
      }
    }
  } else {
    // До регистрации - показываем guest prompt, редактор тоже виден
    if (guestPrompt) {
      guestPrompt.style.display = 'block';
      guestPrompt.classList.remove('hidden');
    }

    // Редактор виден, но заблокирован для редактирования
    if (editorBox) {
      editorBox.setAttribute('contenteditable', 'false');
      editorBox.classList.remove('editor-box--editable');

      // Добавляем дефолтный контент если редактор пустой
      if (!editorBox.hasAttribute('data-initialized')) {
        editorBox.innerHTML = getDefaultEditorContent();
        editorBox.setAttribute('data-initialized', 'true');
      }

      // Добавляем кнопку регистрации в конец редактора если её нет
      if (!editorBox.querySelector('#register-btn-bottom')) {
        addRegisterButtonToEditor();
      }
    }

    // Скрываем FAB кнопку
    if (fab) {
      fab.classList.remove('fab--visible', 'fab--active');
    }
  }
}

/* ================= ДОБАВЛЕНИЕ КНОПКИ РЕГИСТРАЦИИ В КОНЕЦ РЕДАКТОРА ================= */
function addRegisterButtonToEditor() {
  const editorBox = document.querySelector('.editor-box');
  if (!editorBox) return;

  // Удаляем старую кнопку если есть
  const oldBtn = editorBox.querySelector('#register-btn-bottom');
  if (oldBtn) oldBtn.remove();

  // Создаем новую кнопку
  const registerBtn = document.createElement('div');
  registerBtn.id = 'register-btn-bottom';
  registerBtn.className = 'register-btn-bottom';
  registerBtn.innerHTML = `
    <div class="register-btn-content">
      <p>📝 Для редактирования списка зарегистрируйтесь</p>
      <button class="btn btn-primary" id="register-from-editor-bottom">Зарегистрироваться</button>
    </div>
  `;

  editorBox.appendChild(registerBtn);

  // Обработчик для новой кнопки
  document
    .getElementById('register-from-editor-bottom')
    ?.addEventListener('click', function(e) {
      e.preventDefault();
      const registrationUrl = 'https://ваш-сайт-регистрации.com/register';
      window.open(registrationUrl, '_blank');
    });
}

/* ================= ДЕФОЛТНЫЙ КОНТЕНТ РЕДАКТОРА ================= */
function getDefaultEditorContent() {
  return `
<div data-type="category">🥗 САЛАТЫ</div>
<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Оливье (~800 г)</span>
</div>
<div class="auto-bullet">• Картофель</div>
<div class="auto-bullet">• Морковь</div>
<div class="auto-bullet">• Яйца</div>
<div class="auto-bullet">• Колбаса докторская</div>
<div class="auto-bullet">• Зелёный горошек</div>
<div class="auto-bullet">• Огурцы маринованные</div>
<div class="auto-bullet">• Майонез</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Крабовый салат (~700 г)</span>
</div>
<div class="auto-bullet">• Крабовые палочки</div>
<div class="auto-bullet">• Яйца</div>
<div class="auto-bullet">• Кукуруза</div>
<div class="auto-bullet">• Свежий огурец</div>
<div class="auto-bullet">• Майонез</div>

<div data-type="category">🍗 ГОРЯЧЕЕ</div>
<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">🦆 Запечённая утка (1 шт ~5 кг)</span>
</div>
<div class="auto-bullet">• Утка</div>
<div class="auto-bullet">• Яблоки</div>
<div class="auto-bullet">• Чеснок</div>
<div class="auto-bullet">• Мёд</div>
<div class="auto-bullet">• Соевый соус</div>
<div class="auto-bullet">• Розмарин</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">🍢 Шашлык (2–3 кг)</span>
</div>
<div class="auto-bullet">• Курица</div>
<div class="auto-bullet">• Лук</div>
<div class="auto-bullet">• Чеснок</div>
<div class="auto-bullet">• Соусы для мяса (2 вида)</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">🥔 Картофель (запечённый / на углях)</span>
</div>
<div class="auto-bullet">• Картофель</div>
<div class="auto-bullet">• Розмарин</div>
<div class="auto-bullet">• Чеснок</div>

<div data-type="category">🧀 НАРЕЗКИ</div>
<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Сырная тарелка</span>
</div>
<div class="auto-bullet">• Сыр (3 вида)</div>
<div class="auto-bullet">• Белый сыр</div>
<div class="auto-bullet">• Виноград</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Мясная тарелка</span>
</div>
<div class="auto-bullet">• Колбаса (3 вида)</div>
<div class="auto-bullet">• Докторская колбаса</div>
<div class="auto-bullet">• Виноград</div>

<div data-type="category">🥪 ЗАКУСКИ / КАНАПЕ</div>
<div>(без тарталеток, всё на багете)</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Канапе с лососем</span>
</div>
<div class="auto-bullet">• Багет</div>
<div class="auto-bullet">• Творожный сыр / Филадельфия</div>
<div class="auto-bullet">• Лосось</div>
<div class="auto-bullet">• Огурец</div>
<div class="auto-bullet">• Микрозелень</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Канапе с сыром и колбасой</span>
</div>
<div class="auto-bullet">• Багет</div>
<div class="auto-bullet">• Сыр для канапе</div>
<div class="auto-bullet">• Колбаса</div>
<div class="auto-bullet">• Оливки</div>

<div data-type="item">
  <label class="checkbox-container">
    <input type="checkbox">
    <span class="checkbox-custom"></span>
  </label>
  <span class="item-text">Канапе с креветками (по желанию)</span>
</div>
<div class="auto-bullet">• Багет</div>
<div class="auto-bullet">• Творожный сыр</div>
<div class="auto-bullet">• Креветки</div>
<div class="auto-bullet">• Чеснок</div>
<div class="auto-bullet">• Микрозелень</div>

<div data-type="category">🥒 ОВОЩИ</div>
<div class="auto-bullet">• Огурцы свежие</div>
<div class="auto-bullet">• Помидоры</div>
<div class="auto-bullet">• Перец</div>
<div class="auto-bullet">• Морковь</div>
<div class="auto-bullet">• Квашеная капуста</div>

<div data-type="category">🍎 ФРУКТЫ</div>
<div class="auto-bullet">• Яблоки</div>
<div class="auto-bullet">• Виноград</div>

<div data-type="category">🍞 ХЛЕБ</div>
<div class="auto-bullet">• Хлеб</div>
<div class="auto-bullet">• Багеты</div>

<div data-type="category">🍾 НАПИТКИ</div>
<div class="auto-bullet">• Вино — 2 бутылки</div>
<div class="auto-bullet">• Виски Jack Daniel's — 2 бутылки</div>
<div class="auto-bullet">• Jägermeister (по желанию)</div>
<div class="auto-bullet">• Пиво Heineken</div>
<div class="auto-bullet">• Соки</div>
<div class="auto-bullet">• Кола</div>

<div data-type="category">🧾 ПРОЧЕЕ</div>
<div class="auto-bullet">• Уголь</div>
<div class="auto-bullet">• Шампуры / палочки для канапе</div>
<div class="auto-bullet">• Тарелки</div>
<div class="auto-bullet">• Стаканы</div>
<div class="auto-bullet">• Салфетки</div>

<div data-type="category">ПРОДУКТЫ</div>
<div class="auto-bullet">Соки — 5 шт — 12,50 €</div>
<div class="auto-bullet">Кола — 2 шт — 3,00 €</div>
<div class="auto-bullet">Пиво Heineken 0,33 — 24 бутылки — 24,00 €</div>
<div class="auto-bullet">Картофель — 3 кг — 3,00 €</div>
<div class="auto-bullet">Картофель — 5 кг — 2,00 €</div>
<div class="auto-bullet">Виноград — без веса — 4,00 €</div>
<div class="auto-bullet">Розмарин — 1 уп — 1,00 €</div>
<div class="auto-bullet">Морковь — 1 кг — 1,00 €</div>
<div class="auto-bullet">Яйца — 1 уп — 2,00 €</div>
<div class="auto-bullet">Зелёный горох — 1 банка — 2,00 €</div>
<div class="auto-bullet">Огурец свежий — без веса — 3,00 €</div>
<div class="auto-bullet">Майонез — 1 уп — 4,00 €</div>
<div class="auto-bullet">Помидоры — без веса — 2,50 €</div>
<div class="auto-bullet">Кукуруза — 1 банка — 2,50 €</div>
<div class="auto-bullet">Чеснок — без веса — 1,29 €</div>
<div class="auto-bullet">Яблоки — без веса — 2,50 €</div>
<div class="auto-bullet">Лук — без веса — 1,50 €</div>
<div class="auto-bullet">Микрозелень — 1 уп — 1,00 €</div>
<div class="auto-bullet">Перец сладкий — без веса — 1,20 €</div>
<div class="auto-bullet">Огурцы маринованные — 1 банка — 2,80 €</div>
<div class="auto-bullet">Хлеб — без веса — 1,50 €</div>
<div class="auto-bullet">Вино — 2 бутылки — 10,00 €</div>
<div class="auto-bullet">Мёд — 1 уп — 2,50 €</div>
<div class="auto-bullet">Виски Jack Daniel's — 2 бутылки — 40,00 €</div>
<div class="auto-bullet">Jägermeister (по желанию) — 1 бутылка — 14,49 €</div>
<div class="auto-bullet">Соевый соус — 1 бутылка — 2,59 €</div>
<div class="auto-bullet">Сыр (3 вида) — без веса — 9,00 €</div>
<div class="auto-bullet">Сыр для канапе — без веса — 2,69 €</div>
<div class="auto-bullet">Белый сыр — без веса — 3,49 €</div>
<div class="auto-bullet">Творожный сыр (Филадельфия) — без веса — 3,69 €</div>
<div class="auto-bullet">Соусы для мяса — 2 шт — 4,00 €</div>
<div class="auto-bullet">Лосось нарезанный — 2 упаковки — 8,00 €</div>
<div class="auto-bullet">Утка — 1 шт ~5 кг — 46,00 €</div>
<div class="auto-bullet">Курица (на шашлык) — 2–3 кг — 18,00 €</div>
<div class="auto-bullet">Колбаса докторская — 1 шт — 3,69 €</div>
<div class="auto-bullet">Колбаса — 3 шт — 6,50 €</div>
<div class="auto-bullet">Креветки (для канапе, по желанию) — 450 g — 10,00 €</div>
<div class="auto-bullet">Крабовые палочки — 400 g — 5,20 €</div>
<div class="auto-bullet">Квашеная капуста (на выбор) — 1 уп — 2,49 €</div>
<div class="auto-bullet">Багет для бутербродов с лососем — 1 шт — 2,00 €</div>
<div class="auto-bullet">Оливки — 1 банка — 2,00 €</div>
<div class="auto-bullet">Стаканы — 1 уп — 3,00 €</div>
<div class="auto-bullet">Салфетки — 1 уп — 0,75 €</div>
<div class="auto-bullet">Тарелки — 12 шт — 3,79 €</div>
<div class="auto-bullet">Палочки для канапе — 1 уп — 4,00 €</div>
<div class="auto-bullet">Уголь / розжиг — 8,00 €</div>

<div data-type="category">ИТОГО ПО СУММЕ</div>
<div>Общая сумма:</div>
<div>249,70 €</div>

<div data-type="category">СКИДЫВАЕМСЯ НА 8 ЧЕЛОВЕК</div>
<div>249,70 € ÷ 8 =</div>
<div>31,21 € с человека</div>
<div>(можно округлить до 31,50 €, чтобы без копеек)</div>`;
}

/* ================= ИНИЦИАЛИЗАЦИЯ РЕДАКТОРА ================= */
function initEditor() {
  const editorBox = document.querySelector('.editor-box');
  if (!editorBox) return;

  // Проверяем, что пользователь зарегистрирован
  const isRegistered = localStorage.getItem('userRegistered') === 'true';
  if (!isRegistered) {
    editorBox.setAttribute('contenteditable', 'false');
    editorBox.classList.remove('editor-box--editable');
    return;
  }

  // Делаем редактор редактируемым
  editorBox.setAttribute('contenteditable', 'true');
  editorBox.classList.add('editor-box--editable');

  // Убираем кнопку регистрации в конце редактора
  const registerBtn = editorBox.querySelector('#register-btn-bottom');
  if (registerBtn) registerBtn.remove();

  // Обработчик ввода для автоматических точек
  editorBox.addEventListener('input', function(e) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const node = range.startContainer;

    if (
      e.inputType === 'insertParagraph' ||
      e.inputType === 'insertLineBreak'
    ) {
      setTimeout(() => {
        const currentLine = getCurrentLine();
        if (currentLine && currentLine.textContent.trim() === '') {
          currentLine.classList.add('auto-bullet');
        }
      }, 10);
    }
  });

  // Обработчик клика для чекбоксов
  editorBox.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
      saveEditorState();
    }
  });

  // Обработчики для инструментов редактора
  document.querySelectorAll('.editor-tool').forEach((tool) => {
    tool.addEventListener('click', function() {
      const action = this.getAttribute('data-action');

      switch (action) {
        case 'add-item':
          addNewItem();
          break;
        case 'clear-done':
          clearDoneItems();
          break;
        case 'print':
          printList();
          break;
      }
    });
  });

  // Функция для добавления нового пункта
  function addNewItem() {
    const isRegistered = localStorage.getItem('userRegistered') === 'true';
    if (!isRegistered) {
      alert('Для добавления пунктов необходимо зарегистрироваться');
      return;
    }

    const editorBox = document.querySelector('.editor-box');
    const newItem = document.createElement('div');
    newItem.setAttribute('data-type', 'item');

    const checkboxId = 'item-' + Date.now();
    newItem.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" id="${checkboxId}">
        <span class="checkbox-custom"></span>
      </label>
      <span class="item-text" contenteditable="true">Новый пункт</span>
    `;

    editorBox.appendChild(newItem);

    setTimeout(() => {
      const textSpan = newItem.querySelector('.item-text');
      textSpan.focus();

      const range = document.createRange();
      range.selectNodeContents(textSpan);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }, 10);
  }

  // Функция для очистки выполненных пунктов
  function clearDoneItems() {
    if (!confirm('Удалить все отмеченные пункты?')) return;

    const editorBox = document.querySelector('.editor-box');
    const doneItems = editorBox.querySelectorAll(
      '[data-type="item"] input:checked',
    );

    doneItems.forEach((checkbox) => {
      const item = checkbox.closest('[data-type="item"]');
      if (item) {
        item.remove();
      }
    });

    saveEditorState();
  }

  // Функция для печати списка
  function printList() {
    const originalContent = document.querySelector('.editor-box').innerHTML;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Новогодний список - Печать</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .print-header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #c77a7a;
            padding-bottom: 10px;
          }
          .print-header h1 {
            color: #c77a7a;
            margin: 0;
          }
          .category {
            font-weight: bold;
            color: #c77a7a;
            margin-top: 25px;
            margin-bottom: 10px;
            font-size: 1.2em;
          }
          .item {
            margin: 5px 0;
            padding-left: 20px;
            position: relative;
          }
          .item::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #c77a7a;
          }
          .item.checked {
            text-decoration: line-through;
            color: #888;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>🎄 Новогодний список покупок</h1>
          <p>Дата: ${new Date().toLocaleDateString('ru-RU')}</p>
        </div>
        <div id="print-content"></div>
        <div class="no-print" style="margin-top: 30px; text-align: center;">
          <button onclick="window.print()">🖨️ Печатать</button>
          <button onclick="window.close()">✖️ Закрыть</button>
        </div>
        <script>
          const content = \`${originalContent}\`;
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, 'text/html');
          const printContent = document.getElementById('print-content');
          
          let currentCategory = '';
          let html = '';
          
          doc.body.childNodes.forEach(node => {
            if (node.nodeType === 1) {
              if (node.getAttribute('data-type') === 'category') {
                currentCategory = node.textContent;
                html += '<div class="category">' + currentCategory + '</div>';
              } else if (node.getAttribute('data-type') === 'item') {
                const isChecked = node.querySelector('input')?.checked;
                const text = node.querySelector('.item-text')?.textContent || node.textContent;
                const className = isChecked ? 'item checked' : 'item';
                html += '<div class="' + className + '">' + text + '</div>';
              } else if (node.textContent.trim()) {
                html += '<div>' + node.textContent + '</div>';
              }
            }
          });
          
          printContent.innerHTML = html;
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  }

  // Функция для получения текущей строки
  function getCurrentLine() {
    const selection = window.getSelection();
    if (!selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    let node = range.startContainer;

    while (node && node.nodeType === 3) {
      node = node.parentNode;
    }

    return node;
  }

  // Функция для сохранения состояния редактора
  function saveEditorState() {
    const editorBox = document.querySelector('.editor-box');
    if (!editorBox) return;

    localStorage.setItem('editorContent', editorBox.innerHTML);

    const checkboxes = editorBox.querySelectorAll('input[type="checkbox"]');
    const checkboxStates = {};

    checkboxes.forEach((checkbox, index) => {
      checkboxStates[index] = checkbox.checked;
    });

    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
  }

  // Функция для загрузки состояния редактора
  function loadEditorState() {
    const editorBox = document.querySelector('.editor-box');
    if (!editorBox) return;

    const savedContent = localStorage.getItem('editorContent');
    const savedStates = localStorage.getItem('checkboxStates');

    if (savedContent) {
      editorBox.innerHTML = savedContent;

      if (savedStates) {
        const checkboxStates = JSON.parse(savedStates);
        const checkboxes = editorBox.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach((checkbox, index) => {
          if (checkboxStates[index] !== undefined) {
            checkbox.checked = checkboxStates[index];
          }
        });
      }
    }
  }

  // Автосохранение при изменении
  editorBox.addEventListener('input', debounce(saveEditorState, 1000));

  // Загружаем сохраненное состояние
  loadEditorState();

  // Функция для дебаунса
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

/* ================= 3D TILT ЭФФЕКТ ================= */
function initCardTilt() {
  document.querySelectorAll('.info-card__tilt').forEach((tilt) => {
    if (tilt.dataset.tiltInit) return;
    tilt.dataset.tiltInit = '1';

    if (tilt.querySelector('img')) {
      tilt.style.background = 'transparent';
    }

    tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';

    tilt.addEventListener('mousemove', (e) => {
      const rect = tilt.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rx = (y / rect.height - 0.5) * -12;
      const ry = (x / rect.width - 0.5) * 12;

      tilt.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      tilt.style.boxShadow = '0 20px 50px rgba(0,0,0,.18)';
    });

    tilt.addEventListener('mouseleave', () => {
      tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      tilt.style.boxShadow = '';
    });
  });
}

/* ================= БЕСКОНЕЧНАЯ ПРОКРУТКА ================= */
function initInfiniteWheel() {
  const leftCol = document.querySelector('.left-column');
  const rightCol = document.querySelector('.right-column');

  if (!leftCol || !rightCol) return;

  if (window.innerWidth <= 992) {
    leftCol.style.transform = 'none';
    rightCol.style.transform = 'none';

    document
      .querySelectorAll('.info-card-duplicate')
      .forEach((el) => el.remove());

    return;
  }

  const speed = 0.3;
  let leftY = 0;
  let rightY = 0;
  let animationId = null;

  function calculateItemHeight() {
    const firstItem = leftCol.querySelector('.info-card');
    if (!firstItem) return 424;
    const cardHeight = firstItem.offsetHeight;
    const gap = 24;
    return cardHeight + gap;
  }

  const itemHeight = calculateItemHeight();

  function createDuplicates() {
    document
      .querySelectorAll('.info-card-duplicate')
      .forEach((el) => el.remove());

    const allLeftCards = Array.from(leftCol.querySelectorAll('.info-card'));
    const allRightCards = Array.from(rightCol.querySelectorAll('.info-card'));

    const originalLeftCards = allLeftCards.slice(
      0,
      Math.min(5, allLeftCards.length),
    );
    const originalRightCards = allRightCards.slice(
      0,
      Math.min(5, allRightCards.length),
    );

    for (let i = 5; i < allLeftCards.length; i++) {
      if (allLeftCards[i]) allLeftCards[i].remove();
    }
    for (let i = 5; i < allRightCards.length; i++) {
      if (allRightCards[i]) allRightCards[i].remove();
    }

    originalLeftCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add('info-card-duplicate');

      clone.style.animation = 'none';
      clone.style.opacity = '1';

      const originalImg = card.querySelector('img');
      const clonedImg = clone.querySelector('img');
      if (originalImg && clonedImg) {
        clonedImg.src = originalImg.src;
        clonedImg.alt = originalImg.alt || '';
        clonedImg.style.cssText = originalImg.style.cssText;
        clonedImg.classList.add('loaded');
        clonedImg.style.opacity = '1';
      }

      leftCol.appendChild(clone);
    });

    originalRightCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add('info-card-duplicate');

      clone.style.animation = 'none';
      clone.style.opacity = '1';

      const originalImg = card.querySelector('img');
      const clonedImg = clone.querySelector('img');
      if (originalImg && clonedImg) {
        clonedImg.src = originalImg.src;
        clonedImg.alt = originalImg.alt || '';
        clonedImg.style.cssText = originalImg.style.cssText;
        clonedImg.classList.add('loaded');
        clonedImg.style.opacity = '1';
      }

      rightCol.appendChild(clone);
    });
  }

  createDuplicates();

  function scrollAnimation() {
    leftY -= speed;
    rightY -= speed;

    if (Math.abs(leftY) >= itemHeight) {
      const firstChild = leftCol.firstElementChild;
      if (firstChild) {
        leftCol.appendChild(firstChild);
      }
      leftY += itemHeight;
    }

    if (Math.abs(rightY) >= itemHeight) {
      const firstChild = rightCol.firstElementChild;
      if (firstChild) {
        rightCol.appendChild(firstChild);
      }
      rightY += itemHeight;
    }

    leftCol.style.transform = `translateY(${leftY}px)`;
    rightCol.style.transform = `translateY(${rightY}px)`;

    if (window.innerWidth > 992) {
      animationId = requestAnimationFrame(scrollAnimation);
    }
  }

  animationId = requestAnimationFrame(scrollAnimation);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      if (window.innerWidth <= 992) {
        leftCol.style.transform = 'none';
        rightCol.style.transform = 'none';

        document
          .querySelectorAll('.info-card-duplicate')
          .forEach((el) => el.remove());
      } else {
        createDuplicates();
        leftY = 0;
        rightY = 0;
        leftCol.style.transform = 'translateY(0px)';
        rightCol.style.transform = 'translateY(0px)';
        animationId = requestAnimationFrame(scrollAnimation);
      }
    }, 150);
  });
}

/* ================= ПРЕДЗАГРУЗКА ИЗОБРАЖЕНИЙ ================= */
function preloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    if (!img.complete) {
      const preloadImg = new Image();
      preloadImg.src = img.src;

      preloadImg.onload = function() {
        img.classList.add('loaded');
        img.style.opacity = '1';
        img.setAttribute('data-loaded', 'true');
      };

      preloadImg.onerror = function() {
        img.style.opacity = '0.3';
      };
    } else {
      img.classList.add('loaded');
      img.style.opacity = '1';
      img.setAttribute('data-loaded', 'true');
    }
  });
}

/* ================= ОБРАБОТЧИК ВОЗВРАЩЕНИЯ С РЕГИСТРАЦИИ ================= */
window.addEventListener('load', function() {
  if (window.location.hash === '#registration-success') {
    localStorage.setItem('userRegistered', 'true');
    updateUIAfterRegistration();
    history.replaceState(null, null, ' ');
  }
});

/* ================= ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ================= */
document.addEventListener('DOMContentLoaded', () => {
  // Инициализация базовых функций
  initPhoneMask();
  initCardTilt();
  initRegistrationRedirect();
  updateUIState();

  // Предзагрузка изображений
  preloadImages();

  // Инициализация бесконечной прокрутки после загрузки изображений
  function initializeScroll() {
    setTimeout(() => {
      initInfiniteWheel();
      setTimeout(initCardTilt, 100);
    }, 300);
  }

  const images = document.querySelectorAll('img');
  let loadedImages = 0;
  const totalImages = images.length;

  if (totalImages === 0) {
    initializeScroll();
  } else {
    images.forEach((img) => {
      if (img.complete) {
        loadedImages++;
        img.classList.add('loaded');
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', () => {
          loadedImages++;
          img.classList.add('loaded');
          img.style.opacity = '1';

          if (loadedImages === totalImages) {
            initializeScroll();
          }
        });

        img.addEventListener('error', () => {
          loadedImages++;
          if (loadedImages === totalImages) {
            initializeScroll();
          }
        });
      }
    });

    if (loadedImages === totalImages) {
      initializeScroll();
    }
  }

  // Обработчик FAB кнопки
  document.querySelector('.fab')?.addEventListener('click', () => {
    const isRegistered = localStorage.getItem('userRegistered') === 'true';
    if (!isRegistered) {
      alert('Для добавления пунктов необходимо зарегистрироваться');
      return;
    }

    const editorBox = document.querySelector('.editor-box');
    if (!editorBox) return;

    editorBox.scrollTop = editorBox.scrollHeight;

    const newItem = document.createElement('div');
    newItem.setAttribute('data-type', 'item');

    const checkboxId = 'item-' + Date.now();
    newItem.innerHTML = `
      <label class="checkbox-container">
        <input type="checkbox" id="${checkboxId}">
        <span class="checkbox-custom"></span>
      </label>
      <span class="item-text" contenteditable="true">Новый пункт</span>
    `;

    editorBox.appendChild(newItem);

    setTimeout(() => {
      const textSpan = newItem.querySelector('.item-text');
      textSpan.focus();

      const range = document.createRange();
      range.selectNodeContents(textSpan);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }, 10);
  });

  window.addEventListener('load', function() {
    setTimeout(() => {
      preloadImages();
      initInfiniteWheel();
    }, 500);
  });

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initInfiniteWheel();
      initCardTilt();
    }, 250);
  });
});

/* ================= jQuery READY ================= */
if (typeof $ !== 'undefined') {
  $(function() {
    initPhoneMask();
  });
}

/* ================= CSS СТИЛИ ДЛЯ КНОПКИ РЕГИСТРАЦИИ И РЕДАКТОРА ================= */
const style = document.createElement('style');
style.textContent = document.head.appendChild(style);

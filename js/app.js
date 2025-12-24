/* ================= МАСКА ТЕЛЕФОНА ================= */
function initPhoneMask() {
  if (typeof IMask === 'undefined' || typeof $ === 'undefined') return;
  $('input[type=tel]').each(function() {
    var element = this;
    var mask = IMask(element, {
      mask: [
        {
          mask: '+7 (000) 000-00-00',
          startsWith: '+7',
          country: 'Russia',
        },
        {
          mask: '+7 (000) 000-00-00',
          startsWith: '7',
          country: 'Russia',
        },
        {
          mask: '8 (000) 000-00-00',
          startsWith: '8',
          country: 'Russia',
        },
        {
          mask: '+7 (000) 000-00-00',
          startsWith: '',
          country: 'unknown',
        },
      ],
      dispatch: function dispatch(appended, dynamicMasked) {
        var number = (dynamicMasked.value + appended).replace(/\D/g, '');
        return dynamicMasked.compiledMasks.find(function(m) {
          return number.indexOf(m.startsWith) === 0;
        });
      },
    });
    $(element).on('blur', function() {
      var value = mask.unmaskedValue;
      var minLength = value.charAt(0) === '8' ? 11 : 10;
      if (value.length < minLength) mask.value = '';
    });
  });
}

/* ================= РЕДИРЕКТ НА РЕГИСТРАЦИЮ ================= */
function initRegistrationRedirect() {
  var registrationUrl = 'https://ixdk.github.io/my-auth-page/';

  // Обработчик для кнопки в guest-prompt
  var guestRedirectBtn = document.getElementById('show-register-form');
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
  var urlParams = new URLSearchParams(window.location.search);
  var registrationSuccess = urlParams.get('registration') === 'success';
  var isRegistered = localStorage.getItem('userRegistered') === 'true';
  if (registrationSuccess || isRegistered) {
    localStorage.setItem('userRegistered', 'true');
    updateUIAfterRegistration();
  }
}

/* ================= ОБНОВЛЕНИЕ UI ПОСЛЕ РЕГИСТРАЦИИ ================= */
function updateUIAfterRegistration() {
  // Скрываем guest prompt
  var guestPrompt = document.getElementById('guest-prompt');
  if (guestPrompt) {
    guestPrompt.style.display = 'none';
    guestPrompt.classList.add('hidden');
  }

  // Делаем редактор доступным для редактирования
  var editorWrap = document.querySelector('.editor-wrap');
  var editorBox = document.querySelector('.editor-box');
  if (editorWrap) {
    editorWrap.style.display = 'flex';
    editorWrap.classList.add('editor-wrap--visible');
  }
  if (editorBox) {
    editorBox.setAttribute('contenteditable', 'true');
    editorBox.classList.add('editor-box--editable');

    // Убираем кнопку регистрации в конце редактора
    var registerBtn = editorBox.querySelector('#register-btn-bottom');
    if (registerBtn) registerBtn.remove();

    // Инициализируем редактор
    initEditor();
  }

  // Показываем FAB кнопку
  var fab = document.querySelector('.fab');
  if (fab) {
    fab.classList.add('fab--visible', 'fab--active');
  }

  // Обновляем заголовок
  var userName = localStorage.getItem('userName') || 'Мой список';
  var logo = document.querySelector('.header .logo');
  if (logo) {
    logo.textContent = userName;
  }
}

/* ================= УПРАВЛЕНИЕ СОСТОЯНИЕМ UI ================= */
function updateUIState() {
  var guestPrompt = document.getElementById('guest-prompt');
  var editorWrap = document.querySelector('.editor-wrap');
  var editorBox = document.querySelector('.editor-box');
  var fab = document.querySelector('.fab');
  var isRegistered = localStorage.getItem('userRegistered') === 'true';

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
      var registerBtn = editorBox.querySelector('#register-btn-bottom');
      if (registerBtn) registerBtn.remove();

      // Инициализируем редактор
      setTimeout(function() {
        return initEditor();
      }, 100);
    }

    // Показываем FAB кнопку
    if (fab) {
      fab.classList.add('fab--visible', 'fab--active');
    }

    // Обновляем заголовок
    var userName = localStorage.getItem('userName') || 'Новогодний список';
    var logo = document.querySelector('.header .logo');
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
  var _document$getElementB;
  var editorBox = document.querySelector('.editor-box');
  if (!editorBox) return;

  // Удаляем старую кнопку если есть
  var oldBtn = editorBox.querySelector('#register-btn-bottom');
  if (oldBtn) oldBtn.remove();

  // Создаем новую кнопку
  var registerBtn = document.createElement('div');
  registerBtn.id = 'register-btn-bottom';
  registerBtn.className = 'register-btn-bottom';
  registerBtn.innerHTML =
    '\n    <div class="register-btn-content">\n      <p>\uD83D\uDCDD \u0414\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C</p>\n      <button class="btn btn-primary" id="register-from-editor-bottom">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n    </div>\n  ';
  editorBox.appendChild(registerBtn);

  // Обработчик для новой кнопки
  (_document$getElementB = document.getElementById(
    'register-from-editor-bottom',
  )) === null ||
    _document$getElementB === void 0 ||
    _document$getElementB.addEventListener('click', function(e) {
      e.preventDefault();
      var registrationUrl = 'https://ваш-сайт-регистрации.com/register';
      window.open(registrationUrl, '_blank');
    });
}

/* ================= ДЕФОЛТНЫЙ КОНТЕНТ РЕДАКТОРА ================= */
function getDefaultEditorContent() {
  return '\n<div data-type="category">\uD83E\uDD57 \u0421\u0410\u041B\u0410\u0422\u042B</div>\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u041E\u043B\u0438\u0432\u044C\u0435 (~800 \u0433)</span>\n</div>\n<div class="auto-bullet">\u2022 \u041A\u0430\u0440\u0442\u043E\u0444\u0435\u043B\u044C</div>\n<div class="auto-bullet">\u2022 \u041C\u043E\u0440\u043A\u043E\u0432\u044C</div>\n<div class="auto-bullet">\u2022 \u042F\u0439\u0446\u0430</div>\n<div class="auto-bullet">\u2022 \u041A\u043E\u043B\u0431\u0430\u0441\u0430 \u0434\u043E\u043A\u0442\u043E\u0440\u0441\u043A\u0430\u044F</div>\n<div class="auto-bullet">\u2022 \u0417\u0435\u043B\u0451\u043D\u044B\u0439 \u0433\u043E\u0440\u043E\u0448\u0435\u043A</div>\n<div class="auto-bullet">\u2022 \u041E\u0433\u0443\u0440\u0446\u044B \u043C\u0430\u0440\u0438\u043D\u043E\u0432\u0430\u043D\u043D\u044B\u0435</div>\n<div class="auto-bullet">\u2022 \u041C\u0430\u0439\u043E\u043D\u0435\u0437</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u041A\u0440\u0430\u0431\u043E\u0432\u044B\u0439 \u0441\u0430\u043B\u0430\u0442 (~700 \u0433)</span>\n</div>\n<div class="auto-bullet">\u2022 \u041A\u0440\u0430\u0431\u043E\u0432\u044B\u0435 \u043F\u0430\u043B\u043E\u0447\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u042F\u0439\u0446\u0430</div>\n<div class="auto-bullet">\u2022 \u041A\u0443\u043A\u0443\u0440\u0443\u0437\u0430</div>\n<div class="auto-bullet">\u2022 \u0421\u0432\u0435\u0436\u0438\u0439 \u043E\u0433\u0443\u0440\u0435\u0446</div>\n<div class="auto-bullet">\u2022 \u041C\u0430\u0439\u043E\u043D\u0435\u0437</div>\n\n<div data-type="category">\uD83C\uDF57 \u0413\u041E\u0420\u042F\u0427\u0415\u0415</div>\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\uD83E\uDD86 \u0417\u0430\u043F\u0435\u0447\u0451\u043D\u043D\u0430\u044F \u0443\u0442\u043A\u0430 (1 \u0448\u0442 ~5 \u043A\u0433)</span>\n</div>\n<div class="auto-bullet">\u2022 \u0423\u0442\u043A\u0430</div>\n<div class="auto-bullet">\u2022 \u042F\u0431\u043B\u043E\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u0427\u0435\u0441\u043D\u043E\u043A</div>\n<div class="auto-bullet">\u2022 \u041C\u0451\u0434</div>\n<div class="auto-bullet">\u2022 \u0421\u043E\u0435\u0432\u044B\u0439 \u0441\u043E\u0443\u0441</div>\n<div class="auto-bullet">\u2022 \u0420\u043E\u0437\u043C\u0430\u0440\u0438\u043D</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\uD83C\uDF62 \u0428\u0430\u0448\u043B\u044B\u043A (2\u20133 \u043A\u0433)</span>\n</div>\n<div class="auto-bullet">\u2022 \u041A\u0443\u0440\u0438\u0446\u0430</div>\n<div class="auto-bullet">\u2022 \u041B\u0443\u043A</div>\n<div class="auto-bullet">\u2022 \u0427\u0435\u0441\u043D\u043E\u043A</div>\n<div class="auto-bullet">\u2022 \u0421\u043E\u0443\u0441\u044B \u0434\u043B\u044F \u043C\u044F\u0441\u0430 (2 \u0432\u0438\u0434\u0430)</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\uD83E\uDD54 \u041A\u0430\u0440\u0442\u043E\u0444\u0435\u043B\u044C (\u0437\u0430\u043F\u0435\u0447\u0451\u043D\u043D\u044B\u0439 / \u043D\u0430 \u0443\u0433\u043B\u044F\u0445)</span>\n</div>\n<div class="auto-bullet">\u2022 \u041A\u0430\u0440\u0442\u043E\u0444\u0435\u043B\u044C</div>\n<div class="auto-bullet">\u2022 \u0420\u043E\u0437\u043C\u0430\u0440\u0438\u043D</div>\n<div class="auto-bullet">\u2022 \u0427\u0435\u0441\u043D\u043E\u043A</div>\n\n<div data-type="category">\uD83E\uDDC0 \u041D\u0410\u0420\u0415\u0417\u041A\u0418</div>\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u0421\u044B\u0440\u043D\u0430\u044F \u0442\u0430\u0440\u0435\u043B\u043A\u0430</span>\n</div>\n<div class="auto-bullet">\u2022 \u0421\u044B\u0440 (3 \u0432\u0438\u0434\u0430)</div>\n<div class="auto-bullet">\u2022 \u0411\u0435\u043B\u044B\u0439 \u0441\u044B\u0440</div>\n<div class="auto-bullet">\u2022 \u0412\u0438\u043D\u043E\u0433\u0440\u0430\u0434</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u041C\u044F\u0441\u043D\u0430\u044F \u0442\u0430\u0440\u0435\u043B\u043A\u0430</span>\n</div>\n<div class="auto-bullet">\u2022 \u041A\u043E\u043B\u0431\u0430\u0441\u0430 (3 \u0432\u0438\u0434\u0430)</div>\n<div class="auto-bullet">\u2022 \u0414\u043E\u043A\u0442\u043E\u0440\u0441\u043A\u0430\u044F \u043A\u043E\u043B\u0431\u0430\u0441\u0430</div>\n<div class="auto-bullet">\u2022 \u0412\u0438\u043D\u043E\u0433\u0440\u0430\u0434</div>\n\n<div data-type="category">\uD83E\uDD6A \u0417\u0410\u041A\u0423\u0421\u041A\u0418 / \u041A\u0410\u041D\u0410\u041F\u0415</div>\n<div>(\u0431\u0435\u0437 \u0442\u0430\u0440\u0442\u0430\u043B\u0435\u0442\u043E\u043A, \u0432\u0441\u0451 \u043D\u0430 \u0431\u0430\u0433\u0435\u0442\u0435)</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u041A\u0430\u043D\u0430\u043F\u0435 \u0441 \u043B\u043E\u0441\u043E\u0441\u0435\u043C</span>\n</div>\n<div class="auto-bullet">\u2022 \u0411\u0430\u0433\u0435\u0442</div>\n<div class="auto-bullet">\u2022 \u0422\u0432\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u044B\u0440 / \u0424\u0438\u043B\u0430\u0434\u0435\u043B\u044C\u0444\u0438\u044F</div>\n<div class="auto-bullet">\u2022 \u041B\u043E\u0441\u043E\u0441\u044C</div>\n<div class="auto-bullet">\u2022 \u041E\u0433\u0443\u0440\u0435\u0446</div>\n<div class="auto-bullet">\u2022 \u041C\u0438\u043A\u0440\u043E\u0437\u0435\u043B\u0435\u043D\u044C</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u041A\u0430\u043D\u0430\u043F\u0435 \u0441 \u0441\u044B\u0440\u043E\u043C \u0438 \u043A\u043E\u043B\u0431\u0430\u0441\u043E\u0439</span>\n</div>\n<div class="auto-bullet">\u2022 \u0411\u0430\u0433\u0435\u0442</div>\n<div class="auto-bullet">\u2022 \u0421\u044B\u0440 \u0434\u043B\u044F \u043A\u0430\u043D\u0430\u043F\u0435</div>\n<div class="auto-bullet">\u2022 \u041A\u043E\u043B\u0431\u0430\u0441\u0430</div>\n<div class="auto-bullet">\u2022 \u041E\u043B\u0438\u0432\u043A\u0438</div>\n\n<div data-type="item">\n  <label class="checkbox-container">\n    <input type="checkbox">\n    <span class="checkbox-custom"></span>\n  </label>\n  <span class="item-text">\u041A\u0430\u043D\u0430\u043F\u0435 \u0441 \u043A\u0440\u0435\u0432\u0435\u0442\u043A\u0430\u043C\u0438 (\u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E)</span>\n</div>\n<div class="auto-bullet">\u2022 \u0411\u0430\u0433\u0435\u0442</div>\n<div class="auto-bullet">\u2022 \u0422\u0432\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u044B\u0440</div>\n<div class="auto-bullet">\u2022 \u041A\u0440\u0435\u0432\u0435\u0442\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u0427\u0435\u0441\u043D\u043E\u043A</div>\n<div class="auto-bullet">\u2022 \u041C\u0438\u043A\u0440\u043E\u0437\u0435\u043B\u0435\u043D\u044C</div>\n\n<div data-type="category">\uD83E\uDD52 \u041E\u0412\u041E\u0429\u0418</div>\n<div class="auto-bullet">\u2022 \u041E\u0433\u0443\u0440\u0446\u044B \u0441\u0432\u0435\u0436\u0438\u0435</div>\n<div class="auto-bullet">\u2022 \u041F\u043E\u043C\u0438\u0434\u043E\u0440\u044B</div>\n<div class="auto-bullet">\u2022 \u041F\u0435\u0440\u0435\u0446</div>\n<div class="auto-bullet">\u2022 \u041C\u043E\u0440\u043A\u043E\u0432\u044C</div>\n<div class="auto-bullet">\u2022 \u041A\u0432\u0430\u0448\u0435\u043D\u0430\u044F \u043A\u0430\u043F\u0443\u0441\u0442\u0430</div>\n\n<div data-type="category">\uD83C\uDF4E \u0424\u0420\u0423\u041A\u0422\u042B</div>\n<div class="auto-bullet">\u2022 \u042F\u0431\u043B\u043E\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u0412\u0438\u043D\u043E\u0433\u0440\u0430\u0434</div>\n\n<div data-type="category">\uD83C\uDF5E \u0425\u041B\u0415\u0411</div>\n<div class="auto-bullet">\u2022 \u0425\u043B\u0435\u0431</div>\n<div class="auto-bullet">\u2022 \u0411\u0430\u0433\u0435\u0442\u044B</div>\n\n<div data-type="category">\uD83C\uDF7E \u041D\u0410\u041F\u0418\u0422\u041A\u0418</div>\n<div class="auto-bullet">\u2022 \u0412\u0438\u043D\u043E \u2014 2 \u0431\u0443\u0442\u044B\u043B\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u0412\u0438\u0441\u043A\u0438 Jack Daniel\'s \u2014 2 \u0431\u0443\u0442\u044B\u043B\u043A\u0438</div>\n<div class="auto-bullet">\u2022 J\xE4germeister (\u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E)</div>\n<div class="auto-bullet">\u2022 \u041F\u0438\u0432\u043E Heineken</div>\n<div class="auto-bullet">\u2022 \u0421\u043E\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u041A\u043E\u043B\u0430</div>\n\n<div data-type="category">\uD83E\uDDFE \u041F\u0420\u041E\u0427\u0415\u0415</div>\n<div class="auto-bullet">\u2022 \u0423\u0433\u043E\u043B\u044C</div>\n<div class="auto-bullet">\u2022 \u0428\u0430\u043C\u043F\u0443\u0440\u044B / \u043F\u0430\u043B\u043E\u0447\u043A\u0438 \u0434\u043B\u044F \u043A\u0430\u043D\u0430\u043F\u0435</div>\n<div class="auto-bullet">\u2022 \u0422\u0430\u0440\u0435\u043B\u043A\u0438</div>\n<div class="auto-bullet">\u2022 \u0421\u0442\u0430\u043A\u0430\u043D\u044B</div>\n<div class="auto-bullet">\u2022 \u0421\u0430\u043B\u0444\u0435\u0442\u043A\u0438</div>\n\n<div data-type="category">\u041F\u0420\u041E\u0414\u0423\u041A\u0422\u042B</div>\n<div class="auto-bullet">\u0421\u043E\u043A\u0438 \u2014 5 \u0448\u0442 \u2014 12,50 \u20AC</div>\n<div class="auto-bullet">\u041A\u043E\u043B\u0430 \u2014 2 \u0448\u0442 \u2014 3,00 \u20AC</div>\n<div class="auto-bullet">\u041F\u0438\u0432\u043E Heineken 0,33 \u2014 24 \u0431\u0443\u0442\u044B\u043B\u043A\u0438 \u2014 24,00 \u20AC</div>\n<div class="auto-bullet">\u041A\u0430\u0440\u0442\u043E\u0444\u0435\u043B\u044C \u2014 3 \u043A\u0433 \u2014 3,00 \u20AC</div>\n<div class="auto-bullet">\u041A\u0430\u0440\u0442\u043E\u0444\u0435\u043B\u044C \u2014 5 \u043A\u0433 \u2014 2,00 \u20AC</div>\n<div class="auto-bullet">\u0412\u0438\u043D\u043E\u0433\u0440\u0430\u0434 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 4,00 \u20AC</div>\n<div class="auto-bullet">\u0420\u043E\u0437\u043C\u0430\u0440\u0438\u043D \u2014 1 \u0443\u043F \u2014 1,00 \u20AC</div>\n<div class="auto-bullet">\u041C\u043E\u0440\u043A\u043E\u0432\u044C \u2014 1 \u043A\u0433 \u2014 1,00 \u20AC</div>\n<div class="auto-bullet">\u042F\u0439\u0446\u0430 \u2014 1 \u0443\u043F \u2014 2,00 \u20AC</div>\n<div class="auto-bullet">\u0417\u0435\u043B\u0451\u043D\u044B\u0439 \u0433\u043E\u0440\u043E\u0445 \u2014 1 \u0431\u0430\u043D\u043A\u0430 \u2014 2,00 \u20AC</div>\n<div class="auto-bullet">\u041E\u0433\u0443\u0440\u0435\u0446 \u0441\u0432\u0435\u0436\u0438\u0439 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 3,00 \u20AC</div>\n<div class="auto-bullet">\u041C\u0430\u0439\u043E\u043D\u0435\u0437 \u2014 1 \u0443\u043F \u2014 4,00 \u20AC</div>\n<div class="auto-bullet">\u041F\u043E\u043C\u0438\u0434\u043E\u0440\u044B \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 2,50 \u20AC</div>\n<div class="auto-bullet">\u041A\u0443\u043A\u0443\u0440\u0443\u0437\u0430 \u2014 1 \u0431\u0430\u043D\u043A\u0430 \u2014 2,50 \u20AC</div>\n<div class="auto-bullet">\u0427\u0435\u0441\u043D\u043E\u043A \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 1,29 \u20AC</div>\n<div class="auto-bullet">\u042F\u0431\u043B\u043E\u043A\u0438 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 2,50 \u20AC</div>\n<div class="auto-bullet">\u041B\u0443\u043A \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 1,50 \u20AC</div>\n<div class="auto-bullet">\u041C\u0438\u043A\u0440\u043E\u0437\u0435\u043B\u0435\u043D\u044C \u2014 1 \u0443\u043F \u2014 1,00 \u20AC</div>\n<div class="auto-bullet">\u041F\u0435\u0440\u0435\u0446 \u0441\u043B\u0430\u0434\u043A\u0438\u0439 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 1,20 \u20AC</div>\n<div class="auto-bullet">\u041E\u0433\u0443\u0440\u0446\u044B \u043C\u0430\u0440\u0438\u043D\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u2014 1 \u0431\u0430\u043D\u043A\u0430 \u2014 2,80 \u20AC</div>\n<div class="auto-bullet">\u0425\u043B\u0435\u0431 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 1,50 \u20AC</div>\n<div class="auto-bullet">\u0412\u0438\u043D\u043E \u2014 2 \u0431\u0443\u0442\u044B\u043B\u043A\u0438 \u2014 10,00 \u20AC</div>\n<div class="auto-bullet">\u041C\u0451\u0434 \u2014 1 \u0443\u043F \u2014 2,50 \u20AC</div>\n<div class="auto-bullet">\u0412\u0438\u0441\u043A\u0438 Jack Daniel\'s \u2014 2 \u0431\u0443\u0442\u044B\u043B\u043A\u0438 \u2014 40,00 \u20AC</div>\n<div class="auto-bullet">J\xE4germeister (\u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E) \u2014 1 \u0431\u0443\u0442\u044B\u043B\u043A\u0430 \u2014 14,49 \u20AC</div>\n<div class="auto-bullet">\u0421\u043E\u0435\u0432\u044B\u0439 \u0441\u043E\u0443\u0441 \u2014 1 \u0431\u0443\u0442\u044B\u043B\u043A\u0430 \u2014 2,59 \u20AC</div>\n<div class="auto-bullet">\u0421\u044B\u0440 (3 \u0432\u0438\u0434\u0430) \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 9,00 \u20AC</div>\n<div class="auto-bullet">\u0421\u044B\u0440 \u0434\u043B\u044F \u043A\u0430\u043D\u0430\u043F\u0435 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 2,69 \u20AC</div>\n<div class="auto-bullet">\u0411\u0435\u043B\u044B\u0439 \u0441\u044B\u0440 \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 3,49 \u20AC</div>\n<div class="auto-bullet">\u0422\u0432\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u044B\u0440 (\u0424\u0438\u043B\u0430\u0434\u0435\u043B\u044C\u0444\u0438\u044F) \u2014 \u0431\u0435\u0437 \u0432\u0435\u0441\u0430 \u2014 3,69 \u20AC</div>\n<div class="auto-bullet">\u0421\u043E\u0443\u0441\u044B \u0434\u043B\u044F \u043C\u044F\u0441\u0430 \u2014 2 \u0448\u0442 \u2014 4,00 \u20AC</div>\n<div class="auto-bullet">\u041B\u043E\u0441\u043E\u0441\u044C \u043D\u0430\u0440\u0435\u0437\u0430\u043D\u043D\u044B\u0439 \u2014 2 \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0438 \u2014 8,00 \u20AC</div>\n<div class="auto-bullet">\u0423\u0442\u043A\u0430 \u2014 1 \u0448\u0442 ~5 \u043A\u0433 \u2014 46,00 \u20AC</div>\n<div class="auto-bullet">\u041A\u0443\u0440\u0438\u0446\u0430 (\u043D\u0430 \u0448\u0430\u0448\u043B\u044B\u043A) \u2014 2\u20133 \u043A\u0433 \u2014 18,00 \u20AC</div>\n<div class="auto-bullet">\u041A\u043E\u043B\u0431\u0430\u0441\u0430 \u0434\u043E\u043A\u0442\u043E\u0440\u0441\u043A\u0430\u044F \u2014 1 \u0448\u0442 \u2014 3,69 \u20AC</div>\n<div class="auto-bullet">\u041A\u043E\u043B\u0431\u0430\u0441\u0430 \u2014 3 \u0448\u0442 \u2014 6,50 \u20AC</div>\n<div class="auto-bullet">\u041A\u0440\u0435\u0432\u0435\u0442\u043A\u0438 (\u0434\u043B\u044F \u043A\u0430\u043D\u0430\u043F\u0435, \u043F\u043E \u0436\u0435\u043B\u0430\u043D\u0438\u044E) \u2014 450 g \u2014 10,00 \u20AC</div>\n<div class="auto-bullet">\u041A\u0440\u0430\u0431\u043E\u0432\u044B\u0435 \u043F\u0430\u043B\u043E\u0447\u043A\u0438 \u2014 400 g \u2014 5,20 \u20AC</div>\n<div class="auto-bullet">\u041A\u0432\u0430\u0448\u0435\u043D\u0430\u044F \u043A\u0430\u043F\u0443\u0441\u0442\u0430 (\u043D\u0430 \u0432\u044B\u0431\u043E\u0440) \u2014 1 \u0443\u043F \u2014 2,49 \u20AC</div>\n<div class="auto-bullet">\u0411\u0430\u0433\u0435\u0442 \u0434\u043B\u044F \u0431\u0443\u0442\u0435\u0440\u0431\u0440\u043E\u0434\u043E\u0432 \u0441 \u043B\u043E\u0441\u043E\u0441\u0435\u043C \u2014 1 \u0448\u0442 \u2014 2,00 \u20AC</div>\n<div class="auto-bullet">\u041E\u043B\u0438\u0432\u043A\u0438 \u2014 1 \u0431\u0430\u043D\u043A\u0430 \u2014 2,00 \u20AC</div>\n<div class="auto-bullet">\u0421\u0442\u0430\u043A\u0430\u043D\u044B \u2014 1 \u0443\u043F \u2014 3,00 \u20AC</div>\n<div class="auto-bullet">\u0421\u0430\u043B\u0444\u0435\u0442\u043A\u0438 \u2014 1 \u0443\u043F \u2014 0,75 \u20AC</div>\n<div class="auto-bullet">\u0422\u0430\u0440\u0435\u043B\u043A\u0438 \u2014 12 \u0448\u0442 \u2014 3,79 \u20AC</div>\n<div class="auto-bullet">\u041F\u0430\u043B\u043E\u0447\u043A\u0438 \u0434\u043B\u044F \u043A\u0430\u043D\u0430\u043F\u0435 \u2014 1 \u0443\u043F \u2014 4,00 \u20AC</div>\n<div class="auto-bullet">\u0423\u0433\u043E\u043B\u044C / \u0440\u043E\u0437\u0436\u0438\u0433 \u2014 8,00 \u20AC</div>\n\n<div data-type="category">\u0418\u0422\u041E\u0413\u041E \u041F\u041E \u0421\u0423\u041C\u041C\u0415</div>\n<div>\u041E\u0431\u0449\u0430\u044F \u0441\u0443\u043C\u043C\u0430:</div>\n<div>249,70 \u20AC</div>\n\n<div data-type="category">\u0421\u041A\u0418\u0414\u042B\u0412\u0410\u0415\u041C\u0421\u042F \u041D\u0410 8 \u0427\u0415\u041B\u041E\u0412\u0415\u041A</div>\n<div>249,70 \u20AC \xF7 8 =</div>\n<div>31,21 \u20AC \u0441 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430</div>\n<div>(\u043C\u043E\u0436\u043D\u043E \u043E\u043A\u0440\u0443\u0433\u043B\u0438\u0442\u044C \u0434\u043E 31,50 \u20AC, \u0447\u0442\u043E\u0431\u044B \u0431\u0435\u0437 \u043A\u043E\u043F\u0435\u0435\u043A)</div>';
}

/* ================= ИНИЦИАЛИЗАЦИЯ РЕДАКТОРА ================= */
function initEditor() {
  var editorBox = document.querySelector('.editor-box');
  if (!editorBox) return;

  // Проверяем, что пользователь зарегистрирован
  var isRegistered = localStorage.getItem('userRegistered') === 'true';
  if (!isRegistered) {
    editorBox.setAttribute('contenteditable', 'false');
    editorBox.classList.remove('editor-box--editable');
    return;
  }

  // Делаем редактор редактируемым
  editorBox.setAttribute('contenteditable', 'true');
  editorBox.classList.add('editor-box--editable');

  // Убираем кнопку регистрации в конце редактора
  var registerBtn = editorBox.querySelector('#register-btn-bottom');
  if (registerBtn) registerBtn.remove();

  // Обработчик ввода для автоматических точек
  editorBox.addEventListener('input', function(e) {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var node = range.startContainer;
    if (
      e.inputType === 'insertParagraph' ||
      e.inputType === 'insertLineBreak'
    ) {
      setTimeout(function() {
        var currentLine = getCurrentLine();
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
  document.querySelectorAll('.editor-tool').forEach(function(tool) {
    tool.addEventListener('click', function() {
      var action = this.getAttribute('data-action');
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
    var isRegistered = localStorage.getItem('userRegistered') === 'true';
    if (!isRegistered) {
      alert('Для добавления пунктов необходимо зарегистрироваться');
      return;
    }
    var editorBox = document.querySelector('.editor-box');
    var newItem = document.createElement('div');
    newItem.setAttribute('data-type', 'item');
    var checkboxId = 'item-' + Date.now();
    newItem.innerHTML = '\n      <label class="checkbox-container">\n        <input type="checkbox" id="'.concat(
      checkboxId,
      '">\n        <span class="checkbox-custom"></span>\n      </label>\n      <span class="item-text" contenteditable="true">\u041D\u043E\u0432\u044B\u0439 \u043F\u0443\u043D\u043A\u0442</span>\n    ',
    );
    editorBox.appendChild(newItem);
    setTimeout(function() {
      var textSpan = newItem.querySelector('.item-text');
      textSpan.focus();
      var range = document.createRange();
      range.selectNodeContents(textSpan);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }, 10);
  }

  // Функция для очистки выполненных пунктов
  function clearDoneItems() {
    if (!confirm('Удалить все отмеченные пункты?')) return;
    var editorBox = document.querySelector('.editor-box');
    var doneItems = editorBox.querySelectorAll(
      '[data-type="item"] input:checked',
    );
    doneItems.forEach(function(checkbox) {
      var item = checkbox.closest('[data-type="item"]');
      if (item) {
        item.remove();
      }
    });
    saveEditorState();
  }

  // Функция для печати списка
  function printList() {
    var originalContent = document.querySelector('.editor-box').innerHTML;
    var printWindow = window.open('', '_blank');
    printWindow.document.write(
      '\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <title>\u041D\u043E\u0432\u043E\u0433\u043E\u0434\u043D\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A - \u041F\u0435\u0447\u0430\u0442\u044C</title>\n        <style>\n          body {\n            font-family: Arial, sans-serif;\n            padding: 20px;\n            max-width: 800px;\n            margin: 0 auto;\n          }\n          .print-header {\n            text-align: center;\n            margin-bottom: 30px;\n            border-bottom: 2px solid #c77a7a;\n            padding-bottom: 10px;\n          }\n          .print-header h1 {\n            color: #c77a7a;\n            margin: 0;\n          }\n          .category {\n            font-weight: bold;\n            color: #c77a7a;\n            margin-top: 25px;\n            margin-bottom: 10px;\n            font-size: 1.2em;\n          }\n          .item {\n            margin: 5px 0;\n            padding-left: 20px;\n            position: relative;\n          }\n          .item::before {\n            content: "\u2022";\n            position: absolute;\n            left: 0;\n            color: #c77a7a;\n          }\n          .item.checked {\n            text-decoration: line-through;\n            color: #888;\n          }\n          @media print {\n            body { padding: 0; }\n            .no-print { display: none; }\n          }\n        </style>\n      </head>\n      <body>\n        <div class="print-header">\n          <h1>\uD83C\uDF84 \u041D\u043E\u0432\u043E\u0433\u043E\u0434\u043D\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043A\u0443\u043F\u043E\u043A</h1>\n          <p>\u0414\u0430\u0442\u0430: '
        .concat(
          new Date().toLocaleDateString('ru-RU'),
          '</p>\n        </div>\n        <div id="print-content"></div>\n        <div class="no-print" style="margin-top: 30px; text-align: center;">\n          <button onclick="window.print()">\uD83D\uDDA8\uFE0F \u041F\u0435\u0447\u0430\u0442\u0430\u0442\u044C</button>\n          <button onclick="window.close()">\u2716\uFE0F \u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n        </div>\n        <script>\n          const content = `',
        )
        .concat(
          originalContent,
          "`;\n          const parser = new DOMParser();\n          const doc = parser.parseFromString(content, 'text/html');\n          const printContent = document.getElementById('print-content');\n          \n          let currentCategory = '';\n          let html = '';\n          \n          doc.body.childNodes.forEach(node => {\n            if (node.nodeType === 1) {\n              if (node.getAttribute('data-type') === 'category') {\n                currentCategory = node.textContent;\n                html += '<div class=\"category\">' + currentCategory + '</div>';\n              } else if (node.getAttribute('data-type') === 'item') {\n                const isChecked = node.querySelector('input')?.checked;\n                const text = node.querySelector('.item-text')?.textContent || node.textContent;\n                const className = isChecked ? 'item checked' : 'item';\n                html += '<div class=\"' + className + '\">' + text + '</div>';\n              } else if (node.textContent.trim()) {\n                html += '<div>' + node.textContent + '</div>';\n              }\n            }\n          });\n          \n          printContent.innerHTML = html;\n        </script>\n      </body>\n      </html>\n    ",
        ),
    );
    printWindow.document.close();
  }

  // Функция для получения текущей строки
  function getCurrentLine() {
    var selection = window.getSelection();
    if (!selection.rangeCount) return null;
    var range = selection.getRangeAt(0);
    var node = range.startContainer;
    while (node && node.nodeType === 3) {
      node = node.parentNode;
    }
    return node;
  }

  // Функция для сохранения состояния редактора
  function saveEditorState() {
    var editorBox = document.querySelector('.editor-box');
    if (!editorBox) return;
    localStorage.setItem('editorContent', editorBox.innerHTML);
    var checkboxes = editorBox.querySelectorAll('input[type="checkbox"]');
    var checkboxStates = {};
    checkboxes.forEach(function(checkbox, index) {
      checkboxStates[index] = checkbox.checked;
    });
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
  }

  // Функция для загрузки состояния редактора
  function loadEditorState() {
    var editorBox = document.querySelector('.editor-box');
    if (!editorBox) return;
    var savedContent = localStorage.getItem('editorContent');
    var savedStates = localStorage.getItem('checkboxStates');
    if (savedContent) {
      editorBox.innerHTML = savedContent;
      if (savedStates) {
        var checkboxStates = JSON.parse(savedStates);
        var checkboxes = editorBox.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox, index) {
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
    var timeout;
    return function executedFunction() {
      for (
        var _len = arguments.length, args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        args[_key] = arguments[_key];
      }
      var later = function later() {
        clearTimeout(timeout);
        func.apply(void 0, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

/* ================= 3D TILT ЭФФЕКТ ================= */
function initCardTilt() {
  document.querySelectorAll('.info-card__tilt').forEach(function(tilt) {
    if (tilt.dataset.tiltInit) return;
    tilt.dataset.tiltInit = '1';
    if (tilt.querySelector('img')) {
      tilt.style.background = 'transparent';
    }
    tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    tilt.addEventListener('mousemove', function(e) {
      var rect = tilt.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var rx = (y / rect.height - 0.5) * -12;
      var ry = (x / rect.width - 0.5) * 12;
      tilt.style.transform = 'perspective(1000px) rotateX('
        .concat(rx, 'deg) rotateY(')
        .concat(ry, 'deg)');
      tilt.style.boxShadow = '0 20px 50px rgba(0,0,0,.18)';
    });
    tilt.addEventListener('mouseleave', function() {
      tilt.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      tilt.style.boxShadow = '';
    });
  });
}

/* ================= БЕСКОНЕЧНАЯ ПРОКРУТКА ================= */
function initInfiniteWheel() {
  var leftCol = document.querySelector('.left-column');
  var rightCol = document.querySelector('.right-column');
  if (!leftCol || !rightCol) return;
  if (window.innerWidth <= 992) {
    leftCol.style.transform = 'none';
    rightCol.style.transform = 'none';
    document.querySelectorAll('.info-card-duplicate').forEach(function(el) {
      return el.remove();
    });
    return;
  }
  var speed = 0.3;
  var leftY = 0;
  var rightY = 0;
  var animationId = null;
  function calculateItemHeight() {
    var firstItem = leftCol.querySelector('.info-card');
    if (!firstItem) return 424;
    var cardHeight = firstItem.offsetHeight;
    var gap = 24;
    return cardHeight + gap;
  }
  var itemHeight = calculateItemHeight();
  function createDuplicates() {
    document.querySelectorAll('.info-card-duplicate').forEach(function(el) {
      return el.remove();
    });
    var allLeftCards = Array.from(leftCol.querySelectorAll('.info-card'));
    var allRightCards = Array.from(rightCol.querySelectorAll('.info-card'));
    var originalLeftCards = allLeftCards.slice(
      0,
      Math.min(5, allLeftCards.length),
    );
    var originalRightCards = allRightCards.slice(
      0,
      Math.min(5, allRightCards.length),
    );
    for (var i = 5; i < allLeftCards.length; i++) {
      if (allLeftCards[i]) allLeftCards[i].remove();
    }
    for (var _i = 5; _i < allRightCards.length; _i++) {
      if (allRightCards[_i]) allRightCards[_i].remove();
    }
    originalLeftCards.forEach(function(card) {
      var clone = card.cloneNode(true);
      clone.classList.add('info-card-duplicate');
      clone.style.animation = 'none';
      clone.style.opacity = '1';
      var originalImg = card.querySelector('img');
      var clonedImg = clone.querySelector('img');
      if (originalImg && clonedImg) {
        clonedImg.src = originalImg.src;
        clonedImg.alt = originalImg.alt || '';
        clonedImg.style.cssText = originalImg.style.cssText;
        clonedImg.classList.add('loaded');
        clonedImg.style.opacity = '1';
      }
      leftCol.appendChild(clone);
    });
    originalRightCards.forEach(function(card) {
      var clone = card.cloneNode(true);
      clone.classList.add('info-card-duplicate');
      clone.style.animation = 'none';
      clone.style.opacity = '1';
      var originalImg = card.querySelector('img');
      var clonedImg = clone.querySelector('img');
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
      var firstChild = leftCol.firstElementChild;
      if (firstChild) {
        leftCol.appendChild(firstChild);
      }
      leftY += itemHeight;
    }
    if (Math.abs(rightY) >= itemHeight) {
      var _firstChild = rightCol.firstElementChild;
      if (_firstChild) {
        rightCol.appendChild(_firstChild);
      }
      rightY += itemHeight;
    }
    leftCol.style.transform = 'translateY('.concat(leftY, 'px)');
    rightCol.style.transform = 'translateY('.concat(rightY, 'px)');
    if (window.innerWidth > 992) {
      animationId = requestAnimationFrame(scrollAnimation);
    }
  }
  animationId = requestAnimationFrame(scrollAnimation);
  var resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      if (window.innerWidth <= 992) {
        leftCol.style.transform = 'none';
        rightCol.style.transform = 'none';
        document.querySelectorAll('.info-card-duplicate').forEach(function(el) {
          return el.remove();
        });
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
  var images = document.querySelectorAll('img');
  images.forEach(function(img) {
    if (!img.complete) {
      var preloadImg = new Image();
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
document.addEventListener('DOMContentLoaded', function() {
  var _document$querySelect;
  // Инициализация базовых функций
  initPhoneMask();
  initCardTilt();
  initRegistrationRedirect();
  updateUIState();

  // Предзагрузка изображений
  preloadImages();

  // Инициализация бесконечной прокрутки после загрузки изображений
  function initializeScroll() {
    setTimeout(function() {
      initInfiniteWheel();
      setTimeout(initCardTilt, 100);
    }, 300);
  }
  var images = document.querySelectorAll('img');
  var loadedImages = 0;
  var totalImages = images.length;
  if (totalImages === 0) {
    initializeScroll();
  } else {
    images.forEach(function(img) {
      if (img.complete) {
        loadedImages++;
        img.classList.add('loaded');
        img.style.opacity = '1';
      } else {
        img.addEventListener('load', function() {
          loadedImages++;
          img.classList.add('loaded');
          img.style.opacity = '1';
          if (loadedImages === totalImages) {
            initializeScroll();
          }
        });
        img.addEventListener('error', function() {
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
  (_document$querySelect = document.querySelector('.fab')) === null ||
    _document$querySelect === void 0 ||
    _document$querySelect.addEventListener('click', function() {
      var isRegistered = localStorage.getItem('userRegistered') === 'true';
      if (!isRegistered) {
        alert('Для добавления пунктов необходимо зарегистрироваться');
        return;
      }
      var editorBox = document.querySelector('.editor-box');
      if (!editorBox) return;
      editorBox.scrollTop = editorBox.scrollHeight;
      var newItem = document.createElement('div');
      newItem.setAttribute('data-type', 'item');
      var checkboxId = 'item-' + Date.now();
      newItem.innerHTML = '\n      <label class="checkbox-container">\n        <input type="checkbox" id="'.concat(
        checkboxId,
        '">\n        <span class="checkbox-custom"></span>\n      </label>\n      <span class="item-text" contenteditable="true">\u041D\u043E\u0432\u044B\u0439 \u043F\u0443\u043D\u043A\u0442</span>\n    ',
      );
      editorBox.appendChild(newItem);
      setTimeout(function() {
        var textSpan = newItem.querySelector('.item-text');
        textSpan.focus();
        var range = document.createRange();
        range.selectNodeContents(textSpan);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }, 10);
    });
  window.addEventListener('load', function() {
    setTimeout(function() {
      preloadImages();
      initInfiniteWheel();
    }, 500);
  });
  var resizeTimer;
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
var style = document.createElement('style');
style.textContent = document.head.appendChild(style);

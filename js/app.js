function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(o) {
            return typeof o;
          }
        : function(o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function _regeneratorRuntime() {
  'use strict';
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o =
      Object.defineProperty ||
      function(t, e, r) {
        t[e] = r.value;
      },
    i = 'function' == typeof Symbol ? Symbol : {},
    a = i.iterator || '@@iterator',
    c = i.asyncIterator || '@@asyncIterator',
    u = i.toStringTag || '@@toStringTag';
  function define(t, e, r) {
    return (
      Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      t[e]
    );
  }
  try {
    define({}, '');
  } catch (t) {
    define = function define(t, e, r) {
      return (t[e] = r);
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, '_invoke', { value: makeInvokeMethod(t, r, c) }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return { type: 'normal', arg: t.call(e, r) };
    } catch (t) {
      return { type: 'throw', arg: t };
    }
  }
  e.wrap = wrap;
  var h = 'suspendedStart',
    l = 'suspendedYield',
    f = 'executing',
    s = 'completed',
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function() {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = (GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(
    p,
  ));
  function defineIteratorMethods(t) {
    ['next', 'throw', 'return'].forEach(function(e) {
      define(t, e, function(t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ('throw' !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && 'object' == _typeof(h) && n.call(h, '__await')
          ? e.resolve(h.__await).then(
              function(t) {
                invoke('next', t, i, a);
              },
              function(t) {
                invoke('throw', t, i, a);
              },
            )
          : e.resolve(h).then(
              function(t) {
                (u.value = t), i(u);
              },
              function(t) {
                return invoke('throw', t, i, a);
              },
            );
      }
      a(c.arg);
    }
    var r;
    o(this, '_invoke', {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function(e, r) {
            invoke(t, n, e, r);
          });
        }
        return (r = r
          ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg)
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function(i, a) {
      if (o === f) throw new Error('Generator is already running');
      if (o === s) {
        if ('throw' === i) throw a;
        return { value: t, done: !0 };
      }
      for (n.method = i, n.arg = a; ; ) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ('next' === n.method) n.sent = n._sent = n.arg;
        else if ('throw' === n.method) {
          if (o === h) throw ((o = s), n.arg);
          n.dispatchException(n.arg);
        } else 'return' === n.method && n.abrupt('return', n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ('normal' === p.type) {
          if (((o = n.done ? s : l), p.arg === y)) continue;
          return { value: p.arg, done: n.done };
        }
        'throw' === p.type && ((o = s), (n.method = 'throw'), (n.arg = p.arg));
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t)
      return (
        (r.delegate = null),
        ('throw' === n &&
          e.iterator.return &&
          ((r.method = 'return'),
          (r.arg = t),
          maybeInvokeDelegate(e, r),
          'throw' === r.method)) ||
          ('return' !== n &&
            ((r.method = 'throw'),
            (r.arg = new TypeError(
              "The iterator does not provide a '" + n + "' method",
            )))),
        y
      );
    var i = tryCatch(o, e.iterator, r.arg);
    if ('throw' === i.type)
      return (r.method = 'throw'), (r.arg = i.arg), (r.delegate = null), y;
    var a = i.arg;
    return a
      ? a.done
        ? ((r[e.resultName] = a.value),
          (r.next = e.nextLoc),
          'return' !== r.method && ((r.method = 'next'), (r.arg = t)),
          (r.delegate = null),
          y)
        : a
      : ((r.method = 'throw'),
        (r.arg = new TypeError('iterator result is not an object')),
        (r.delegate = null),
        y);
  }
  function pushTryEntry(t) {
    var e = { tryLoc: t[0] };
    1 in t && (e.catchLoc = t[1]),
      2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
      this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    (e.type = 'normal'), delete e.arg, (t.completion = e);
  }
  function Context(t) {
    (this.tryEntries = [{ tryLoc: 'root' }]),
      t.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(e) {
    if (e || '' === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ('function' == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length; )
              if (n.call(e, o))
                return (next.value = e[o]), (next.done = !1), next;
            return (next.value = t), (next.done = !0), next;
          };
        return (i.next = i);
      }
    }
    throw new TypeError(_typeof(e) + ' is not iterable');
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    o(g, 'constructor', {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    o(GeneratorFunctionPrototype, 'constructor', {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, 'GeneratorFunction')),
    (e.isGeneratorFunction = function(t) {
      var e = 'function' == typeof t && t.constructor;
      return (
        !!e &&
        (e === GeneratorFunction ||
          'GeneratorFunction' === (e.displayName || e.name))
      );
    }),
    (e.mark = function(t) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(t, GeneratorFunctionPrototype)
          : ((t.__proto__ = GeneratorFunctionPrototype),
            define(t, u, 'GeneratorFunction')),
        (t.prototype = Object.create(g)),
        t
      );
    }),
    (e.awrap = function(t) {
      return { __await: t };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, c, function() {
      return this;
    }),
    (e.AsyncIterator = AsyncIterator),
    (e.async = function(t, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new AsyncIterator(wrap(t, r, n, o), i);
      return e.isGeneratorFunction(r)
        ? a
        : a.next().then(function(t) {
            return t.done ? t.value : a.next();
          });
    }),
    defineIteratorMethods(g),
    define(g, u, 'Generator'),
    define(g, a, function() {
      return this;
    }),
    define(g, 'toString', function() {
      return '[object Generator]';
    }),
    (e.keys = function(t) {
      var e = Object(t),
        r = [];
      for (var n in e) r.push(n);
      return (
        r.reverse(),
        function next() {
          for (; r.length; ) {
            var t = r.pop();
            if (t in e) return (next.value = t), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (e.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(e) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = t),
          (this.done = !1),
          (this.delegate = null),
          (this.method = 'next'),
          (this.arg = t),
          this.tryEntries.forEach(resetTryEntry),
          !e)
        )
          for (var r in this)
            't' === r.charAt(0) &&
              n.call(this, r) &&
              !isNaN(+r.slice(1)) &&
              (this[r] = t);
      },
      stop: function stop() {
        this.done = !0;
        var t = this.tryEntries[0].completion;
        if ('throw' === t.type) throw t.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(e) {
        if (this.done) throw e;
        var r = this;
        function handle(n, o) {
          return (
            (a.type = 'throw'),
            (a.arg = e),
            (r.next = n),
            o && ((r.method = 'next'), (r.arg = t)),
            !!o
          );
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var i = this.tryEntries[o],
            a = i.completion;
          if ('root' === i.tryLoc) return handle('end');
          if (i.tryLoc <= this.prev) {
            var c = n.call(i, 'catchLoc'),
              u = n.call(i, 'finallyLoc');
            if (c && u) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            } else if (c) {
              if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            } else {
              if (!u) throw new Error('try statement without catch or finally');
              if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(t, e) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var o = this.tryEntries[r];
          if (
            o.tryLoc <= this.prev &&
            n.call(o, 'finallyLoc') &&
            this.prev < o.finallyLoc
          ) {
            var i = o;
            break;
          }
        }
        i &&
          ('break' === t || 'continue' === t) &&
          i.tryLoc <= e &&
          e <= i.finallyLoc &&
          (i = null);
        var a = i ? i.completion : {};
        return (
          (a.type = t),
          (a.arg = e),
          i
            ? ((this.method = 'next'), (this.next = i.finallyLoc), y)
            : this.complete(a)
        );
      },
      complete: function complete(t, e) {
        if ('throw' === t.type) throw t.arg;
        return (
          'break' === t.type || 'continue' === t.type
            ? (this.next = t.arg)
            : 'return' === t.type
            ? ((this.rval = this.arg = t.arg),
              (this.method = 'return'),
              (this.next = 'end'))
            : 'normal' === t.type && e && (this.next = e),
          y
        );
      },
      finish: function finish(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.finallyLoc === t)
            return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
        }
      },
      catch: function _catch(t) {
        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
          var r = this.tryEntries[e];
          if (r.tryLoc === t) {
            var n = r.completion;
            if ('throw' === n.type) {
              var o = n.arg;
              resetTryEntry(r);
            }
            return o;
          }
        }
        throw new Error('illegal catch attempt');
      },
      delegateYield: function delegateYield(e, r, n) {
        return (
          (this.delegate = { iterator: values(e), resultName: r, nextLoc: n }),
          'next' === this.method && (this.arg = t),
          y
        );
      },
    }),
    e
  );
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this,
      args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  };
}
/* ================= СИНХРОНИЗАЦИЯ ЧЕРЕЗ JSONBIN.IO ================= */
// ВСТАВЬ СЮДА СВОИ КЛЮЧИ ИЗ JSONBIN.IO
var JSONBIN_API_KEY =
  '$2a$10$qPshXxnB1OT/D4pxL0ZJCuq/278SoRBUSx/vPRwju.BlafIcpckIO';
var JSONBIN_BIN_ID = '694d8f77ae596e708fb0b164';
var JSONBIN_URL = 'https://api.jsonbin.io/v3/b/694d8f77ae596e708fb0b164'.concat(
  JSONBIN_BIN_ID,
);
var syncInterval = null;
var lastServerHash = '';
var isSyncing = false;

// Функция обновления статуса синхронизации
function updateSyncStatus(text, isOnline) {
  var statusText = document.getElementById('status-text');
  if (statusText) {
    statusText.textContent = text;
    statusText.className = isOnline ? 'online' : 'offline';
  }
}

// Функция обновления времени последней синхронизации
function updateLastSync() {
  var now = new Date();
  var timeString = now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  var lastUpdate = document.getElementById('last-update');
  if (lastUpdate) {
    lastUpdate.textContent = timeString;
  }
}

// Генерация хеша содержимого для сравнения
function generateContentHash(content) {
  var hash = 0;
  for (var i = 0; i < content.length; i++) {
    var char = content.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Получение текущего состояния редактора
function getEditorState() {
  var editorBox = document.querySelector('.editor-box');
  if (!editorBox) return null;
  var html = editorBox.innerHTML;
  var checkboxes = {};
  editorBox
    .querySelectorAll('input[type="checkbox"]')
    .forEach(function(checkbox, index) {
      checkboxes[index] = checkbox.checked;
    });
  return {
    html: html,
    checkboxes: checkboxes,
    lastUpdated: Date.now(),
    user: localStorage.getItem('userName') || 'Гость',
  };
}

// Загрузка данных с сервера
function loadFromServer() {
  return _loadFromServer.apply(this, arguments);
} // Сохранение данных на сервер
function _loadFromServer() {
  _loadFromServer = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
      var response,
        data,
        editorBox,
        currentHash,
        serverHash,
        isEditorActive,
        isUserEditing,
        scrollTop,
        checkboxes;
      return _regeneratorRuntime().wrap(
        function _callee$(_context) {
          while (1)
            switch ((_context.prev = _context.next)) {
              case 0:
                if (!(localStorage.getItem('userRegistered') !== 'true')) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt('return', null);
              case 2:
                _context.prev = 2;
                console.log('Загрузка данных с JSONBin.io...');
                _context.next = 6;
                return fetch(JSONBIN_URL, {
                  headers: {
                    'X-Master-Key': JSONBIN_API_KEY,
                    'X-Bin-Meta': 'false',
                  },
                });
              case 6:
                response = _context.sent;
                if (response.ok) {
                  _context.next = 9;
                  break;
                }
                throw new Error('HTTP '.concat(response.status));
              case 9:
                _context.next = 11;
                return response.json();
              case 11:
                data = _context.sent;
                if (!(data.html && data.html !== '<div><br></div>')) {
                  _context.next = 35;
                  break;
                }
                editorBox = document.querySelector('.editor-box');
                if (editorBox) {
                  _context.next = 16;
                  break;
                }
                return _context.abrupt('return', false);
              case 16:
                // Проверяем, не совпадают ли данные с текущими
                currentHash = generateContentHash(editorBox.innerHTML);
                serverHash = generateContentHash(data.html);
                if (!(serverHash !== lastServerHash)) {
                  _context.next = 35;
                  break;
                }
                lastServerHash = serverHash;

                // Если редактор не в фокусе или пользователь не редактирует
                isEditorActive = editorBox.contains(document.activeElement);
                isUserEditing =
                  editorBox.getAttribute('data-editing') === 'true';
                if (!(!isEditorActive && !isUserEditing)) {
                  _context.next = 34;
                  break;
                }
                console.log('Обновляем редактор с серверными данными');

                // Сохраняем текущую позицию скролла
                scrollTop = editorBox.scrollTop;
                editorBox.innerHTML = data.html;

                // Восстанавливаем состояния чекбоксов
                if (data.checkboxes) {
                  checkboxes = editorBox.querySelectorAll(
                    'input[type="checkbox"]',
                  );
                  checkboxes.forEach(function(checkbox, index) {
                    if (data.checkboxes[index] !== undefined) {
                      checkbox.checked = data.checkboxes[index];
                    }
                  });
                }

                // Восстанавливаем позицию скролла
                editorBox.scrollTop = scrollTop;
                updateSyncStatus('Синхронизировано', true);
                updateLastSync();
                showNotification('Список обновлён', 'success');
                return _context.abrupt('return', true);
              case 34:
                console.log('Пользователь редактирует, пропускаем обновление');
              case 35:
                updateSyncStatus('Синхронизировано', true);
                updateLastSync();
                return _context.abrupt('return', false);
              case 40:
                _context.prev = 40;
                _context.t0 = _context['catch'](2);
                console.log('JSONBin.io недоступен:', _context.t0.message);
                updateSyncStatus('Только локально', false);
                return _context.abrupt('return', null);
              case 45:
              case 'end':
                return _context.stop();
            }
        },
        _callee,
        null,
        [[2, 40]],
      );
    }),
  );
  return _loadFromServer.apply(this, arguments);
}
function saveToServer() {
  return _saveToServer.apply(this, arguments);
} // Автоматическое сохранение с задержкой
function _saveToServer() {
  _saveToServer = _asyncToGenerator(
    /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
      var force,
        editorBox,
        state,
        response,
        result,
        _args2 = arguments;
      return _regeneratorRuntime().wrap(
        function _callee2$(_context2) {
          while (1)
            switch ((_context2.prev = _context2.next)) {
              case 0:
                force =
                  _args2.length > 0 && _args2[0] !== undefined
                    ? _args2[0]
                    : false;
                if (!(localStorage.getItem('userRegistered') !== 'true')) {
                  _context2.next = 3;
                  break;
                }
                return _context2.abrupt('return');
              case 3:
                if (!(isSyncing && !force)) {
                  _context2.next = 6;
                  break;
                }
                console.log('Синхронизация уже выполняется, пропускаем');
                return _context2.abrupt('return');
              case 6:
                isSyncing = true;
                editorBox = document.querySelector('.editor-box');
                if (editorBox) {
                  _context2.next = 11;
                  break;
                }
                isSyncing = false;
                return _context2.abrupt('return');
              case 11:
                state = getEditorState();
                if (state) {
                  _context2.next = 15;
                  break;
                }
                isSyncing = false;
                return _context2.abrupt('return');
              case 15:
                _context2.prev = 15;
                console.log('Сохранение на JSONBin.io...');
                _context2.next = 19;
                return fetch(JSONBIN_URL, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': JSONBIN_API_KEY,
                  },
                  body: JSON.stringify(state),
                });
              case 19:
                response = _context2.sent;
                if (!response.ok) {
                  _context2.next = 33;
                  break;
                }
                _context2.next = 23;
                return response.json();
              case 23:
                result = _context2.sent;
                lastServerHash = generateContentHash(state.html);
                updateSyncStatus('Сохранено в облаке', true);
                updateLastSync();

                // Также сохраняем локально как backup
                localStorage.setItem('editorContent', state.html);
                localStorage.setItem(
                  'checkboxStates',
                  JSON.stringify(state.checkboxes),
                );
                console.log('Сохранено успешно');
                if (force) {
                  showNotification('Сохранено в облаке', 'success');
                }
                _context2.next = 34;
                break;
              case 33:
                throw new Error('HTTP '.concat(response.status));
              case 34:
                _context2.next = 43;
                break;
              case 36:
                _context2.prev = 36;
                _context2.t0 = _context2['catch'](15);
                console.error('Ошибка сохранения:', _context2.t0);

                // При ошибке сохраняем только локально
                localStorage.setItem('editorContent', state.html);
                localStorage.setItem(
                  'checkboxStates',
                  JSON.stringify(state.checkboxes),
                );
                updateSyncStatus('Только локально', false);
                if (force) {
                  showNotification('Ошибка синхронизации', 'error');
                }
              case 43:
                _context2.prev = 43;
                isSyncing = false;
                return _context2.finish(43);
              case 46:
              case 'end':
                return _context2.stop();
            }
        },
        _callee2,
        null,
        [[15, 36, 43, 46]],
      );
    }),
  );
  return _saveToServer.apply(this, arguments);
}
var saveTimeout = null;
function autoSave() {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  saveTimeout = setTimeout(function() {
    saveToServer();
  }, 2000);
}

// Запуск автоматической синхронизации
function startAutoSync() {
  // Останавливаем предыдущий интервал если есть
  if (syncInterval) {
    clearInterval(syncInterval);
  }

  // Загружаем с сервера сразу при старте
  setTimeout(function() {
    loadFromServer().then(function(success) {
      if (success === null) {
        // Сервер недоступен, загружаем из localStorage
        loadEditorState();
      }
    });
  }, 1000);

  // Периодическая синхронизация каждые 20 секунд
  syncInterval = setInterval(function() {
    loadFromServer();
  }, 20000);

  // Настройка отслеживания изменений в редакторе
  var editorBox = document.querySelector('.editor-box');
  if (editorBox) {
    // Помечаем что пользователь начал редактирование
    editorBox.addEventListener('focus', function() {
      editorBox.setAttribute('data-editing', 'true');
    });

    // Помечаем что пользователь закончил редактирование
    editorBox.addEventListener('blur', function() {
      setTimeout(function() {
        editorBox.setAttribute('data-editing', 'false');
      }, 1000);
    });

    // Отслеживание изменений с автосохранением
    editorBox.addEventListener('input', function() {
      autoSave();
    });

    // Сохраняем при изменении чекбоксов
    editorBox.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox') {
        autoSave();
      }
    });
  }

  // Сохраняем при закрытии страницы
  window.addEventListener('beforeunload', function() {
    saveToServer(true);
  });
}

// Остановка синхронизации
function stopAutoSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
}

// Ручная синхронизация
function manualSync() {
  var syncButton = document.querySelector('[data-action="sync-now"]');
  if (syncButton) {
    syncButton.classList.add('syncing');
    syncButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  }
  Promise.all([loadFromServer(), saveToServer(true)])
    .then(function() {
      showNotification('Синхронизация завершена', 'success');
    })
    .catch(function() {
      showNotification('Ошибка синхронизации', 'error');
    })
    .finally(function() {
      if (syncButton) {
        syncButton.classList.remove('syncing');
        syncButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
      }
    });
}

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
  var registrationUrl = 'https://my-auth-page-crwj.vercel.app/';
  var guestRedirectBtn = document.getElementById('show-register-form');
  if (guestRedirectBtn) {
    guestRedirectBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.open(registrationUrl, '_blank');
    });
  }
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
  var guestPrompt = document.getElementById('guest-prompt');
  if (guestPrompt) {
    guestPrompt.style.display = 'none';
    guestPrompt.classList.add('hidden');
    guestPrompt.remove();
  }
  var editorWrap = document.querySelector('.editor-wrap');
  var editorBox = document.querySelector('.editor-box');
  if (editorWrap) {
    editorWrap.style.display = 'flex';
    editorWrap.classList.add('editor-wrap--visible');
  }
  if (editorBox) {
    editorBox.setAttribute('contenteditable', 'true');
    editorBox.classList.add('editor-box--editable');
    var registerBtn = editorBox.querySelector('#register-btn-bottom');
    if (registerBtn) registerBtn.remove();
    initEditor();
  }
  var fab = document.querySelector('.fab');
  if (fab) {
    fab.classList.add('fab--visible', 'fab--active');
  }
  var userName = localStorage.getItem('userName') || 'Новогодний список';
  var logo = document.querySelector('.header .logo');
  if (logo) {
    logo.textContent = userName;
  }

  // Запускаем синхронизацию после регистрации
  setTimeout(function() {
    startAutoSync();
    updateSyncStatus('Синхронизация...', true);
  }, 1500);
}

/* ================= УПРАВЛЕНИЕ СОСТОЯНИЕМ UI ================= */
function updateUIState() {
  var guestPrompt = document.getElementById('guest-prompt');
  var editorWrap = document.querySelector('.editor-wrap');
  var editorBox = document.querySelector('.editor-box');
  var fab = document.querySelector('.fab');
  var isRegistered = localStorage.getItem('userRegistered') === 'true';
  if (editorWrap) {
    editorWrap.style.display = 'flex';
    editorWrap.classList.add('editor-wrap--visible');
  }
  if (isRegistered) {
    if (guestPrompt) {
      guestPrompt.style.display = 'none';
      guestPrompt.classList.add('hidden');
      guestPrompt.remove();
    }
    if (editorBox) {
      editorBox.setAttribute('contenteditable', 'true');
      editorBox.classList.add('editor-box--editable');
      var registerBtn = editorBox.querySelector('#register-btn-bottom');
      if (registerBtn) registerBtn.remove();
      setTimeout(function() {
        initEditor();
        startAutoSync();
      }, 100);
    }
    if (fab) {
      fab.classList.add('fab--visible', 'fab--active');
    }
    var userName = localStorage.getItem('userName') || 'Новогодний список';
    var logo = document.querySelector('.header .logo');
    if (logo) logo.textContent = userName;
    if (editorBox && !editorBox.hasAttribute('data-initialized')) {
      editorBox.innerHTML = getDefaultEditorContent();
      editorBox.setAttribute('data-initialized', 'true');
    }
  } else {
    updateSyncStatus('Требуется регистрация', false);
    if (guestPrompt) {
      guestPrompt.style.display = 'block';
      guestPrompt.classList.remove('hidden');
    }
    if (editorBox) {
      editorBox.setAttribute('contenteditable', 'false');
      editorBox.classList.remove('editor-box--editable');
      if (!editorBox.hasAttribute('data-initialized')) {
        editorBox.innerHTML = getDefaultEditorContent();
        editorBox.setAttribute('data-initialized', 'true');
      }
      if (!editorBox.querySelector('#register-btn-bottom')) {
        addRegisterButtonToEditor();
      }
    }
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
  var oldBtn = editorBox.querySelector('#register-btn-bottom');
  if (oldBtn) oldBtn.remove();
  var registerBtn = document.createElement('div');
  registerBtn.id = 'register-btn-bottom';
  registerBtn.className = 'register-btn-bottom';
  registerBtn.innerHTML =
    '\n    <div class="register-btn-content">\n      <p>\uD83D\uDCDD \u0414\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0441\u043F\u0438\u0441\u043A\u0430 \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C</p>\n      <button class="btn btn-primary" id="register-from-editor-bottom">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F</button>\n    </div>\n  ';
  editorBox.appendChild(registerBtn);
  (_document$getElementB = document.getElementById(
    'register-from-editor-bottom',
  )) === null ||
    _document$getElementB === void 0 ||
    _document$getElementB.addEventListener('click', function(e) {
      e.preventDefault();
      var registrationUrl = 'https://my-auth-page-crwj.vercel.app/';
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
  var isRegistered = localStorage.getItem('userRegistered') === 'true';
  if (!isRegistered) {
    editorBox.setAttribute('contenteditable', 'false');
    editorBox.classList.remove('editor-box--editable');
    return;
  }
  editorBox.setAttribute('contenteditable', 'true');
  editorBox.classList.add('editor-box--editable');
  var registerBtn = editorBox.querySelector('#register-btn-bottom');
  if (registerBtn) registerBtn.remove();

  // Добавляем кнопку синхронизации в инструменты
  var editorTools = document.querySelector('.editor-tools');
  if (editorTools && !editorTools.querySelector('[data-action="sync-now"]')) {
    var syncTool = document.createElement('button');
    syncTool.className = 'editor-tool';
    syncTool.setAttribute('data-action', 'sync-now');
    syncTool.setAttribute('title', 'Синхронизировать сейчас');
    syncTool.innerHTML = '<i class="fas fa-sync-alt"></i>';
    editorTools.prepend(syncTool);
  }
  editorBox.addEventListener('input', function(e) {
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
  editorBox.addEventListener('click', function(e) {
    if (e.target.type === 'checkbox') {
      // autoSave() уже вызывается через change событие
    }
  });
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
        case 'sync-now':
          manualSync();
          break;
      }
    });
  });
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
  function clearDoneItems() {
    if (!confirm('Удалить все отмеченные пункты?')) return;
    var editorBox = document.querySelector('.editor-box');
    var doneItems = editorBox.querySelectorAll(
      '[data-type="item"] input:checked',
    );
    doneItems.forEach(function(checkbox) {
      var item = checkbox.closest('[data-type="item"]');
      if (item) item.remove();
    });
    autoSave();
  }
  function printList() {
    var originalContent = document.querySelector('.editor-box').innerHTML;
    var printWindow = window.open('', '_blank');
    printWindow.document.write(
      '\n      <!DOCTYPE html>\n      <html>\n      <head>\n        <title>\u041D\u043E\u0432\u043E\u0433\u043E\u0434\u043D\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A - \u041F\u0435\u0447\u0430\u0442\u044C</title>\n        <style>\n          body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }\n          .print-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #c77a7a; padding-bottom: 10px; }\n          .print-header h1 { color: #c77a7a; margin: 0; }\n          .category { font-weight: bold; color: #c77a7a; margin-top: 25px; margin-bottom: 10px; font-size: 1.2em; }\n          .item { margin: 5px 0; padding-left: 20px; position: relative; }\n          .item::before { content: "\u2022"; position: absolute; left: 0; color: #c77a7a; }\n          .item.checked { text-decoration: line-through; color: #888; }\n          @media print { body { padding: 0; } .no-print { display: none; } }\n        </style>\n      </head>\n      <body>\n        <div class="print-header">\n          <h1>\uD83C\uDF84 \u041D\u043E\u0432\u043E\u0433\u043E\u0434\u043D\u0438\u0439 \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u043E\u043A\u0443\u043F\u043E\u043A</h1>\n          <p>\u0414\u0430\u0442\u0430: '
        .concat(
          new Date().toLocaleDateString('ru-RU'),
          '</p>\n        </div>\n        <div id="print-content"></div>\n        <div class="no-print" style="margin-top: 30px; text-align: center;">\n          <button onclick="window.print()">\uD83D\uDDA8\uFE0F \u041F\u0435\u0447\u0430\u0442\u0430\u0442\u044C</button>\n          <button onclick="window.close()">\u2716\uFE0F \u0417\u0430\u043A\u0440\u044B\u0442\u044C</button>\n        </div>\n        <script>\n          const content = `',
        )
        .concat(
          originalContent,
          "`;\n          const parser = new DOMParser();\n          const doc = parser.parseFromString(content, 'text/html');\n          const printContent = document.getElementById('print-content');\n          let html = '';\n          doc.body.childNodes.forEach(node => {\n            if (node.nodeType === 1) {\n              if (node.getAttribute('data-type') === 'category') {\n                html += '<div class=\"category\">' + node.textContent + '</div>';\n              } else if (node.getAttribute('data-type') === 'item') {\n                const isChecked = node.querySelector('input')?.checked;\n                const text = node.querySelector('.item-text')?.textContent || node.textContent;\n                const className = isChecked ? 'item checked' : 'item';\n                html += '<div class=\"' + className + '\">' + text + '</div>';\n              } else if (node.textContent.trim()) {\n                html += '<div>' + node.textContent + '</div>';\n              }\n            }\n          });\n          printContent.innerHTML = html;\n        </script>\n      </body>\n      </html>\n    ",
        ),
    );
    printWindow.document.close();
  }
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

  // Загрузка состояния редактора
  loadEditorState();
}

// Загрузка состояния редактора
function loadEditorState() {
  var editorBox = document.querySelector('.editor-box');
  if (!editorBox) return;
  var savedContent = localStorage.getItem('editorContent');
  var savedStates = localStorage.getItem('checkboxStates');
  if (savedContent && savedContent !== '<div><br></div>') {
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

/* ================= УВЕДОМЛЕНИЯ ================= */
function showNotification(text) {
  var type =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'info';
  // Удаляем старые уведомления
  document.querySelectorAll('.notification').forEach(function(el) {
    return el.remove();
  });
  var notification = document.createElement('div');
  notification.className = 'notification notification-'.concat(type);
  notification.innerHTML = '\n        <div class="notification-content">\n            <i class="fas '
    .concat(
      type === 'success'
        ? 'fa-check-circle'
        : type === 'error'
        ? 'fa-exclamation-circle'
        : 'fa-info-circle',
      '"></i>\n            <span>',
    )
    .concat(text, '</span>\n        </div>\n    ');
  notification.style.cssText = '\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        background: '.concat(
    type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff',
    ";\n        color: white;\n        padding: 12px 20px;\n        border-radius: 8px;\n        z-index: 9999;\n        box-shadow: 0 4px 12px rgba(0,0,0,0.15);\n        animation: slideInRight 0.3s ease;\n        max-width: 300px;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;\n        font-size: 14px;\n    ",
  );
  var contentStyle =
    '\n        display: flex;\n        align-items: center;\n        gap: 10px;\n    ';
  notification.querySelector(
    '.notification-content',
  ).style.cssText = contentStyle;
  document.body.appendChild(notification);
  setTimeout(function() {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(function() {
      return notification.remove();
    }, 300);
  }, 3000);
}

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

  // Инициализация синхронизации при загрузке
  if (localStorage.getItem('userRegistered') === 'true') {
    setTimeout(function() {
      startAutoSync();
    }, 2000);
  }
});

/* ================= jQuery READY ================= */
if (typeof $ !== 'undefined') {
  $(function() {
    initPhoneMask();
  });
}

/* ================= CSS СТИЛИ ДЛЯ УВЕДОМЛЕНИЙ ================= */
var style = document.createElement('style');
style.textContent =
  '\n    @keyframes slideInRight {\n        from {\n            transform: translateX(100%);\n            opacity: 0;\n        }\n        to {\n            transform: translateX(0);\n            opacity: 1;\n        }\n    }\n    \n    @keyframes slideOutRight {\n        from {\n            transform: translateX(0);\n            opacity: 1;\n        }\n        to {\n            transform: translateX(100%);\n            opacity: 0;\n        }\n    }\n    \n    .notification {\n        position: fixed;\n        top: 20px;\n        right: 20px;\n        z-index: 9999;\n        animation: slideInRight 0.3s ease;\n    }\n    \n    .notification-content {\n        display: flex;\n        align-items: center;\n        gap: 10px;\n    }\n';
document.head.appendChild(style);

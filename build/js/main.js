// Реализация аккордеона в подвале
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("accordion__active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// Реализация модального окна

var link = document.querySelector(".contacts__button");

var popup = document.querySelector(".modal");
var close = popup.querySelector(".modal__close");

var form = popup.querySelector(".modal__form");
var name = popup.querySelector(".modal__input--name");
var phone = document.getElementById("modal__phone");
var question = popup.querySelector("[name=question]");

document.addEventListener("DOMContentLoaded", function() { // запрещаем скролл страницы
  var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  link.addEventListener('click', function() {
    document.body.style.overflow = 'hidden';
    link.style.marginLeft = scrollbar;
  });
  close.addEventListener('click', function() {
    document.body.style.overflow = 'visible';
    link.style.marginLeft = '0px';
  });
});

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.add("modal__show");
  if (storage) {
    name.value = storage;
    phone.focus();
  } else {
    document.getElementById("modal__name").focus();
  }
  document.getElementById("modal__name").focus();
});

// document.onclick = function(e){
//   if (event.target.className != 'modal' ) {
//       popup.style.display = 'none';
//   };
// };

close.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal__show");
  popup.classList.remove("modal___error");
});

form.addEventListener("submit", function(evt) {
  if (!name.value || !phone.value || !question.value) {
    evt.preventDefault();
    popup.classList.remove("modal__error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal__error");
  } else
  if (isStorageSupport) {
    localStorage.setItem("name", name.value);
  }
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal__show")) {
        if (popup) {
        popup.classList.remove("modal__show");
        popup.classList.remove("modal__error");
      }
    }
  }
});

// плавная прокрутка к якорю

const anchors = document.querySelectorAll('.anchor')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (evt) {
    evt.preventDefault()

    const blockID = anchor.getAttribute('href').substr(1)

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}

// маска для поля с телефоном

// window.addEventListener("DOMContentLoaded", function() {
//   function setCursorPosition(pos, elem) {
//     elem.focus();
//     if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
//     else if (elem.createTextRange) {
//       var range = elem.createTextRange();
//       range.collapse(true);
//       range.moveEnd("character", pos);
//       range.moveStart("character", pos);
//       range.select()
//       }
//     }
//     function mask(event) {
//       var matrix = this.defaultValue,
//       i = 0,
//       def = matrix.replace(/\D/g, ""),
//       val = this.value.replace(/\D/g, "");
//       def.length >= val.length && (val = def);
//       matrix = matrix.replace(/[_\d]/g, function(a) {
//         return val.charAt(i++) || "_"
//       });
//       this.value = matrix;
//       i = matrix.lastIndexOf(val.substr(-1));
//       i < matrix.length && matrix != this.defaultValue ? i++ : i = matrix.indexOf("_");
//       setCursorPosition(i, this)
//     }
//     // var input = document.querySelector("input");
//     var inputPhone = document.getElementById("phone");
//     inputPhone.addEventListener("phone", mask, false);
//     var modalPhone = document.getElementById("modal__phone");
//     modalPhone.addEventListener("modal__phone", mask, false);
// });

window.addEventListener("DOMContentLoaded", function() {
// function setCursorPosition(pos, elem) {
//     elem.focus();
//     if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
//     else if (elem.createTextRange) {
//         var range = elem.createTextRange();
//         range.collapse(true);
//         range.moveEnd("character", pos);
//         range.moveStart("character", pos);
//         range.select()
//     }
// }

function mask(event) {
    var matrix = "+7 (999) 999-99-99",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    this.value = matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
    if (event.type == "blur") {
        if (this.value.length == 2) this.value = ""
    } else setCursorPosition(this.value.length, this)
};
    var inputPhone = document.getElementById("phone");
    inputPhone.addEventListener("phone", mask, false);
    inputPhone.addEventListener("focus", mask, false);
    inputPhone.addEventListener("blur", mask, false);
    var modalPhone = document.getElementById("modal__phone");
    modalPhone.addEventListener("modal__phone", mask, false);
    modalPhone.addEventListener("focus", mask, false);
    modalPhone.addEventListener("blur", mask, false);
});

// обрезаем текст в блоке "о компании"

var isMobile = false;
var size = 178;
var newsContent = document.querySelector('.about-company__text--dektop');
var newsText = newsContent.textContent;
console.log(newsText.length);

document.addEventListener('DOMContentLoaded', function() {
    if (document.body.clientWidth <= 1023) {
      isMobile = true;
    } if (isMobile) {
  if(newsText.length > size){
    newsContent.textContent = newsText.slice(0, size) + '..';
  }
    }
    if (!isMobile) {
    }
});




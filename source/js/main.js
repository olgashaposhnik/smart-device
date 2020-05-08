'use strict';

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

function scrollLock() {
  var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
  link.addEventListener('click', function() {
    document.body.style.overflow = 'hidden';
    link.style.marginLeft = scrollbar;
  });
  close.addEventListener('click', function() {
    document.body.style.overflow = 'visible';
    link.style.marginLeft = '0px';
  });
}

document.addEventListener("DOMContentLoaded", scrollLock()); // запрещаем скролл страницы

function createStorage(evt) {
  var isStorageSupport = true;
  var storage = "";

  try {
    storage = localStorage.getItem("name");
  } catch (err) {
    isStorageSupport = false;
  }

  evt.preventDefault();
  popup.classList.add("modal__show");
  if (storage) {
    name.value = storage;
    phone.focus();
  } else {
    document.getElementById("modal__name").focus();
  }
  document.getElementById("modal__name").focus();
}

link.addEventListener("click", createStorage);

var popupClose = function (evt) {
  // evt.preventDefault();
  popup.classList.remove("modal__show");
  popup.classList.remove("modal___error");
  document.body.style.overflow = 'visible';
  link.style.marginLeft = '0px';
}

close.addEventListener("click", popupClose);

popup.addEventListener("click", function(evt) {
  if (evt.target.classList.contains('modal')) {
    popupClose();
  };
});

// popup.addEventListener("click", popupClose);

// close.addEventListener("click", function(evt) {
//   evt.preventDefault();
//   popup.classList.remove("modal__show");
//   popup.classList.remove("modal___error");
// });

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
  popupClose();
});

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === 27) {
      if (popup) {
        if (popup.classList.contains("modal__show")) {
          evt.preventDefault();
            if (popup) {
            popup.classList.remove("modal__show");
            popup.classList.remove("modal__error");
            document.body.style.overflow = 'visible';
            link.style.marginLeft = '0px';
        }
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

var inputPhone = document.getElementById("phone");
var modalPhone = document.getElementById("modal__phone");
var maskOptions = {
  mask: '+{7}(000)000-00-00'
};
var phoneMask = IMask(inputPhone, maskOptions);
var modalPhonemask = IMask(modalPhone, maskOptions);

// обрезаем текст в блоке "о компании"

var isMobile = false;
var size = 200;
var newsContent = document.querySelector('.about-company__text--dektop');
var newsText = newsContent.textContent;

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

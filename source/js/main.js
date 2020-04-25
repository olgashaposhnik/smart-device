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
var popupName = popup.querySelector("[name=name]");
var phone = popup.querySelector("[name=phone]");
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
    name.focus();
  }
});

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
    // console.log("������� ���, e-mail � ����� ������");
  } else
  if (isStorageSupport) {
    localStorage.setItem("name", name.value);
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal__show")) {
      popup.classList.remove("modal__show");
      popup.classList.remove("modal__error");
    }
  }
});

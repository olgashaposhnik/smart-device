var acc = document.getElementsByClassName("accordion");
console.log(acc)
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("accordion__active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight){
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

  // var navMain = document.querySelector('.main-nav');
  // var navToggle = document.querySelector('.main-nav__toggle');

  // navMain.classList.remove('main-nav--nojs');

  // navToggle.addEventListener('click', function() {
  //   if (navMain.classList.contains('main-nav--closed')) {
  //     navMain.classList.remove('main-nav--closed');
  //     navMain.classList.add('main-nav--opened');
  //   } else {
  //     navMain.classList.add('main-nav--closed');
  //     navMain.classList.remove('main-nav--opened');
  //   }
  // });

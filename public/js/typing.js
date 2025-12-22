const el = document.getElementById("typed-text");
const text = el.dataset.text;
let i = 0;

function type() {
  if (i < text.length) {
    el.textContent += text.charAt(i);
    i++;
    setTimeout(type, 40);
  }
}

type();

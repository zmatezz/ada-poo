class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

class Bola {
  constructor(canvas) {
    this.canvas = canvas;
    this.radius = Math.random() * 20 + 10;
    this.x = Math.random() * (canvas.canvas.width - 2 * this.radius) + this.radius;
    this.y = Math.random() * (canvas.canvas.height - 2 * this.radius) + this.radius;
    this.velX = Math.random() * 4 - 2;
    this.velY = Math.random() * 4 - 2;
    this.color = getRandomColor();
  }

  atualizar() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x - this.radius < 0 || this.x + this.radius > this.canvas.canvas.width) {
      this.velX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > this.canvas.canvas.height) {
      this.velY *= -1;
    }
  }

  desenhar() {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.canvas.ctx.fillStyle = this.color;
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();
  }
}

class Vaca {
  constructor(canvas) {
    this.canvas = canvas;
    this.emoji = '🐄';
    this.width = 50;
    this.height = 50;
    this.x = Math.random() * (canvas.canvas.width - this.width);
    this.y = Math.random() * (canvas.canvas.height - this.height);
    this.velX = Math.random() * 4 - 2;
    this.velY = Math.random() * 4 - 2;
  }

  atualizar() {
    this.x += this.velX;
    this.y += this.velY;

    if (this.x < 0 || this.x + this.width > this.canvas.canvas.width) {
      this.velX *= -1;
    }
    if (this.y < 0 || this.y + this.height > this.canvas.canvas.height) {
      this.velY *= -1;
    }
  }

  desenhar() {
    this.canvas.ctx.font = '40px Arial';
    this.canvas.ctx.fillText(this.emoji, this.x, this.y);
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const canvas = new Canvas();
const bolas = [];

function adicionarBola() {
  bolas.push(new Bola(canvas));
}

function adicionarVaca() {
  bolas.push(new Vaca(canvas));
}

function apagarBolas() {
  bolas.length = 0;
  canvas.clear();
}

document.getElementById('adicionarBola').addEventListener('click', adicionarBola);
document.getElementById('adicionarVaca').addEventListener('click', adicionarVaca);
document.getElementById('apagarBolas').addEventListener('click', apagarBolas);

function renderizar() {
  canvas.clear();
  for (const bola of bolas) {
    bola.atualizar();
    bola.desenhar();
  }
  requestAnimationFrame(renderizar);
}

renderizar();

document.addEventListener('DOMContentLoaded', () => {
  const nomeEl = document.getElementById('nome');
  if (nomeEl) {
    const texto = nomeEl.textContent;
    nomeEl.textContent = '';

    texto.split('').forEach((caractere, indice) => {
      const flutua = document.createElement('span');
      flutua.className = 'letra-flutua';
      flutua.style.animationDelay = `${indice * 0.12}s`;

      const entra = document.createElement('span');
      entra.className = 'letra-entra';
      entra.style.animationDelay = `${indice * 0.045}s`;
      entra.textContent = caractere === ' ' ? '\u00A0' : caractere;

      flutua.appendChild(entra);
      nomeEl.appendChild(flutua);
    });
  }

  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => io.observe(item));

  const hero = document.querySelector('header.hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const blob1 = hero.querySelector('.blob-1');
      const blob2 = hero.querySelector('.blob-2');
      if (blob1) {
        blob1.style.setProperty('--mx', `${x * 24}px`);
        blob1.style.setProperty('--my', `${y * 24}px`);
      }
      if (blob2) {
        blob2.style.setProperty('--mx', `${x * -20}px`);
        blob2.style.setProperty('--my', `${y * -20}px`);
      }
    });
  }

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const typingEl = document.getElementById('typing');
  const frases = ['Estudante de ADS', 'Full Stack em formação', 'Sempre aprendendo'];

  if (typingEl) {
    let fraseIndex = 0;
    let charIndex = 0;
    let apagando = false;

    function tick() {
      const frase = frases[fraseIndex];

      if (!apagando) {
        charIndex++;
        typingEl.textContent = frase.slice(0, charIndex);
        if (charIndex === frase.length) {
          apagando = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        charIndex--;
        typingEl.textContent = frase.slice(0, charIndex);
        if (charIndex === 0) {
          apagando = false;
          fraseIndex = (fraseIndex + 1) % frases.length;
        }
      }

      setTimeout(tick, apagando ? 40 : 80);
    }

    tick();
  }
});

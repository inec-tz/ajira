
  const firstNames = [
    "Juma", "Ally", "Fatma", "Asha", "Said", "Neema", "Omary", "Zuberi", "Rehema", "Khadija", "John", "Anna"
  ];

  const lastNames = [
    "Kasim", "Issa", "Mwinyi", "Suleiman", "Bakari", "Hamisi", "Musa", "Ngoma", "Shabani", "Kibwana", "Mnyika", "Nassoro"
  ];

  function getRandomName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
  }

  function showNotification(name) {
    const old = document.getElementById('custom-notification');
    if (old) {
      old.style.animation = 'fadeOut 0.5s ease';
      setTimeout(() => old.remove(), 500);
    }

    const container = document.createElement('div');
    container.id = 'custom-notification';

    const title = document.createElement('div');
    title.className = 'title';
    title.textContent = '🚨 Notifications';

    const content = document.createElement('div');
    content.className = 'inner-content';

    const img = document.createElement('img');
    img.src = 'https://www.inec.go.tz/site/images/icon/apple-icon-57x57.png';

    const message = document.createElement('div');
    message.className = 'message';
    message.textContent = `Hongera Ndugu ${name}, Tume Ya Uchaguzi Imepokea Maombi ✔`;

    content.appendChild(img);
    content.appendChild(message);

    container.appendChild(title);
    container.appendChild(content);
    document.body.appendChild(container);
  }

  // Repeat forever with new random names
  setInterval(() => {
    const randomName = getRandomName();
    showNotification(randomName);
  }, 6000);
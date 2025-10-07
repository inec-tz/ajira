
  const firstNames = [
    "Juma", "Ally", "Fatma", "Asha", "Said", "Neema", "Omary", "Zuberi", "Rehema", "Khadija", "John", "Anna"
  ];

  const lastNames = [
    "Kasim", "Issa", "Mwinyi", "Suleiman", "Bakari", "Hamisi", "Musa", "Ngoma", "Shabani", "Kibwana", "Mnyika", "Nassoro"
  ];

  // Notification types with different styles and messages
  const notificationTypes = {
    success: {
      icon: "✓",
      title: "Success",
      message: "Hongera Ndugu {name}, Tume Ya Uchaguzi Imepokea Maombi ✔"
    },
    warning: {
      icon: "⚠",
      title: "Update Required",
      message: "Ndugu {name}, Tafadhali kamili taarifa zako za mwombaji"
    },
    info: {
      icon: "ℹ",
      title: "Information",
      message: "Ndugu {name}, Tume inakagua maombi yako tafadhali subiri"
    }
  };

  let notificationCount = 0;

  function getRandomName() {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${first} ${last}`;
  }

  function getRandomNotificationType() {
    const types = Object.keys(notificationTypes);
    return types[Math.floor(Math.random() * types.length)];
  }

  function createNotificationContainer() {
    // Remove existing container if any
    const oldContainer = document.querySelector('.notification-container');
    if (oldContainer) oldContainer.remove();

    // Create new container
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
  }

  function showNotification(name, type = 'success') {
    const container = document.querySelector('.notification-container') || createNotificationContainer();
    notificationCount++;

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.setAttribute('data-id', notificationCount);

    const notificationType = notificationTypes[type] || notificationTypes.success;

    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">${notificationType.icon}</div>
        <div class="notification-text">
          <div class="notification-title">
            <span>${notificationType.title}</span>
          </div>
          <div class="notification-message">
            ${notificationType.message.replace('{name}', name)}
          </div>
        </div>
        <button class="notification-close" onclick="removeNotification(this)">×</button>
      </div>
      <div class="progress-bar"></div>
      <div class="notification-badge">${notificationCount}</div>
    `;

    // Add slide in animation
    notification.style.animation = 'slideInUp 0.5s ease forwards';

    // Add to container
    container.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        removeNotification(notification.querySelector('.notification-close'));
      }
    }, 5000);

    return notification;
  }

  function removeNotification(closeButton) {
    const notification = closeButton.closest('.custom-notification');
    if (notification) {
      notification.style.animation = 'slideOutDown 0.5s ease forwards';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
        
        // Update badge numbers for remaining notifications
        updateNotificationBadges();
      }, 500);
    }
  }

  function updateNotificationBadges() {
    const notifications = document.querySelectorAll('.custom-notification');
    notifications.forEach((notification, index) => {
      const badge = notification.querySelector('.notification-badge');
      if (badge) {
        badge.textContent = index + 1;
      }
    });
  }

  function showRandomNotification() {
    const randomName = getRandomName();
    const randomType = getRandomNotificationType();
    showNotification(randomName, randomType);
  }

  // Initialize notification container
  createNotificationContainer();

  // Show first notification after 2 seconds
  setTimeout(() => {
    showRandomNotification();
  }, 2000);

  // Repeat with random intervals between 4-8 seconds
  setInterval(() => {
    showRandomNotification();
  }, 4000 + Math.random() * 4000);

  // Optional: Add manual trigger for testing
  document.addEventListener('keydown', function(e) {
    if (e.key === 'n' || e.key === 'N') {
      showRandomNotification();
    }
  });

  console.log('Notification system initialized. Press "N" to show a notification manually.');

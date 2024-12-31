const ReviewWidget = {
  currentIndex: 0,
  reviews: [],
  rotationInterval: null,

  init: function(config = {}) {
    this.reviews = config.reviews || [];
    const rotationSpeed = config.rotationSpeed || 5000; // Default 5 seconds
    const desktopAlignment = config.desktopAlignment || 'center'; // Default center
    const minStars = config.minStars || 0; // Minimum stars filter, default to 0 (show all)
    const order = config.order || 'top-to-bottom'; // Order of reviews: "random" or "top-to-bottom"
    const hideOnMobile = config.hideOnMobile || 'no'; // Hide widget on mobile: "yes" or "no"
    const initZIndex = config.initZIndex || 9999; // Default z-index

    // Filter reviews based on minimum stars
    this.reviews = this.reviews.filter(review => review.stars >= minStars);

    // Shuffle reviews if order is "random"
    if (order === 'random') {
      this.reviews = this.reviews.sort(() => Math.random() - 0.5);
    }

    const styles = `
      #notifications-container {
        position: fixed;
        bottom: 0;
        ${desktopAlignment === 'left' ? 'left: 0;' : desktopAlignment === 'right' ? 'right: 0;' : 'left: 0; right: 0;'}
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
        z-index: ${initZIndex};
      }

      .notification {
        background: white;
        padding: 12px 16px;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        display: flex;
        align-items: center;
        gap: 20px;
        width: 100%;
        max-width: 340px;
        margin: 0 auto;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
      }

      .notification:first-child {
        font-size: 14px; /* Smaller font size for the first notification */
      }

      .notification .details {
        font-size: 12px; /* Smaller font size for the date row */
      }

      .notification.fade-out {
        opacity: 0;
      }

      .star-icon {
        width: 32px;
        height: 32px;
        background: #FFD700;
        flex-shrink: 0;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
        flex-wrap: wrap;
      }

      .name {
        color: #1a73e8;
        font-weight: 500;
      }

      .text {
        color: #202124;
        font-weight: 500;
      }

      .stars {
        display: flex;
        gap: 2px;
        margin-bottom: 4px;
      }

      .star {
        width: 16px;
        height: 16px;
        background: #FFD700;
        flex-shrink: 0;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
      }

      .details {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #5f6368;
        font-size: 13px;
      }

      .separator {
        width: 4px;
        height: 4px;
        background: #5f6368;
        border-radius: 50%;
      }

      @media (max-width: 768px) {
        #notifications-container {
          ${hideOnMobile === 'yes' ? 'display: none;' : ''}
        }

        .notification {
          padding: 10px 12px;
          gap: 12px;
        }
        
        .star-icon {
          width: 28px;
          height: 28px;
        }
      }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    const container = document.createElement('div');
    container.id = 'notifications-container';
    document.body.appendChild(container);

    if (this.reviews.length > 0) {
      this.showCurrentReview();
      if (this.reviews.length > 1) {
        this.startRotation(rotationSpeed);
      }
    }
  },

  createStars: function(count) {
    return Array(parseInt(count))
      .fill()
      .map(() => '<div class="star"></div>')
      .join('');
  },

  createNotification: function(review) {
    return `
      <div class="notification">
        <div class="star-icon"></div>
        <div class="content">
          <div class="header">
            <span class="text">${review.stars} star rating by</span>
            <span class="name">${review.name}</span>
          </div>
          <div class="stars">
            ${this.createStars(review.stars)}
          </div>
          <div class="details">
            <span>${review.date}</span>
            <div class="separator"></div>
            <span>on ${review.on}</span>
          </div>
        </div>
      </div>
    `;
  },

  showCurrentReview: function() {
    const container = document.getElementById('notifications-container');
    container.innerHTML = this.createNotification(this.reviews[this.currentIndex]);

    // Apply font-size dynamically if needed
    const firstNotification = container.querySelector('.notification');
    if (this.currentIndex === 0 && firstNotification) {
      firstNotification.style.fontSize = '14px';
      const dateRow = firstNotification.querySelector('.details');
      if (dateRow) {
        dateRow.style.fontSize = '12px';
      }
    }
  },

  rotateReview: function() {
    const container = document.getElementById('notifications-container');
    const notification = container.querySelector('.notification');
    
    // Fade out current review
    notification.classList.add('fade-out');
    
    setTimeout(() => {
      // Update index
      this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
      // Show new review
      this.showCurrentReview();
    }, 300); // Match the CSS transition duration
  },

  startRotation: function(speed) {
    this.rotationInterval = setInterval(() => this.rotateReview(), speed);
  },

  stopRotation: function() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
};

window.ReviewWidget = ReviewWidget;

// Placeholder for future JavaScript features
document.addEventListener('DOMContentLoaded', function () {
    console.log('GustoBite loaded');
  });
  document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
      duration: 800,
      once: true
    });
  });

  // Collapse mobile nav on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse.classList.contains('show')) {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    });
  });
  // Countdown timer function
  function initializeCountdown(id, endtime) {
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endtime - now;

      if (distance < 0) {
        document.getElementById(id).innerHTML = "Event Started!";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById(id).innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    }

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  // Set your event dates here (YYYY-MM-DD)
  initializeCountdown("countdown1", new Date("2025-06-01T18:00:00").getTime());
  initializeCountdown("countdown2", new Date("2025-06-15T10:00:00").getTime());

  // Set min date to today for reservation
  document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  });

  document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const messageDiv = document.getElementById('bookingMessage');

    // Collect form data
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const phone = this.phone.value.trim();
    const date = this.date.value;
    const time = this.time.value;
    const guests = this.guests.value;
    const menuItems = [];
    ['menuBreakfast', 'menuLunch', 'menuDinner', 'menuDrinks'].forEach(id => {
      if (document.getElementById(id).checked) menuItems.push(document.getElementById(id).value);
    });

    // Validation
    if (!name || !email || !phone || !date || !time || !guests) {
      messageDiv.className = 'alert alert-danger';
      messageDiv.textContent = 'Please fill all required fields.';
      messageDiv.classList.remove('d-none');
      return;
    }

    // Show success message
    messageDiv.className = 'alert alert-success';
    messageDiv.innerHTML = `<strong>Thanks for booking, ${name}!</strong><br>
  Date: ${date}<br>Time: ${time}<br>Guests: ${guests}<br>Menu Items: ${menuItems.join(', ') || 'None'}`;

    messageDiv.classList.remove('d-none');

    // Reset form after short delay
    setTimeout(() => {
      messageDiv.classList.add('d-none');
      this.reset();
    }, 7000);

    //contact section
    document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const message = document.getElementById('contactMessage').value.trim();
      const response = document.getElementById('contactResponse');

      if (!name || !email || !message) {
        response.className = 'alert alert-danger';
        response.textContent = 'Please fill in all fields.';
        response.classList.remove('d-none');
        return;
      }

      response.className = 'alert alert-success';
      response.textContent = `Thank you, ${name}! Your message has been sent.`;
      response.classList.remove('d-none');

      setTimeout(() => {
        response.classList.add('d-none');
        document.getElementById('contactForm').reset();
      }, 6000);
    });
  });
  //footer section 
  document.getElementById("currentYear").textContent = new Date().getFullYear();
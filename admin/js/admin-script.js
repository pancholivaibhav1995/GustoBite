document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    // For demo: always show error
    document.getElementById('loginError').style.display = 'block';
  });
  
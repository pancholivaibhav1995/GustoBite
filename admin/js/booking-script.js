document.addEventListener("DOMContentLoaded", () => {
    const approveButtons = document.querySelectorAll(".approve");
    const denyButtons = document.querySelectorAll(".deny");
  
    approveButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.innerText = "Approved ✔️";
        btn.disabled = true;
        btn.nextElementSibling.disabled = true;
      });
    });
  
    denyButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        btn.innerText = "Denied ❌";
        btn.disabled = true;
        btn.previousElementSibling.disabled = true;
      });
    });
  });
  
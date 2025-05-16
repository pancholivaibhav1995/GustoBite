const menuData = [
  // Breakfast
  {
    id: 1,
    category: 'breakfast',
    name: 'Vegetable Upma',
    description: 'Steamed semolina with mixed veggies.',
    price: 70,
    image: 'https://via.placeholder.com/300x150?text=Vegetable+Upma'
  },
  {
    id: 2,
    category: 'breakfast',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe with spiced potato filling.',
    price: 90,
    image: 'https://via.placeholder.com/300x150?text=Masala+Dosa'
  },
  // Lunch
  {
    id: 3,
    category: 'lunch',
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in creamy tomato gravy.',
    price: 150,
    image: 'https://via.placeholder.com/300x150?text=Paneer+Butter+Masala'
  },
  {
    id: 4,
    category: 'lunch',
    name: 'Veg Biryani',
    description: 'Fragrant basmati rice with mixed vegetables.',
    price: 130,
    image: 'https://via.placeholder.com/300x150?text=Veg+Biryani'
  },
  // Dinner
  {
    id: 5,
    category: 'dinner',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with spices.',
    price: 110,
    image: 'https://via.placeholder.com/300x150?text=Dal+Tadka'
  },
  {
    id: 6,
    category: 'dinner',
    name: 'Veg Korma',
    description: 'Mixed vegetables in rich cashew gravy.',
    price: 160,
    image: 'https://via.placeholder.com/300x150?text=Veg+Korma'
  },
  // Drinks
  {
    id: 7,
    category: 'drinks',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea.',
    price: 40,
    image: 'https://via.placeholder.com/300x150?text=Masala+Chai'
  },
  {
    id: 8,
    category: 'drinks',
    name: 'Mango Lassi',
    description: 'Refreshing mango yogurt drink.',
    price: 60,
    image: 'https://via.placeholder.com/300x150?text=Mango+Lassi'
  }
];

const menuItemsContainer = document.getElementById('menuItems');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElem = document.getElementById('cartTotal');
const submitOrderBtn = document.getElementById('submitOrderBtn');
const orderMsg = document.getElementById('orderMsg');

let cart = {};

// Render Menu Cards by category
function renderMenu(category = 'all') {
  menuItemsContainer.innerHTML = '';
  const filteredMenu = category === 'all' ? menuData : menuData.filter(item => item.category === category);
  if(filteredMenu.length === 0){
    menuItemsContainer.innerHTML = `<p class="text-muted">No items available in this category.</p>`;
    return;
  }

  filteredMenu.forEach(item => {
    const card = document.createElement('div');
    card.className = 'col-sm-6 col-md-4';

    card.innerHTML = `
      <div class="menu-card">
        <img src="${item.image}" alt="${item.name}" />
        <h5>${item.name}</h5>
        <p>${item.description}</p>
        <div class="price">₹${item.price}</div>
        <div class="btn-group" role="group" aria-label="Quantity controls">
          <button type="button" class="btn btn-outline-danger btn-sm" data-action="remove" data-id="${item.id}">-</button>
          <span class="quantity" id="qty-${item.id}">0</span>
          <button type="button" class="btn btn-outline-success btn-sm" data-action="add" data-id="${item.id}">+</button>
        </div>
      </div>
    `;
    menuItemsContainer.appendChild(card);
  });
}

// Update Cart UI
function renderCart() {
  cartItemsContainer.innerHTML = '';

  const cartItems = Object.values(cart);
  if(cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<li class="list-group-item">Your bucket is empty</li>';
    cartTotalElem.textContent = '₹0';
    submitOrderBtn.disabled = true;
    return;
  }

  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
      <span class="item-qty">${item.qty}×</span> ${item.name} 
      <span>₹${item.price * item.qty}</span>
    `;
    cartItemsContainer.appendChild(li);
  });

  cartTotalElem.textContent = `₹${total}`;
  submitOrderBtn.disabled = false;
}

// Handle Add/Remove clicks on menu items
menuItemsContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if(!btn) return;

  const action = btn.getAttribute('data-action');
  const id = parseInt(btn.getAttribute('data-id'));
  const menuItem = menuData.find(item => item.id === id);

  if(!menuItem) return;

  if(action === 'add') {
    if(cart[id]) {
      cart[id].qty += 1;
    } else {
      cart[id] = { ...menuItem, qty: 1 };
    }
  } else if(action === 'remove') {
    if(cart[id]) {
      cart[id].qty -= 1;
      if(cart[id].qty <= 0) {
        delete cart[id];
      }
    }
  }

  document.getElementById(`qty-${id}`).textContent = cart[id] ? cart[id].qty : 0;
  renderCart();
});

// Handle category filter clicks
document.getElementById('categoryFilters').addEventListener('click', e => {
  const btn = e.target.closest('button');
  if(!btn) return;

  // Remove active class from all buttons, add to clicked
  document.querySelectorAll('#categoryFilters .nav-link').forEach(n => n.classList.remove('active'));
  btn.classList.add('active');

  const category = btn.getAttribute('data-category');
  renderMenu(category);
});

// Submit order (UI only)
submitOrderBtn.addEventListener('click', () => {
  orderMsg.style.display = 'block';
  setTimeout(() => {
    orderMsg.style.display = 'none';
    cart = {};
    renderMenu(document.querySelector('#categoryFilters .active').getAttribute('data-category'));
    renderCart();
  }, 3000);
});

// Initial render
renderMenu();
renderCart();

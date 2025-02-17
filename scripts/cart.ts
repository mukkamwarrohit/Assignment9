import { getCart } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    const cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;
    
    const cart: { id: number; image: string; title: string; price: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="cart-image">
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
            <button class="remove-button" data-id="${item.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
    
    document.querySelectorAll('.remove-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            const id = Number(target.dataset.id);
            removeFromCart(id);
        });
    });
});

const removeFromCart = (id: number) => {
    let cart: { id: number; image: string; title: string; price: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
};

const clearCart = () => {
    localStorage.removeItem('cart');
    alert('Cart cleared!');
    window.location.reload();
};

const placeOrder = () => {
    const cart: { id: number; image: string; title: string; price: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    localStorage.removeItem('cart');
    alert('Order placed successfully!');
    window.location.reload();
};

(window as any).removeFromCart = removeFromCart;
(window as any).clearCart = clearCart;
(window as any).placeOrder = placeOrder;

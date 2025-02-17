import { getProduct } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetails = document.getElementById('product-details') as HTMLElement;

    if (productId) {
        const product: { id: number; image: string; title: string; description: string; price: number } = await getProduct(Number(productId));
        productDetails.innerHTML = `
            <div class="product-detail">
                <img src="${product.image}" alt="${product.title}" class="product-image-large">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <h3>Price: $${product.price}</h3>
                <button class="add-to-cart-button" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
            </div>
        `;
        
        document.querySelector('.add-to-cart-button')?.addEventListener('click', (event) => {
            const target = event.target as HTMLButtonElement;
            addToCart(
                Number(target.dataset.id),
                target.dataset.title || '',
                Number(target.dataset.price),
                target.dataset.image || ''
            );
        });
    } else {
        productDetails.innerHTML = '<p>Product not found</p>';
    }
});

const addToCart = (id: number, title: string, price: number, image: string) => {
    let cart: { id: number; title: string; price: number; image: string }[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ id, title, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
};

(window as any).addToCart = addToCart;

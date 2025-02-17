import { getProducts, getCategories, getProductsByCategory } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('product-list') as HTMLElement;
    const categoryDropdown = document.getElementById('category-filter') as HTMLSelectElement;
    const sortDropdown = document.getElementById('sort-products') as HTMLSelectElement;

    const loadProducts = async () => {
        let products: { id: number; image: string; title: string; price: number }[] = [];
        const selectedCategory = categoryDropdown.value;
        const selectedSort = sortDropdown.value;
        
        if (selectedCategory) {
            products = await getProductsByCategory(selectedCategory);
        } else {
            products = await getProducts();
        }

        if (selectedSort === 'price-asc') {
            products.sort((a, b) => a.price - b.price);
        } else if (selectedSort === 'price-desc') {
            products.sort((a, b) => b.price - a.price);
        }

        productList.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button class="view-button" data-id="${product.id}">View</button>
            `;
            productList.appendChild(productElement);
        });

        document.querySelectorAll('.view-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const id = Number(target.dataset.id);
                viewProduct(id);
            });
        });
    };

    categoryDropdown.addEventListener('change', loadProducts);
    sortDropdown.addEventListener('change', loadProducts);

    const categories: string[] = await getCategories();
    categoryDropdown.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    loadProducts();
});

const viewProduct = (id: number) => {
    window.location.href = `product.html?id=${id}`;
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

(window as any).viewProduct = viewProduct;
(window as any).placeOrder = placeOrder;

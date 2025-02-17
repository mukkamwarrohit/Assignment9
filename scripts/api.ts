const API_BASE: string = 'https://fakestoreapi.com';

type FetchOptions = RequestInit;

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

type Cart = {
    id: number;
    userId: number;
    date: string;
    products: { productId: number; quantity: number }[];
};

type User = {
    id: number;
    username: string;
    email: string;
    phone: string;
    address: { street: string; city: string };
};

type AuthResponse = {
    token: string;
};

async function fetchData<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export async function getProducts(): Promise<Product[]> {
    return fetchData<Product[]>('/products');
}

export async function getProduct(id: number): Promise<Product> {
    return fetchData<Product>(`/products/${id}`);
}

export async function createProduct(data: Partial<Product>): Promise<Product> {
    return fetchData<Product>('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export async function updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return fetchData<Product>(`/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export async function deleteProduct(id: number): Promise<void> {
    return fetchData<void>(`/products/${id}`, {
        method: 'DELETE'
    });
}

export async function getCarts(): Promise<Cart[]> {
    return fetchData<Cart[]>('/carts');
}

export async function getCart(id: number): Promise<Cart> {
    return fetchData<Cart>(`/carts/${id}`);
}

export async function createCart(data: Partial<Cart>): Promise<Cart> {
    return fetchData<Cart>('/carts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export async function updateCart(id: number, data: Partial<Cart>): Promise<Cart> {
    return fetchData<Cart>(`/carts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export async function deleteCart(id: number): Promise<void> {
    return fetchData<void>(`/carts/${id}`, {
        method: 'DELETE'
    });
}

export async function getUsers(): Promise<User[]> {
    return fetchData<User[]>('/users');
}

export async function getUser(id: number): Promise<User> {
    return fetchData<User>(`/users/${id}`);
}

export async function createUser(data: Partial<User>): Promise<User> {
    return fetchData<User>('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
    return fetchData<User>(`/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
}

export async function deleteUser(id: number): Promise<void> {
    return fetchData<void>(`/users/${id}`, {
        method: 'DELETE'
    });
}

export async function loginUser(username: string, password: string): Promise<AuthResponse> {
    return fetchData<AuthResponse>('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
}

export async function getCategories(): Promise<string[]> {
    return fetchData<string[]>('/products/categories');
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    return fetchData<Product[]>(`/products/category/${category}`);
}

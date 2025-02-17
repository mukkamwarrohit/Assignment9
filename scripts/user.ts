import { getUser } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    const userDetails = document.getElementById('user-details') as HTMLElement;

    if (userId) {
        const user: { username: string; email: string; phone: string; address: { street: string; city: string } } = await getUser(Number(userId));
        userDetails.innerHTML = `
            <div class="user-detail">
                <h2>${user.username}</h2>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <p>Address: ${user.address.street}, ${user.address.city}</p>
            </div>
        `;
    } else {
        userDetails.innerHTML = '<p>User not found</p>';
    }
});

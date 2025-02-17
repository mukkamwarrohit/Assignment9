import { getUsers } from './api';

document.addEventListener('DOMContentLoaded', async () => {
    const userList = document.getElementById('user-list') as HTMLElement;
    if (userList) {
        const users: { id: number; username: string; email: string }[] = await getUsers();
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'user';
            userElement.innerHTML = `
                <h3>${user.username}</h3>
                <p>Email: ${user.email}</p>
                <button class="view-user-button" data-id="${user.id}">View</button>
            `;
            userList.appendChild(userElement);
        });

        document.querySelectorAll('.view-user-button').forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLButtonElement;
                const id = Number(target.dataset.id);
                viewUser(id);
            });
        });
    }
});

const viewUser = (id: number) => {
    window.location.href = `user.html?id=${id}`;
};

(window as any).viewUser = viewUser;

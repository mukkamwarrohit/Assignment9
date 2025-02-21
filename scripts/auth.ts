import { loginUser } from './api';

document.getElementById('login-form')?.addEventListener('submit', async (e: Event) => {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    if (!usernameInput || !passwordInput) {
        alert('Username or password field not found!');
        return;
    }
    
    const username: string = usernameInput.value;
    const password: string = passwordInput.value;
    
    try {
        const response: { token?: string } = await loginUser(username, password);
        
        if (response.token) {  //check the output 
            localStorage.setItem('token', response.token);
            alert('Login Successful!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid credentials!');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred while logging in. Please try again later.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const body = new URLSearchParams(new FormData(form)).toString();
        const url = '/api/register';
        const method = 'POST';

        try {
            // Fetch the data
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body
            });

            // Error Trap for a bad response.
            if (!res.ok) {
                const text = await res.text().catch(() => 'Sign Up Failed!');
                alert(text);
                return;
            }

            // Error Trap for bad token return
            const token = await res.json().catch(() => null);
            if (!token) {
                alert('No token returned from server');
                return;
            }

            localStorage.setItem('authToken', token);

            // redirect to homepage
            window.location.href = '/';
        } catch (err) {
            console.error(err);
            alert('Error during sign up');
        }
    });
});

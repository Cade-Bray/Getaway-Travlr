function getToken() {
    let token = localStorage.getItem('authToken');
    if (!token) return null;
    return token;
}

async function handleAuthLinkClick(e) {
    // only handle ordinary left-clicks without modifier keys.
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a'); // Thanks stackoverflow for this gem.
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return; // It's a document
    if (a.dataset && a.dataset.authRequired !== 'true') return; // Auth isn't required for this page.

    e.preventDefault();

    const href = a.href;
    const token = getToken();
    if (!token) {
        // No token so let's send to log in
        window.location.href = '/login';
        return;
    }

    try {
        // Fetch the page we're moving to
        const res = await fetch(href, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'text/html' },
            credentials: 'same-origin'
        });
        
        if (res.status === 401) {
            // token invalid or expired so let's redirect
            window.location.href = '/login';
            return;
        }

        if (!res.ok) {
            // navigate to show server error page
            window.location.href = href;
            return;
        }

        const contentType = (res.headers.get('content-type') || ''); // This was a pain to find as an error. Default ''
        if (contentType.includes('text/html')) {
            const html = await res.text();
            // replace entire document with fetched HTML and update history
            document.open();
            // Depreciated but I don't know what to replace it with
            document.write(html);
            document.close();
            history.pushState({}, '', href);
        } else {
            // non-HTML response: navigate normally or handle accordingly
            window.location.href = href;
        }
    } catch (err) {
        console.error('Auth link fetch failed', err);
        window.location.href = href;
    }
}

document.addEventListener('click', handleAuthLinkClick, true);

window.addEventListener('popstate', async () => {
    const href = location.href;
    const token = getToken();
    if (!token) {
        // let the browser load if no token
        location.reload();
        return;
    }
    try {
        // Get the document with token
        const res = await fetch(href, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token, 'Accept': 'text/html' },
            credentials: 'same-origin'
        });
        
        if (res.ok && (res.headers.get('content-type') || '').includes('text/html')) {
            // Rewrite the dom with the content we got
            const html = await res.text();
            document.open();
            document.write(html);
            document.close();
        } else {
            location.reload();
        }
    } catch (e) {
        location.reload();
    }
});
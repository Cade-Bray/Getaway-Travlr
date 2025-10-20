function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Failed saving cart', e);
    }
}

function getCodeFromLi(li) {
    if (!li) return '';
    // scoped querySelector will find the descendant with id="code" inside this li
    return li.querySelector('#code')?.textContent?.trim() || '';
}

function addToCartByCode(code) {
    if (!code) return;
    const cart = getCart();
    const existing = cart.find(item => item.code === code);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ code, qty: 1 });
    }
    saveCart(cart);
}

function handleClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;
    const li = btn.closest('li');
    const code = getCodeFromLi(li);
    if (!code) return;
    addToCartByCode(code);

    // simple feedback
    const oldText = btn.textContent;
    btn.textContent = 'Added';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = oldText;
        btn.disabled = false;
    }, 900);
}

document.addEventListener('DOMContentLoaded', () => {
    const buttons = Array.from(document.querySelectorAll('#sites li button'));
    buttons.forEach(b => {
        if (b.dataset._cartAttached === 'true') return;
        b.addEventListener('click', handleClick);
        b.dataset._cartAttached = 'true';
    });
});
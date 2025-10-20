'use strict';

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
        window.dispatchEvent(new Event('storage'));
    } catch (e) {
        console.error('Failed saving cart', e);
    }
}

function formatMoney(n) {
    return '$' + Number(n || 0).toFixed(2);
}

async function fetchTrip(code) {
    try {
        const res = await fetch('/api/trips/' + encodeURIComponent(code));
        if (!res.ok) throw new Error('Not found');
        return await res.json();
    } catch (e) {
        console.warn('Failed to fetch trip', code, e);
        return null;
    }
}

function clearList() {
    const ul = document.getElementById('cartList');
    ul.innerHTML = '';
}

function renderEmpty() {
    const ul = document.getElementById('cartList');
    ul.innerHTML = '<li>Your cart is empty.</li>';
    document.getElementById('cartTotal').textContent = formatMoney(0);
}

function calculateAndRenderTotal(renderedItems) {
    let total = 0;
    for (const it of renderedItems) {
        const price = Number(it.price || 0);
        total += price * Number(it.qty || 0);
    }
    document.getElementById('cartTotal').textContent = formatMoney(total);
}

function updateLocalQty(code, qty) {
    const cart = getCart();
    const idx = cart.findIndex(i => i.code === code);
    if (idx !== -1) {
        if (qty <= 0) {
            cart.splice(idx, 1);
        } else {
            cart[idx].qty = qty;
        }
        saveCart(cart);
    }
}

function removeFromLocal(code) {
    const cart = getCart().filter(i => i.code !== code);
    saveCart(cart);
}

async function loadAndRender() {
    const cart = getCart();
    const ul = document.getElementById('cartList');

    if (!cart.length) {
        renderEmpty();
        return;
    }

    clearList();

    // fetch all trip details
    const fetches = cart.map(ci => fetchTrip(ci.code).then(trip => ({ code: ci.code, qty: ci.qty, trip })));
    const items = await Promise.all(fetches);

    const rendered = [];

    for (const item of items) {
        const li = document.createElement('li');
        li.style.borderBottom = '1px solid #ddd';
        li.style.padding = '0.75rem 0';
        li.dataset.code = item.code;

        const trip = item.trip[0];
        const name = trip.name;
        const price = trip.perPerson;

        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.alignItems = 'center';

        const meta = document.createElement('div');
        const title = document.createElement('div');
        title.textContent = name;
        title.style.fontWeight = '600';
        meta.appendChild(title);

        const codeLine = document.createElement('div');
        codeLine.textContent = 'Code: ' + item.code;
        codeLine.style.fontSize = '0.9rem';
        codeLine.style.color = '#555';
        meta.appendChild(codeLine);

        left.appendChild(meta);

        const controls = document.createElement('div');
        controls.style.marginLeft = 'auto';
        controls.style.display = 'flex';
        controls.style.alignItems = 'center';
        controls.style.gap = '0.5rem';

        const priceEl = document.createElement('div');
        priceEl.textContent = formatMoney(price);
        priceEl.style.minWidth = '80px';
        priceEl.style.textAlign = 'right';
        controls.appendChild(priceEl);

        const qtyInput = document.createElement('input');
        qtyInput.type = 'number';
        qtyInput.min = '1';
        qtyInput.value = String(item.qty || 1);
        qtyInput.style.width = '60px';
        qtyInput.dataset.code = item.code;
        controls.appendChild(qtyInput);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-info';
        removeBtn.textContent = 'Remove';
        removeBtn.dataset.code = item.code;
        controls.appendChild(removeBtn);

        li.appendChild(left);
        li.appendChild(controls);
        ul.appendChild(li);

        // events
        qtyInput.addEventListener('change', (e) => {
            let v = parseInt(e.currentTarget.value, 10);
            if (!Number.isFinite(v) || v < 1) {
                v = 1;
                e.currentTarget.value = '1';
            }
            updateLocalQty(item.code, v);
            // update rendered total
            const renderedItem = rendered.find(r => r.code === item.code);
            if (renderedItem) renderedItem.qty = v;
            calculateAndRenderTotal(rendered);
        });

        removeBtn.addEventListener('click', () => {
            removeFromLocal(item.code);
            li.remove();
            const idx = rendered.findIndex(r => r.code === item.code);
            if (idx !== -1) rendered.splice(idx, 1);
            if (!rendered.length) renderEmpty();
            else calculateAndRenderTotal(rendered);
        });

        rendered.push({ code: item.code, qty: Number(item.qty || 1), price });
    }

    calculateAndRenderTotal(rendered);
}

document.addEventListener('DOMContentLoaded', () => {
    loadAndRender();

    document.getElementById('checkoutBtn').addEventListener('click', function (e) {
        e.preventDefault();
        // does nothing for now
        alert('Checkout not implemented');
    });

    // respond to changes in other tabs
    window.addEventListener('storage', () => {
        loadAndRender();
    });
});
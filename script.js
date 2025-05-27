document.addEventListener("DOMContentLoaded", function () {
    const headings = document.querySelectorAll("h1[id]");
    if (headings.length === 0) return;

    const tocContainer = document.querySelector("#toc")
    const list = document.createElement("ul");

    headings.forEach(h => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        list.appendChild(li);
    });
    tocContainer.appendChild(list);


    document.querySelectorAll('li').forEach(li => {
        const firstEl = li.firstElementChild;

        if (
            firstEl &&
            firstEl.tagName.toLowerCase() === 'strong' &&
            firstEl.textContent.trim() === 'תשובה:'
        ) {
            // Wrap the rest of the content (excluding <strong>) in a span
            const span = document.createElement('span');
            span.classList.add('blur-content');

            // Move all nodes after <strong> into the span
            let node = firstEl.nextSibling;
            while (node) {
                const next = node.nextSibling;
                span.appendChild(node);
                node = next;
            }

            li.appendChild(span);

            // Apply styles
            // span.style.filter = 'blur(5px)';
            // li.style.cursor = 'pointer';
            li.style.background = '#2a73f014';
            // Remove blur on click
            // li.addEventListener('click', () => {
            //     span.style.filter = 'none';
            //     li.style.cursor = 'auto'; // or 'default'
            // });
        }
    });

    document.querySelectorAll('li').forEach(li => {
        const firstNode = li.firstChild;
        if (firstNode) {
            if (
                (firstNode.nodeType === Node.ELEMENT_NODE &&
                firstNode.classList.contains('math') &&
                firstNode.classList.contains('inline')) 
                
                || // it's text node and its first letter is from english alphabet
                (firstNode.nodeType === Node.TEXT_NODE &&
                firstNode.textContent.trim().length > 0 &&
                /^[a-zA-Z]/.test(firstNode.textContent.trim()[0]))
            ) {
                li.style.direction = 'ltr';
                li.style.textAlign = 'left';
            }
        }
    });

    // add dark mode toggle
    const toggle = document.createElement('a');
    toggle.textContent = 'Light';
    toggle.style.cursor = 'pointer';
    toggle.style.fontSize = 'small';
    toggle.style.opacity = '0.7';
    toggle.style.border = '1px solid #ccc';
    toggle.style.padding = '0.2em 0.5em';
    toggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            toggle.textContent = 'Light';
        } else {
            toggle.textContent = 'Dark';
        }
        document.documentElement.classList.toggle('dark');
    });
    document.body.insertBefore(toggle, document.body.firstChild);
})
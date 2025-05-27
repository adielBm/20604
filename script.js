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
        if (
            firstNode &&
            firstNode.nodeType === Node.ELEMENT_NODE &&
            firstNode.classList.contains('math') &&
            firstNode.classList.contains('inline')
        ) {
            li.style.direction = 'ltr';
            li.style.textAlign = 'left';
        }
    });


});
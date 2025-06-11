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


            li.className = 'answer';

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


    // add header
    const header = document.createElement('header');
    document.body.insertBefore(header, document.body.firstChild);
    header.style.padding = '0.5em 1em';

    // // add dark mode toggle
    // const toggle = document.createElement('a');
    // toggle.textContent = 'Light';
    // toggle.style.cursor = 'pointer';
    // toggle.addEventListener('click', () => {
    //     if (document.documentElement.classList.contains('dark')) {
    //         toggle.textContent = 'Light';
    //     } else {
    //         toggle.textContent = 'Dark';
    //     }
    //     document.documentElement.classList.toggle('dark');
    // });

    const link = document.createElement('a');
    link.href = 'https://github.com/adielBm/20604';
    link.textContent = link.href;

    // header.appendChild(toggle);
    // header.appendChild(link);






    document.querySelectorAll('.answer').forEach((answerEl, index) => {
        // Find the closest preceding <h2> and <h1> in document order
        let examTitle = null;
        let questionTitle = null;

        // Look backwards through the DOM to find the nearest h1 and h2
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    return ['H1', 'H2'].includes(node.tagName) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                }
            }
        );

        let lastH1 = null, lastH2 = null;
        let currentNode;

        while ((currentNode = walker.nextNode())) {
            if (currentNode.compareDocumentPosition(answerEl) & Node.DOCUMENT_POSITION_PRECEDING) {
                break;
            }
            if (currentNode.tagName === 'H1') lastH1 = currentNode;
            if (currentNode.tagName === 'H2') lastH2 = currentNode;
        }

        examTitle = lastH1 ? lastH1.textContent.trim() : 'Unknown Exam';
        questionTitle = lastH2 ? lastH2.textContent.trim() : 'Unknown Question';

        // Create the GitHub issue/discussion URL
        const repo = 'adielBm/20604';
        const title = encodeURIComponent(`${examTitle} - ${questionTitle}`);
        //   const url = `https://github.com/${repo}/discussions/new?category=General&title=${title}`;
        // Or for issues:
        const url = `https://github.com/${repo}/issues/new?title=${title}`;

        // Create the button
        const button = document.createElement('button');
        button.textContent = 'Report';
        button.onclick = () => {
            window.open(url, '_blank');
        };

        answerEl.appendChild(button);
    });


















})
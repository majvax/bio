class TransitionPage extends HTMLElement {
    constructor() {
        super(); // Always call super first in constructor
        this.addEventListener('click', this.loadContent);
        this.style.cursor = 'pointer';
    this.style.fontFamily = 'Consolas, monospace';
    }

    loadContent = () => {
        const url = "views/" + this.getAttribute('view');
        const div = document.getElementById('content');

        div.style.opacity = 0;

        // Wait for the fade out to finish before loading new content
        setTimeout(() => {
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    div.innerHTML = html;
                    // Fade in the new content immediately after setting it
                    div.style.opacity = 1;
                })
                .catch(error => console.error('Error loading the HTML: ', error));
        }, 500); // Match this delay with the CSS transition time
    }
}

customElements.define('trans-page', TransitionPage);
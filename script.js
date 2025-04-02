document.addEventListener('DOMContentLoaded', () => {

    // Sla alle elementen op in variabelen.
    const wordForm = document.getElementById('wordForm');
    const wordInput = document.getElementById('word');
    const showWordsBtn = document.getElementById('showWords');
    const modal = document.getElementById('wordsModal');
    const closeBtn = document.querySelector('.close');
    const wordsList = document.getElementById('wordsList');

    // wanneer er op submit wordt geklikt op de form.
    wordForm.addEventListener('submit', (e) => {

        // we moeten ervoor zorgen dat de pagina niet daadwerkelijk het formulier verstuurd.
        e.preventDefault();


        // hier doen we een fetch request naar de server om het woord op te slaan.
        // We gebruiken de POST methode omdat we data naar de server willen sturen.
        fetch('words.php', {
            method: 'POST', // POST want versturen van data
            headers: { 'Content-Type': 'application/json' }, // we geven aan dat we JSON data versturen.
            body: JSON.stringify({ word: wordInput.value }) // wat we hier versturen is:
            /*
            {
                key: 'value'
            }

            de key is wat er straks uit de

            */
        })
        .then(res => res.json())
        .then(data => {
            wordInput.value = '';
            showToast('Word added!');
        })
        .catch(err => {
            console.error(err);
            showToast('Failed to add word.');
        });
    });

    showWordsBtn.addEventListener('click', () => {
        fetch('words.php')
            .then(res => res.json())
            .then(words => {
                wordsList.innerHTML = words.length 
                    ? words.map(word => `<li>${word}</li>`).join('')
                    : '<li>No words added yet.</li>';
                modal.style.display = 'flex';
            })
            .catch(err => {
                console.error(err);
                showToast('Failed to fetch words.');
            });
    });

    closeBtn.onclick = () => modal.style.display = 'none';

    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    };

    // Simple toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.background = '#333';
        toast.style.color = '#fff';
        toast.style.padding = '10px 20px';
        toast.style.borderRadius = '5px';
        toast.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease-in-out';
        document.body.appendChild(toast);
        setTimeout(() => toast.style.opacity = '1', 100);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
});

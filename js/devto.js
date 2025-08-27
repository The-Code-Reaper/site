document.addEventListener("DOMContentLoaded", () => {
    const articlesList = document.getElementById('articlesList');

    fetch('https://dev.to/api/articles?per_page=5&top=1')
        .then(response => response.json())
        .then(data => {
            articlesList.innerHTML = ''; // clear loading text
            if(data.length === 0){
                articlesList.innerHTML = '<li>No popular articles found</li>';
                return;
            }
            data.forEach((article, index) => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = article.url;
                link.textContent = article.title;
                link.target = "_blank";
                li.appendChild(link);
                articlesList.appendChild(li);
            });
        })
        .catch(err => {
            articlesList.innerHTML = '<li>Failed to load articles</li>';
            console.error(err);
        });
});

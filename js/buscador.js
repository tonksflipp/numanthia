document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const button = document.getElementById('searchButton');

  const main = document.querySelector('main');

  // Creamos el contenedor solo una vez
  let resultsContainer = document.createElement('section');
  resultsContainer.id = 'searchResultsSection';
  main.appendChild(resultsContainer);

  function buscar() {
    const query = input.value.toLowerCase();
    resultsContainer.innerHTML = ''; // limpiar resultados anteriores

    if (!query) return;

    const resultados = paginas.filter(p =>
      p.titulo.toLowerCase().includes(query) ||
      p.contenido.toLowerCase().includes(query)
    );

    const ul = document.createElement('ul');

    if (resultados.length === 0) {
      ul.innerHTML = '<li>No results found.</li>';
    } else {
      resultados.forEach(pagina => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${pagina.url}"><strong>${pagina.titulo}</strong></a><br><small>${pagina.contenido}</small>`;
        ul.appendChild(li);
      });
    }

    // Título de resultados
    const h2 = document.createElement('h2');
    h2.textContent = 'Search Results';

    resultsContainer.appendChild(h2);
    resultsContainer.appendChild(ul);
  }

  button.addEventListener('click', buscar);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscar();
  });
});

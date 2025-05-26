function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function buscar() {
  const input = document.getElementById('searchInput');
  const query = input.value.trim().toLowerCase();
  if (!query) return;
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

function mostrarResultados(query) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  const resultados = paginas.filter(p =>
    p.titulo.toLowerCase().includes(query) ||
    p.contenido.toLowerCase().includes(query)
  );

  const h2 = document.createElement('h2');
  h2.textContent = `Results for "${query}"`;
  resultsContainer.appendChild(h2);

  const ul = document.createElement('ul');

  if (resultados.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No results found.';
    ul.appendChild(li);
  } else {
    resultados.forEach(pagina => {
      const li = document.createElement('li');
      li.innerHTML = `<a href="${pagina.url}"><strong>${pagina.titulo}</strong></a><br><small>${pagina.contenido}</small>`;
      ul.appendChild(li);
    });
  }

  resultsContainer.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
  const query = getQueryParam('q');
  if (query) {
    document.getElementById('searchInput').value = query;
    mostrarResultados(query.toLowerCase());
  }

  const btn = document.getElementById('searchButton');
  if (btn) {
    btn.addEventListener('click', buscar);
  }
});

// Função para buscar dados da API
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => response.json()) // Converte a resposta para JSON
  .then((data) => {
    // Pega os primeiros 5 itens
    const firstFiveItems = data.slice(0, 5);

    // Adiciona os itens na lista
    const tasksContainer = document.getElementById("tasks-container");

    firstFiveItems.forEach((item) => {
      // Cria a estrutura da tarefa (checkbox, título e botão remover)
      let li = document.createElement("li");
      li.style.listStyleType = "none";
      li.style.display = "grid";
      li.style.placeItems = "center";
      li.style.minHeight = "3em";
      li.style.borderRadius = "0.5em";
      li.style.backgroundColor = "#D8CBC6";
      li.style.gridTemplateColumns = "0.1fr 1fr 0.2fr";

      // Cria o checkbox
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.width = "2em";
      checkbox.style.height = "2em";
      checkbox.checked = item.completed; // Marca o checkbox com base no status 'completed'

      

      let uniqueId = "checkbox-id-" + item.id;
      checkbox.id = uniqueId;

      // Cria o label
      let label = document.createElement("label");
      label.htmlFor = uniqueId;
      label.textContent = item.title;

      label.style.textDecoration = checkbox.checked ? "line-through" : "none";

      checkbox.addEventListener("change", () => {
        label.style.textDecoration = checkbox.checked ? "line-through" : "none";
      });

      // Cria o botão de remover
      let button = document.createElement("button");
      button.style.width = "5em";
      button.style.height = "2.5em";
      button.style.color = "white";
      button.style.border = "none";
      button.style.backgroundColor = "#C82333";
      button.style.borderRadius = "0.5em";
      button.textContent = "remover";

      button.addEventListener("click", () => {
        li.remove();
      });

      // Adiciona os elementos ao item da lista
      li.append(checkbox, label, button);
      tasksContainer.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Erro ao buscar os dados:", error);
  });

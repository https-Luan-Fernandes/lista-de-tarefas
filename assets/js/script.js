document
  .getElementById("heading-form-container")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o comportamento padrão de submissão do formulário
  });

// Escuta evento de click no botão "Adicionar"
document.getElementById("add-task-btn").addEventListener("click", () => {

  let p = document.getElementById("input-error");
  // Coleta texto digitado na tag de input de tarefa
  // Retira espaços em branco do início e fim da string
  let typedText = document.getElementById("task").value.trim();
  if (typedText === "") {
    p.textContent = "O campo não pode estar vazio!";
    p.style.color = "red";
    p.style.display = "block";
  } else {
    p.style.display = "none";
  }

  if (typedText !== "") {
    // Cria uma div para armazenar os elementos da tarefa
    let li = document.createElement("li");
    // Remove bullets dos items
    li.style.listStyleType = "none";
    li.style.display = "grid";
    li.style.placeItems = "center";
    li.style.minHeight = "3em";
    li.style.borderRadius = "0.5em";
    li.style.backgroundColor = "#D8CBC6";
    li.style.gridTemplateColumns = "0.1fr 1fr 0.2fr";
    // Cria um elemento de input
    let checkbox = document.createElement("input");
    // Adiciona o tipo "checkbox" para o elemento "input"
    checkbox.type = "checkbox";
    checkbox.style.width = "2em";
    checkbox.style.height = "2em";

    let uniqueId = "checkbox-id-" + Date.now();
    // Adiciona um ID dinâmico para o elemento "input"
    checkbox.id = uniqueId;
    // Escuta mudança no checkbox
    // Altera o estilo se for marcado ou desmarcado
    // Se marcado: Adiciona uma linha cortando o texto
    // Se não marcado: Retira a linha contando o texto
    checkbox.addEventListener("change", () => {
      label.style.textDecoration = checkbox.checked ? "line-through" : "none";
    });
    // Cria um label para armazenar o texto da task
    let label = document.createElement("label");
    // Adiciona o ID referente ao checkbox no rótulo
    label.htmlFor = uniqueId;
    // Preenche o label com o texto digitado na tag de input de tarefa
    label.textContent = typedText;
    // Cria um elemento "button"
    let button = document.createElement("button");
    button.style.width = "5em";
    button.style.height = "2.5em";
    button.style.color = "white";
    button.style.border = "none";
    button.style.backgroundColor = "#C82333";
    button.style.borderRadius = "0.5em";

    // Adiciona o texto "remover" ao botão
    button.textContent = "remover";
    // Escuta evento de click no botão remover
    // Se clicado: remove o elemento pai dos elementos da task -> div
    button.addEventListener("click", () => {
      li.remove();
    });
    // Adiciona os elementos criados ao container da tarefa
    li.append(checkbox, label, button);
    // Adiciona o container com os elementos das tarefa ao container de tarefas
    document.getElementById("tasks-container").appendChild(li);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    let taskId = localStorage.key(i);
    let taskData = localStorage.getItem(taskId);

    if (taskData) {
      let task = JSON.parse(taskData);

      // Verifica se a tarefa tem texto antes de criar o item
      if (task.text && task.text.trim() !== "") {
        // Verificação para evitar tarefas vazias
        let li = document.createElement("li");
        li.style.listStyleType = "none";
        li.style.display = "grid";
        li.style.placeItems = "center";
        li.style.minHeight = "3em";
        li.style.borderRadius = "0.5em";
        li.style.backgroundColor = "#D8CBC6";
        li.style.gridTemplateColumns = "0.1fr 1fr 0.2fr";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.width = "2em";
        checkbox.style.height = "2em";
        checkbox.checked = task.checked;
        checkbox.id = task.id;

        let label = document.createElement("label");
        label.htmlFor = task.id;
        label.textContent = task.text;

        if (task.checked) {
          label.style.textDecoration = "line-through";
        }

        checkbox.addEventListener("change", () => {
          label.style.textDecoration = checkbox.checked
            ? "line-through"
            : "none";
          task.checked = checkbox.checked;
          localStorage.setItem(task.id, JSON.stringify(task));
        });

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
          localStorage.removeItem(task.id);
        });

        li.append(checkbox, label, button);
        document.getElementById("tasks-container").appendChild(li);
      }
    }
  }
});

document.getElementById("add-task-btn").addEventListener("click", () => {
  let p = document.getElementById("input-error");
  let typedText = document.getElementById("task").value.trim(); // Remove espaços em branco

  // Verificação para não permitir tarefa vazia
  if (typedText === "") {
    p.textContent = "O campo não pode estar vazio!";
    p.style.color = "red";
    p.style.display = "block";
    return; // Não adiciona a tarefa vazia
  } else {
    p.style.display = "none"; // Esconde o erro
  }

  let li = document.createElement("li");
  li.style.listStyleType = "none";
  li.style.display = "grid";
  li.style.placeItems = "center";
  li.style.minHeight = "3em";
  li.style.borderRadius = "0.5em";
  li.style.backgroundColor = "#D8CBC6";
  li.style.gridTemplateColumns = "0.1fr 1fr 0.2fr";

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.style.width = "2em";
  checkbox.style.height = "2em";

  let uniqueId = "checkbox-id-" + Date.now(); // Cria um ID único baseado no timestamp
  checkbox.id = uniqueId;

  let label = document.createElement("label");
  label.htmlFor = uniqueId;
  label.textContent = typedText; // Adiciona o texto da tarefa

  let button = document.createElement("button");
  button.style.width = "5em";
  button.style.height = "2.5em";
  button.style.color = "white";
  button.style.border = "none";
  button.style.backgroundColor = "#C82333";
  button.style.borderRadius = "0.5em";
  button.textContent = "remover";

  button.addEventListener("click", () => {
    li.remove(); // Remove o item da lista
    localStorage.removeItem(uniqueId); // Remove do localStorage
  });

  li.append(checkbox, label, button);

  let task = {
    id: uniqueId,
    text: typedText,
    checked: checkbox.checked,
  };

  document.getElementById("tasks-container").appendChild(li); // Adiciona ao container
  document.getElementById("task").value = ""; // Limpa o campo de entrada

  // Salva no localStorage
  localStorage.setItem(task.id, JSON.stringify(task));
});

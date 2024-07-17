import React, { useState, useEffect, useMemo } from "react";
import "./style.css";

function App() {
  const [tarefas, setTarefas] = useState(
    JSON.parse(localStorage.getItem("Tasks")) || []
  );

  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(tarefas));
  }, [tarefas]);

  const handledAdd = (e) => {
    e.preventDefault();
    if (novaTarefa.trim() !== "") {
      let date = new Date().toLocaleDateString();
      setTarefas([...tarefas, `${novaTarefa} - ${date}`]);
      setNovaTarefa("");
    }
  };

  const totalTarefas = useMemo(() => tarefas.length, [tarefas]);

  return (
    <div>
      <header>
        <h2>Tarefas do dia</h2>
      </header>
      <form onSubmit={handledAdd}>
        <input
          type="text"
          name="textTask"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit">Adicionar</button>
      </form>
      {totalTarefas >= 1 && (
        <ul className="list">
          {tarefas.map((item, index) => (
            <li key={index}>
              <input type="checkbox" name="chk" />
              {item}
            </li>
          ))}
        </ul>
      )}
      <br />
      {totalTarefas >= 1 && (
        <strong>Quantidade de total de tarefa(s) : {totalTarefas}</strong>
      )}
    </div>
  );
}

export default App;

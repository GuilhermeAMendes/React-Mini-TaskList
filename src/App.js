import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
  
  const [tarefas, setTarefas] = useState([]);

  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Tasks")) || [];
    setTarefas(data)
  }, []);

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
      <ul className="list">
        {tarefas.map((item, index) => (
          <li key={index}>
            <input type="checkbox" name="chk" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

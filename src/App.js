import React, { useEffect, useState } from 'react';
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
          setRepositories(response.data);
        });
    }, []); 

  //const repositories = [];
  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: "https://www.google.com",
      techs: ["nodejs","reactjs" ]
  });
  const repository = response.data;
  setRepositories([...repositories, repository]);
}


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }
  
  return (
    <div>   
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}

      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';

export interface IAnimal {
  id: number,
  type: string,
  name: string,
  age: number
}

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const lastQuery = localStorage.getItem('lastQuery') ?? '';

    search(lastQuery);
  }, []);

  const search = async (q: string) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({ q })
    );

    const data = await response.json();

    setAnimals(data);

    localStorage.setItem('lastQuery', q);
  }

  return (
    <main>
      <h1>Animal Farm</h1>

      <input type='text' placeholder='Search' onChange={(e) => search(e.target.value)} />

      <ul>
        {!animals.length && 'No animals found'}

        {animals.map((animal: IAnimal) => (
          <Animal key={animal.id} {...animal} />
        ))}
      </ul>
    </main>
  );
}

function Animal({ type, name, age }: IAnimal): JSX.Element {
  return (
    <li>
      <strong>{type}</strong> {name} ({age} years old)
    </li>
  );
}

export default App;

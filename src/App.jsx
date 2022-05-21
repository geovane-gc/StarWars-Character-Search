import { useState, useEffect } from "react";
import { Title } from "./components/Title";
import { Footer } from "./components/Footer";

function App() {
  const [inputText, setInputText] = useState("");
  const [charactersList, setCharactersList] = useState([]);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterMovies, setCharacterMovies] = useState([]);

  console.log(characterMovies);

  useEffect(() => {
    fetchCharacters();
  }, [isCharacterSelected]);

  async function fetchCharacters() {
    let nextPage = "https://swapi.dev/api/people/";
    let characters = [];

    while (nextPage) {
      const response = await fetch(nextPage);
      const { next, results } = await response.json();
      nextPage = next;
      characters = [...characters, ...results];
    }

    setCharactersList(characters);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const movies = selectedCharacter.films;

    let moviesFetched = [];

    await Promise.all(
      movies.map(async (movie) => {
        const response = await fetch(movies);
        const swfilm = await response.json();

        moviesFetched.push(swfilm);
      })
    );
    setCharacterMovies(moviesFetched);
  };

  return (
    <>
      <Title />

      <section className="w-full flex items-center justify-center">
        <div className="font-sans text-center bg-zinc-900 border border-zinc-800 bg-opacity-70 backdrop-filter backdrop-blur-sm p-12 rounded-2xl flex flex-col items-center justify-center w-80 text-xl lg:text-lg">
          Procure por seus personagens:
          <input
            type="text"
            required
            className="my-5 text-center bg-transparent border-0 border-b-2 border-yellow-400 placeholder-yellow-400 focus:border-yellow-400 focus:ring-0 focus:outline-none"
            placeholder="Digite aqui..."
            onChange={(event) => setInputText(event.target.value)}
          />
          {!isCharacterSelected
            ? charactersList &&
              charactersList.map((character) => {
                return (
                  character.name
                    .toLowerCase()
                    .match(inputText.toLowerCase()) && (
                    <div
                      key={character.name}
                      onClick={() => {
                        setIsCharacterSelected(true);
                        setSelectedCharacter(character);
                      }}
                      className="cursor-pointer hover:text-yellow-400 transition-colors"
                    >
                      {character.name}
                    </div>
                  )
                );
              })
            : selectedCharacter && (
                <>
                  <div className="flex flex-col">
                    <span>Nome: {selectedCharacter.name}</span>
                    <span>
                      Ano de nascimento: {selectedCharacter.birth_year}
                    </span>
                    <span>Gênero: {selectedCharacter.gender}</span>
                    <span>Cor dos olhos: {selectedCharacter.eye_color}</span>
                    <span>Filmes:</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCharacter(null);
                      setIsCharacterSelected(false);
                    }}
                    className="flex p-2 px-4 mt-5 rounded-2xl text-yellow-400 border border-yellow-400 hover:text-black hover:bg-yellow-400 transition-colors"
                  >
                    Voltar
                  </button>
                </>
              )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;

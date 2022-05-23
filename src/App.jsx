import { useState, useEffect } from "react";
import { Title } from "./components/Title";
import { Footer } from "./components/Footer";
import { CircleNotch } from "phosphor-react";

import { api } from "./services/api";

const RECORDS_BY_PAGE = 10;

function App() {
  const [inputText, setInputText] = useState("");
  const [charactersList, setCharactersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCharacterSelected, setIsCharacterSelected] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [characterMovies, setCharacterMovies] = useState([]);

  console.log(characterMovies);

  useEffect(() => {
    if (selectedCharacter) {
      async function loadFilms() {
        try {
          setIsLoading(true);
          const promises = selectedCharacter.films.map((film) => {
            return api({ url: film });
          });
          const promiseResults = await Promise.all(promises);
          const newFilmsList = [
            ...characterMovies,
            ...promiseResults.map((r) => r.data),
          ];
          setCharacterMovies(newFilmsList);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }

      loadFilms();
    }
  }, [selectedCharacter]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        let promises = [];
        for (let i = 1; i < RECORDS_BY_PAGE; i++) {
          let request;
          if (i == 1) {
            request = api.get("people");
          } else {
            request = api.get(`people/?page=${i}`);
          }
          promises.push(request);
        }
        const promiseResults = await Promise.all(promises);
        const newCharactersList = [
          ...charactersList,
          ...promiseResults.map((r) => r.data.results),
        ].flat();
        setCharactersList(newCharactersList);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

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
          {isLoading ? (
            <CircleNotch weight="bold" className="w-4 h-4 animate-spin" />
          ) : !isCharacterSelected ? (
            charactersList &&
            charactersList.map((character) => {
              return (
                character.name.toLowerCase().match(inputText.toLowerCase()) && (
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
          ) : (
            selectedCharacter && (
              <>
                <div className="flex flex-col">
                  <span>Nome: {selectedCharacter.name}</span>
                  <span>Ano de nascimento: {selectedCharacter.birth_year}</span>
                  <span>Gênero: {selectedCharacter.gender}</span>
                  <span>Cor dos olhos: {selectedCharacter.eye_color}</span>
                  <span>Filmes:</span>
                  {characterMovies.map((movie) => {
                    return (
                      <span>
                        {movie.title} <br />
                        {movie.release_date}
                      </span>
                    );
                  })}
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
            )
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;

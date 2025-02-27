import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams(); //buscando o parametro que deverar ser usado
  const navigation = useNavigate();

  const [filme, setFilme] = useState({}); //declarando um estado para armazenar o filme
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "8efcd0c62485903af4df3651d0173a1c",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigation("/", { replace: true }); //caso caia aqui no catch ele navega para pagina inicial
          return;
        });
    }

    loadFilme();

    return () => {
      // console.log("Componente desmontado");
    };
  }, [navigation, id]);

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando...</h1>
      </div>
    );
  }

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");
  
    let filmesSalvos = JSON.parse(minhaLista) || [];
  
    // Verifica se o filme já está salvo
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);
  
    if (hasFilme) {
      toast.warn("Esse filme já esta na lista!");
      return;
    }
  
    // Adiciona o novo filme à lista
    filmesSalvos.push(filme);
  
    // Salva no localStorage
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
  
    toast.success("Filme salvo com sucesso!");
  }
  

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>

      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>

        <button>
          <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
        </button>
      </div>
    </div>
  );
}

export default Filme;

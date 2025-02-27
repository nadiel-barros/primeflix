import { useState, useEffect } from "react";
import api from "../../services/api";
import {Link} from 'react-router-dom';
import './home.css'

// URL DA API: /movie/now_playing?api_key=8efcd0c62485903af4df3651d0173a1c&language=pt-BR
// https://api.themoviedb.org/3/movie/now_playing?api_key=8efcd0c62485903af4df3651d0173a1c&language=pt-BR

function Home() {
  const [filmes, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "8efcd0c62485903af4df3651d0173a1c",
          language: "pt-BR",
          page: 1,
        },
      });

      // console.log(response.data.results.slice(0, 10));
      setFilme(response.data.results.slice(0, 10));
    }
    loadFilme();
    setLoading(false);
  }, []);



  if(loading){
    return (
      <div className="loading">
        <h1>Carregando filmes...</h1>
      </div>
    )
  }


  return (
    <div className="container">
      <div className="lista-filmes">
        {
          filmes.map((filme)=>{
            return(
              <article key={filme.id} className="filme">
                <strong>{filme.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                <Link to={`/filme/${filme.id}`}>Acesssar</Link>
              </article>
            )
          })
        }
      </div>
    </div>
  );
}

export default Home;

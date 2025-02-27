 import { Link } from "react-router-dom";
 import './erro.css';

function NotFaund() {

    return (
      <div className="not-found">
          <h1>404</h1>
          <h2>Página não encontrada!!!</h2>
          <Link to="/">Voltar para Home</Link>
      </div>
    )
  }
  
  export default NotFaund;
  
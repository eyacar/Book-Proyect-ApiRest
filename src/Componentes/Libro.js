import React from "react";
import useFetch from "../useFetch"
import {Link,useParams} from "react-router-dom";

const Libro = () => {
    const params = useParams();
    const Datos = useFetch("https://api-book.eyacar.vercel.app/api/libro/"+params.titulo)
    const Publisher = useFetch("https://api-book.eyacar.vercel.app/api/editorial")
    const date = new Date(Datos.publishedDate)
    const year = date.getFullYear()
  
  const publish = Publisher.filter((p)=> Datos.IDpublisher === p.id).map((p,i)=> p.publisher)
    return (
      <div id="elegido">
      <h2>Libro elegido: <u>{Datos.title}</u></h2>
      <h3>ISBN: {Datos.isbn}</h3>
      {Datos.description?
      <p> <strong><u><em>Descripción</em></u>: </strong> {Datos.description}</p>
        :null}
      <h3>Datos:</h3>
      <ul>
      <li>Cantidad de Paginas: {Datos.pageCount}</li>
      <li>Año de publicación: {year}</li>
      <li>Editorial: {publish}</li>
      <li>Pais: {Datos.country}</li>
      </ul>
      {Datos.categories?
      <>
      <h3>Categorias:</h3>
      <ul>
      {Datos.categories.map((cat,i)=><li key={i}>{cat}</li>)}
      </ul>
      </>
      :null}
      
      {Datos.authors?
      <>
      {Datos.authors.length>1?<h3>Autores:</h3>:<h3>Autor:</h3>}
      <ul>
      {Datos.authors.map((au,i)=><li key={i}>{au}</li>)}
      </ul>
      </>
      :<h4>No hay datos</h4>}
      <div style={{width:'100%'}} >
      <img style={{margin:'1% auto'}} src={Datos.thumbnailUrl} alt={Datos.title}/>   
      </div>
        <Link to="/" id="ancor">
          <input type="button" value="Home" />
        </Link>
      </div>
    );
  };

export default Libro;

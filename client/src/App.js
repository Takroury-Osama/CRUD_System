import './App.css';
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { Table } from 'react-bootstrap';




function App() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [rate, setRate] = useState(0)
  const [feedback, setFeedback] = useState('')

  const [movieList, setMovieList] = useState([])

  const [newFeedback, setNewFeedback] = useState('')

  const displayInfo = (e) => {
    e.preventDefault()
  //  const movie = {title, author, rate, feedback}
   // console.log(movie);
  }

  useEffect(() => {
    getMovies() 
  },[])
  
  const addMovie = () => {
    Axios.post('http://localhost:3001/create', {
      title: title,
      author: author,
      rate: rate,
      feedback: feedback
    })
    .then(() => {
      alert('Thanks for your feedback.')
      
      getMovies()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getMovies = () => {
    Axios.get("http://localhost:3001/movies")
    .then((response) => {
      setMovieList(response.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const deleteMovie = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
    .then(() => {
      setMovieList(movieList.filter((val) => {
       return val.id != id
      }))
      getMovies()
    })
    
    .catch((err) => {
      console.log(err);
    })
  }

const updateMovie = (id) => {
  Axios.put(`http://localhost:3001/update/${id}`, {feedback: newFeedback})
  .then((response) => {
   console.log(response);
  })

  .catch((err) => {
    console.log(err);
  })
}

  return (
    <div className="mt-3 form-view">
      <h2>Give us Your Feedback..</h2>
      <form onSubmit={displayInfo}>
        <label>Film Title:</label>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Film Author:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)}
        />
         <label>Film Rate:</label>
        <input 
          type="number" 
          value={rate} 
          onChange={(e) => setRate(e.target.value)}
        />
        <label>Your Valued Feedback:</label>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        >
        </textarea>
        <button onClick={addMovie}>Add Review</button>
        <button className="view-button" onClick={getMovies}>View Movies</button>
      </form> 
      
        <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Author</th>
            <th>Rate</th>
            <th>Feedback</th>
          </tr>
        </thead>
        {movieList.map((val, key) => {
      return (
        <tbody>
          <tr>
            <td>{val.title}</td>
            <td>{val.author}</td>
            <td>{val.rate}</td>
            <td>{val.feedback} <input type="text"  onChange={(e) => setNewFeedback(e.target.value)}></input></td>
            <td><button className="danger-button" onClick={() => {deleteMovie(val.Movieid)}}>Delete</button></td>
            <td><button className="edit-button" onClick={() => {updateMovie(val.Movieid)}}>Edit</button></td>

          </tr>
        </tbody>
      )
      
    })}
</Table>
    </div>
  );
}

export default App;

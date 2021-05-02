import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import ExerciseCreate from './components/exercise-create';
import ExerciseEdit from './components/exercise-edit';
import ExercisesList from './components/exercises-list';
import UserCreate from './components/user-create';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/edit/:id" component={ExerciseEdit} />
      <Route path="/create" component={ExerciseCreate} />
      <Route path="/user" component={UserCreate} />
    </Router>
  );
}

export default App;

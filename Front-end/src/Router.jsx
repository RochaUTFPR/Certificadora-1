import { Routes, Route } from 'react-router-dom'
import { Home } from './Home/home.jsx'
import { Question } from './question/question.jsx'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path='/question/:id' element={<Question/>} />
    </Routes>
  )
}
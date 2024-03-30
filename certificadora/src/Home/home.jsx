import './home.css'
import { useState } from 'react';

import {ContainerLogin} from '../Components/ContainerLogin/ContainerLogin.jsx'
import { Question } from '../Components/Question/Question.jsx';

export function Home() {
  const [Login, setLogin] = useState(false);



  return (
    <>
    <div className='Background'>
      {Login? <Question/>: <ContainerLogin setLogin={setLogin} /> }
    </div>
    </>
  )
}



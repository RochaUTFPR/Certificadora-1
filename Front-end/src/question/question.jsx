import { useParams } from "react-router-dom";
import questions from "../utils/questions";
import './question.css'

export function Question() {
    const { id } = useParams();

    const question = questions.find(question => question.id == id)
    
    return (
        <main>{id}

         {question.id}
         {question.nivel}
         {question.resposta}
         {question.title}



        </main>
    )
}
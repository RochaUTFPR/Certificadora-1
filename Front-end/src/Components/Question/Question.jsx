import './Question.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Direction from './img/Direction.png'
import User_Img from '../../assets/img/User.png'
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../utils/AppContext';
import questions from '../../utils/questions';

export function Question() {
    const [Question, setQuestion] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState('all');
    const navigate = useNavigate();
    const { User, updateUserAttribute, updateQuestionAttribute} = useAppContext();


    

    const Questions = questions;
    const handleClick = (questionsId) => {
       
        const userNivel = User.nivel;
        const questionNivel = Questions[questionsId - 1]?.nivel;
        console.log(userNivel);
        console.log(questionNivel);
        if(!(questionNivel > userNivel)){
            navigate(`/Question/${questionsId}`);
        }else{
            
        }
        
    }

    useEffect(() => {
        const parseQuestions = Questions.filter(Questions => Questions.nivel === parseInt(1)).concat(Questions.filter(Questions => Questions.nivel === parseInt(2))).concat(Questions.filter(Questions => Questions.nivel === parseInt(3)));
        setQuestion(parseQuestions);
    }, []);

    function reverseQuestion(){
        const reversedQuestions = [...Question].reverse();
        setQuestion(reversedQuestions)
    }

    function handleLevelChange(event) {
        setSelectedLevel(event.target.value);
    }

    function filterQuestionsByLevel() {
        if (selectedLevel === 'all') {
            return Question;
        } else {
            return Question.filter(question => question.nivel === parseInt(selectedLevel));
        }
        
    }

    const filteredQuestions = filterQuestionsByLevel();

    return (
        <div className="container-question">
            <div className='Container-list'>
                <div className='container-title'>
                    <h2>Desafios de física <span className='line'/></h2>
                </div>
                <div className='container-dropdown'>
                    <img className='Direction' onClick={reverseQuestion} src={Direction} alt="Direction arrow" />
                <select id="dropdown" onChange={handleLevelChange}>
                    <option value="1">Nivel 1</option>
                    <option value="2">Nivel 2</option>
                    <option value="3">Nivel 3</option>
                    <option value="all">Todas</option>
                </select>
                </div>
                <div className="question">
                    <ul className="question-list">
                        {filteredQuestions.map((question) => (
                            <div
                                key={question.id}
                                onClick={() => handleClick(question.id)}
                                className={`question-item ${User.Questions[question.id]?.success === 'Error' ? 'error-background' : User.Questions[question.id]?.success === 'Correct' ? 'correct-background' : ''} ${question.nivel > User.nivel ? 'blocked-blackground' :''}`}
                            >
                                <p className='title'>{question.title}</p>
                                <p>Nivel: {question.nivel}</p>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
           
            <div className="info-user">
                <div className='container-user'>
                    <div className='container-p'>
                        <p>{User.nome}</p>
                        <p>Uma máquina</p>
                    </div>
                    <img src={User_Img} alt="imagem do usuario"/>
                </div>
                <div className='container-info'>
                    <p>Nivel desbloqueado: {User.nivel}</p>
                    <p>{User.pontos} Pontos</p>
                </div>
            </div>
        </div>
    )
}

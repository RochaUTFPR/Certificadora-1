import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import questions from '../utils/questions';
import './question.css';
import User_Profile from '../assets/img/User.png';
import { useAppContext } from '../utils/AppContext';

export function Question() {
    const { id } = useParams();
    const question = questions.find(q => q.id === parseInt(id));

    const [selectedAnswer, setSelectedAnswer] = useState('');

    const { User, updateUserAttribute, updateQuestionAttribute} = useAppContext();
    
    const checkResponse = () => {
        console.log("cliquei")
        if(question.resposta_correta === selectedAnswer ) {
           return updateQuestionAttribute(question.id,"success","Correct")
        }
        const attempt = User.Questions[question.id].attempt;
        updateQuestionAttribute(question.id,"attempt", attempt + 1)
        updateQuestionAttribute(question.id,"success","Error")
        return 
    }

    const handleChange = (value) => {
        setSelectedAnswer(value);
    };

    //parei aqui
    const checkSucess = (attempt = false) => {
        let success = false
        if(attempt) {
            return success
        }
        if (User.Questions[question.id].success === "Error") {
            success = true
            return success
        }
    }

    if (!question) {
        return <p>Pergunta não encontrada</p>;
    }

    return (
        <main>
            <div className="PerfilContainer">
                <img className="imgUser" src={User_Profile} alt="imagem do usuário" />
                <div className="ContainerUserDescription">
                    <p>João da Silva</p>
                    <p>Nível desbloqueado: 2</p>
                    <p>999 Pontos</p>
                </div>
            </div>
            <div className="ContainerQuestion">
                <div>
                    <p>{question.title}</p>
                    {Array.isArray(question.resposta) ? (
                        <div className='Container_response'>
                            {question.resposta.map((option, index) => (
                                <div key={index} className="answer-option">
                                    <input
                                        type="radio"
                                        id={`${question.id}-${index}`}
                                        name={`question-${question.id}`}
                                        value={option}
                                        checked={selectedAnswer === option}
                                        onChange={() => handleChange(option)}
                                    />
                                    <label htmlFor={`${question.id}-${index}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>{question.resposta}</p>
                    )}
                </div>
                
                <div className='ContainerButton'>
                    <button className='Button' onClick={checkResponse} disabled={false} >Responder</button>
                </div>
            </div>
            {(User.Questions[question.id].attempt > 0) ? (
                <div className='BannerWarning'>
                    <h4>você já resolveu esse problema, deseja resolver novamente?</h4>
                    <div className='container_Button'>
                        <button className='Button' >Tentar novamente</button>
                        <button className='Button_cancelar' >Cancelar</button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </main>
    );
}

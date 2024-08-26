import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import questions from '../utils/questions';
import './question.css';
import User_Profile from '../assets/img/User.png';
import { useAppContext } from '../utils/AppContext';
import { useNavigate } from 'react-router-dom';
import up from './img/up.png';
import down from './img/down.png';

export function Question() {
    const { id } = useParams();
    const question = questions.find(q => q.id === parseInt(id));

    const [selectedAnswer, setSelectedAnswer] = useState('');
    const navigate = useNavigate();
    const [responderNovamente, setResponderNovamente] = useState()
    const { User, updateUserAttribute, updateQuestionAttribute} = useAppContext();
    const [limiteTentativas, setLimiteTentativas] = useState()

    const checkResponse = () => {
        setResponderNovamente(false)
        if(question.resposta_correta === selectedAnswer ) {
            handleBack()
           updateQuestionAttribute(question.id,"success","Correct")
           const questionNivel = question.nivel;
           //const userNivel = User.nivel;
           const pontos = User.pontos;
           
           if(questionNivel == 1){
            updateUserAttribute("pontos",pontos + (100 / (2 ** User.Questions[question.id].attempt)));
           
            if(User.nivel == 1){
                updateUserAttribute("nivel", 2);
            }          
           }else if(questionNivel == 2){
            updateUserAttribute("pontos",pontos + 250);
           
            if(User.nivel == 2){
                updateUserAttribute("nivel", 3);
            }
           }else{
            updateUserAttribute("pontos",pontos + 500);
           
           }

           
           //console.log(question.nivel);
           //return 
        }else{
        
        updateQuestionAttribute(question.id,"success","Error")
        handleBack()
        }
        const attempt = User.Questions[question.id].attempt;
        updateQuestionAttribute(question.id,"attempt", attempt + 1)
        return 
    }

    useEffect(() => {
        if((User.Questions[question.id].attempt > 0)){
            setResponderNovamente(false)
        }else (
            setResponderNovamente(true)
        )
      }, []);

      useEffect(() => {
        if((User.Questions[question.id].attempt >= 5)){
            setLimiteTentativas(true)
        }else (
            setLimiteTentativas(false)
        )
      }, []);

    const handleChange = (value) => {
        setSelectedAnswer(value);
    };

    const handleBack = () => {
        navigate('/'); 
      
    };

    const TentarNovamente = () => {
        setResponderNovamente(true)
    }

    const alterarDificuldade = (p) => {
        console.log('estou na funcao')
        const nivel = question.nivel;
        if(p == "aumentar"){
            if(nivel < 3){
                question.nivel = nivel + 1;
            }
        }else{
            if(nivel > 1){
                question.nivel = nivel - 1;
            }
        }
        navigate('/'); 
    }
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
                    <p>{User.nome}</p>
                    <p>Nível desbloqueado: {User.nivel}</p>
                    <p>{User.pontos} Pontos</p>
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
                    <button className={!responderNovamente ? 'ButtonDisabled': 'Button'} onClick={checkResponse} disabled={!responderNovamente} >Responder</button>
                    {(User.Questions[question.id].attempt > 0)  ? (
                        <div className='containerDificuldade'>
                            <p>Alterar Dificuldade: </p>
                            <button className='buttonDificuldade' onClick={() => alterarDificuldade('aumentar')}> <img className='buttonImg' src={up} alt="Flecha para baixo" /></button>
                            <button className='buttonDificuldade' onClick={() => alterarDificuldade('diminuir')}> <img className='buttonImg' src={down} alt="Flecha para baixo" /></button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

            </div>
            {(User.Questions[question.id].attempt > 0)&&(responderNovamente == false)  ? (
                <div className='BannerWarning'>
                    <h4>você já resolveu esse problema, deseja resolver novamente?</h4>
                    <div className='container_Button'>
                        <button className='Button' onClick={TentarNovamente} disabled={limiteTentativas}>Tentar novamente</button>
                        <button className='Button_cancelar' onClick={handleBack}>Cancelar</button>
                    </div>
                    
                </div>
            ) : (
                <></>
            )}
        </main>
    );
}

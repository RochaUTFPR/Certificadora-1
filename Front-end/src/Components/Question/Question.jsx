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


    //Depois tirar essa porra
    const tQuestions = [
        {
            id: 1,
            title: "Um carro viaja a uma velocidade constante de 50 m/s por 3 minutos. Qual a distância percorrida pelo carro durante esse tempo?",
            nivel: 1,
        },
        {
            id: 2,
            title: "Um objeto é lançado verticalmente para cima a uma velocidade inicial de 15 m/s. Quanto tempo levará para o objeto atingir o ponto mais alto de sua trajetória?",
            nivel: 1,
        },
        {
            id: 3,
            title: "Um estudante empurra uma caixa com uma força de 50 N em uma superfície horizontal. Se a caixa não se move, qual é a força de atrito atuando sobre ela?",
            nivel: 1,
        },
        {
            id: 4,
            title: "Um avião viaja a uma velocidade de 300 km/h em uma altitude de 10.000 metros. Qual é a distância horizontal que o avião percorre em 2 horas?",
            nivel: 2,
        },
        {
            id: 5,
            title: "Um projétil é lançado horizontalmente a uma velocidade de 30 m/s a partir de uma altura de 50 metros. Quanto tempo levará para o projétil atingir o solo?",
            nivel: 2,
        },
        {
            id: 6,
            title: "Um bloco de massa 2 kg é puxado por uma força horizontal de 10 N em uma superfície sem atrito. Qual é a aceleração do bloco?",
            nivel: 2,
        },
        {
            id: 7,
            title: "Um pêndulo simples tem um comprimento de 2 metros e é liberado de uma posição elevada. Qual é a velocidade do pêndulo quando ele passa pelo ponto mais baixo de sua trajetória?",
            nivel: 3,
        },
        {
            id: 8,
            title: "Um carro viaja a uma velocidade inicial de 25 m/s e acelera uniformemente a uma taxa de 2 m/s². Qual é a distância percorrida pelo carro após 10 segundos?",
            nivel: 3,
        },
        {
            id: 9,
            title: "Uma bola é lançada horizontalmente a partir de uma altura de 20 metros acima do solo com uma velocidade inicial de 15 m/s. Qual é a velocidade da bola quando atinge o solo?",
            nivel: 3,
        },
        {
            id: 10,
            title: "Uma carga elétrica de 2 C se move através de um campo elétrico onde experimenta uma força de 6 N. Qual é a intensidade do campo elétrico?",
            nivel: 3,
        }
    ];

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
        setQuestion(Questions)
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

import '../Login/Login.css'
import LoginImg from '../Login/img/LoginImg.png'

export function Login(){
    return (
        <>
        <div className='Container-Login'>
            <div className="Login">
                <div className='Description-Login'>
                    <div className='Container-title'>
                        <h1>Prepare-se para um teste de física emocionante e <span>mergulhe no universo das leis da natureza!</span></h1>
                    </div>
                    <div className='Container-img'>
                        <img className='LoginImg' src={LoginImg} alt="Imagem de 3 alunos" />  
                    </div>
                        
                </div>
            </div>
        </div>
        </>
    )
}
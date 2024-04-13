import './Login.css'
import { useState } from 'react';

export function Login({setLogin}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setLogin(true);
    };

    return (
        <>
        <div className='Container-Form-login'>
        <h2>Login
        <span className='barh2'/>
        </h2>
        
        <div className='Container-Form'>
            <form onSubmit={handleSubmit}>
                <div className='Container-Input'>
                <label >
                    Usuário:
                </label>
                <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='Container-Input'>
                    <label>
                        Senha:             
                    </label>
                    <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                </div>
                <div className='Container-Button'>
                    <button type="submit">Entrar</button>
                    <button type="button">Cadastrar</button>
                </div>

            </form>
        </div>
        </div>
        </>
    )
}
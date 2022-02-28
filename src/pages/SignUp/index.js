
import {useState, useContext} from 'react';
import {AuthContext} from '../../contexts/auth';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const {signUp,loadingAuth} = useContext(AuthContext);
  
  function handleSubmit(e){
    e.preventDefault();
    if(name !== "" && email !== "" && password !== ""){
      signUp(email,password,name);
    }
  
  }
  
  return (
      <div className='container-center' >
        <div className='login'>
          <div className='logo-area'>
            <img src={logo} alt='logo' />
          </div>
          <form onSubmit={handleSubmit}>
              <h1>Cadastar</h1>
              <input type='text' placeholder="Nome" value={name} onChange={(e) =>setName(e.target.value)}/>
              <input type='text' placeholder="email@email.com" value={email} onChange={(e) =>setEmail(e.target.value)}/>
              <input type='password' placeholder="********"value={password} onChange={(e) =>setPassword(e.target.value)} />
              <button type='submit'>{loadingAuth ?' Carregando...' : 'Cadastrar'}</button>
          </form>
          <Link to='/'>Já possui conta? Entre</Link>
        </div>
    
      </div>
    );
  }
  
  export default SignUp;
  
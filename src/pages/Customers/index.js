import './customers.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiUser} from 'react-icons/fi'
import { useState } from 'react'
import firebase from '../../services/firebaseConnection'
import { toast } from 'react-toastify'
export default function Customers(){

    const [nomeFantasia, setNomeFantasia] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [endereco, setEndereco] = useState('')

  async  function handleAdd(e){
        e.preventDefault()
        if(nomeFantasia !== '' && cnpj !== '' && endereco !== '' ){
            await firebase.firestore().collection('customers')
            .add({
                nomeFantasia:nomeFantasia,
                cnpj:cnpj,
                endereco:endereco
            })
            .then(()=>{
                setNomeFantasia('');
                setCnpj('');
                setEndereco('');
                toast.info('Empresa cadastrada com sucesso!');
            })
            .catch((error)=>{
                console.log(error);
                toast.error('Erro ao cadastrar esse empresa.');
            })
        }else{
            toast.error('Preencha todos os campos!')
        }
    }
    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>
        <div className='container'>
            <form className='form-profile customers' onSubmit={handleAdd}>
                <labe>Nome fantasia</labe>
                <input type='text' placeholder='Nome da empresa' value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} />

                <labe>CNPJ</labe>
                <input type='text' placeholder='CNPJ da empresa' value={cnpj} onChange={(e) => setCnpj(e.target.value)} />

                <labe>Endereço</labe>
                <input type='text' placeholder='Endereço da empresa' value={endereco} onChange={(e) => setEndereco(e.target.value)} />

                <button type='submit'>Cadastrar</button>
            </form>
        </div>
            </div>
        </div>
    )
}
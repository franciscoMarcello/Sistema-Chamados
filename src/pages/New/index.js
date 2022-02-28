import { useState,useEffect,useContext } from 'react'
import './new.css'
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {IoCall} from 'react-icons/io5'
import firebase from '../../services/firebaseConnection' 
import { toast } from 'react-toastify'
import {useHistory,useParams} from 'react-router-dom'
export default function New(){
    const {id} = useParams();
    const history = useHistory();
    const [assunto, setAssunto] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [complemento, setComplemento] = useState('')
    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomer] = useState(true)
    const [customerSelected, setCustomersSelected] = useState(0)
    const [idCustomer, setIdCustomer] = useState(false);

    const {user} = useContext(AuthContext);

    useEffect(()=>{
        async function loadCustomers(){
            await firebase.firestore().collection('customers')
            .get()
            .then((snapshot) =>{
                let lista =[];
                snapshot.forEach((doc)=>{
                    lista.push({
                        id:doc.id,
                        nomeFantasia:doc.data().nomeFantasia
                    })
                })
                if(lista.length === 0){
                    console.log('nenhuma empresa')
                    setCustomers([{id: '1', nomeFantasia:''}])
                    setLoadCustomer(false);
                    return;
                }
                setCustomers(lista);
                setLoadCustomer(false);

                if(id){
                    loadId(lista);
                }
            })
            .catch((error)=>{
                console.log('Deu erro');
                setLoadCustomer(false);
                setCustomers([{id: '1', nomeFantasia:''}])
            })
        }
        loadCustomers();
    },[id])


    async function loadId(lista){
        await firebase.firestore().collection('chamados').doc(id)
        .get()
        .then((snapshot)=>{
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);
            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomersSelected(index);
            setIdCustomer(true);
        })
        .catch((err)=>{
            console.log('erro no id passado', err);
            setIdCustomer(false);
        })
    }

    async function handleRegister(e){
        e.preventDefault();
        if(idCustomer){
            await firebase.firestore().collection('chamados')
            .doc(id)
            .update({
                cliente:customers[customerSelected].nomeFantasia,
                clienteId:customers[customerSelected].id,
                assunto:assunto,
                status:status,
                complemento:complemento,
                userId:user.uid
            })
            .then(()=>{
                toast.success('Chmado Editado com sucesso!')
                setCustomersSelected(0);
                setComplemento('');
                history.push('/dashboard')
            })
            .catch((err)=>{
                toast.error('Ops ocorreu um erro, tente mais tarde.')
            })
            return;
        }

        await firebase.firestore().collection('chamados')
        .add({
            created:new Date(),
            cliente:customers[customerSelected].nomeFantasia,
            clienteId:customers[customerSelected].id,
            assunto:assunto,
            status:status,
            complemento:complemento,
            userId:user.uid
        })
        .then(()=>{
            toast.success('Chamado criado com sucesso!')
            setComplemento('');
            setCustomersSelected(0);
        })
        .catch((err)=>{
            toast.error('Ops ocorreu um erro ao registrar novo chamado.')
        })
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
        
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeCustomers(e){
        setCustomersSelected(e.target.value)
    }

    return(
        <div>
            <Header/>
            <div className='content'>
                <Title name="Novo chamado">
                    <IoCall size={25}/>
                </Title>
                <div className='container'>
                    <form className='form-profile' onSubmit={handleRegister}>
                        <label>Cliente</label>
                        {loadCustomers ? (
                            <input type='text' disabled={true} value='Carregando Clientes...'/>
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomers}>
                            
                            {customers.map((item,index)=>{
                                return(
                                    <option key={item.id} value={index}>
                                        {item.nomeFantasia}
                                    </option>
                                )
                            })}
                        </select>
                        )}
                        
                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value='Suporte'>Suporte</option>
                            <option value='Visita Tecnica'>Visita Tecnica</option>
                            <option value='Financeiro'>Financeiro</option>
                        </select>
                        <label>Status</label>
                        <div className='status'>
                            <input type='radio' name='radio' value='Aberto' checked={status === 'Aberto'} onChange={handleOptionChange}/>
                            <span>Em Aberto</span>
                            <input type='radio' name='radio' value='Em Progresso' checked={status === 'Em Progresso'} onChange={handleOptionChange} />
                            <span>Em Progresso</span>
                            <input type='radio' name='radio' value='Fechado' checked={status === 'Fechado'} onChange={handleOptionChange} />
                            <span>Fechado</span>
                        </div>
                        <label>Complemento</label>
                        <textarea 
                            type="text"
                            placeholder="Descreva seu problema"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />
                        <button type='submit'>Registrar</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
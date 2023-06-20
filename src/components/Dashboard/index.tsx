'use client'
//receitas*
//custo-variaves*
//margem-de-contribuicao
//custos-fixos*
//lucro-operacional-pré-investimentos
//investimentos*
//lucro-operacional
//entradas-nao-operacionais*
//saidas-nao-operacionais*
//lucro-liquido

import type { ReactElement } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface InputProps{
    nome: string,
    valor: number
}

interface Indicador{
    nome: string,
    icone: ReactElement,
    valor: number,
    cor: string,
    inputs: InputProps[]
}


import { HiTrendingUp } from 'react-icons/hi'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { 
    List,
    ListItem, 
    Typography, 
    ListItemSuffix,
    ListItemPrefix, 
    Card,
    Accordion,
    AccordionHeader,
    AccordionBody,
 } from '@material-tailwind/react'
import { TbMoneybag } from 'react-icons/tb'
import { GiPayMoney, GiTakeMyMoney } from 'react-icons/gi'
import { FaPiggyBank,FaBalanceScaleRight } from 'react-icons/fa'
import { AiOutlineBuild } from 'react-icons/ai'
import { IoMdBuild } from 'react-icons/io'
import { Dispatch, SetStateAction } from 'react'


interface DashboardProps {
    modalVisible: boolean,
    reload: number,
    setReload: Dispatch<SetStateAction<number>>
}

interface IndicadoresInterface{
    nome: string,
    icone: ReactElement,
    valor: number | undefined | string,
    cor: string,
    inputs?: OperationsInterface[] | null[]
    //"6a787e82-40f4-4436-91ad-0f5b95737d6a"
}

interface OperationsInterface{
    id: string,
    subcategoria_id: string,
    categoria_id: string,
    valor: number | undefined,
    descricao: string,
    data: Date
}

export default function Dashboard({modalVisible,reload,setReload}: DashboardProps){
    const URI = 'http://localhost:3500'
    const [operations, setOperations] = useState<OperationsInterface[]>()
    const [valorReceitas, setValorReceitas] = useState<number>(0)
    const [custosVariaveis, setCustosVariaveis] = useState<number>(0)
    const [custosFixos, setCustosFixos] = useState<number>(0)
    const [valorMargemContribuicao, setValorMargemContribuicao] = useState<number | undefined>()
    const [lucroOperacionalPi, setLucroOperacionalPi] = useState<number | undefined>(0)
    const [totalInvestimentos, setTotalInvestimentos] = useState<number | undefined>(0)
    const [lucroOperacional, setLucroOperacional] = useState<number | undefined>(0)
    const [entradasNaoOperacionais , setEntradasNaoOperacionais] = useState<number>(0)
    const [saidasNaoOperacionais, setSaidasNaoOperacionais] = useState<number>(0)
    const [lucro, setLucro] = useState<number>()
    useEffect(()=>{
        const getOperations = async() => {
            try {
                const operationsRequest = await axios.get(`${URI}/operations`)
                setOperations(operationsRequest.data.operations)

            } catch (error) {
                console.log(error)
            }
        }
        getOperations()
    },[reload])
    
    useEffect(()=>{
                getReceitas()
                getCustosVariaveis()
                getCustosFixos()
                getTotalInvestimentos()
                getEntradasNaoOperacionais()
                getSaidasNaoOperacionais()
                
console.log('roudou2')
    },[operations])
    
    useEffect(()=>{
        setValorMargemContribuicao(valorReceitas - custosVariaveis)
        setLucroOperacionalPi(valorMargemContribuicao && custosFixos ? valorMargemContribuicao - custosFixos: 0)
        setLucroOperacional(valorMargemContribuicao && totalInvestimentos && custosFixos? valorMargemContribuicao + totalInvestimentos - custosFixos: 0)
        
        console.log('rodando')
    },[lucroOperacional,valorMargemContribuicao, valorReceitas,custosFixos,custosVariaveis,totalInvestimentos,entradasNaoOperacionais,saidasNaoOperacionais,lucro])
    
    useEffect(()=>{
        setLucro(lucroOperacional + entradasNaoOperacionais - saidasNaoOperacionais)
    },[lucroOperacional, entradasNaoOperacionais, saidasNaoOperacionais])
        
    const getReceitas = () => {
            const receitas = operations?.filter(operations => operations.categoria_id == '6a787e82-40f4-4436-91ad-0f5b95737d6a') 
            if(receitas){
                const total = receitas.reduce((acc,current) => acc + current.valor, 0)
                    setValorReceitas(total)
            }
        }
        
        const getCustosVariaveis = () => {
            const custosVariaveisRequest = operations?.filter(operations => operations.categoria_id == "9d0823a1-0acf-452a-91e6-73ac640f6d19")
            if(custosVariaveisRequest){
                const total = custosVariaveisRequest.reduce((acc,current)=> acc + current.valor, 0)
                setCustosVariaveis(total)
            }
            
        }
        const getCustosFixos = () => {
            const custosFixosRequest = operations?.filter(operations => operations.categoria_id == "d51f6c3d-8f58-42ac-ac9c-4b74150dbf47")
            if(custosFixosRequest){
                const total = custosFixosRequest.reduce((acc,current)=> acc + current.valor, 0)
                setCustosFixos(total)
            }
            
        }
        
        const getTotalInvestimentos = () => {
            const investimentosArray = operations?.filter((operation) => operation.categoria_id == "599c4090-5088-44ab-a156-ed6fe8848bc9")
            const total = investimentosArray?.reduce((acc, current)=>  acc + current.valor, 0)
            setTotalInvestimentos(total)
        }
        
        const getEntradasNaoOperacionais = () => {
            const entradas = operations?.filter((operation) => operation.categoria_id == "76df8600-ba54-4b54-adc0-9781ed37a223")
            if (entradas){
                const total = entradas.reduce((acc,entrada) => acc + entrada.valor, 0)
                setEntradasNaoOperacionais(total)
            }
        }
        const getSaidasNaoOperacionais = () => {
            const saidas = operations?.filter((operation) => operation.categoria_id == "2d7a8b68-d0dc-48fc-9ad4-b7e4723f610c")
            if(saidas){
                const total = saidas.reduce((acc, curr) => acc + curr.valor, 0)
                setSaidasNaoOperacionais(total)
            }
        }
       
    

     const indicadores : IndicadoresInterface[] = [
        {
            nome: 'Receita',
            icone: <HiTrendingUp className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: valorReceitas,
            cor: 'blue-500',
            inputs: operations?.filter(operations => operations.categoria_id == "6a787e82-40f4-4436-91ad-0f5b95737d6a")
        },
        {
            nome: 'Custos-Variáveis',
            icone: <MdOutlineAttachMoney className=' text-gray-50  rounded-full h-9 w-9 text-sm p-1'/>,
            valor:custosVariaveis,
            cor: 'red-500',
            inputs: operations?.filter(operations => operations.categoria_id == "9d0823a1-0acf-452a-91e6-73ac640f6d19")
        },
        {
            nome: 'Margem de Contribuição',
            icone: <TbMoneybag className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: valorMargemContribuicao?.toFixed(2),
            cor: 'green-500',
            inputs: [null]
        },
        {
            nome: 'Custos-Fixos',
            icone: <GiPayMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: custosFixos,
            cor: 'red-500',
            inputs: operations?.filter(operations => operations.categoria_id == "d51f6c3d-8f58-42ac-ac9c-4b74150dbf47")
        },
        {
            nome: 'Lucro Operacional PI',
            icone: <GiTakeMyMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: lucroOperacionalPi?.toFixed(2),
            cor: 'green-500',
            inputs: [null]
        },
        {
            nome: 'Investimento',
            icone: <FaPiggyBank className=' text-gray-50  rounded-full h-9 w-9 text-sm p-1'/>,
            valor: totalInvestimentos,
            cor: 'green-500',
            inputs: operations?.filter((operation) => operation.categoria_id == "599c4090-5088-44ab-a156-ed6fe8848bc9")
        },
        {
            nome: 'Lucro Operacional',
            icone: <MdOutlineAttachMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: lucroOperacional?.toFixed(2) ,
            cor: 'blue-500',
            inputs: [null]
        },
        {
            nome: 'Entradas Não Operacionais',
            icone: <AiOutlineBuild className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: entradasNaoOperacionais,
            cor: 'gray-500',
            inputs: operations?.filter((operation) => operation.categoria_id == "76df8600-ba54-4b54-adc0-9781ed37a223")
        },
        {
            nome: 'Saídas Não Operacionais',
            icone: <IoMdBuild className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: saidasNaoOperacionais,
            cor: 'gray-500',
            inputs: operations?.filter((operation) => operation.categoria_id == "2d7a8b68-d0dc-48fc-9ad4-b7e4723f610c")
        },
        {
            nome: 'Lucro-Líquido/ Prejuízo',
            icone: <FaBalanceScaleRight className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: lucro?.toFixed(2),
            cor: 'blue-500',
            inputs: [null]
        }
     ]

    const [open, setOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    
    return(
        <Card className={`w-full lg:w-4/5 ${modalVisible?"blur-sm": '' }`}>
                <List className='rounded-lg '>
                    
                    
            {indicadores.length > 0 ? indicadores.map((item,i)=>{
                return(
                    
                        
                            <Accordion open={selectedIndex == i? true: false} key={i}>
                                <AccordionHeader onClick={() => setSelectedIndex(selectedIndex == i? 20: i)}>
                                    <div className={`bg-${item.cor} p-1 rounded-full`}>
                                        {item.icone}
                                    </div>
                                    
                                    <Typography className='font-bold text-lg ml-4 text-gray-700' >{item.nome}</Typography>
                                    <ListItemSuffix className={`text-md font-bold text-${item.cor}`}>{item.valor}</ListItemSuffix>
                                </AccordionHeader>
                                <AccordionBody>
                                    {item.inputs? item.inputs?.map((input,i)=>{
                                        return (
                                            <ListItem key={i}>
                                                <ListItemPrefix>{input?.descricao ?? '-'}</ListItemPrefix>
                                                <ListItemSuffix>{input?.valor ?? '-'}</ListItemSuffix>
                                                
                                            </ListItem>
                                        )
                                    }): ''}
                                </AccordionBody>
                            </Accordion>

                )
            }) : <p>valor</p> }
            
            </List>
        </Card>
       
    )
}
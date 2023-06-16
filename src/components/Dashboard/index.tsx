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


interface DashboardProps {
    modalVisible: boolean
}

interface IndicadoresInterface{
    nome: string,
    icone: ReactElement,
    valor: number | undefined,
    cor: string,
    inputs?: OperationsInterface[]
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

export default function Dashboard({modalVisible}: DashboardProps){
    const URI = 'http://localhost:3500'
    const [operations, setOperations] = useState<OperationsInterface[]>()
    const [valorReceitas, setValorReceitas] = useState<number | undefined>(0)
    const [custosVariaveis, setCustosVariaveis] = useState<number | undefined>(0)
    const [valorMargemContribuicao, setValorMargemContribuicao] = useState<number | undefined>()
    useEffect(()=>{
        const getOperations = async() => {
            try {
                const operationsRequest = (await axios.get(`${URI}/operations`)).data
                setOperations(operationsRequest.operations)
                getReceitas()
                getCustosVariaveis()
            } catch (error) {
                console.log(error)
            }
        }
        getOperations()
        const getReceitas = () => {
            const receitas = operations?.filter(operations => operations.categoria_id == '6a787e82-40f4-4436-91ad-0f5b95737d6a')
            setValorReceitas(receitas?.reduce((lastReceita, currentReceita) => (lastReceita || 0) + (currentReceita.valor || 0), 0))
        }
        
        const getCustosVariaveis = () => {
            const custosVariaveisRequest = operations?.filter(operations => operations.categoria_id == "9d0823a1-0acf-452a-91e6-73ac640f6d19")
            const valorTotal = custosVariaveisRequest?.reduce((acc, currentCustoVariavel) =>(acc || 0) + (currentCustoVariavel.valor || 0), 0)
            setCustosVariaveis(valorTotal)
        }
        

    },[])

     const indicadores : IndicadoresInterface[]= [
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
            valor: custosVariaveis,
            cor: 'red-500',
            inputs: operations?.filter(operations => operations.categoria_id == "9d0823a1-0acf-452a-91e6-73ac640f6d19")
        },
        {
            nome: 'Margem de Contribuição',
            icone: <TbMoneybag className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: valorMargemContribuicao,
            cor: 'green-500',
            inputs: [{
                id: '',
                categoria_id: '',
                subcategoria_id: '',
                descricao: 'Margem de Contribuição',
                valor: valorMargemContribuicao ,
                data: new Date()
            }]
        }
    //     {
    //         nome: 'Custos-Fixos',
    //         icone: <GiPayMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 6000,
    //         cor: 'red-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
    //     },
    //     {
    //         nome: 'Lucro Operacional PI',
    //         icone: <GiTakeMyMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 6500,
    //         cor: 'green-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
    //     },
    //     {
    //         nome: 'Investimento',
    //         icone: <FaPiggyBank className=' text-gray-50  rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 0,
    //         cor: 'green-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
    //     },
    //     {
    //         nome: 'Lucro Operacional',
    //         icone: <MdOutlineAttachMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 6500,
    //         cor: 'blue-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
    //     },
    //     {
    //         nome: 'Entradas Não Operacionais',
    //         icone: <AiOutlineBuild className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 2000,
    //         cor: 'gray-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
    //     },
    //     {
    //         nome: 'Saídas Não Operacionais',
    //         icone: <IoMdBuild className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 0,
    //         cor: 'gray-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
    //     },
    //     {
    //         nome: 'Lucro-Líquido/ Prejuízo',
    //         icone: <FaBalanceScaleRight className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
    //         valor: 8500,
    //         cor: 'blue-500',
    //         inputs: [
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },
    //             {
    //                 nome: 'contas',
    //                 valor: 754.38
    //             },

              
    //         ]
       //  }
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
                                                <ListItemPrefix>{input.descricao ?? '-'}</ListItemPrefix>
                                                <ListItemSuffix>{input.valor ?? '-'}</ListItemSuffix>
                                                
                                            </ListItem>
                                        )
                                    }): <p>valor</p>}
                                </AccordionBody>
                            </Accordion>

                )
            }) : <p>valor</p> }
            
            </List>
        </Card>
       
    )
}
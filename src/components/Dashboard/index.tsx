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
import { useState } from 'react'
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

export default function Dashboard({modalVisible}: DashboardProps){

    const indicadores : Indicador[]= [
        {
            nome: 'Receita',
            icone: <HiTrendingUp className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 25500,
            cor: 'blue-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Custos-Variáveis',
            icone: <MdOutlineAttachMoney className=' text-gray-50  rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 13000,
            cor: 'red-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Margem de Contribuição',
            icone: <TbMoneybag className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 12500,
            cor: 'green-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Custos-Fixos',
            icone: <GiPayMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 6000,
            cor: 'red-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Lucro Operacional PI',
            icone: <GiTakeMyMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 6500,
            cor: 'green-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Investimento',
            icone: <FaPiggyBank className=' text-gray-50  rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 0,
            cor: 'green-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Lucro Operacional',
            icone: <MdOutlineAttachMoney className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 6500,
            cor: 'blue-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Entradas Não Operacionais',
            icone: <AiOutlineBuild className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 2000,
            cor: 'gray-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Saídas Não Operacionais',
            icone: <IoMdBuild className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 0,
            cor: 'gray-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        },
        {
            nome: 'Lucro-Líquido/ Prejuízo',
            icone: <FaBalanceScaleRight className=' text-gray-50 rounded-full h-9 w-9 text-sm p-1'/>,
            valor: 8500,
            cor: 'blue-500',
            inputs: [
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },
                {
                    nome: 'contas',
                    valor: 754.38
                },

              
            ]
        }
    ]

    const [open, setOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    
    return(
        <Card className={`w-full lg:w-4/5 ${modalVisible?"blur-sm": '' }`}>
                <List className='rounded-lg '>
            {indicadores.map((item,i)=>{
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
                                    {item.inputs.map((input,i)=>{
                                        return (
                                            <ListItem key={i}>
                                                <ListItemPrefix>{input.nome}</ListItemPrefix>
                                                <ListItemSuffix>{input.valor}</ListItemSuffix>
                                                
                                            </ListItem>
                                        )
                                    })}
                                </AccordionBody>
                            </Accordion>

                )
            })  }
            
       </List>
        </Card>
       
    )
}
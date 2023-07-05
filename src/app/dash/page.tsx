'use client'
import type { Metadata } from 'next'
import Dashboard from '../../components/Dashboard'
import Aside from '@/components/Aside'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Card } from '@material-tailwind/react'

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


export const metadata: Metadata = {
    title: 'dashboard'
}

export default function Dash(){

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [reload, setReload] = useState<number>(0)
    const [isAdmin, setIsAdmin] = useState<boolean>(true)
    const [asideVisible, setAsideVisible] = useState<boolean>(false)
    return(
        <div>
            <div className='flex flex-col w-full'>
                <div className='rounded-lg text-3xl h-20 bg-white mb-4 mt-8 flex justify-between items-center px-2'>
                    <GiHamburgerMenu
                        className='h-full'
                        onClick={() => setAsideVisible(!asideVisible)}
                    />
                    <h1 className='text-xl font-extrabold text-blue-700 '>QuikPocket</h1>
                </div>
                <div className='flex'>
                {asideVisible? <Aside modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    isAdmin = {isAdmin}/>: ''}
                {isAdmin? <Dashboard 
                   modalVisible={modalVisible}
                   setReload = {setReload} 
                   reload = {reload}/>: ''}    
                
                
                {modalVisible ? <Modal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    setReload = {setReload}
                    reload={reload}
                    />: ''}
                </div>
            </div>

        </div>
           
        
        
    )
}
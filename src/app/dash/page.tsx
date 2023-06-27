'use client'
import type { Metadata } from 'next'
import Dashboard from '../../components/Dashboard'
import Aside from '@/components/Aside'
import Modal from '@/components/Modal'
import { useState } from 'react'

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
    return(
        <div>
            <div className='flex w-full'>

                
                <Aside modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    isAdmin = {isAdmin}/>
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
           
        
        
    )
}
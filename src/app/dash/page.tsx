'use client'
import type { Metadata } from 'next'
import Dashboard from '../../components/Dashboard'
import Aside from '@/components/Aside'
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

export default function dashboard(){
    return(
        <div>
            <div className='flex w-full'>
                <Aside/>
                <Dashboard/>
            </div>

        </div>
           
        
        
    )
}
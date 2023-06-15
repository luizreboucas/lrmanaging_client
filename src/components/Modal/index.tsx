'use client'
import React, { useState,useEffect, Dispatch, SetStateAction } from 'react'
import axios from 'axios'
import {
    Card,
    Input,
    Button,
    Typography,
    Select,
    Option,
    CardHeader,
    CardBody
} from '@material-tailwind/react'
// const { 
// 				categoria_id,
// 				subcategoria_id,
// 				descricao,
// 				valor, 
// 			}
interface Category{
    id: string,
    nome: string
}
interface Subcategory{
    id: string,
    nome: string,
    categoryid: string
}
const URI = 'http://localhost:3500'

interface ModalProps{
    modalVisible?: boolean
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const Modal = ({modalVisible, setModalVisible}: ModalProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>()
    const [subcategories, setSubcategories] = useState<Subcategory[]>([])
    const [descricao, setDescricao] = useState<string>()
    const [valor, setValor] = useState<number>()
    
    useEffect(()=>{
        const getCategories = async() =>{
            try {
                const categoriesRequest = (await axios.get(`${URI}/categories`)).data
                setCategories(categoriesRequest)
            } catch (error) {
                
            }
            
        }
        getCategories()
    },[])

    const getSubcategories = async(category: Category) => {
        try {
            setCategory(category)
            const subcategories = (await axios.get(`${URI}/subcategories/${category.id}`)).data
            setSubcategories(subcategories)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={`ml-32 mr-auto absolute w-3/4 mt-40 ${modalVisible? '': 'hidden'}`}>
        <Card className='shadow-2xl'>
            <form action="">
                
                
                
                <CardBody className='flex flex-col gap-10'>
                <Typography className=' font-bold text-xl'>Nova Operação</Typography>
                <Select label='Categoria' >
                    {categories.map((category)=>{
                        return <Option key={category.id} onClick={() =>getSubcategories(category)}>{category.nome}</Option>
                    })}
                </Select>
                <Select label='Sub-Categoria' >
                    {subcategories.length == 0 ? <Option>{category?.nome}</Option>: subcategories.map((subcategory)=>{
                        return(
                            <Option key={subcategory.id}>{subcategory.nome}</Option>
                        )
                    })}
                </Select>
                <Input
                    placeholder='Descrição'
                    value={descricao}
                    onChange={(e)=>setDescricao(e.target.value)}
                    className='text-xl'
                />
                <Input
                    placeholder='Valor'
                    value={valor}
                    onChange={(e)=>setValor(parseFloat(e.target.value))}
                    className=' text-xl'
                />
                <Button onClick={()=> setModalVisible(false)}>
                    <Typography>Registrar</Typography>
                </Button>
                </CardBody>
                
            </form>
        </Card>
    </div>
  )
}

export default Modal

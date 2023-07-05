'use client'
import React, { useState,useEffect, Dispatch, SetStateAction } from 'react'
import { useAppSelector } from '@/redux/store'
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
import { CgClose } from 'react-icons/cg'

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
    setModalVisible: Dispatch<SetStateAction<boolean>>,
    setReload: Dispatch<SetStateAction<number>>
    reload: number

}

const Modal = ({modalVisible, setModalVisible,setReload, reload}: ModalProps) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [category, setCategory] = useState<Category>()
    const [subcategories, setSubcategories] = useState<Subcategory[]>([])
    const [subcategory, setSubcategory] = useState<Subcategory>({
        id: '',
        nome:'',
        categoryid: ''
    })
    const [descricao, setDescricao] = useState<string>('')
    const [valor, setValor] = useState<number>(0)
    const [user,setUser] = useState({
        id: '',
        nome: '',
        email: '',
        is_admin: false,
        organization_id: '',
        senha: ''
    })
    const updatedUser = useAppSelector(state => state.userReducer)
    
    useEffect(()=>{
        const getCategories = async() =>{
            try {
                setUser(updatedUser)
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

    
    const sendOperation = async() => {
        try {
            console.log(updatedUser)
            const operation = {
                categoria_id: category?.id,
 				subcategoria_id: subcategory.id? subcategory.id: '2863f24a-6c14-4741-8ccf-d832675840cf',
 				descricao,
			    valor,
                organization_id: updatedUser.organization_id
                
                
            }
            const response = await axios.post(`${URI}/operations`,operation)
            console.log(response)
            console.log(operation)
            setReload(reload + 1)
            setModalVisible(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className={`h-full w-full flex justify-center items-center bg-orange-300  absolute  ${modalVisible? '': 'hidden'}`}>
        <Card className='shadow-2xl overflow-hidden min-w-fit sm-w-screen '>
            <form action="">
                
                
                
                <CardBody className='flex flex-col gap-10'>
                    <div className='flex justify-between items-center'>
                        <Typography className=' font-bold text-xl'>Nova Operação</Typography>
                        <CgClose className='font-bold text-xl text-blue-gray-900 hover:cursor-pointer' onClick={()=>setModalVisible(false)}/>
                    </div>
                
                <Select label='Categoria' >
                    {categories.map((category)=>{
                        return <Option key={category.id} onClick={() =>getSubcategories(category)}>{category?.nome}</Option>
                    })}
                </Select>
                <Select label='Sub-Categoria' >
                    {subcategories.length == 0 ? <Option>{category?.nome}</Option>: subcategories.map((subcategory)=>{
                        return(
                            <Option key={subcategory.id} onClick={()=>setSubcategory(subcategory)} >{subcategory?.nome}</Option>
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
                <Button onClick={()=> sendOperation()}>
                    <Typography>Registrar</Typography>
                </Button>
                </CardBody>
                
            </form>
        </Card>
    </div>
  )
}

export default Modal

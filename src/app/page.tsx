'use client'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import BgImage from '../../public/6229517.jpg'
import Image from "next/image";
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";
import { setUserAction } from '../redux/reducers/userSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/store'

interface IUSer{
  email?: string,
  senha?: string
 
}

const URI = 'http://localhost:3500'

export default function Home() {
  const router = useRouter()

  

  const [user,setUser] = useState<IUSer>({
    email: '1234@1234.com',
    senha: '1234'
  })
  const [token, setToken] = useState<string>('')

  const dispatch = useDispatch()
  const userId = useAppSelector((state) => state.userReducer.id)

  useEffect(()=>{
    const validateLogin = async() => {
      try {
        const status = await validateToken(token)
        if(status === 200){
          
          router.push('/dash')
        }
      } catch (error) {
        console.log({error})
      }
    }
    validateLogin()

  },[token])

  const login = async() => {
    try {
      console.log(user) 
      const response = await (await axios.post(`${URI}/login`, user)).data
      setToken(response.token)
      console.log(response)
      dispatch(setUserAction(response.user))
      
      
    } catch (error) {
      console.log('não permitiu entrar: ' + error)
    }
  }

  const validateToken = async(tkn: (string | undefined)) => {
    try {
      console.log('token no validate token: ' + tkn)
      await axios.get(`${URI}/cookie/12345`)
      const response = await axios.post(`${URI}/validate`, {}, {
        headers: {
          token: tkn
        }
      })
      return response.status
    } catch (error) {
      return {error}
    }
  }
  return (
    <div className="flex items-center  h-screen w-screen bg-white px-4">
      <div className={`md:h-screen md:w-1/2 xl:h-screen xl:w-2/3 md:flex hidden relative`}>
        
        <Image 
        src={BgImage}
        alt="imagem de gestão financeira"
        className="object-cover h-screen"

        
        />
        
      
      </div>
      
      <div className="md:w-1/2 w-full  xl:w-1/3  flex flex-col items-center">
      <div className="mb-10   ">
          <h1 className="text-4xl font-extrabold text-blue-700 ">QuikPocket</h1>
          <h2 className="text-xl mt-4 sm:mt-16 text-gray-800">Seja Bem-Vindo ao QuikPocket</h2>
        </div>  
      
      <Card color="transparent" shadow={false} className=" w-full h-1/2">
      <Typography variant="h4" color="blue-gray">
        Entrar
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Preencha com seus dados para entrar
      </Typography>
      <form className="sm:mt-8 sm:mb-2 sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="md" label="Email" onChange={(e)=> setUser({...user, email: e.target.value})}/>
          <Input size="md" label="senha" onChange={(e)=> setUser({...user, senha: e.target.value})}/>
   
        </div>
        
        <Button 
          className="sm:mt-6" 
          fullWidth
          onClick={()=>login()}>
          Entrar
        </Button>
        <p>{userId}</p>
        <Typography color="gray" className="mt-4 text-center font-normal">
          ainda não tem uma conta?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Cadastrar
          </a>
        </Typography>
        
      </form>
    </Card>

      </div>
      
       
      </div>
    
  )
}

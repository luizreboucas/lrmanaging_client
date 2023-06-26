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
import { useState } from 'react'
import axios from 'axios'

interface IUSer{
  email?: string,
  senha?: string
}

const URI = 'http://localhost:3500'

export default function Home() {

  const [user,setUser] = useState<IUSer>({
    email: '',
    senha: ''
  })
  const login = async() => {
    try {
      console.log(user) 
      const response = await axios.post(`${URI}/login`, user)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex items-center  h-screen w-screen">
      <div className={`md:h-screen md:w-1/2 xl:h-screen xl:w-2/3 md:flex hidden relative`}>
        
        <Image 
        src={BgImage}
        alt="imagem de gestão financeira"
        className="w-screen"
        fill={true}
        />
        
      
      </div>
      
      <div className="md:w-1/2 w-screen  xl:w-1/3  flex flex-col items-center">
      <div className="mb-10  w-80 max-w-screen-lg sm:w-96">
          <h1 className="text-4xl font-extrabold text-blue-700  mt-10">QuikPocket</h1>
          <h2 className="text-xl mt-16 text-gray-800">Seja Bem-Vindo ao QuikPocket</h2>
        </div>  
      
      <Card color="transparent" shadow={false} >
      <Typography variant="h4" color="blue-gray">
        Entrar
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Preencha com seus dados para entrar
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" onChange={(e)=> setUser({...user, email: e.target.value})}/>
          <Input type="password" size="lg" label="Password" onChange={(e)=> setUser({...user,senha: e.target.value})}/>
        </div>
        
        <Button 
          className="mt-6" 
          fullWidth
          onClick={()=>login()}>
          Entrar
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          ainda não tem uma conta?{" "}
          <a
            href="#"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Cadastrar
          </a>
        </Typography>
        <div>{user.email}</div>
        <div>{user.senha}</div>
      </form>
    </Card>

      </div>
      
       
      </div>
    
  )
}

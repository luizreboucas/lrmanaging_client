'use client'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
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
          <Input size="lg" label="Email" />
          <Input type="password" size="lg" label="Password" />
        </div>
        
        <Button className="mt-6" fullWidth>
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
      </form>
    </Card>

       
      </div>
    
  )
}

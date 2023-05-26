'use client'

import { List, ListItem, ListItemPrefix, Button, Card, Typography } from '@material-tailwind/react'
import { BiPlusMedical,BiLogOut } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'


export default function Aside(){
    return(
        <div className="w-1/5">
            <Card className='h-screen'>
            <List>
                <ListItem>
                    <Button className='flex items-center'>
                        <BiPlusMedical/>
                        <Typography className='ml-4'>Nova Operação</Typography>
                    </Button>
                    
                </ListItem>
                <ListItem>
                    <Button className='flex items-center bg-red-400'>
                        <BiPlusMedical/>
                        <Typography className='ml-4'>Excluir Operação</Typography>
                    </Button>
                    
                </ListItem>
                <ListItem className='flex items-center text-2xl'>
                    <ListItemPrefix>
                        <CgProfile/>
                        </ListItemPrefix>
                    <Typography className='text-xl font-bold'>Perfil</Typography>
                    
                </ListItem>
                <ListItem className='flex items-center text-2xl'>
                    <ListItemPrefix>
                        <BiLogOut/>
                        </ListItemPrefix>
                    <Typography className='text-xl font-bold'>Logout</Typography>
                    
                </ListItem>

                
            </List>
            </Card>
            
        </div>
        
    )
}
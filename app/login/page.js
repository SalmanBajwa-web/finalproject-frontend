"use client"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useGlobalContext } from '@/components/hook/Context'

import { User2Icon } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useState } from "react";






export default function LoginComponent() {
  const router = useRouter();
  const [err,setErr]=useState(false);
  const {
    user, setUser,
} = useGlobalContext();



const createUser = ()=>{
  const name = document.getElementById("first-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch('https://finalproject-backend-black.vercel.app/api/v1/userRoute/signUp',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body:JSON.stringify({name,email,password,passwordConfirm:password})
  })
  .then(item=>item.json())
  .then(item=>{
    setUser(item);
    console.log("createUser userRoute :",item);


  })
  .catch(err=>{
    console.log("createUser Error :",err)
  })


}



const login = ()=>{
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  fetch('https://finalproject-backend-black.vercel.app/api/v1/userRoute/logIn',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body:JSON.stringify({email,password,passwordConfirm:password})
  })
  .then(item=>item.json())
  .then(item=>{
    console.log("login :",item);
    if(item.status === 'fail'){
      setErr(true);
      return ;
    }
    setUser(item);
    if(item.data.data.role==='admin'){
        router.push('/admin');
    }else{
      router.push('/userpage');
    }

  })
  .catch(err=>{
    console.log("login Error :",err)
  })

  
}




  return (
    <div className="outerBox h-screen flex items-center justify-center">
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Login</TabsTrigger>
        <TabsTrigger value="password">Signup</TabsTrigger>
      </TabsList>

{/* login */}

      <TabsContent value="account">
      <Card className="mx-auto max-w-sm">
      <CardHeader>
      {err&&(
  <Alert variant='destructive'>
  <User2Icon className="h-4 w-4 " />
  <AlertTitle className=''>User name or email incorrect</AlertTitle>
  <AlertDescription className="">
  Please try again
  </AlertDescription>
</Alert>
)}
      
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="login_email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="login_password" type="password" required />
          </div>
          <Button onClick={login} type="submit" className="w-full">
            Login
          </Button>
         
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
      </TabsContent>

{/* signup */}
      <TabsContent value="password">
      <Card className="mx-auto max-w-sm">
      <CardHeader>

{user.data&&(
  <Alert variant='success'>
  <User2Icon className="h-4 w-4 text-green-600" />
  <AlertTitle className='text-green-800'>User Created</AlertTitle>
  <AlertDescription className="text-green-700">
  Now login in login Tab !
  </AlertDescription>
</Alert>
)}
      

   

        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required />
            </div>
           
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" onClick={createUser} className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
      </TabsContent>

    </Tabs>
    </div>
  )
}






"use client";

import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import UserPageNav from "@/components/mycomp/UserPageNav";
import { useGlobalContext } from "@/components/hook/Context";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { useState } from "react";

import { User2Icon } from "lucide-react"
import WebNav from "@/components/mycomp/webNav";

export default function Dashboard() {
    const { user, setUser, questionArr, questionByGroup, fetchQuestion } =
    useGlobalContext();
    let [isAlert,setIsAlert] =useState(false);

    const sendData = ()=>{
        let name = document.querySelector('#name').value;
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;

        fetch(`https://finalproject-backend-black.vercel.app/api/v1/userRoute/aboutMe`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        })
          .then((item) => item.json())
          .then((item) => {
            console.log("sendData getNewUserData  :", item);
            // setOpen(false);
            // fetchUsers();
  
            fetch(`https://finalproject-backend-black.vercel.app/api/v1/userRoute/updateMe`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${user.token}`
              },
              body: JSON.stringify({
                name,
                email,
                password,
                passwordConfirm:password,
              }),
            })
              .then((item) => item.json())
              .then((item) => {
                console.log("sendData  :", item);
                setUser(prev=>{
                    let newPrev = JSON.parse(JSON.stringify(prev));
                    newPrev.data.data.name =name;
                    newPrev.data.data.email =email;
                    newPrev.data.data.password =password;
                    return newPrev;
                })
                setIsAlert(true);
                setTimeout(() => {
                setIsAlert(false);
                }, 3000);
                // setOpen(false);
                // fetchUsers();
              })
              .catch((err) => {
                console.log("sendData Error :", err);
              });
  
  
          })
          .catch((err) => {
            console.log("sendData getNewUserData Error :", err);
          });
  
        
  
  
      }
  
      

  return (
    <div className="flex min-h-screen w-full flex-col">
        
    <WebNav/>

      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings Profile</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General Profile
            </Link>
            {/* <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link> */}
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
              {isAlert&&(
                <Alert variant='success'>
                <User2Icon className="h-4 w-4 text-green-600" />
                <AlertTitle className='text-green-800'>User Updated</AlertTitle>
                <AlertDescription className="text-green-700">
                **********
                </AlertDescription>
                </Alert>
                )}
     
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                    <p>Name:</p>
                  <Input defaultValue={user.data && user.data.data.name} placeholder="e.g Bajwa" id='name' />
                    <p>email:</p>
                  <Input  defaultValue={user.data && user.data.data.email} placeholder="hello@gmail.com" id='email' />
                    <p>Passowrd:</p>
                  <Input  defaultValue={user.data && user.data.data.password} placeholder="e.g 12345" id='password' />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button onClick={sendData}>Save</Button>
              </CardFooter>
            </Card>
           
          </div>
        </div>
      </main>
    </div>
  )
}

"use client";
// import { useParams } from 'next/router';
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
  BookAIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Book } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalContext } from '@/components/hook/Context'
import { useEffect, useState } from "react";

import Image from "next/image"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  PanelLeft,
  PlusCircle,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  CardFooter,
} from "@/components/ui/card"
import WebNav from "@/components/mycomp/webNav";




export default function Dashboard({ params }) {
    
    let { id } = params;
     id = decodeURIComponent(id);
    const[diff,setDiff]=useState('easy');
    const[open,setOpen]=useState(false);
    const[allUser,setAllUser]=useState([]);
    const[questionId,setQuestionId]=useState('');
    console.log("Id :",id);
    const {
        user, setUser,questionArr,questionByGroup,
    } = useGlobalContext();


  const createUser = () => {

    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // res.set("Authorization", `Bearer ${token}`);
    console.log("user.token: ",user);
    fetch("https://finalproject-backend-black.vercel.app/api/v1/userRoute", {
      method: "POST",
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
        if(item.status === 'success'){
          fetchUsers();
          console.log("createUser  :", item);
        }
        console.log("createUser  :", item);

      })
      .catch((err) => {
        console.log("createUser Error :", err);
      });
  };
  // const clickOnNewMCQ = ()=>{
  //   // set default subject
  //   setTimeout(() => {
  //     document.querySelector("#subject").value = id;
  //   }, 100);

  // }
  const deleteUser = (id)=>{
    fetch(`https://finalproject-backend-black.vercel.app/api/v1/userRoute/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
    })
      .then((item) => {
        fetchUsers();
      })
      .then((item) => {
        console.log("deleteUser  :", item);
        // fetchQuestion();
      })
      .catch((err) => {
        console.log("deleteUser Error :", err);
      });
  }

  const EditUser = () => {

    const name = document.querySelector("#edit_name").value;
    const email = document.querySelector("#edit_email").value;
    const password = document.querySelector("#edit_password").value;

    // res.set("Authorization", `Bearer ${token}`);
    // console.log("user.token: ",user);
    // questionId === userId
    fetch(`https://finalproject-backend-black.vercel.app/api/v1/userRoute/${questionId}`, {
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
        console.log("EditUser  :", item);
        setOpen(false);
        fetchUsers();
      })
      .catch((err) => {
        console.log("EditUser Error :", err);
      });
  };
  const openEdit = (item)=>{
    console.log(item);
    setQuestionId(item._id);
    setOpen(true);
   setTimeout(() => {
    const name = document.querySelector("#edit_name");
    const email = document.querySelector("#edit_email");
    const password = document.querySelector("#edit_password");
    name.value = item.name;
    email.value = item.email;
    password.value = item.password;

   }, 100);
  }



  const fetchUsers = () => {

    fetch("https://finalproject-backend-black.vercel.app/api/v1/userRoute?page=1&limit=500",{headers:{Authorization:`Bearer ${user.token}`}})
  .then((item) => item.json())
  .then((item) => {
    if(item.status === 'success'){
        console.log("fetchUsers success:",item);
        setAllUser(item.data.data)
    }
    console.log("fetchUsers  :", item);
  })
  .catch((err) => {
    console.log("fetchUsers Error :", err);
  });
}

   // ###########effect
   
   useEffect(() => {
    fetchUsers();
}, [user]);



  return (
    <div className="flex min-h-screen w-full flex-col">
      <WebNav/>

      <AlertDialog>
        <AlertDialogTrigger >
          <div className="outerBox flex align-end justify-end">
            <p className=" m-5 mr-8 mb-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" /> New User
            </p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New User</AlertDialogTitle>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="grid gap-2 mt-5">
                <Label htmlFor="a">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Password</Label>
                <Input
                  id="password"
                  type="text"
                  placeholder="Password"
                  required
                />
              </div>
          
            
         

              
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={createUser}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog open={open} >
        <AlertDialogTrigger >
          {/* <div className="outerBox flex align-end justify-end">
            <p className=" m-5 mr-8 mb-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" /> New User
            </p>
          </div> */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New User</AlertDialogTitle>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Name</Label>
                <Input
                  id="edit_name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="grid gap-2 mt-5">
                <Label htmlFor="a">Email</Label>
                <Input
                  id="edit_email"
                  type="text"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Password</Label>
                <Input
                  id="edit_password"
                  type="text"
                  placeholder="Password"
                  required
                />
              </div>
          
            
         

              
          </AlertDialogHeader>
          <AlertDialogFooter>
          <AlertDialogCancel onClick={()=>{setOpen(false)}} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={EditUser}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>





      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <TooltipProvider>
        <div className="grid gap-6">
        
        <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>
                    Totall Quiz: {allUser?.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Active</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Role
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          email
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Id
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allUser.map((item,key)=>{
                        return (
                          <TableRow onClick={()=>openEdit(item)} key={key}>
                          <TableCell className="hidden sm:table-cell">
                          {key}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell className=''>
                          <Badge variant="outline">  {item.active.toString()}</Badge>

                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {item.role}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {item.email}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {item._id}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Toggle menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                <DropdownMenuItem onClick={()=>openEdit(item)}>Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={(ev)=>{
                                  ev.stopPropagation();
                                  deleteUser(item._id);
                                }}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        );
                      })}
                    
                     
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
          
        </div>
        </TooltipProvider>
      </main>
    </div>
  );
}

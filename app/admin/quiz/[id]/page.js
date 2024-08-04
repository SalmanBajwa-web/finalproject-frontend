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
import { useState } from "react";

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
    const[questionId,setQuestionId]=useState('');
    console.log("Id :",id);
    const {
        user, setUser,questionArr,questionByGroup,fetchQuestion,
    } = useGlobalContext();


  const createQuestion = () => {

    const question = document.querySelector("#question").value;
    const answer = document.querySelector("#answer").value;
    const choice = document.querySelector("#choice").value;
    const subject = document.querySelector("#subject").value;
    const difficulty = document.querySelector(".difficulty button").textContent;

    // res.set("Authorization", `Bearer ${token}`);
    console.log("user.token: ",user);
    fetch("https://finalproject-backend-black.vercel.app/api/v1/questionRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
      body: JSON.stringify({
        question,
        answer,
        choice: choice.split(","),
        subject,
        difficulty,
      }),
    })
      .then((item) => item.json())
      .then((item) => {
        console.log("createQuestion  :", item);
        fetchQuestion();
      })
      .catch((err) => {
        console.log("createQuestion Error :", err);
      });
  };
  const clickOnNewMCQ = ()=>{
    // set default subject
    setTimeout(() => {
      document.querySelector("#subject").value = id;
    }, 100);

  }
  const deleteQuestion = (id)=>{
    fetch(`https://finalproject-backend-black.vercel.app/api/v1/questionRoute/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
    })
      .then((item) => {
        fetchQuestion();
      })
      .then((item) => {
        console.log("deleteQuestion  :", item);
        // fetchQuestion();
      })
      .catch((err) => {
        console.log("deleteQuestion Error :", err);
      });
  }

  const EditQuestion = () => {

    const question = document.querySelector("#edit_question").value;
    const answer = document.querySelector("#edit_answer").value;
    const choice = document.querySelector("#edit_choice").value;
    const subject = document.querySelector("#edit_subject").value;
    const difficulty = diff;

    // res.set("Authorization", `Bearer ${token}`);
    // console.log("user.token: ",user);
    fetch(`https://finalproject-backend-black.vercel.app/api/v1/questionRoute/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${user.token}`
      },
      body: JSON.stringify({
        question,
        answer,
        choice: choice.split(","),
        subject,
        difficulty,
      }),
    })
      .then((item) => item.json())
      .then((item) => {
        console.log("EditQuestion  :", item);
        setOpen(false);
        fetchQuestion();
      })
      .catch((err) => {
        console.log("EditQuestion Error :", err);
      });
  };
  const openEdit = (item)=>{
    setQuestionId(item._id);
    setOpen(true);
   setTimeout(() => {
    const question = document.querySelector("#edit_question");
    const answer = document.querySelector("#edit_answer");
    const choice = document.querySelector("#edit_choice");
    const subject = document.querySelector("#edit_subject");
    question.value = item.question;
    answer.value = item.answer;
    choice.value = item.choice;
    subject.value = item.subject;
    console.log("question :",item.difficulty);

    setDiff(item.difficulty);
   }, 100);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <WebNav/>

      <AlertDialog>
        <AlertDialogTrigger onClick={clickOnNewMCQ} >
          <div className="outerBox flex align-end justify-end">
            <p className=" m-5 mr-8 mb-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" /> New MCQ
            </p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Subject</AlertDialogTitle>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="grid gap-2 mt-5">
                <Label htmlFor="a">Question</Label>
                <Input
                  id="question"
                  type="text"
                  placeholder="Question"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Write comma seprated choices</Label>
                <Input
                  id="choice"
                  type="text"
                  placeholder="Hydrogen, Oxygen, Cholorine, Sodium"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Answer</Label>
                <Input id="answer" type="text" placeholder="answer" required />
              </div>
            
              <div className="grid gap-2 mt-4 difficulty">
                <Label htmlFor="a">Difficulty</Label>

                <Select  >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Difficulty</SelectLabel>
                      <SelectItem value="apple">easy</SelectItem>
                      <SelectItem value="banana">medium</SelectItem>
                      <SelectItem value="blueberry">hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={createQuestion}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <AlertDialog open={open} >
        <AlertDialogTrigger  >
          {/* <div className="outerBox flex align-end justify-end">
            <p className=" m-5 mr-8 mb-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" /> New MCQ
            </p>
          </div> */}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Subject</AlertDialogTitle>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Subject</Label>
                <Input
                  id="edit_subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="grid gap-2 mt-5">
                <Label htmlFor="a">Question</Label>
                <Input
                  id="edit_question"
                  type="text"
                  placeholder="Question"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Write comma seprated choices</Label>
                <Input
                  id="edit_choice"
                  type="text"
                  placeholder="Hydrogen, Oxygen, Cholorine, Sodium"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Answer</Label>
                <Input id="edit_answer" type="text" placeholder="answer" required />
              </div>
            
              <div className="grid gap-2 mt-4 difficulty">
                <Label htmlFor="a">Difficulty</Label>

                <Select value={diff} onValueChange={(val)=>{setDiff(val)}} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Difficulty</SelectLabel>
                      <SelectItem value="easy">easy</SelectItem>
                      <SelectItem value="medium">medium</SelectItem>
                      <SelectItem value="hard">hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{setOpen(false)}} >Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={EditQuestion}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <TooltipProvider>
        <div className="grid gap-6">
        
        <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>{id}</CardTitle>
                  <CardDescription>
                    Totall Quiz: {questionByGroup[id]?.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Question</TableHead>
                        <TableHead>MCQ</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Answer
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Subject
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Diffculty
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Actions</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questionByGroup[id]?.map((item,key)=>{
                        return (
                          <TableRow onClick={()=>openEdit(item)} key={key}>
                          <TableCell className="hidden sm:table-cell">
                          {key}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.question}
                          </TableCell>
                          <TableCell className=''>
                          {item.choice.map(item=>{
                            return(
                            <Badge variant="outline" key={item}>  {item}</Badge>
                            );
                          })}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {item.answer}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {item.subject}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {item.difficulty}
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
                               


           {/* <AlertDialog>
        <AlertDialogTrigger onClick={fillBlank}  >
          <p className="px-20  pl-2 hover:text-blue-500 hover:bg-yellow-100 ">Edit</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit MCQ</AlertDialogTitle>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Subject</Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="grid gap-2 mt-5">
                <Label htmlFor="a">Question</Label>
                <Input
                  id="question"
                  type="text"
                  placeholder="Question"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Write comma seprated choices</Label>
                <Input
                  id="choice"
                  type="text"
                  placeholder="Hydrogen, Oxygen, Cholorine, Sodium"
                  required
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="a">Answer</Label>
                <Input id="answer" type="text" placeholder="answer" required />
              </div>
            
              <div className="grid gap-2 mt-4 difficulty">
                <Label htmlFor="a">Difficulty</Label>

                <Select value={diff} onValueChange={(val)=>{setDiff(val)}} >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Difficulty</SelectLabel>
                      <SelectItem value="apple">easy</SelectItem>
                      <SelectItem value="banana">medium</SelectItem>
                      <SelectItem value="blueberry">hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={EditQuestion}>Done</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}


                                <DropdownMenuItem onClick={()=>deleteQuestion(item._id)}>Delete</DropdownMenuItem>
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

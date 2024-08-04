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
import { useGlobalContext } from "@/components/hook/Context";
import { useEffect, useState } from "react";

import Image from "next/image";
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
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CardFooter } from "@/components/ui/card";
import WebNav from "@/components/mycomp/webNav";
import UserPageNav from "@/components/mycomp/UserPageNav";

export default function Dashboard({ params }) {
  let { id } = params;
  id = decodeURIComponent(id);
  const [diff, setDiff] = useState("easy");
  const [open, setOpen] = useState(false);
  const [questionId, setQuestionId] = useState("");
  console.log("Id :", id);
  const { user, setUser, questionArr, questionByGroup, fetchQuestion } =
    useGlobalContext();
    const [filterArr, setFilterArr] = useState(questionArr);

  const createQuestion = () => {
    const question = document.querySelector("#question").value;
    const answer = document.querySelector("#answer").value;
    const choice = document.querySelector("#choice").value;
    const subject = document.querySelector("#subject").value;
    const difficulty = document.querySelector(".difficulty button").textContent;

    // res.set("Authorization", `Bearer ${token}`);
    console.log("user.token: ", user);
    fetch("https://finalproject-backend-black.vercel.app/api/v1/questionRoute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
  const clickOnNewMCQ = () => {
    // set default subject
    setTimeout(() => {
      document.querySelector("#subject").value = id;
    }, 100);
  };
  const deleteQuestion = (id) => {
    fetch(`https://finalproject-backend-black.vercel.app/api/v1/questionRoute/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
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
  };

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
        Authorization: `Bearer ${user.token}`,
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
  const openEdit = (item) => {
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
      console.log("question :", item.difficulty);

      setDiff(item.difficulty);
    }, 100);
  };

const inputChange = (ev)=>{
  const value = ev.target.value;
  setFilterArr(questionArr.filter(item=>item.question.toLowerCase().indexOf(value.toLowerCase())>-1));
}
  // effect
  useEffect(()=>{
    setFilterArr(questionArr);
  },[questionArr])  

  return (
    <div className="flex min-h-screen w-full flex-col">
      <UserPageNav />

    
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <TooltipProvider>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>All MCQ</CardTitle>
                <CardDescription>
                  Totall Quiz: {questionArr.length}
                </CardDescription>
               
                <form className=" mr-auto ml-auto">
            <div className="relative">
          
            
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                onChange={inputChange}
              />

           
            </div>
          </form>
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
                    {filterArr.map((item, key) => {
                      return (
                        <TableRow  key={key}>
                          <TableCell className="hidden sm:table-cell">
                            {key}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.question}
                          </TableCell>
                          <TableCell className="">
                            {item.choice.map((innerItem) => {
                              return (
                                <Badge className='m-1' variant={`${item.answer === innerItem && '' }`}  key={innerItem}>
                                  {" "}
                                  {innerItem}
                                </Badge>
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
                            {/* <DropdownMenu>
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

                                <DropdownMenuItem
                                  onClick={() => openEdit(item)}
                                >
                                  Edit
                                </DropdownMenuItem>


                                <DropdownMenuItem
                                  onClick={() => deleteQuestion(item._id)}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu> */}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
              </CardFooter>
            </Card>
          </div>
        </TooltipProvider>
      </main>
    </div>
  );
}

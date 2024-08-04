"use client";

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
import WebNav from "@/components/mycomp/webNav";
import { useGlobalContext } from '@/components/hook/Context'
import { useState } from "react";



export default function Dashboard() {

    const {
        user, setUser,questionArr,questionByGroup,fetchQuestion
    } = useGlobalContext();


  const createQuestion = () => {
    const question = document.querySelector("#question").value;
    const answer = document.querySelector("#answer").value;
    const choice = document.querySelector("#choice").value;
    const subject = document.querySelector("#subject").value;
    const difficulty = document.querySelector(".difficulty button").textContent;

    // res.set("Authorization", `Bearer ${token}`);
    console.log("user.token: ",user.token);
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

  return (
    <div className="flex min-h-screen w-full flex-col">

        <WebNav/>

      <AlertDialog>
        <AlertDialogTrigger>
          <div className="outerBox flex align-end justify-end">
            <p className=" m-5 mr-8 mb-0 bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
              <Book className="mr-2 h-4 w-4" /> New Subject
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

                <Select>
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

      <div className="outerBox flex align-start justify-start">
        <p className="ml-8 ">Subjects & Categories </p>
      </div>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {Object.entries(questionByGroup).map(([key, value]) =>{
                return(
                    <Link href={`/admin/quiz/${key}`} key={key} >
                    <Card x-chunk="dashboard-01-chunk-0" >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                      Totall Quiz: 
                      </CardTitle>
                      {value.length}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-5">  {key}</div>
                      {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p> */}
                      <Button className='px-2 pt-0 pb-0' >Edit Them</Button>

                    </CardContent>
                  </Card>
                  </Link>
                );
            })}
         
          
        </div>
      </main>
    </div>
  );
}

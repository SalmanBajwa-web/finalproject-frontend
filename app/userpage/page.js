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
import UserPageNav from "@/components/mycomp/UserPageNav";
import { useGlobalContext } from '@/components/hook/Context'
import { useState } from "react";



export default function Dashboard() {

    const {
        user, setUser,questionArr,questionByGroup,fetchQuestion
    } = useGlobalContext();




  return (
    <div className="flex min-h-screen w-full flex-col">

        <UserPageNav/>

   

      <div className="outerBox flex align-start justify-start mt-10">
        <p className="ml-8 ">Subjects or Categories </p>
      </div>

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {Object.entries(questionByGroup).map(([key, value]) =>{
                return(
                    <Link href={`/userpage/quiz/${key}`} key={key} >
                    <Card x-chunk="dashboard-01-chunk-0" >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                      Totall Quiz: 
                      </CardTitle>
                      {value.length}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-5">  {key}</div>
                      <Button className='p-1 pt-0 pb-0' >Take Quiz</Button>
                      {/* <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p> */}
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

"use client";
// import { useParams } from 'next/router';
import Link from "next/link";
import GifTimer from "@/public/timer.gif";

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
import { useState,useEffect } from "react";

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
import UserPageNav from "@/components/mycomp/UserPageNav";





import * as React from "react"
import { TrendingUp } from "lucide-react"
import {  Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
// const chartData = [
//   { browser: "wrong", visitors: 275, fill: "var(--color-wrong)" },
//   { browser: "right", visitors: 200, fill: "var(--color-right)" },
//   { browser: "blank", visitors: 200, fill: "var(--color-blank)" },
// ]
const chartConfig = {

  wrong: {
    label: "wrong",
    color: "hsl(var(--chart-1))",
  },
  right: {
    label: "right",
    color: "hsl(var(--chart-2))",
  },
  blank: {
    label: "blank",
    color: "hsl(var(--chart-5))",
  },
 
} 




export default function Dashboard({ params }) {
  const [chartData,setChartData] = useState([
    { browser: "wrong", visitors: 275, fill: "var(--color-wrong)" },
    { browser: "right", visitors: 200, fill: "var(--color-right)" },
    { browser: "blank", visitors: 200, fill: "var(--color-blank)" },
  ]);
    
    let { id } = params;
     id = decodeURIComponent(id);
     const {
      user, setUser,questionArr,questionByGroup,fetchQuestion,
  } = useGlobalContext();
     const [questions, setQuestions] = useState([]);
     const [currentQuestion, setCurrentQuestion] = useState(0);
     const [answers, setAnswers] = useState([]);
     const [currentAnswer, setCurrentAnswer] = useState('');
     const[open,setOpen]=useState(false);
     const[rightBox,setRightBox]=useState({right:[],wrong:[]});
     const [timeLeft, setTimeLeft] = useState(50);
    // console.log("Id :",id);



    // func

    const handleAnswer = () => {
      // console.log("Run up :",questions[currentQuestion] );
    
      if(currentQuestion <= (questions.length-1) ){
      // setAnswers((prevAnswers) => ({ ...prevAnswers, [questions[currentQuestion]._id]: currentAnswer }));
      let newObj = JSON.parse(JSON.stringify(questions[currentQuestion]));
      newObj.userAnswer = currentAnswer;
      setAnswers((prevAnswers)=>{
        rightAnswer(([...prevAnswers,newObj]));
        return ([...prevAnswers,newObj]);
      });
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer('');
      setTimeLeft(50);
    }
    // console.log("currentQues :",currentQuestion);
    if(questions.length-1 === currentQuestion ){
      setOpen(true);
      // console.log("Run",rightBox)
      
        setTimeout(() => {
          setRightBox((prev)=>{
            console.log("Run",prev)
            sendData(prev);
  
            setChartData([
              { browser: "wrong", visitors: prev.wrong.length, fill: "var(--color-wrong)" },
              { browser: "right", visitors: prev.right.length, fill: "var(--color-right)" },
              { browser: "blank", visitors: 0, fill: "var(--color-blank)" },
            ]);
  
            return prev;
          })
        }, 50);
    }

    };
  
    const selectAnswer = (ans) => {
      setCurrentAnswer(ans);
      console.log(user);
    };

    const rightAnswer = (ans)=>{
      let right = [];
      let wrong = [];

      ans.forEach(item=>{
        if(item.userAnswer === item.answer){
          right.push(item);
        }else{
          wrong.push(item);
        }
      })
      // console.log("{right,wrong} :",{right,wrong});
      setRightBox({right,wrong});
      return {right,wrong};
    }

    const sendData = (rightBox)=>{

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
              // name,
              // email,
              // password,
              // passwordConfirm:password,
              progress:{...item.data.data.progress,[id]:{right:rightBox.right.length,wrong:rightBox.wrong.length},}
            }),
          })
            .then((item) => item.json())
            .then((item) => {
              console.log("sendData  :", item);
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
  

    const totalVisitors = React.useMemo(() => {
      return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])


    // usereefff
    useEffect(()=>{
// console.log("questionByGroup :",questionByGroup);
// console.log("questionArr :",questionArr);
      if(questionByGroup[id]){
        setQuestions(questionByGroup[id]);
      }
    },[questionByGroup,questionArr]);

   useEffect(() => {
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
  
      if (timeLeft === 0) {
        handleAnswer(null);
        setTimeLeft(50);
        // clearInterval(interval);
      }
  
      return () => clearInterval(interval);
    }, [timeLeft]);
  

  return (
    <div className="flex min-h-screen w-full flex-col">
      <UserPageNav/>

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



          <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your Result of {id}</CardTitle>
        <CardDescription>Here is chart</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
             
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
         
        Right Answers :{rightBox.right.length}
        </div>
        <div className="flex items-center gap-2 font-medium leading-none">
        Wrong Answers :{rightBox.wrong.length}
        </div>
        <div className="leading-none text-muted-foreground mt-3">
          You done Well my boy congrats !
        </div>
      </CardFooter>
    </Card>

{/* 
            <AlertDialogTitle>Right Answers :{rightAnswer().right.length}</AlertDialogTitle>
            <AlertDialogTitle>Wrong Answers :{rightAnswer().wrong.length}</AlertDialogTitle> */}
                          
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{
              setOpen(false);
              window.location.href = '/userpage'
            }} >Go Home</AlertDialogCancel>
            <AlertDialogAction onClick={()=>window.location.reload()}>Try Again</AlertDialogAction>
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
                    {/* <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead></TableHead>
                        <TableHead></TableHead>
                        <TableHead className="hidden md:table-cell">
                          
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          
                        </TableHead>
                        <TableHead>
                          
                        </TableHead>
                      </TableRow>
                    </TableHeader> */}
                      {/* {questionByGroup[id]?.map((item,key)=>{ */}

                      {questions.map((item,key)=>{
                        return (
                    <TableBody key={key+'abc'}>
                          
                              <TableRow className={`${currentQuestion !== key && 'hidden'}`}  >
                          <TableCell className="hidden sm:table-cell">
                          {/* {key} */}
                          </TableCell>
                          <TableCell className="font-medium">
                            <p className="text-lg font-bold" >{item.question}</p>
                          </TableCell>
                          <TableCell className=''>
                          {/* {item.choice.map(item=>{ */}
                          {/* {item.choices.map(item=>{
                            console.log("currentAnswer :",currentAnswer," item:",item, currentAnswer===item)
                            return(
                            <Badge onClick={()=>selectAnswer(item)} variant={`${currentAnswer === item && '' }`} key={item}>  {item}</Badge>
                            // <Badge variant='outline' >{item}</Badge>
                            );
                          })} */}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {/* {item.subject} */}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {/* <Button onClick={handleAnswer} >Next</Button> */}
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

                       <DropdownMenuItem onClick={()=>openEdit(item)}>Edit</DropdownMenuItem>
                               

                                <DropdownMenuItem onClick={()=>deleteQuestion(item._id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu> */}
                            <div className="outerBox flex justify-center items-center">
                            <Image alt="good" src={GifTimer} width={70} height={70} />
                            <p className="font-bold text-lg ml-2">Time: {timeLeft}</p>
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow className={`${currentQuestion !== key && 'hidden'} pt-5`}  >
                        <TableCell  className="hidden md:table-cell">
                            {/* <Button onClick={handleAnswer} >Next</Button> */}
                          </TableCell>
                          {/* {item.choice.map(item=>{ */}

                        
                          {item.choice.map((item,key)=>{
                            // console.log("currentAnswer :",currentAnswer," item:",item, currentAnswer===item)
                            return(
                              <TableRow className={``}  >
                              <TableCell  className="hidden md:table-cell" key={"abc"+item} >
                            <Badge className='p-3 cursor-pointer' onClick={()=>selectAnswer(item)} variant={`${currentAnswer === item && '' }`} >
                              <p className=' tracking-wider text-base ' >{key+1}:  {item}</p>
                            </Badge>
                        
                            </TableCell>
                                  </TableRow>
                            );
                          })}
                        
                        
                        
                        
                        </TableRow>

                        <TableRow className={`${currentQuestion !== key && 'hidden'}`}  >
                          <TableCell className="hidden sm:table-cell">
                          {/* {key} */}
                          </TableCell>
                          <TableCell className="font-medium">
                            {/* {item.question} */}
                          </TableCell>
                          <TableCell className=''>
                          {/* {item.choice.map(item=>{ */}
                          {/* {item.choices.map(item=>{
                            console.log("currentAnswer :",currentAnswer," item:",item, currentAnswer===item)
                            return(
                            <Badge onClick={()=>selectAnswer(item)} variant={`${currentAnswer === item && '' }`} key={item}>  {item}</Badge>
                            // <Badge variant='outline' >{item}</Badge>
                            );
                          })} */}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          {/* {item.subject} */}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                          <Button disabled={!currentAnswer} onClick={handleAnswer} >Next</Button>
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

                       <DropdownMenuItem onClick={()=>openEdit(item)}>Edit</DropdownMenuItem>
                               

                                <DropdownMenuItem onClick={()=>deleteQuestion(item._id)}>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu> */}
                          </TableCell>
                        </TableRow>

                    </TableBody>

                        );
                      })}
                     
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

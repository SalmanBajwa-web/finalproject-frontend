"use client"

import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();


export const AppProvider = ({ children }) => {
    // ############### state
    const [name, setName] = useState('Lion King');
    const [user, setUser] = useState({});
    const [questionArr, setQuestionArr] = useState([]);
    const [questionByGroup, setQuestionByGroup] = useState([]);


    // ############func
 
   const logout = ()=>{
    localStorage.setItem('user','');
    window.location.href = '/login'
   }
 
    function groupBySubject(arr) {
        const result = {};
        arr.forEach((item) => {
          if (!result[item.subject]) {
            result[item.subject] = [];
          }
          result[item.subject].push(item);
        });
        return result;
      }


    const fetchQuestion = () => {

        fetch("https://finalproject-backend-black.vercel.app/api/v1/questionRoute?page=1&limit=500")
      .then((item) => item.json())
      .then((item) => {
        if(item.status === 'success'){
            setQuestionArr(item.data.data);
            const arrGroup = groupBySubject(item.data.data);
            setQuestionByGroup(arrGroup);
            console.log("arrGroup :",arrGroup);
        }
        console.log("fetchQuestion  :", item);
      })
      .catch((err) => {
        console.log("fetchQuestion Error :", err);
      });
    }
    const logOut = ()=>{
        fetch(`http://192.168.173.1:3001/api/v1/user/logOut`,{mode:'cors',credentials:'include'})
        .then(item => item.json())
        .then(item => {
            if (item.status === 'fail') throw new Error(item.message);
            setUser({});
        })
        .catch(err => {
            alert(err);
        })
    }
    // ###########effect
    useEffect(() => {
        fetchQuestion();
    }, []);

    useEffect(() => {
        if(!user.token) return;
        localStorage.setItem('user',JSON.stringify(user));

    }, [user]);

    useEffect(() => {
        if(!user.token){
            console.log("Running");
            const newUser= localStorage.getItem('user');
             if(newUser){
                 setUser(JSON.parse(newUser));
             }
         }
    },[]);



    return (
        <AppContext.Provider value={{
            name,
            user, setUser,
            questionArr,
            questionByGroup,
            fetchQuestion,
            logout,
        }}>

            {children}
        </AppContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(AppContext);
}
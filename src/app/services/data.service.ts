import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentAcno:any
  currentUname:any

  database:any={


    1000:{acno:1000,uname:"anu",password:1000,balance:5000,transaction:[]},
    1001:{acno:1001,uname:"manu",password:1001,balance:5000,transaction:[]},
    1002:{acno:1002,uname:"sanu",password:1002,balance:5000,transaction:[]}
  }


  


  constructor() { 
    this.getData()
  }

  // to store data in local storage
  storeData(){
     localStorage.setItem("databaseNew",JSON.stringify (this.database))
     if(this.currentAcno){
       localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
     }
     if(this.currentUname){
       localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
     }
  }
  // to get data from localstorage
  getData(){
    if(localStorage.getItem("databaseNew")){
      this.database= JSON.parse(localStorage.getItem("databaseNew")|| '')
    }

    if(localStorage.getItem("currentAcno")){
      this.currentAcno= JSON.parse(localStorage.getItem("currentAcno")|| '')
    }
     if(localStorage.getItem("currentUname")){
      this.currentUname= JSON.parse(localStorage.getItem("currentUname")|| '')
    }

  }

  // register

  register(acno:any,password:any,uname:any){

    let database = this.database

    if(acno in this.database){
      return false
    }
    else{

      database[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]

      }
      this.storeData()
      return true

    }

  }
  // login
  login(acno:any,password:any){
    let database=this.database
    if(acno in database){

      if(password==database[acno]["password"]){
          
        this.currentAcno = acno

        this.currentUname=database[acno]["uname"]

        this.storeData()

       return true
      }
      else{
        alert("Incorrect password")
        return false
      }
     }
     else{
       alert("User doesnot exist!!!")
       return false
     }
  }


  // deposit

  deposit(acno:any,password:any,amt:any){

    var amount = parseInt(amt)

    // amount is integer

    let database=this.database

    if(acno in database){

      if(password==database[acno]["password"]){

        database[acno]["balance"]= database[acno]["balance"]+amount

        database[acno]["transaction"].push({

          amount:amount,
          type:"CREDIT"
        })
        console.log(database)

        // database[acno]["balance"]+=amount

        this.storeData()

        return database[acno]["balance"]

      }
      else{
        alert("incorrect password")

        return false
      }

      }

    
    else{
      alert("user doesnot exist")

      return false
    }




    
  }


  // withdraw

  withdraw(acno:any,password:any,amt:any){

    var amount = parseInt(amt)

    let database=this.database

    if(acno in database){

      if(password==database[acno]["password"]){

       if(database[acno]["balance"]>amount) {

        database[acno]["balance"]= database[acno]["balance"]-amount


        database[acno]["transaction"].push({

          amount:amount,
          type:"DEBIT"
        })
        console.log(database)

        this.storeData()

        return database[acno]["balance"]

       }
       else{
         alert("insufficient balance")
         return false
       }

        

        

      }
      else{
        alert("incorrect password")

        return false
      }

      }

    
    else{
      alert("user doesnot exist")

      return false
    }




    
  }

  // transaction

  getTransaction(acno:any){

    return this.database[acno]["transaction"]

  }


    
    
}

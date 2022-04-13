import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

user:any
lDate:any
acnod:any


  acno=""
  pswd=""
  amount=""

  acno1=""
  pswd1=""
  amount1=""

  // deposit group model creation
  depositForm=this.fb.group({

    // form array create
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]


})

// withdraw group model creation
withdrawForm=this.fb.group({

  // form array create
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]]


})
 

  constructor(private ds:DataService ,private fb:FormBuilder,private router:Router ) { 
    this.user=this.ds.currentUname
    this.lDate = new Date() 
  }

  ngOnInit(): void {
    if(!localStorage.getItem("currentAcno")){
      alert("please Log In")
      this.router.navigateByUrl("login")
    }
  }

  // deposit

  deposit(){

    var acno=this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount

     // calling deposit function to dataservice
     if(this.depositForm.valid){
      const result = this.ds.deposit(acno,pswd,amount)

      if(result){
        alert(amount+"successfully deposited....And new balance is"+" " + result)
      }
    }
    else{
      alert("invalid form")
    }
  

     }

    
  // withdraw

  withdraw(){
    

    var acno=this.withdrawForm.value.acno
    var pswd= this.withdrawForm.value.pswd
    var amount = this.withdrawForm.value.amount

    // calling withdraw function to dataservice
    if(this.withdrawForm.valid){
      const result = this.ds.withdraw(acno,pswd,amount)

      if(result){
        alert(amount+"successfully debited....And new balance is"+" " + result)
  
    }
  
    }
    else{
      alert("invalid form")
  }

  }

  logout(){
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    this.router.navigateByUrl("login")
  }
  deleteAccount(){
    this.acnod=JSON.parse(localStorage.getItem("currentAcno")|| '')
  }
  cancel(){
    this.acnod=""
  }

  delete(event:any){
    alert("Delete account "+event+" from parent")
    this.router.navigateByUrl("login")
  }
    

}
export class User{
    name : string 
    email:string
    password: string
    birth:string
    gender:string
    constructor(name:string,email:string,password:string,birth:string,gender:string){
        this.name=name 
        this.email=email
        this.password=password
        this.birth=birth
        this.gender=gender
    }
}
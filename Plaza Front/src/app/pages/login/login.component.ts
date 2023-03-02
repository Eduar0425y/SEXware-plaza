import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginData = {
    "email" :'',
    "password" : ''
  }

  constructor(private snack: MatSnackBar, private loginService:LoginService)
  {

  }


  ngOnInit(): void{

  }



  formSubmit()
  {
    //console.log("Click en el boton de login", this.loginData.username, this.loginData.password);
    if(this.loginData.email.trim() == '' || this.loginData.email.trim() == null)
    {
      this.snack.open('El nombre de usuario es requerido', 'aceptar', {
        duration:3000
      })

      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null)
    {
      this.snack.open('La contraseña es requerida', 'aceptar', {
        duration:3000
      })

      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);

        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) =>{
          console.log(user);
          close();
          open("/admin");
        })

      }, (error) => {
        console.log(error);
        this.snack.open('Las credenciales no son validas', 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
  
        });
      }

    )
    

  }

  

  

}
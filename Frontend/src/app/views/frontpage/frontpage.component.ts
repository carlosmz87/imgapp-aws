import { ImgService } from './../../services/img.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})
export class FrontpageComponent implements OnInit {
  public listbucket: any = []
  public archivos:any;
  public previsualizacion:string="";
  public nombre:string="";
  public getquery:any=[]
  myForm = new FormGroup({
    file: new FormControl(''),
    fileSource: new FormControl('')
  });
  constructor(private sanitizer: DomSanitizer, private servicio:ImgService) { }

  ngOnInit(): void {
  }

  CapturarImg(event:any):any{
    const archivoCapturado = event.target.files[0];
    this.archivos= archivoCapturado;
    this.ExtraerBase64(archivoCapturado).then((imagen:any)=>{
      this.previsualizacion = imagen.base;
    });
    this.myForm.patchValue({
      fileSource: this.archivos
    });
  }

  ExtraerBase64 = async ($event: any) => new Promise((resolve, reject)=>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = ()=> {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    }catch(e){
      return null;
    }
  });

  SubirArchivo():any{
    try{
      const formData = new FormData();
      formData.append('file', this.myForm.get('fileSource')!.value);
      this.servicio.Post('post',formData).subscribe(res =>{
        console.log(res.resS3);
        console.log(res.resRds);
      });
    }catch(e){
      console.log('ERROR', e);
    }
  }

  ListarArchivos(){
    this.listbucket = []
    this.servicio.Get('get').subscribe(res =>{
      console.log(res);
      this.listbucket = res.listS3;
      this.getquery = res.listSql;
    });
    
  }

  ModificarArchivo(nombre:string){
    if(nombre == ""){
      alert("PRIMERO DEBE CONSULTAR LOS ELEMENTOS EXISTENTES EN EL BUCKET Y SELECCIONAR UNO")
    }else{
      try{
        const formData = new FormData();
        formData.append('file', this.myForm.get('fileSource')!.value);
        this.servicio.Put('put/'+this.nombre, formData).subscribe(res =>{
          console.log(res.resS3);
          console.log(res.resRds);
        });
      }catch(e){
        console.log('ERROR', e);
      }
    }
  }

  BorrarArchivo(nombre:string){
    if(nombre == ""){
      alert("PRIMERO DEBE CONSULTAR LOS ELEMENTOS EXISTENTES EN EL BUCKET Y SELECCIONAR UNO")
    }else{
      this.servicio.Delete('delete/'+this.nombre).subscribe(res =>{
        console.log(res.respuestaS3);
        console.log(res.respuestaSql);
        alert("SE HA ELIMINADO UN ARCHIVO DEL BUCKET Y UN REGISTRO DE S3");
      });
    }
  }

  ObtenerNombre(cont:string){
    this.nombre = cont;
    console.log("EL NOMBRE DEL ARCHIVO ES: ", this.nombre)
  }
 
}


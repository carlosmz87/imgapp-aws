import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  baseUrl: string = 'http://imgapp-alb-140987581.us-east-1.elb.amazonaws.com:3000/training/api/'
  constructor(private http: HttpClient) { }
  
  public Post(ruta:string, body:any):Observable<any>{
      return this.http.post(this.baseUrl+ruta, body)
  }

  public Put(ruta:string, body:any):Observable<any>{
    return this.http.put(this.baseUrl+ruta, body)
  }

  public Get(ruta:string):Observable<any>{
    return this.http.get(this.baseUrl+ruta)
  }

  public Delete(ruta:string):Observable<any>{
    return this.http.delete(this.baseUrl+ruta)
  }

}
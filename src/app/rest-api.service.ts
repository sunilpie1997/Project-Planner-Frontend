import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor() { }

  private static path="http://project-planner-ufaber.herokuapp.com/";
  
  public static getPath():String
  {
    return RestApiService.path;
  }



}

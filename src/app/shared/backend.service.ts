import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }


  submitSearch(searchData: { buildingNo: number; flatNo: number }) {
    searchData["date"]= new Date();
    // Send Http request
    this.http.post('https://dar-masr.firebaseio.com//search.json',
      searchData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
}

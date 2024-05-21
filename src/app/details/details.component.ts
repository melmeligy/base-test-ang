import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Building } from '../shared/building.model';
import { BuildingsService } from '../shared/buildings.service';
import { BackendService } from '../shared/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  @ViewChild('myCanvas', { static: true }) canvasRef: ElementRef;
  @ViewChild('results', { static: true }) public results:ElementRef;

  public loading = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  currentBuildingNo = 281;
  showCanvas: boolean = false;
  showResText: boolean = false;

  windDir : string;
  floor : string;
  flatOriantation : string;
  connectedText : string;
  buildings: Building[] = [];

  buildingNo: number;
  flatNo: number;

  constructor(private backendService : BackendService, 
      private buildingsService : BuildingsService,
      private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit() {
    //1
    //this.buildings = this.buildingsService.section3_buildings;
    this.buildingNo = this.route.snapshot.params['buildingno'];
    this.flatNo = this.route.snapshot.params['flatno'];
    
    this.onSubmit();
  }

  ngAfterViewInit(){
    this.results.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
  }


  onSubmit() {

    this.loading = true;

    let floorNo = Math.floor(this.flatNo / 4);
    Math.floor(this.flatNo % 4) == 0 ? floorNo--: floorNo ;
    
    switch (floorNo) {
      case 0:
        this.floor = "ارضي"
        break;

      case 1:
        this.floor = "اول"
        break;
      
      case 2:
        this.floor = "ثاني"
        break;
      
      case 3:
        this.floor = "ثالث"
        break;
    
      case 4:
        this.floor = "رابع"
        break;

      case 5:
        this.floor = "اخير"
        break;

      default:
        this.floor = ""+floorNo;
        break;
    }
    let buildingNo = this.buildingNo;
    let flatNo = this.flatNo;
  
    this.backendService.submitSearch({buildingNo, flatNo});

    this.showResult(buildingNo, flatNo);
    console.log(buildingNo +"-"+flatNo+ "loc ="+(flatNo % 4));
  }
  
  showResult(buildingNo : number, flatNo : number){
    this.showCanvas = true;
    
    if(buildingNo > 0)
      this.showResText = true;

    let ctx: CanvasRenderingContext2D =
    this.canvasRef.nativeElement.getContext('2d');
  
    let image = new Image();
    image.onload = ()=> {
      ctx.drawImage(image, 0, 0, 1102, 780);

      ctx.beginPath();
      ctx.fillStyle = '#DD0031';
      
      let building : Building = this.buildingsService.getBuilding(buildingNo);
      if(building == null){
        console.log("Can't find submitted building No. "+ buildingNo);
        return;
      }
      let flatLoc : number= flatNo % 4;
      let flatWidth: number = 14, flatHeight : number = 10;
      let width: number, height : number;

      if(flatLoc == 1 || flatLoc ==0)
        this.flatOriantation = "امامية";
      else
        this.flatOriantation = "خلفية";

      if(building.oriantation == 1){//top
        if(flatLoc == 1){
          width = flatWidth * -1;
          height = flatHeight * -1;
          this.windDir = "بحري";
        }
        else if(flatLoc == 2){
          width = flatWidth * -1;
          height = flatHeight ;
          this.windDir = "قبلي";
        }
        else if(flatLoc == 3){
          width = flatWidth ;
          height = flatHeight ;
          this.windDir = "قبلي";
        }
        else if(flatLoc == 0){
          width = flatWidth ;
          height = flatHeight * -1;
          this.windDir = "بحري";
        }
        
      }
      else if(building.oriantation == 3){//south
        if(flatLoc == 1){
          width = flatWidth ;
          height = flatHeight ;
          this.windDir = "قبلي";
        }
        else if(flatLoc == 2){
          width = flatWidth ;
          height = flatHeight * -1;
          this.windDir = "بحري";
        }
        else if(flatLoc == 3){
          width = flatWidth * -1;
          height = flatHeight * -1;
          this.windDir = "بحري";
        }
        else if(flatLoc == 0){
          width = flatWidth * -1;
          height = flatHeight ;
          this.windDir = "قبلي";
        }
        
      }
      else if(building.oriantation == 2){//right
        if(flatLoc == 1){
          width = flatHeight ;
          height = flatWidth * -1;
          this.windDir = "شرقي";
        }
        else if(flatLoc == 2){
          width = flatHeight * -1;
          height = flatWidth * -1;
          this.windDir = "غربي";
        }
        else if(flatLoc == 3){
          width = flatHeight * -1;
          height = flatWidth ;
          this.windDir = "غربي";
        }
        else if(flatLoc == 0){
          width = flatHeight ;
          height = flatWidth ;
          this.windDir = "شرقي";
        }
      }
      else if(building.oriantation == 4){//left
        if(flatLoc == 1){
          width = flatHeight * -1;
          height = flatWidth ;
          this.windDir = "غربي";
        }
        else if(flatLoc == 2){
          width = flatHeight ;
          height = flatWidth ;
          this.windDir = "شرقي";
        }
        else if(flatLoc == 3){
          width = flatHeight ;
          height = flatWidth * -1;
          this.windDir = "شرقي";
        }
        else if(flatLoc == 0){
          width = flatHeight * -1;
          height = flatWidth * -1;
          this.windDir = "غربي";
        }
        
      }

      if(building.connected === 3){
        this.connectedText = "عمارة منفصلة"
      }
      else if(building.connected === 2 || building.connected === 1 ){
        if(building.connected === 1 && (building.oriantation == 1 || building.oriantation == 3)){
          width = width * -1;
        }
        else if(building.connected === 1 && (building.oriantation == 2 || building.oriantation == 4)){
          height = height * -1;
        }

        if(flatLoc == 1 || flatLoc ==2){
          this.connectedText = "عمارة ملتصقة - شقة ناصية"
        } else {
          this.connectedText = "عمارة ملتصقة - شقة ملتصقة"
        }
      }
      let angle = 225;
      ctx.translate( building.posX , building.posY  );
      ctx.rotate(Math.PI / 180 * angle); 
      //ctx.moveTo(building.posX, building.posY);
      ctx.rect(0, 0, width, height);
        
      ctx.fill();

      ctx.strokeStyle = '#DD0031';
      ctx.beginPath();
      ctx.arc(0,0, 60, 0, Math.PI * 2);
      ctx.arc(0,0, 63, 0, Math.PI * 2);
    
      ctx.stroke();
      
    }
    image.src = this.getImageSrcPath(buildingNo);

    this.loading = false;
    
  }

  getImageSrcPath(buildingNo) : string{
    let imgSrc : string ="../assets/img/section1.jpg";

    if(buildingNo > 160 && buildingNo <=280)
      imgSrc ="../assets/img/section2.jpg";
    else if(buildingNo > 280 )
      imgSrc ="../assets/img/section3.jpg";

    return imgSrc;
  }

  posX : number;
  posY : number;
  buildingOriantation : number;
  setOriantation : boolean = false;

  canvasClicked(event : MouseEvent){
  /* CODE TO SET CONNECTED BUILDINGS
    let connected = 3;
    if(event.key === "1")
      connected = 1;
    else if(event.key === "2")
      connected = 2;

    let currentBuilding = this.buildings.find(building => building.buildingNo === this.currentBuildingNo);
    currentBuilding.connected = connected;
    console.log(currentBuilding);
    
    //this.buildings[buildingnNo:this.buildingNo]
    this.currentBuildingNo++;
*/

/* code to set center and oriantation*/

    if(!this.setOriantation){
      this.posX = event.offsetX;
      this.posY = event.offsetY;
      this.buildingNo = this.currentBuildingNo;
      
      this.setOriantation = true
    }
    else{
      let deltaX = Math.abs(this.posX - event.offsetX);
      let deltaY = Math.abs(this.posY - event.offsetY);

      if(deltaX > deltaY){
        if(this.posX > event.offsetX)
          this.buildingOriantation = 4;
        else
          this.buildingOriantation = 2;
      }
      else {
        if(this.posY > event.offsetY)
          this.buildingOriantation = 1;
        else
          this.buildingOriantation = 3;
      }
      this.setOriantation = false;
      this.currentBuildingNo++

      let buildingAngle = this.angle360(this.posX ,this.posY, event.offsetX, event.offsetY)

      console.log("New Building No = "+ this.buildingNo + " - X= "+this.posX+ " , Y= "+this.posY+ " , Oriantation = "+this.buildingOriantation+", buildingAngle ="+buildingAngle);
      this.buildings.push(new Building(this.buildingNo, this.buildingOriantation, this.posX, this.posY, 1));
    }
  }

  angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    return theta;
  }
  
  angle360(cx, cy, ex, ey) {
    var theta = this.angle(cx, cy, ex, ey); // range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }

  goBack(){
    this.router.navigate(['/']);
  }
}

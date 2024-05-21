export class Building{

    buildingNo : number;
    oriantation: number;  //Enterence is located 1. North, 2.Yemeen, 3. South, 4.shmal
    posX: number;
    posY: number;
    connected: number;  //1. left connected, 2. Right connected, 3. Standalone

    constructor(buildingNo, oriantation, posX, posY, connected){
        this.buildingNo = buildingNo;
        this.oriantation = oriantation;
        this.posX = posX;
        this.posY = posY;
        this.connected = connected;
    }

}
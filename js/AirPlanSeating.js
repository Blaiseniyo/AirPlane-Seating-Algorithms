class AirPlanSeating{
    constructor(seats,passengers){
        this.seats=seats,
        this.passengers=passengers
    }

    classifySeats (){
        const arrangedSeats=[];
        for(let section = 0; section < this.seats.length; section++){
            for(let column = 1;column<=this.seats[section][0];column++){
                for(let row = 1; row <= this.seats[section][1];row++){
                    if(section==0 && column==1 && this.seats[section][0]>1){
                        arrangedSeats.push({section,column,row,"priority":2,type:"window"})
                    }else if(section === this.seats.length-1 && this.seats[section][0] >= 2 && column === this.seats[section][0]){
                        arrangedSeats.push({section,column,row,"priority":2,type:"window"})
                    }
                    else if(column === this.seats[section][0] || column===1 ){
                        arrangedSeats.push({section,column,row,"priority":1,type:"aisle"})
                    }else if(this.seats[section][0] > column && column > 1){
                        arrangedSeats.push({section,column,row,"priority":3,type:"middle"})
                    }
                }
            }
        }
        this.classifiedSeats=arrangedSeats;

    }

    sortSeats(){
        this.classifiedSeats.sort((a,b)=>{
            return a["row"] - b["row"]
        }
        )
        this.classifiedSeats.sort((a,b)=>{
            return a["priority"] - b["priority"]
        }
        )
    }

    giveSeats(){
        let seatingPlan = []
        this.classifiedSeats.forEach((seat,index) => {
            if(index+1 <= this.passengers){
                seatingPlan.push({...seat,passenger:index+1})
            }else{
                seatingPlan.push({...seat})
            }
        });
        this.seatingPlan=seatingPlan
    }

    dispalySeatingPlan(){
        this.clearView()
        const sections = document.getElementById("seatingPlan");
        sections.style.display="grid";
        sections.style.gridTemplateColumns= this.gridStyle(this.seats.length)
        sections.classList.add("backgroud")
        this.seatingPlan.sort((a,b)=>a["row"]-b["row"])
        this.seatingPlan.sort((a,b)=>a["column"]-b["column"])
        this.seatingPlan.sort((a,b)=>a["section"]-b["section"])
        for(let i=0; i<this.seats.length; i++){
          let section = document.createElement('div');
          section.classList.add("section");
          for(let j=0; j<this.seats[i][1]; j++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for(let k=0; k<this.seatingPlan.length; k++) {
                let seat = document.createElement('div');
                if(this.seatingPlan[k].section===i && this.seatingPlan[k].row===j+1) {
                    seat.classList.add(this.seatingPlan[k].type)
                    seat.classList.add('seat');
                    seat.innerText=this.seatingPlan[k].passenger?this.seatingPlan[k].passenger:"";
                }
                row.appendChild(seat);
            }
            section.appendChild(row);
          }
          sections.appendChild(section);
        }
      }

    clearView(){
        const sections = document.getElementById("seatingPlan");
        while(sections.firstChild){
            sections.removeChild(sections.firstChild)
        }
    }
    gridStyle(size){
        const rate = 100/size
        let template= `${rate}%`;
        for(let i=0;i<size;i++){
            template=`${template} ${rate.toString()}%`
        }
        return template
    }
}
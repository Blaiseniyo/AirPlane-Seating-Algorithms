document.getElementById("form").addEventListener("submit",(e)=>{
    e.preventDefault()

    const seats = e.target.seats.value
    const passanger = e.target.passangers.value
    if(seats.match(/(\[)(\[\d{1,},\d{1,}\])(,\[\d{1,},\d{1,}\])*(\])/g)){
        let string = seats.slice(2,seats.length-2)
        let columnRows = string.split("],[").map((s)=>{
            return s.split(",")
        })
        for(let i=0 ; i<columnRows.length; i++){
            for(let j=0; j < columnRows[i].length; j++){
                columnRows[i][j] = parseInt(columnRows[i][j])
            }
        }
        const plan = new AirPlanSeating(columnRows,passanger);
        plan.classifySeats()
        plan.sortSeats();
        plan.giveSeats();
        plan.dispalySeatingPlan()

    }else{
        alert("Please Enter a valid 2D array for seats arrangements")
        e.target.seats.focus()
    }

})

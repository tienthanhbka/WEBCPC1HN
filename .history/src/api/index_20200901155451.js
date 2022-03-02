export function getStartDate(){
    let now = new Date()
    let _30DayBefore = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 30
    )
    return _30DayBefore
}

export function getEndDate(){
    let x = new Date();
    return new Date(x.setDate(x.getDate()+1));
}

export function getStartMonth(){
    let now = new Date()
    let Day = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    )
    return Day
}

export function getEndMonth(){
    let now = new Date()
    let Day = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        1 - 1
    )
    return Day
}

export function getStartRole(){
    let now = new Date()
    let Day = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        20
    )
    return Day
}

export function getEndRole(){
    let now = new Date()
    let Day = new Date(
        now.getFullYear(),
        now.getMonth(),
        20
    )
    return Day
}

export function getStartWeek(){
    let now = new Date()
    var n = now.getDay()
    switch(n){
        case 0: var startWeek = now.addDays(-6); break;
        case 1: var startWeek = now; break;
        case 2: var startWeek = now.addDays(-1); break;
        case 3: var startWeek = now.addDays(-2); break;
        case 4: var startWeek = now.addDays(-3); break;
        case 5: var startWeek = now.addDays(-4); break;
        case 6: var startWeek = now.addDays(-5); break;
    }
    return startWeek.toString('yyyy-MM-dd');
}

export function getEndWeek(){
    let now = new Date()
    var n = now.getDay()
    switch(n){
        case 0: var endWeek = now; break;
        case 1: var endWeek = now.addDays(6); break;
        case 2: var endWeek = now.addDays(5); break;
        case 3: var endWeek = now.addDays(4); break;
        case 4: var endWeek = now.addDays(3); break;
        case 5: var endWeek = now.addDays(2); break;
        case 6: var endWeek = now.addDays(1); break;
    }
    return endWeek.toString('yyyy-MM-dd');
}

export function getMonth(){
    let now = new Date()

let formatted_date =  (now.getMonth() + 1) + "-" + now.getFullYear()
//console.log(formatted_date)
    // let Day = 
    //  new Date(
    //     now.getFullYear(),
    //     now.getMonth()
        
    // )
    return formatted_date
}

export function toUpperCaseString(string){
    var a = string.split(' ')
    var res = ''
    a.forEach(function(item,index){
        if(index == 0 ){
            res += item.charAt(0).toUpperCase() + item.slice(1);
        } else{
            res += ' ' + item.charAt(0).toUpperCase() + item.slice(1);
        }
    })
    return res;
}


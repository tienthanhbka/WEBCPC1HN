import TypeCus from './const';
export  function InitOValue(row,type){
    TypeCus[type].forEach(o=>{
        row['O'+o.col] = row[o.col];
    });
}
export  function UndoEdit(row,type){
    TypeCus[type].forEach(o=>{
        row[o.col] = row['O'+o.col];
    });
}
export  function CalSumP(row,type){
    var sum = 0;
    TypeCus[type].forEach(e => {
      if (e.type == "p") sum += Number(row[e.col]);
    });
    row.SumP = sum;
}

export  function CalValueP(row,col,m){
    if(m){
     row[col] = (row[col+'m']/row['Unit Price'])*100.0;
   }else{
     row[col+'m'] = row['Unit Price']*(row[col]/100.0);
   }
 }
 export  function CalAllValueMoneyP(row,type){
   
    TypeCus[type].forEach(e => {
        if (e.type == "p") 
        row[e.col+'m'] = row['Unit Price']*(row[e.col]/100.0);
    });
    
   
 }
import moment from "moment";


export const  DateFormate = (date:string)=>{
    
    return date ? moment(date).format('lll'):"_";
}

export const lastDayesFrom = (date:string)=>{
    return moment(date).startOf('day').fromNow();    
}
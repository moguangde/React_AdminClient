/* 
日期格式化
*/
function moment(m){
 if(m<10){
     return '0'+m
 }else{
     return m
 }
}
export function formateData(time){
    if(!time){
        return ''
    }else{
        let data=new Date()
        return data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate()+' '+moment(data.getHours())+':'+moment(data.getMinutes())+':'+moment(data.getSeconds())
    }
}
export default function pressFn(){
   
    var el=document.createElement('div')
    var curTime=new Date()
    console.log(curTime+'6666')
    el.innerHTML="这是一个点击事件，获取的当前时间是："+curTime
    el.align='center'
    document.body.appendChild(el)
}
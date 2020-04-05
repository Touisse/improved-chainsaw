console.log('Client Side Loaded Successfuly !!')





const formdata = document.querySelector('form')
const searchinput= document.querySelector('input')
const message1= document.querySelector('#message1')
const message2= document.querySelector('#message2')



formdata.addEventListener('submit',(f)=>{
    f.preventDefault()
    const location = searchinput.value
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
                
            }else{
    
                message2.textContent=data.location 
                message1.textContent =data.forecast
    
    
            }
        })
    })
    
})
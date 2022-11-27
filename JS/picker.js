
window.onload=()=>{
    update_choices()
}
var colors=document.getElementsByTagName('li')


for (var i of colors){
  
    i.addEventListener('click',(e)=>{
        e.target.children[0].classList.remove('hidden')
        for (var j of colors){
            
            if(e.target!==j){
                
                j.children[0].classList.add('hidden')
            }
        }
       
    })

}

function update_settings(){
    var cv_img_divs= document.getElementsByClassName('carousel-item')
    
    for(var i of cv_img_divs){
       
       
     if (Array(...i.classList).includes("active")){
       
    
         localStorage.setItem('cv_settings',JSON.stringify({'cv':i.children[0].id}))
     }
    }
    var settings=JSON.parse(localStorage.getItem('cv_settings'))
    
   
    for(var i of colors){
    
     if (!(Array(...(i.children[0].classList)).includes('hidden'))){
        
         var settings=JSON.parse(localStorage.getItem('cv_settings'))
       
         localStorage.setItem('cv_settings',JSON.stringify({...settings,'color':i.dataset.color}))
     }
    }
}
document.getElementById('select').addEventListener('click',()=>{
  update_settings()
window.location='resume.html'

    
})
function update_choices(){
    
var settings= JSON.parse(localStorage.getItem('cv_settings'))
  if (settings!==null){
    var carousel= document.getElementsByClassName('carousel-item')

    for (var i of carousel) {
        if (i.children[0].id==settings.cv){
            i.classList.add('active')
        }
        else{
            i.classList.remove('active')
        }

    }

    document.querySelector(`[data-color="${settings.color}"]`).children[0].classList.remove('hidden')
    // document.getElementById(`${settings.cv}`).parentElement.classList.add('active')
  }
}
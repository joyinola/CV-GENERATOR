window.onload = () => {
    if (JSON.parse(localStorage.getItem('resume'))!==null){
        update_forms()
        update_cv()
    }
  
    cv_type_update()
    cv_color_update()
    cv_form_update()
}
function cv_type_update() {
    var settings = JSON.parse(localStorage.getItem('cv_settings'))


    var big_col = document.getElementsByClassName('cv_select')

    for (var i of big_col) {

        if (!(i.children[0].id == settings.cv)) {

            i.classList.add('hidden')
            // i.classList.remove('hidden')
        }
        // else{
        //     i.children[0].classList.add('hidden')
        // }
    }
}
function cv_color_update() {
    var settings = JSON.parse(localStorage.getItem('cv_settings'))
    var color = settings.color
    var save_btn = document.getElementsByClassName('save_btn')
    for (var e of save_btn) {
        e.style.color = color
    }
    var add_div = document.getElementsByClassName('add_div')
    for (var e of add_div) {
        e.style.color = color
    }
    for (var e of  document.getElementsByClassName('head_title')){
e.style.backgroundColor = color;
    }
   

    var link = document.getElementsByTagName('a')
    for (var e of link) {
        e.style.color = color
    }
    document.getElementById('forms').style.borderColor = color;

var submit=document.querySelectorAll('input[type="submit')
    for (var e of submit) {
        e.style.backgroundColor = color
    }

    if (settings.cv == 'cv1') {
        document.getElementById('biodata').style.backgroundColor = color;
        document.getElementById('cv1').style.borderColor = color;

    }
    else if (settings.cv == 'cv2') {
        
        for (var i of document.getElementsByClassName('head')){
            i.style.color= color;
        }
        document.getElementById('initials').style.backgroundColor= color;
        document.getElementById('full_name').style.color= color;
    }
    else if (settings.cv == 'cv3'){
        document.getElementsByClassName('cv3-col-8')[0].style.borderColor = color;
        document.getElementsByClassName('cv3-col-4')[0].style.borderColor = color;
        // document.getElementById('cv3').style.borderColor = color;
        for (var i of document.getElementsByTagName('h4')){
            i.style.color= color;
        }
        for (var i of document.getElementsByTagName('h2')){
            i.style.color= color;
        }

    }

}
function cv_form_update(){
    var settings = JSON.parse(localStorage.getItem('cv_settings'))
    if (settings.cv=='cv3'){
document.getElementById('division_disappear').classList.remove('hidden')
document.getElementById('image_span').classList.remove('hidden')
    }
    else if(settings.cv=='cv2'){
        document.getElementById('division_disappear').classList.add('hidden')
    }
    else{
        document.getElementById('division_disappear').classList.remove('hidden')
    }
}
var exp_num = 1
var exp_list_num = 1
var edu_num = 1

var resume = {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    address: null,
    shortBio: null,
    skill: null,
    experience: null,
    education: null,
    languages: null,
    progLan: null,
    cert: null,
    imageUrl:null

}


function update_forms() {
    var settings=JSON.parse(localStorage.getItem('cv_settings'))
    var resume=JSON.parse(localStorage.getItem('resume'))
  
    if (!validate()){
        document.getElementById('firstname').value=resume.firstName
        document.getElementById('lastname').value=resume.lastName
        document.getElementById('email').value=resume.email
        document.getElementById('tel').value=resume.phone
        document.getElementById('address').value=resume.address
        
        document.getElementById('bio').value=resume.shortBio
        if (settings.cv!=='cv2'){

            update_lan_forms()
            update_cert_form()
            update_proglan_forms()
        }
        if (settings.cv=='cv3'){
            // console.log('hi')
            document.getElementById('image').value=resume.imageUrl
        }
        update_exp_forms()
 
        skill_update_forms()
     
        edu_update_forms()
    }
  
}

//check if value is inputted in any of a given set of input field
function exists(obj_list) {
    obj_list = [...obj_list]
    for (let i of obj_list) {
        if (i.value == '') {
            return false
        }
    }
    return true
}




//set form height to cv
function changeHeight() {
    var cv_setting = JSON.parse(localStorage.getItem('cv_settings'))
    var cv = document.getElementById(`${cv_setting.cv}`)
    var cvHeight = cv.clientHeight;


// alert(cv.id)
//     alert(document.getElementById(`forms`).clientHeight)
if (!(cvHeight==0)){

    if (cv_setting.cv === 'cv2' || cv_setting.cv === 'cv3') {

        document.getElementById('forms').style.height = `${cvHeight}px`
    }
    else if(cv_setting.cv === 'cv1'){
        document.getElementById('forms').style.height = `${cvHeight + 20}px`
    }
   
}


    // alert(cv.id)





}
//when preview_btn is clicked update height
const preview = document.getElementById('preview_btn').onclick = changeHeight()

//check if all input were filled
function validate() {
    var settings = JSON.parse(localStorage.getItem('cv_settings'))

    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('tel').value;
    let address = document.getElementById('address').value;
    let bio = document.getElementById('bio').value;
    let skill = exists(document.getElementsByClassName('skill_form'))
    let degree = exists(document.getElementsByClassName('degree'))
    let course = exists(document.getElementsByClassName('course'))
    let university = exists(document.getElementsByClassName('university'))
    let edu_start = exists(document.getElementsByClassName('edu_start'))
    let edu_end = exists(document.getElementsByClassName('edu_end'))
    let position = exists(document.getElementsByClassName('position'))
    let end_date = exists(document.getElementsByClassName('end_date'))
    let start_date = exists(document.getElementsByClassName('start_date'))
    let location = exists(document.getElementsByClassName('location'))
    let organization = exists(document.getElementsByClassName('organization'))
    let experience = exists(document.getElementsByClassName('main_exp'))
    let proglan = exists(document.getElementsByClassName('prog_form'))
    let cert = exists(document.getElementsByClassName('cert_form'))
    let lan = exists(document.getElementsByClassName('lan_form'))
    let img=document.getElementById('image').value;
    if (firstname !== '' && lastname !== '' && email !== '' && phone !== '' && address !== '' && bio !== ''
    && skill && degree && course && university && edu_end && edu_start && position
    && end_date && start_date && location && organization && experience) {
  

        if (settings.cv=='cv1'){
          if (proglan && cert && lan ){
            return true
          }
        }
        else if (settings.cv=='cv3'){
            if (proglan && cert && lan && img!==''){
                return true
              }
        }
        else if(settings.cv=='cv2')
        { return true }
}
return false

    


   

}

//update programming languages to cv
function update_proglan_obj() {
    var proglan = document.getElementsByClassName('prog_form')
    resume['progLan'] = []
    for (i of proglan) {
        resume['progLan'].push(i.value)

    }


}
function update_proglan_forms() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var proglan = resume['progLan']
    if (proglan!==null){
    if (proglan.length >= 1) {
        document.getElementsByClassName('prog_form')[0].value = proglan[0]

    }
    if (proglan.length > 1) {
        for (var i = 1; i < proglan.length; i++) {
            document.getElementById('prog_form_div').insertAdjacentHTML("afterend", `
            <div class="input-data">
            <input type="text" name="" value=${proglan[i]} id="" required class="prog_form">
            <div class="underline"></div>
            </div>
            `)
        }
    }}
}
function update_lan_forms() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var lan = resume['languages']
    if (lan!==null){
    if (lan.length >= 1) {
        document.getElementsByClassName('lan_form')[0].value = lan[0]
    }
    if (lan.length > 1) {
        for (var i = 1; i < lan.length; i++) {
            document.getElementById('lan_div').insertAdjacentHTML("afterend", `
            <div class="input-data">
            <input type="text" value=${lan[i]} required class="lan_form">
            <div class="underline"></div>
            </div>
            `)
        }
    }

}}
function update_proglan_cv() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var settings=JSON.parse(localStorage.getItem('cv_settings'))
    var cv= document.getElementById(`${settings.cv}`)
   
    var proglan_list = resume['progLan']
    if (proglan_list!==null){
    var proglan_str = ''
    for (i of proglan_list) {
        //if last item end with a full stop
        if (proglan_list.indexOf(i) == (proglan_list.length - 1)) {
            proglan_str += `${i}.`
            break
        }
        //else end with a comma
        proglan_str += `${i},`
    }
    cv.querySelector('#proglan_minidiv').innerHTML = proglan_str
}}
//update certifications to obj
function update_cert_obj() {

    let certifications = document.getElementsByClassName('cert_form')
    resume['cert'] = []
    for (i of certifications) {
        resume['cert'].push(i.value)
    }
}
function update_cert_form() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var cert = resume['cert']
    if (cert!==null){
    if (cert.length >= 1) {
        document.getElementsByClassName('cert_form')[0].value = cert[0]
    }
    if (cert.length > 1) {
        for (var i = 1; i < cert; i++) {
            document.getElementById('cert_form_div').innerHTML += `
        <div class="input-data">
        <input type="text" value="${cert[i]}" required class="cert_form">
        <div class="underline"></div>
        </div>
        `
        }
    }}
}
function update_cert_cv() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var settings=JSON.parse(localStorage.getItem('cv_settings'))
    var cv= document.getElementById(`${settings.cv}`)
    let certifications = resume['cert']
    let cert_str = ''
    if (certifications!==null){
    for (i of certifications) {
        cert_str += `<p>${i}</p>`
    }
    cv.querySelector('#cert_minidiv').innerHTML = cert_str
}}
//update education to obj
function edu_update_obj() {
    // document.getElementsByClassName('edu_block')[0].innerHTML=""

    var edu_form = document.getElementsByClassName('edu_form')
    resume['education'] = []

    for (i of edu_form) {
        let degree = i.querySelector('.deg').value;
        let course = i.querySelector('.course').value;
        let university = i.querySelector('.university').value;
        let edu_start = i.querySelector('.edu_start').value;
        let edu_end = i.querySelector('.edu_end').value;
        var prototype = {
            degree: degree,
            course: course,
            university: university,
            edu_end: edu_end,
            edu_start: edu_start,
        }
        resume['education'].push(prototype)


    }


}
function edu_update_forms() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var edu = resume['education']
    if (edu.length >= 1) {
        document.getElementById('deg0').value = edu[0].degree
        document.getElementById('course0').value = edu[0].course
        document.getElementById('university0').value = edu[0].university
        document.getElementById('edu_start0').value = edu[0].edu_start
        document.getElementById('edu_end0').value = edu[0].edu_end
    }
    if (edu.length > 1) {
        for (var i = 1; i < edu; i++) {
            add_edu(i)
            document.getElementById(`deg${i}`).value = edu[i].degree
            document.getElementById(`course${i}`).value = edu[i].course
            document.getElementById(`university${i}`).value = edu[i].university
            document.getElementById(`edu_start${i}`).value = edu[i].edu_start
            document.getElementById(`edu_end${i}`).value = edu[i].edu_end
            document.getElementById(`deg${i}`).value = edu[i].degree

        }
    }
}
function edu_update_cv() {
    document.getElementsByClassName('edu_block')[0].innerHTML = ""
    var resume = JSON.parse(localStorage.getItem('resume'))
    var settings = JSON.parse(localStorage.getItem('cv_settings'))
    var edu_form = resume['education']
    var cv=document.getElementById(`${settings.cv}`)
    for (i of edu_form) {
        let degree = i.degree
        let course = i.course
        let university = i.university;
        let edu_start = i.edu_start
        let edu_end = i.edu_end
if (settings.cv=='cv2'){
    document.getElementsByClassName('edu_blockcv2')[0].innerHTML = ""

    document.getElementsByClassName('edu_blockcv2')[0].innerHTML += `<br>
    <p>${degree}: ${course}</p>
    <p>${university}-${edu_start} to ${edu_end}</p>
    
    `  
}
else{
    cv.getElementsByClassName('edu_block')[0].innerHTML = ""
    
    cv.getElementsByClassName('edu_block')[0].innerHTML += `<br>
    <p><span id="deg_display">${degree}</span>
    <strong><span id="course_display">${course}</span></strong>- 
    <span id="year_display">${edu_start} to ${edu_end}</span>
    </p>
    
    <p> <strong><span id="uni_display">${university}</span></strong> </p>
    
    `
}

    }
}


//update skill to resume object
function skill_update_obj() {
    resume['skill'] = []
    let skill = document.getElementsByClassName('skill_form');

    let skill_len = skill.length;



    for (let i = 0; i < skill_len; i++) {

        resume['skill'].push(skill[i].value)


    }


}
function skill_update_forms() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var skill = resume['skill']
   
    if (skill.length >= 2) {
        document.getElementsByClassName('skill_form')[0].value = skill[0]
        document.getElementsByClassName('skill_form')[1].value = skill[1]
    }
    if (skill.length > 2) {
        for (var i = 2; i < skill.length; i++) {
            document.getElementsByClassName('personal_info')[0].insertAdjacentHTML('beforeend',
                `
                <div class="mini_input" >
                <input type="text" value=${skill[i]} required class="skill_form">
                <div class="underline"></div>
                </div>`)
        }
    }
}
//update skill to cv template
function skill_update_cv() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var settings = JSON.parse(localStorage.getItem('cv_settings'))
    var cv=document.getElementById(`${settings.cv}`)
    var skill = resume['skill']
    let skill_len = skill.length;
    let first_half = Math.ceil(skill_len / 2)
    let list1 = '';
    let list2 = ''


    for (let i = 0; i < first_half; i++) {

        list1 += `<li>${skill[i]}</li>`
    }
    // resume['skill1']=list1

    for (let i = first_half; i < skill_len && i >= first_half; i++) {

        list2 += `<li>${skill[i]}</li>`
    }
if(settings.cv=='cv2'){
    document.getElementById('skill1cv2').innerHTML = list1
    document.getElementById('skill2cv2').innerHTML = list2
}
else{
    cv.querySelector('#skill1').innerHTML = list1
    cv.querySelector('#skill2').innerHTML = list2
}
  
}

//update experience to cv
function update_exp_obj() {
    resume['experience'] = []
    // document.getElementsByClassName('exp_block')[0].innerHTML=""
    var exp_list = document.getElementsByClassName('exp_list')

    for (var i of exp_list) {
        let position = i.querySelector('.position').value;
        let end_date = i.querySelector('.end_date').value;
        let start_date = i.querySelector('.start_date').value;
        let location = i.querySelector('.location').value;
        let organization = i.querySelector('.organization').value;
        let experience_list = i.querySelectorAll('.main_exp');


        let prototype = {
            position: position,
            end_date: end_date,
            start_date: start_date,
            location: location,
            organization: organization,
            experience_list: []
        }

        for (var i of experience_list) {
            prototype['experience_list'].push(i.value)

        }

        resume['experience'].push(prototype)


    }
}
function update_exp_forms() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var exp = resume['experience']
    if (exp.length >= 1) {
        document.getElementById('location0').value = exp[0].location
        document.getElementById('org0').value = exp[0].organization
        document.getElementById('position0').value = exp[0].position
        document.getElementById('start_date0').value = exp[0].start_date
        document.getElementById('end_date0').value = exp[0].end_date
        var exp_list = exp[0].experience_list


        if (exp_list.length >= 1) {
            document.getElementById('exp0').value = exp_list[0]
        }
        if (exp_list.length > 1) {
            for (var i = 1; i < exp_list.length; i++) {

                add_exp_list(i, document.getElementById("0"))
                console.log(i)
                document.getElementById(`exp${i}.`).value = exp_list[i]
            }
        }

    }
    if (exp.length > 1) {
        for (var i = 1; i < exp.length; i++) {
            add_experience(i)
            document.getElementById(`location${i}`).value = exp[i].location
            document.getElementById(`org${i}`).value = exp[i].organization
            document.getElementById(`position${i}`).value = exp[i].position
            document.getElementById(`start_date${i}`).value = exp[i].start_date
            document.getElementById(`end_date${i}`).value = exp[i].end_date
            var exp_list = exp[i].experience_list

            if (exp_list.length >= 1) {
                document.getElementById(`exp${i}`).value = exp_list[0]
            }
            if (exp_list.length > 1) {
                for (var i = 1; i < exp_list.length; i++) {

                    add_exp_list(i, document.getElementById(`${i}`))
                    document.getElementById(`exp${i}.`).value = exp_list[i]
                }
            }


        }
    }
}
function update_exp_cv() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var settings= JSON.parse(localStorage.getItem('cv_settings'))

    var exp_list = resume['experience']
var cv=document.getElementById(`${settings.cv}`)
if(settings.cv=='cv2'){
 var block = document.getElementsByClassName('exp_blockcv2')[0]
    block.innerHTML = ""
}
else{
    var block = cv.getElementsByClassName('exp_block')[0]
    block.innerHTML = "" 
}
 
    for (var i of exp_list) {
        let position = i.position
        let end_date = i.end_date
        let start_date = i.start_date
        let location = i.location
        let organization = i.organization
        let experience_list = i.experience_list
        let experience = ''

        for (var i of experience_list) {
            experience += `<li>${i}</li>`
        }
if(settings.cv=='cv2'){
   
    block.innerHTML += `<h6>${position},
    ${organization} - ${location}
    ${start_date} to ${end_date}</h6>
  
 
    <ul>
    ${experience}
    </ul>
    
    `
}
else{
        block.innerHTML += `<strong>${position} - </strong>${start_date} to ${end_date}
        <br>
        <strong>${organization}</strong> ${location}  
        <br>
        <ul>
        ${experience}
        </ul>
        
        `
    }
}
}

//update lan in object
function update_lan_obj() {
    let languages = document.getElementsByClassName('lan_form')
    resume['languages'] = []

    for (var i of languages) {
        resume['languages'].push(i.value)
    }


}


function update_lan_cv() {
    var resume = JSON.parse(localStorage.getItem('resume'))
    var lang = resume['languages']
    var settings=JSON.parse(localStorage.getItem('cv_settings'))
    var cv=document.getElementById(`${settings.cv}`)
    if (lang!==null){
    lan_str = ''
    for (i of lang) {

        lan_str += `<p>${i}</p>`
    }
    cv.querySelector('#lan_minidiv').innerHTML = lan_str
}}

//sets local storage to resume obj
function update_storage() {
    if (localStorage.getItem('resume') == null) {

        localStorage.setItem('resume', JSON.stringify(resume))
    }
    if (validate() && (!((JSON.parse(localStorage.getItem('resume'))) == resume))) {
        localStorage.setItem('resume', JSON.stringify(resume))
    }


}

//fetch data from local storage and updates cv
function update_cv() {

   
 
    var store = JSON.parse(localStorage.getItem('resume'))
    var settings=JSON.parse(localStorage.getItem('cv_settings'))
    var cv=document.getElementById(`${settings.cv}`)
    if (store !== null) {
    if (settings.cv=='cv2'){

cv.querySelector('#initials').innerText=`${store['firstName'][0]}${store['lastName'][0]}`.toUpperCase()
cv.querySelector('#firstnamecv2').innerText=store['firstName'].toUpperCase()
cv.querySelector('#lastnamecv2').innerText=store['lastName'].toUpperCase()
cv.querySelector('#contactcv2').children[0].innerText = store['phone'];
cv.querySelector('#contactcv2').children[1].innerText = store['email'];
cv.querySelector('#contactcv2').children[2].innerText = store['address'];
cv.querySelector('#summarycv2').innerText = store['shortBio'];

} 
else{
         var name=cv.getElementsByClassName('name')[0]
      
           name.children[0].innerHTML= `${store['firstName'].toUpperCase()}<br>${store['lastName'].toUpperCase()}`;

            
        
       
        cv.querySelector('.contact').children[1].innerText = store['address'];
        cv.querySelector('.contact').children[3].innerText = store['phone'];
        cv.querySelector('.contact').children[5].innerText = store['email'];
        cv.querySelector('#short_bio').innerText = store['shortBio'];

    
     
        update_cert_cv()
        update_lan_cv()

        update_proglan_cv()
       
    }
    if (settings.cv=='cv3'){
      
        if(store['imageUrl']!==null){
            
            cv.querySelector('#cv3Image').src=store['imageUrl']
    }
}
    skill_update_cv()

      

        update_exp_cv()

     

        edu_update_cv()

        document.documentElement.scrollTop = 0;
        document.getElementById("forms").scrollTop = 0;
        changeHeight()

} 

}
// document.getElementById('forms').classList.remove('hidden')
//update data to resume object and stores in local storage
function update_resume() {
var settings=JSON.parse(localStorage.getItem('cv_settings'))

    if (!validate()) {
        document.getElementsByClassName('alert')[0].style.display = "block";

        document.documentElement.scrollTop = 0;
        document.getElementById("forms").scrollTop = 0;
        setTimeout(() => {
            document.getElementsByClassName('alert')[0].style.display = "none";

        }, 5000)
        changeHeight()
        return false
    }
    else {

        let firstname;
        let lastname;
        let email;
        let phone;
        let address;
        let bio;


        firstname = document.getElementById('firstname').value;
        resume['firstName'] = firstname
        lastname = document.getElementById('lastname').value;
        resume['lastName'] = lastname
        email = document.getElementById('email').value;
        resume['email'] = email
        phone = document.getElementById('tel').value;
        resume['phone'] = phone
        address = document.getElementById('address').value;
        resume['address'] = address
        bio = document.getElementById('bio').value;
        resume['shortBio'] = bio;
       


        skill_update_obj()
        update_exp_obj()
        edu_update_obj()
     

      
        if (settings.cv!=='cv2'){
            update_lan_obj()
            update_cert_obj()
            update_proglan_obj()
        }
        if (settings.cv=='cv3'){
            resume['imageUrl']=document.getElementById('image').value;
        }
        update_storage()

    }



}
function toggle() {
    var settings= JSON.parse(localStorage.getItem('cv_settings'))
    var cv=document.getElementById(`${settings.cv}`)
cv.parentElement.classList.toggle('hidden_sm')
    // document.getElementById('cv_div').classList.toggle('hidden_sm')
    document.getElementById('forms').classList.toggle('hidden_sm')
}
document.getElementById("back_to_form").addEventListener('click', (e) => {
    toggle()


}
)
//when preview is clicked update cv
document.getElementById("preview_btn").addEventListener('click', (e) => {

    e.preventDefault();
    update_resume()
    update_cv()


}
)
document.getElementById("preview_btn2").addEventListener('click', () => {

    var update = update_resume()
    if (update !== false) {

        update_cv()
        toggle()
    }


})

//when + near skill is clicked add new input
document.getElementById('skill_add').addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementsByClassName('personal_info')[0].insertAdjacentHTML('beforeend',
        `
        <div class="mini_input" >
        <input type="text" required class="skill_form">
        
        
        <div class="underline"></div>
        
        
        </div>
        `)
})

function add_experience(idx) {

    document.getElementsByClassName('exp_list')[0].insertAdjacentHTML('afterend',

        `
        <br><br>
        <div class="exp_list">
        <div class="input-data">
        
        
        <input type="text" name="skill" id="location${idx}" required class="location">
        <label>Location</label>
        <div class="underline"></div>
        </div>
        <div class="input-data">
        
        <input type="text" name="skill" id="org${idx}" required class="organization">
        <label >Organization</label>
        <div class="underline"></div>
        </div>
        <div class="input-data">
        
        <input type="text" name="skill"  id="position${idx}" required class=" position">
        <label>Position Held</label>
        <div class="underline"></div>
        </div>
        <div class="mini_input">
        
        <input type="date" id="start_date${idx}" required class="exp_dates start_date" >
        <label >Start date</label>
        <div class="underline"></div>
        </div>
        <div class="mini_input">
        
        <input type="date" id="end_date${idx}" required class="exp_dates end_date" >
        <label >End date</label>
        <div class="underline"></div>
        </div>
        <br><br>
        <div  id="${idx}" class="input-data">
        
        
        <input type="text" id="exp${idx}" required class="main_exp">
        <label> Experience</label>
        <div class="underline"></div>
        
        
        <div class="add_div"> 
        <span  class="exp_add1" >
        <a style="font-size: large;" data-id=${idx} onclick="add_exp_list(${idx})"  class="experience" id="experience" href="#">+</a>
        </span>
        </div>
        </div>
        </div>
        `)
}

//when + add experience is clicked add new form
document.getElementById('exp_add').addEventListener('click', (e) => {

    add_experience(exp_num)

})

function add_exp_list(idx, ele = 1) {
    if (ele === 1) {

        ele = document.getElementById(`${idx}`)
    }


    ele.insertAdjacentHTML('afterend',
        `<div class="input-data">
<input type="text" id="exp${idx}." required class="main_exp">
<div class="underline"></div>
</div>`)


}
//when + near experience is clicked add new input

for (var i of document.getElementsByClassName('experience')) {
    i.addEventListener('click', (e) => {

        e.preventDefault()

        add_exp_list(e.target.dataset.id, document.getElementById(`${e.target.dataset.id}`))


    })
}

// console.log(exp_list_num)
function add_edu(idx) {
    e.preventDefault();
    document.getElementById('edu_id').insertAdjacentHTML('beforeend', `
        <br><br>
        
        <br><br>
        
        <div class="input-data">
        <input type="text" id="deg${idx}" required name="education" class="inline" >
        <label class="sub">Degree <span id="degree">E.g Bachelor of science</span></label>
        <div class="underline"></div>
        </div>
        <div class="input-data">
        
        <input type="text" id="course${idx}" required name="education" class="inline" >
        <label class="sub">Course <span id="degree">E.g Computer science</span></label>
        <div class="underline"></div>
        
        
        </div>
        <div class="input-data">
        
        <input type="text" id="university${idx}" required name="education" class="inline" >
        <label class="sub">University <span id="degree">E.g Columbia University NY</span></label>
        <div class="underline"></div>
        </div>
        <div  class="mini_input">
        
        <input type="date" id="edu_start${idx}" required name="skill" id="start_date" class="exp_dates start_date" >
        <label>Start date:</label>
        <div class="underline"></div>
        </div>
        <div class="mini_input">
        
        <input type="date" id="edu_end${idx}" required  name="skill" id="end_date" class="exp_dates end_date" >
        <label>End date:</label>  
        <div class="underline"></div>
        </div>
        
        
        `)
}
//when + add education is clicked add new form
document.getElementsByClassName('edu_add')[0].addEventListener('click',
    (e) => {

        add_edu(edu_num)
        edu_num++
    })

//when + near language form is clicked add new input
document.getElementsByClassName('lan_add')[0].addEventListener('click',
    (e) => {
        e.preventDefault();
        document.getElementById('lan_div').insertAdjacentHTML("afterend", `
        <div class="input-data">
        <input type="text" name="" id="" required class="lan_form">
        <div class="underline"></div>
        </div>
        `)
    })

//when + near cert form is clicked add new input
document.getElementsByClassName('cert_add')[0].addEventListener('click',
    (e) => {
        e.preventDefault();
        document.getElementById('cert_form_div').insertAdjacentHTML("afterend", `
        <div class="input-data">
        <input type="text" name="" id="" required class="cert_form">
        <div class="underline"></div>
        </div>
        `)
    })

//when + near programming lang is clicked add new input
document.getElementsByClassName('prog_add')[0].addEventListener('click',
    (e) => {
        e.preventDefault();
        document.getElementById('prog_form_div').insertAdjacentHTML("afterend", `
        <div class="input-data">
        <input type="text" name="" id="" required class="prog_form">
        <div class="underline"></div>
        </div>
        `)
    }
)
//function converts cv to png => then to pdf =>and causes it to download
function export_cv() {
    //html to pdf requirement
    var settings = JSON.parse(localStorage.getItem('cv_settings'))
    
    update_resume()
    var update_stat = update_cv()
    if (!(update_stat === false)) {
        window.html2canvas = html2canvas;
        window.jsPDF = window.jspdf.jsPDF;

        html2canvas(document.querySelector(`#${settings.cv}`), {
            allowtaint: true, useCORS: true,
            scale: 1
        }).then(canvas => {
            // document.body.appendChild(canvas)
            var img = canvas.toDataURL("image/png")
            var doc = new jsPDF();
            doc.setFont('Arial')
            doc.getFontSize(11);
            doc.addImage(img, 'PNG', 7, 13, 195, 250)
            doc.save('cv_generated');
        });
    }



}

    // document.getElementById('save').onclick=makePDF();

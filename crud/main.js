var courseName=document.getElementById('courseName');
var courseCategory=document.getElementById('courseCategory');
var coursePrice=document.getElementById('coursePrice');
var addbtn=document.getElementById('click');
var data=document.getElementById('data');
var Search=document.getElementById('search');
var update=document.getElementById('update');
var isNameValid=false;
var isCatValid=false;
var isPriceValid=false;


var currentIndex=0;
update.style.display='none';
var courses
if(JSON.parse(localStorage.getItem('courses'))===null){
  courses=[]
}else{
  courses=JSON.parse(localStorage.getItem('courses'))
}
displayData();
checkInput();
function checkInput(){
  if(isNameValid&&isCatValid&&isPriceValid){
    addbtn.removeAttribute('disabled')
  }else{
    addbtn.setAttribute('disabled','disabled') 
  }
}
addbtn.onclick=function(e){
    e.preventDefault()
    addCourse();
    resetInput();
    displayData();
    console.log(courses);
    
}
//create course
function addCourse(){
    var course={
        courseName:courseName.value,
        courseCategory:courseCategory.value,
        coursePrice:coursePrice.value      
    }
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'course added successfully',
        showConfirmButton: false,
        timer: 1500
      })
}
function resetInput(){
    courseName.value=''
    courseCategory.value=''
    coursePrice.value=''
}
//read data 
function displayData(){
    var result=``;
    for(var i=0 ;i< courses.length;i++){
        result +=`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td><button class="btn btn-info" onclick="getcourse(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteCourse(${i})" >delet</button></td>
        </tr>
        `
    }
    data.innerHTML =result 
}
//delet all
document.getElementById('deleteBtn').onclick=function(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            data.innerHTML='';
          localStorage.setItem('courses',JSON.stringify(courses));
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
    
}
function deleteCourse(index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index, 1)
           localStorage.setItem('courses',JSON.stringify(courses));
            displayData();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
}

// Search
Search.onkeyup=function(){
    var result=``;
    console.log(Search.value);
    for(var i=0;i<courses.length;i++){
        if(courses[i].courseName.toLowerCase().includes(Search.value.toLowerCase())){
            result =result +`
        <tr>
        <td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td><button class="btn btn-info" onclick="getcourse(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deletcourse(${i})">delet</button></td>
        </tr>
        `
        }
        data.innerHTML =result; 
    }
}
// update
function getcourse(index){
  console.log(index);
  currentIndex=index;
  var course =courses[index];
  console.log(course);
  courseName.value=course.courseName;
  courseCategory.value=course.courseCategory;
  coursePrice.value=course.coursePrice;
  update.style.display='inline';
  addbtn.style.display='none';
}
update.onclick=function(e){
  e.preventDefault();
  updateCourse();
  displayData();
  update.style.display='none';
  addbtn.style.display='inline';
  resetInput();
}
function updateCourse(){
  var course={
    courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value  
}
   console.log(courses[currentIndex]);
   var prevName=courses[currentIndex].courseName;
   courses[currentIndex].courseName=course.courseName;
   courses[currentIndex].courseCategory=course.courseCategory;
   courses[currentIndex].coursePrice=course.coursePrice;
  console.log(courses[currentIndex]);
  localStorage.setItem('courses',JSON.stringify(courses));
Swal.fire({
  position: 'center',
  icon: 'success',
  title: `${prevName} updated successfully`,
  showConfirmButton: false,
  timer: 1500
})
}


//validation

/*
name
start with capital
no numbers
/^[A-Z][a-z]{2,10}$/
*/
var nameAlert=document.getElementById('nameAlert')
// nameAlert.style.display='none';
courseName.onkeyup =function(){
  var pattern=/^[A-Z][a-z]{2,10}$/
  if(pattern.test(courseName.value)){
    isNameValid=true
    if(courseName.classList.contains('is-invalid')){
      courseName.classList.replace('is-invalid','is-valid')
    }
    courseName.classList.add('is-valid')
    // nameAlert.style.display='none';
    nameAlert.innerHTML=''
  }else{
    isNameValid=false
    nameAlert.innerHTML='*please start with capital latter and name must be between3 and 10 chars';
    // nameAlert.style.display='block';
    if(courseName.classList.contains('is-valid')){
      courseName.classList.replace('is-valid','is-invalid')
    }
    courseName.classList.add('is-invalid')
  }
  checkInput();
}

/*
catogory
start with capital
3-20
no numbers
/^[A-Z][a-z]{2,20}$/
*/
var catAlert=document.getElementById('catAlert')
catAlert.style.display='none'
courseCategory.onkeyup =function(){
  var pattern=/^[A-Z][a-z]{2,20}$/
  if(pattern.test(courseCategory.value)){
    catAlert.style.display='none'
    isCatValid=true
    if(courseCategory.classList.contains('is-invalid')){
      courseCategory.classList.replace('is-invalid','is-valid')
    }
    courseCategory.classList.add('is-valid')
  }else{
    catAlert.style.display='block'
    isCatValid=false
    if(courseCategory.classList.contains('is-valid')){
      courseCategory.classList.replace('is-valid','is-invalid')
    }
    courseCategory.classList.add('is-invalid')
  }
  checkInput();
}

/*
price
3-24
 numbers
/^[0-9]{3,4}$/
*/
var priceAlert=document.getElementById('priceAlert');
priceAlert.style.display='none'
coursePrice.onkeyup =function(){
  var pattern=/^[0-9]{2}$/
  if(pattern.test(coursePrice.value)&&coursePrice.value>=0){
    priceAlert.style.display='none'
    isPriceValid=true
    if(coursePrice.classList.contains('is-invalid')){
      coursePrice.classList.replace('is-invalid','is-valid')
    }
    coursePrice.classList.add('is-valid')
  }else{
    isPriceValid=false
    priceAlert.style.display='block'
    if(coursePrice.classList.contains('is-valid')){
      coursePrice.classList.replace('is-valid','is-invalid')
    }
    coursePrice.classList.add('is-invalid')
  }
  checkInput();
}

/*
Description
start with capital
3-120
no numbers
/^[A-Z][A-Za-z0-9\s]{2,120}$/
*/
// courseDescription.onkeyup =function(){
//   var pattern=/^[A-Z][A-Za-z0-9\s]{2,120}$/
//   if(pattern.test(courseDescription.value)){
//     isDesValid=true
//     if(courseDescription.classList.contains('is-invalid')){
//       courseDescription.classList.replace('is-invalid','is-valid')
//     }
//     courseDescription.classList.add('is-valid')
//   }else{
//     isDesValid=false
//     if(courseDescription.classList.contains('is-valid')){
//       courseDescription.classList.replace('is-valid','is-invalid')
//     }
//     courseDescription.classList.add('is-invalid')
//   }
//   checkInput();
// }
/*
capacity
2-3
 numbers
/^[0-9]{2,3}$/
*/
// courseCapacity.onkeyup =function(){
//   var pattern=/^[0-9]{2,3}$/
//   if(pattern.test(courseCapacity.value)){
//     isCapacityValid=true
//     if(courseCapacity.classList.contains('is-invalid')){
//       courseCapacity.classList.replace('is-invalid','is-valid')
//     }
//     courseCapacity.classList.add('is-valid')
//   }else{
//     isCapacityValid=false
//     if(courseCapacity.classList.contains('is-valid')){
//       courseCapacity.classList.replace('is-valid','is-invalid')
//     }
//     courseCapacity.classList.add('is-invalid')
//   }
//   checkInput();
// }
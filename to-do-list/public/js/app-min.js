const toDoObj={id:"",title:"",checked:!1,isEditing:!1};let toDoArray=[{id:"23lf-2bs2-wefij-sdfjs",title:"Random Title",checked:!1,isEditing:!1},{id:"23lf-2bs2-wesij-sdfjs",title:"Random Title 2",checked:!0,isEditing:!1},{id:"23lf-2bs2-wewij-sdfjs",title:"Random Title 3",checked:!1,isEditing:!1}];const getFromStorage=()=>{toDoArray=JSON.parse(localStorage.getItem("toDoList"))},saveToStorage=()=>{localStorage.setItem("toDoList",JSON.stringify(toDoArray))},getToDoItem=e=>toDoArray.find(t=>t.id==e),setToDoItem=e=>{const{title:t=null,checked:o=!1,id:d}=e;toDoArray.forEach(e=>{e.id==d&&(e.checked=o,e.title=t)})},editToDo=e=>{const{editIcon:t,confirmIcon:o,cancelIcon:d,toDoInput:c}=e;t.classList.remove("show"),o.classList.add("show"),d.classList.add("show"),c.readOnly=!1,c.classList.add("editing")},cancelEditing=e=>{const{editIcon:t,confirmIcon:o,cancelIcon:d,toDoInput:c,idToDo:i}=e;t.classList.add("show"),o.classList.remove("show"),d.classList.remove("show"),c.readOnly=!0,c.classList.remove("editing");const n=getToDoItem(i);c.value=n.title},confirmEditing=e=>{const{editIcon:t,confirmIcon:o,cancelIcon:d,toDoInput:c,idToDo:i,inputCheckBox:n}=e;t.classList.add("show"),o.classList.remove("show"),d.classList.remove("show"),c.readOnly=!0,c.classList.remove("editing");const s={title:c.value,id:i,checked:n.checked};setToDoItem(s),saveToStorage()},removeToDo=e=>{const{idToDo:t}=e,o=toDoArray.findIndex(e=>e.id==t);toDoArray.splice(o,1),generateToDoList(),saveToStorage()},isCheckedCheck=e=>{const{parentElem:t,checkBox:o}=e;o.checked?t.classList.add("checked"):t.classList.remove("checked")},toDoChecked=e=>{const{inputCheckBox:t,toDoInput:o,idToDo:d}=e,c={title:o.value,id:d,checked:t.checked};setToDoItem(c),saveToStorage()},addToDoToList=e=>{document.getElementById("toDoList").append(e)},todoItemTemplateAdd=e=>{const t=document.createElement("div");t.classList.add("to-do__item");const o=document.createElement("input");o.type="checkbox",o.classList.add("to-do__item--checkbox"),o.checked=e.checked;const d=document.createElement("input");d.type="text",d.readOnly=!0,d.classList.add("to-do__item--input"),d.value=e.title;const c=document.createElement("div");c.classList.add("to-do__item--actions");const i=document.createElement("div");i.classList.add("to-do__item--edit");const n=document.createElement("div");n.classList.add("to-do__item--edit-icon","show");const s=document.createElement("div");s.classList.add("to-do__item--confirm-edit");const a=document.createElement("div");a.classList.add("to-do__item--cancel-edit");const l=document.createElement("div");l.classList.add("to-do__item--remove","show");const r={inputCheckBox:o,editIcon:n,confirmIcon:s,cancelIcon:a,toDoInput:d,idToDo:e.id};isCheckedCheck({parentElem:t,checkBox:o}),o.addEventListener("change",()=>{toDoChecked(r),isCheckedCheck({parentElem:t,checkBox:o})}),n.addEventListener("click",()=>{editToDo(r)}),a.addEventListener("click",()=>{cancelEditing(r)}),s.addEventListener("click",()=>{confirmEditing(r)}),l.addEventListener("click",()=>{removeToDo(r)}),i.append(n,s,a),c.append(i,l),t.append(o,d,c),addToDoToList(t)},generateToDoList=()=>{const e=document.getElementById("toDoList");e.innerHTML="",toDoArray.length?toDoArray.forEach(e=>{todoItemTemplateAdd(e)}):e.innerHTML="To Do is empty"},addOnSubmit=()=>{const e=document.getElementById("toDoForm"),t=document.getElementById("toDoAddInput"),o=document.getElementById("toDoList");e.addEventListener("submit",function(e){e.preventDefault();const d=Object.assign({},toDoObj);d.id=Date.now(),d.title=t.value,toDoArray.length||(o.innerHTML=""),todoItemTemplateAdd(d),toDoArray.push(d),saveToStorage(),t.value=""})};document.addEventListener("DOMContentLoaded",()=>{toDoArray=JSON.parse(localStorage.getItem("toDoList")),generateToDoList(),addOnSubmit()});
const toDoObj = {
    id:"",
    title: "",
    checked: false,
    isEditing: false
};

let toDoArray = [
    {
        id:"23lf-2bs2-wefij-sdfjs",
        title: "Random Title",
        checked: false,
        isEditing: false
    },
    {
        id:"23lf-2bs2-wesij-sdfjs",
        title: "Random Title 2",
        checked: true,
        isEditing: false
    },
    {
        id:"23lf-2bs2-wewij-sdfjs",
        title: "Random Title 3",
        checked: false,
        isEditing: false
    },
]

const getFromStorage = () => {
    toDoArray = JSON.parse(localStorage.getItem("toDoList"))
}

const saveToStorage = () => {
    localStorage.setItem("toDoList",JSON.stringify(toDoArray));
}

const getToDoItem = (id) => {
    return toDoArray.find(toDo => toDo.id == id)
}

const setToDoItem = (params) => {
    const {title = null, checked = false, id} = params;

    toDoArray.forEach(item => {
        if(item.id == id){
            item.checked = checked;
            item.title = title;
        }
    })
}

const editToDo = (editParams)=>{
    const {editIcon, confirmIcon, cancelIcon, toDoInput} = editParams;

    editIcon.classList.remove("show");
    confirmIcon.classList.add("show");
    cancelIcon.classList.add("show");
    toDoInput.readOnly = false;
    toDoInput.classList.add("editing");
}

const cancelEditing = (editParams) => {
    const {editIcon, confirmIcon, cancelIcon, toDoInput, idToDo} = editParams;

    editIcon.classList.add("show");
    confirmIcon.classList.remove("show");
    cancelIcon.classList.remove("show");
    toDoInput.readOnly = true;
    toDoInput.classList.remove("editing");

    const toDoItem = getToDoItem(idToDo);

    toDoInput.value = toDoItem.title;
}

const confirmEditing = (editParams) => {
    const {editIcon, confirmIcon, cancelIcon, toDoInput, idToDo, inputCheckBox} = editParams;

    editIcon.classList.add("show");
    confirmIcon.classList.remove("show");
    cancelIcon.classList.remove("show");
    toDoInput.readOnly = true;
    toDoInput.classList.remove("editing");

    const todoSetParams = {
        title : toDoInput.value,
        id: idToDo,
        checked: inputCheckBox.checked
    }
    
    setToDoItem(todoSetParams);
    saveToStorage();
}

const removeToDo = (params) => {
    const {idToDo} = params;

    const index = toDoArray.findIndex((num) => num.id == idToDo);

    toDoArray.splice(index,1);

    generateToDoList();
    saveToStorage();
}

const isCheckedCheck = (params) => {
    const {parentElem, checkBox} = params;

    if(checkBox.checked) {
        parentElem.classList.add("checked")
        return
    }

    parentElem.classList.remove("checked");
}

const toDoChecked = (editParams) => {
    const {inputCheckBox, toDoInput, idToDo} = editParams;

    const todoSetParams = {
        title : toDoInput.value,
        id: idToDo,
        checked: inputCheckBox.checked
    };
    
    setToDoItem(todoSetParams);
    saveToStorage();
}

const addToDoToList = (toDoItem) => {
    const toDoList = document.getElementById("toDoList");

    toDoList.append(toDoItem);
};

const todoItemTemplateAdd = (todoObject) => {
    const itemParent = document.createElement("div");
    itemParent.classList.add("to-do__item");

    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.classList.add("to-do__item--checkbox");
    checkBox.checked = todoObject.checked

    const toDoTextInput = document.createElement("input")
    toDoTextInput.type = "text"
    toDoTextInput.readOnly = true
    toDoTextInput.classList.add("to-do__item--input");
    toDoTextInput.value = todoObject.title;

    const actionsParent = document.createElement("div");
    actionsParent.classList.add("to-do__item--actions");

    const actionsEditPar = document.createElement("div");
    actionsEditPar.classList.add("to-do__item--edit");

    const actionsEditBtn = document.createElement("div");
    actionsEditBtn.classList.add("to-do__item--edit-icon","show");

    const actionsEditConfirm = document.createElement("div");
    actionsEditConfirm.classList.add("to-do__item--confirm-edit");

    const actionsEditCancel = document.createElement("div");
    actionsEditCancel.classList.add("to-do__item--cancel-edit");

    const actionsRemove = document.createElement("div");
    actionsRemove.classList.add("to-do__item--remove","show");

    const actionObj = {
        inputCheckBox: checkBox,
        editIcon : actionsEditBtn,
        confirmIcon: actionsEditConfirm,
        cancelIcon: actionsEditCancel,
        toDoInput: toDoTextInput,
        idToDo: todoObject.id
    }

    //INIT CHECKBOX
    isCheckedCheck({parentElem:itemParent, checkBox:checkBox})

    checkBox.addEventListener("change",()=>{
        toDoChecked(actionObj);
       
        isCheckedCheck({parentElem:itemParent, checkBox:checkBox})
    })

    actionsEditBtn.addEventListener("click",()=>{
        editToDo(actionObj);
    })

    actionsEditCancel.addEventListener("click",()=>{
        cancelEditing(actionObj);
    })

    actionsEditConfirm.addEventListener("click",()=>{
        confirmEditing(actionObj);
    })

    actionsRemove.addEventListener("click",()=>{
        removeToDo(actionObj);
    })

    actionsEditPar.append(actionsEditBtn,actionsEditConfirm,actionsEditCancel)

    actionsParent.append(actionsEditPar,actionsRemove)

    itemParent.append(
        checkBox, 
        toDoTextInput, 
        actionsParent, 
    )

    addToDoToList(itemParent);
}

const generateToDoList = () => {
    const toDoList = document.getElementById("toDoList");
    toDoList.innerHTML = "";
    
    if(!toDoArray.length) {
        toDoList.innerHTML = "To Do is empty";
        return
    };

    toDoArray.forEach(toDo => {
        todoItemTemplateAdd(toDo);
    })
}


const addOnSubmit = () => {
    const toDoForm = document.getElementById("toDoForm");
    const formInput = document.getElementById("toDoAddInput")
    const toDoList = document.getElementById("toDoList");
    
    toDoForm.addEventListener("submit",function(event){
        event.preventDefault();
        const toDoData = Object.assign({},toDoObj);
        toDoData.id = Date.now();
        toDoData.title = formInput.value;


        if(!toDoArray.length) toDoList.innerHTML = "";

        todoItemTemplateAdd(toDoData);
        toDoArray.push(toDoData);

        saveToStorage();
        formInput.value = ""
    })
}


document.addEventListener("DOMContentLoaded",()=>{
    getFromStorage();
    generateToDoList();
    addOnSubmit()
})
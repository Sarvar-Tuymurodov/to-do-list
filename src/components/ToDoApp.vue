<template>
  <div class="container">
    <div class="row justify-content-center ">
      <div class="col-md-8 col-lg-6">
        <div class="to-do bg-white p-4 shadow rounded">
          <div class="to-do__head mb-4 ">
            <h2 class="text-center">Todo list </h2>
            <div class="d-flex">
              <input v-model="event" @keyup.enter="addNewEvent()" type="text" placeholder="Введите события " id="newEventInp" class="form-control">
              <button @click="addNewEvent()" class="btn btn-success ms-1">Добавить</button>
            </div>
          </div>
          <div class="to-do__body ">
            <div class="to-do__event align-items-center px-3 py-3 mb-2  d-flex" v-for="(event,index) in events" :key="index"> 
              <div class="to-do__event--checked me-2" >
                <input v-model="event.status" type="checkbox" class="form-check-input" name="eventCompleted" @click="changeStatus(index)" :id="index" id="">
              </div>
              <div :class="event.status ? 'text-decoration-line-through' :''" class="to-do__event--text fw-normal me-2">
                {{event.name}}
              </div>
              <div class="to-do__event--remove ms-auto " @click="deleteEvent(event)">
                <span role="button" class="fa fa-trash" ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoApp',
  props: {
    msg: String
  },

  data(){
    return{
      event:"",
      events:[
        {name:"Birthday brother",status:false},
        {name:"Birthday sister",status:true},
        {name:"Birthday mother",status:false},
      ]
    }
  },
  methods:{
    addNewEvent(){
      if(this.event.length === 0) return;

      this.events.push({
        name:this.event,
        status:false
      })

      this.event = "";
    },
    
    deleteEvent(todo){
      this.events = this.events.filter((c) => c!== todo)
      console.log(todo);
    },

    changeStatus(index){
      this.events[index].status = !this.events[index].status
      let eventStatus = this.events[index].status;
      if(eventStatus){}
    }

  }
}
</script>

<style scoped lang="scss">
  .to-do{
    &__event{
      border-radius: 8px;
      border: 1px solid #e1e4ed;
    }

    &__event{
      cursor: pointer;
      transition: all .2s;

      &:hover{
        box-shadow: 0 0  8px rgba(0,0,0,0.1);
      }

      &--remove{
        width: 35px;
        height: 35px;
        border-radius: 8px;
        transition: all .2s;

        display: flex;
        align-items: center;
        justify-content: center;

        &:hover{
          background-color: rgb(255, 233, 233);

          & .fa-trash{
            color: rgb(241, 95, 95);
          }
        }

        
      }
    }
  }
</style>
const form = document.querySelector(".form")

const welcome = document.querySelector(".welcome-event")

const event_Container = document.querySelector(".events-container")

//RETRIEVAL
db.collection('events').onSnapshot(snapshot => {
  
  const newestEvent = snapshot.docChanges()[0].doc.data()
  const id = snapshot.docChanges()[0].doc.id
  showLatestEvent(newestEvent, id);
  

  snapshot.docChanges().shift()
  // retrieval of all events
  snapshot.docChanges().forEach(event => {
      All_Events(event.doc.data(), event.doc.id)
  });
})


//CREATE EVENT
form.addEventListener('submit' ,e =>{

    e.preventDefault();

    const adding_event = {
        Name: form.name.value,
        Attendees: form.attendee.value,
        booked: 0,
        description: form.description.value,
        status: parseInt(form.status.value, 10)
      }
     
    
    db.collection("events").add(adding_event).then(() =>

    {
      form.name.value = " ",
      form.attendee.value =" ",
      form.description.value =" ",

      alert("Successfully Add Event!")

      window.scrollTo({top:0,behavior:'smooth'});
    }).catch(err =>{


        console.log(err)


    })
    });

//Display all event

const All_Events =(allEvents , id) =>{

  const {Name , description , Attendees , status , booked} = allEvents

  const statusClass= status === 1 ? "paid" : "free" 

  const elements = `

  <div class="card">

      <div class="card--details">
        <div>
          <h1>${Name}</h1>
          <span>${Attendees - booked} attendees</span>
        </div>
        <span class="card--details-ribbon  ribbon-${statusClass}" >

        ${statusClass}

        </span>

        <p>${description}</p>
        <button onclick="bookEvent(${booked} ,'${id}')" class="btn btn-tertiary">Book</button>
      </div>
</div>
    
  
  `

  event_Container.innerHTML += elements

  

}
// SHOW LATEST EVENT
    const showLatestEvent = (latestEvent ,id) => {
  
      const {Name, Attendees, status, description, booked} = latestEvent 
    
        welcome.innerHTML = `
        <h1>Name: ${Name}</h1>
        <p>Description: ${description}</p>
        
        <div>
          <span>Attendees: ${Attendees - booked}</span>
          <span>status : ${status ===1 ? "paid" : "free"}</span> 
         </div>
         <button onclick="bookEvent(${booked} ,'${id}')" class="btn btn-tertiary">Book</button>
        
        `
    }

    



//BOOK EVENT    
    

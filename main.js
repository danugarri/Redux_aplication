// ** Initial State and Reducer **

//Initial State

const initialWagonState= {
  supplies: 100,
  distance: 0,
  days: 0
}

//Reducer

const reducer = (state = initialWagonState,action) => {
  switch(action.type) {
    case 'gather' : {
      //determina una recarga
      return  {
        ...state,
      supplies:state.supplies + action.payload.supplies,
      distance:state.distance,
      days: state.days + action.payload.days
      }
    }
    case 'travel' : {
      //determina los días que viaja
      if(state.supplies>20 && state.supplies -(action.payload *20) > 0 ){ 
// el mínmo de suministros para viajar por día es de 20
      return {
        ...state,
        supplies:state.supplies -(action.payload *20),
        distance:state.distance +(10*action.payload),
        days:state.days + action.payload
      }
     }
     else if(state.supplies<20||state.supplies -(action.payload *20) < 20 ){
       console.log('\nyou do not have enough supplies to travel for: '+action.payload+' more day/s, you need at least 20 supllies to travel per day')
        return {
        ...state
      }
     }
    }
    case 'tippedWagon' : {
      //vuelca el wagon
     return{ 
       ...state,
        supplies: state.supplies -(action.payload.supplies),
        distance:state.distance,
        days:state.days + action.payload.days
       }
    }
     default : {
      return state
     }
}
}

 //Actions

 const actionGather= {
  type: 'gather',
  payload: {
    supplies:15,
    distance: 0,
    days: 1
  }
}
const actionTravel = {
  type:'travel',
  payload:3//asumimos que va a viajar 3 días
}
 const actionTipped= {
  type: 'tippedWagon',
  payload: {
    supplies:30,
    distance: 0,
    days: 1
  }
}

//testeo por consola
const newState= reducer(initialWagonState,actionGather)
console.log(newState)

const newState2= reducer(initialWagonState,actionTravel)
console.log(newState2)

const newState3= reducer(initialWagonState,actionTipped)
console.log(newState3)
console.log('Hasta aquí mis 3 acciones\n********************************************')
///////////
//Let’s try our game out.

let wagon= reducer(undefined,{})
console.log(wagon)//imprime los valores de const initialWagonState

//Our first day will be dedicated to travel.
wagon= reducer(wagon,{type:'travel',payload:1})
console.log(wagon)
//On the second day, we stop to gather supplies.
wagon= reducer(wagon,actionGather)
console.log(wagon)

//On the third day, we try to ford a rushing river…and our wagon tips over, spilling some supplies.
wagon= reducer(wagon,actionTipped)
console.log(wagon)

//On the following day, we set out for a long 3 days of travel.
wagon= reducer(wagon,{type:'travel',payload:3})
console.log(wagon)

//testing to travel without enough supplies
wagon= reducer(wagon,{type:'travel',payload:1})
console.log(wagon)

let newWagon =reducer(undefined,{type:'travel',payload:6})
console.log(newWagon)

class EventHelper{
    // each element has 
    listOfListeners = new Map();


    attachEventListener(triggerElement, type, func){
        triggerElement.addEventListener(type, func);
    }

    checkAttachedEvents(){

    }

    removeEvent(){

    }

    createNewEvent(label){
        const event = new Event(label);
        this.listOfListeners.set(label, event);
        console.log(`Evento ${label} aggiunto`);
    }

    dispatchCustomEvent(label){
        try{
            let event = this.listOfListeners.get(label);
            document.dispatchEvent(event);
        }catch(err){
            console.log(err);
        }
    }
};

var eventManager = new EventHelper();
export default eventManager;

//singleton
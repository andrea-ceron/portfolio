class EventHelper{
    listOfListeners = new Map();

    attachEventListener(triggerElement, type, func){
        triggerElement.addEventListener(type, func);
    }

    checkAttachedEvents(){

    }

    removeEvent(){

    }

    createNewEvent(label, props){
        const event = new CustomEvent(label,{
            detail:{
                page: props
            }
        });
        this.listOfListeners.set(label, event);
    }

    dispatchCustomEvent(label){
        try{
            console.log(label)
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
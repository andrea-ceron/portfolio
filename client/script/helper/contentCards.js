class ContentCards{
    content = [
        {
            title: "Documentazione Tecnica", 
            desc: "Garantisco la chiarezza del codice con documentazione accurata, essenziale per la collaborazione.",
            technologies: "Strumenti: README, JSDoc/Sphinx.",
            linkText: "Vedi Esempio README", 
            linkUrl: "https://esempio.com/readme" 
        },
        {
            title: "Documentazione 2", 
            desc: "Garantisco la chiarezza del codice con documentazione accurata, essenziale per la collaborazione.",
            technologies: "Strumenti: README, JSDoc/Sphinx.",
            linkText: "Vedi Esempio README", 
            linkUrl: "https://esempio.com/readme" 
        },
                {
            title: "Documentazione 3", 
            desc: "Garantisco la chiarezza del codice con documentazione accurata, essenziale per la collaborazione.",
            technologies: "Strumenti: README, JSDoc/Sphinx.",
            linkText: "Vedi Esempio README", 
            linkUrl: "https://esempio.com/readme" 
        }
    ]

    getContent(){
        return this.content;
    }
}

var contentCards = new ContentCards()
export default contentCards;
class ContentCards{
    content = [
        {
            title: "My Development Process: From Concept to Code", 
            desc: "Describing the development process that leads me from requirements gathering to testing",
            technologies: "",
            linkText: "Read Article", 
            linkUrl: "http://localhost:5500#article-1" 
        },
        {
            title: "Documentazione 2", 
            desc: "Garantisco la chiarezza del codice con documentazione accurata, essenziale per la collaborazione.",
            technologies: "Strumenti: README, JSDoc/Sphinx.",
            linkText: "Read Article", 
            linkUrl: "https://esempio.com/readme" 
        }
    ]

    getContent(){
        return this.content;
    }
}

var contentCards = new ContentCards()
export default contentCards;
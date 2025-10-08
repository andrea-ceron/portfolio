class ContentCards{
    content = [
        {
            title: "My Development Process: From Concept to Code", 
            desc: "Describing the development process that leads me from requirements gathering to testing",
            technologies: "",
            linkText: "Read Article", 
            linkUrl: "#article-1" 
        },
        {
            title: "My approach to Documentation", 
            desc: "Explaining my approach to documantation, by also providing examples",
            technologies: "",
            linkText: "Read Article", 
            linkUrl: "#article-2" 
        }
    ]

    getContent(){
        return this.content;
    }
}

var contentCards = new ContentCards()
export default contentCards;
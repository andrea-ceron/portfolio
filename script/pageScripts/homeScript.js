import contentCards from "../helper/contentCards.js";

class HomeScript{
    pageSections = ['introduction', 'about','githubProjects' ,'contact']; 
    sectionPositions = [];
    contentCardsIndex = 0;
    scrollHandler = null;
    resizeHandler = null;

    setOnClickListener(){
        let rightClickElem = document.getElementById("right-arrow")
        console.log(rightClickElem)
        if (!rightClickElem) return;
        rightClickElem.onclick = (e)=>{
            const actionValueData = e.currentTarget.dataset.action; 

            this.displayContentCards(actionValueData);
        };
        let leftClickElem = document.getElementById("left-arrow")
        if (!leftClickElem) return;
        leftClickElem.onclick = (e)=>{
            const actionValueData = e.currentTarget.dataset.action; 

            this.displayContentCards(actionValueData);
        };
    }
    checkButtonClicked(){
        
    }

    displayContentCards(navigation = 0){
        let content = contentCards.getContent();
        let index = parseInt(navigation) || 0;
        console.log(typeof index)
        const nextIndex = this.contentCardsIndex + index;
        if(nextIndex < 0 || nextIndex > content.length-1){
            this.updateArrowStates(content.length);
            return;
        }
        this.contentCardsIndex = nextIndex
        console.log(this.contentCardsIndex)

        console.log(content)
        let objectToDisplay = content[this.contentCardsIndex];
        let elem = document.getElementById("skill-card");
        if (!elem) return;
        elem.innerHTML = '';

        const titleElement = document.createElement('h3');
        titleElement.textContent = objectToDisplay.title; 

        const descElement = document.createElement('p');
        descElement.textContent = objectToDisplay.desc;

        const techElement = document.createElement('p');
        techElement.innerHTML = `<strong>${objectToDisplay.technologies}</strong>`; 

        const linkElement = document.createElement('a');
        linkElement.href = objectToDisplay.linkUrl;
        linkElement.textContent = objectToDisplay.linkText;

        elem.appendChild(titleElement);
        elem.appendChild(descElement);
        elem.appendChild(techElement);
        elem.appendChild(linkElement);
        this.updateArrowStates(content.length);
    }

    updateArrowStates(totalCards){
        let leftArrow = document.getElementById("left-arrow");
        let rightArrow = document.getElementById("right-arrow");

        if (leftArrow) {
            leftArrow.classList.toggle("disabled", this.contentCardsIndex === 0);
        }
        if (rightArrow) {
            rightArrow.classList.toggle("disabled", this.contentCardsIndex === totalCards - 1);
        }
    }

    triggerHomeScriptAction(labelEvent){
        let hashUrl
        if (labelEvent === "")
            hashUrl = `#introductionNav`
        else 
            hashUrl = `#${labelEvent}Nav`
        this.alterCSSNavbarOnClick(hashUrl);
        console.log("rendering")
        this.updateSectionPositions();
        if (this.scrollHandler) {
            window.removeEventListener("scroll", this.scrollHandler);
        }
        if (this.resizeHandler) {
            window.removeEventListener("resize", this.resizeHandler);
        }
        this.scrollHandler = () => {
            this.alterCSSNavbarOnScroll(window.scrollY);
        };
        this.resizeHandler = () => {
            this.updateSectionPositions();
            this.alterCSSNavbarOnScroll(window.scrollY);
        };
        window.addEventListener("scroll", this.scrollHandler);
        window.addEventListener("resize", this.resizeHandler);
        window.addEventListener("load", this.resizeHandler, { once: true });

        requestAnimationFrame(() => {
            this.updateSectionPositions();
            this.alterCSSNavbarOnScroll(window.scrollY);
        });
    }

    updateSectionPositions(){
        this.sectionPositions = [];
        for(const sectionId of this.pageSections){
            const section = document.getElementById(sectionId);
            if (!section) continue;
            this.sectionPositions.push({
                id: sectionId,
                top: section.offsetTop,
                bottom: section.offsetTop + section.offsetHeight
            });
        }
    }

    alterCSSNavbarOnClick(hashUrl){
        for(let linkId of this.pageSections){
            let navLink = document.querySelector(`#${linkId}Nav`);
            if (!navLink) continue;
            if(`#${linkId}Nav` === hashUrl){
                navLink.className = "active";
            }
            else{
                navLink.className = "unactive";
            }
        }
    }

    alterCSSNavbarOnScroll(scrollY) {
        if (this.sectionPositions.length === 0) {
            this.updateSectionPositions();
        }

        const activationPoint = scrollY + (window.innerHeight * 0.45);
        let activeSection = this.sectionPositions[0]?.id || this.pageSections[0];

        for (const section of this.sectionPositions) {
            if (activationPoint >= section.top) {
                activeSection = section.id;
            }
        }

        this.alterCSSNavbarOnClick(`#${activeSection}Nav`);
    }

}

var homeScript = new HomeScript();
window.addEventListener("RenderingPageCompleted", (e) => {
  if (homeScript.pageSections.includes(e.detail.path) || e.detail.path === "") {
    homeScript.displayContentCards();
    homeScript.setOnClickListener();
    homeScript.triggerHomeScriptAction(e.detail.path);
  }
});



export default homeScript;

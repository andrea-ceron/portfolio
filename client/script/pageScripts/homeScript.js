import contentCards from "../helper/contentCards.js";

class HomeScript{
    pageSections = ['introduction', 'about','githubProjects' ,'contact']; 
    heightSectionsPage = [];
    contentCardsIndex = 0;

    setOnClickListener(){
        let rightClickElem = document.getElementById("right-arrow")
        console.log(rightClickElem)
                    let elem = document.getElementById("skill-card");

        rightClickElem.addEventListener("click", (e)=>{
            const actionValueData = e.currentTarget.dataset.action; 

            this.displayContentCards(actionValueData);
        })
        let leftClickElem = document.getElementById("left-arrow")
        leftClickElem.addEventListener("click", (e)=>{
            const actionValueData = e.currentTarget.dataset.action; 

            this.displayContentCards(actionValueData);
        })
    }
    checkButtonClicked(){
        
    }

    displayContentCards(navigation = 0){
        let content = contentCards.getContent();
        let index = parseInt(navigation)
        console.log(typeof index)
        if(this.contentCardsIndex + index < 0 || this.contentCardsIndex + index > content.length-1){
            return;
        }
        if(this.contentCardsIndex+ index === 1 ){
             let leftArrow = document.getElementById("left-arrow");
            leftArrow.style.color = '#191919';
        }  
        if(this.contentCardsIndex+ index === content.length-2){
            let rightArrow = document.getElementById("right-arrow");
            rightArrow.style.color = '#191919';
        }
        this.contentCardsIndex += index
        console.log(this.contentCardsIndex)

        console.log(content)
        let objectToDisplay = content[this.contentCardsIndex];
        let elem = document.getElementById("skill-card");
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
        linkElement.target = '_blank'; 

        elem.appendChild(titleElement);
        elem.appendChild(descElement);
        elem.appendChild(techElement);
        elem.appendChild(linkElement);
        if(this.contentCardsIndex === 0 ){
            let leftArrow = document.getElementById("left-arrow");
            leftArrow.style.color = '#D2B48C';
        }
        if(this.contentCardsIndex === content.length-1){
            let rightArrow = document.getElementById("right-arrow");
            rightArrow.style.color = '#D2B48C';
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
        let height = this.findSectionHeight();
        this.heightSectionsPage = height;
        window.addEventListener("scroll",()=>{
            this.alterCSSNavbarOnScroll(window.scrollY);
        })
    }

    findSectionHeight(){
        let res = []
        for(let elem of this.pageSections){
            const section = document.querySelector(`#${elem}`);
            const height = section.offsetHeight; 
            res.push(height);
        }
        return res;
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
        let cumulativeHeight = 0;
        let sectionIndex = 0;

        while (sectionIndex < this.heightSectionsPage.length && cumulativeHeight < scrollY) {
            cumulativeHeight += this.heightSectionsPage[sectionIndex];
            sectionIndex++;
        }

        sectionIndex--; 

        const previousSectionIndex = Math.max(0, sectionIndex - 1);
        const normalizedScroll = cumulativeHeight - scrollY;

        const percentage = (normalizedScroll / this.heightSectionsPage[previousSectionIndex]) * 100;

        if (percentage <= 40) {
            let section = this.pageSections[sectionIndex+1];
            let idNavigation = `#${section}Nav`
            this.alterCSSNavbarOnClick(idNavigation);
        } else if (percentage >= 60) {
            let section = this.pageSections[sectionIndex];
            let idNavigation = `#${section}Nav`
            this.alterCSSNavbarOnClick(idNavigation);
        }
    }

}

var homeScript = new HomeScript();
window.addEventListener("RenderingPageCompleted", (e) => {
  if ( e.detail.path === "" || e.detail.path === "introduction" || e.detail.path === "about") {
    homeScript.triggerHomeScriptAction(e.detail.path);
    homeScript.displayContentCards();
    homeScript.setOnClickListener();
  }
});



export default homeScript;
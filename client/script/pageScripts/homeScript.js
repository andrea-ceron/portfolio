import eventManager from "../eventHelper.js"

class HomeScript{
    pageSections = ['introduction', 'about']; 
    heightSectionsPage = [];
    constructor(){
        console.log("entro costruttoire HomeScript")
        eventManager.attachEventListener(window,"hashchange",()=>{
            let hash = window.location.hash;
            let hashUrl = `${hashFromURL}Nav`
            this.alterCSSNavbarOnClick(hashUrl);
        });
        eventManager.attachEventListener(document,"RenderingPageCompleted/",()=>{
            console.log("rendering")
            for(let section of this.pageSections){
                let height = this.findSectionHeight();
                this.heightSectionsPage = height;
            }
            eventManager.attachEventListener(window,"scroll",()=>{
                this.alterCSSNavbarOnScroll(window.scrollY);
            });
        });
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
            console.log(`#${linkId}Nav`, hashUrl)
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
export default homeScript;
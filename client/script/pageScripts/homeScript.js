
class HomeScript{
    pageSections = ['introduction', 'about', 'contacts']; 
    heightSectionsPage = [];
    

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
    console.log("Mario ha fatto login con successo!");
    homeScript.triggerHomeScriptAction(e.detail.path);
  }
});



export default homeScript;
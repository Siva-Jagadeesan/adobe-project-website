import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';

async function createSelectMap(jsonURL){
    const optionsMap=new Map();
    const { pathname } = new URL(jsonURL);

    const resp = await fetch(pathname);
    optionsMap.set("all",allCountries);optionsMap.set("asia",asia);optionsMap.set("europe",europe);optionsMap.set("africa",africa);optionsMap.set("america",america);optionsMap.set("australia",australia);
    const select=document.createElement('select');
    select.id = "region";
    select.name="region";
    optionsMap.forEach((val,key) => {
        const option = document.createElement('option');
        option.textContent = val;
        option.value = key;
        select.append(option);
      });
     
     const div=document.createElement('div'); 
     div.classList.add("region-select");
     div.append(select);
    return div;
}
async function createTable(jsonURL,val) {

    let  pathname = null;
    if(val){
        pathname=jsonURL;
    }else{
        pathname= new URL(jsonURL);
    }
    
    const resp = await fetch(pathname);
    const json = await resp.json();
    console.log("=====JSON=====> {} ",json);
    // const container = document.createElement('coolCards');
    const table = document.createElement('div');
    // createjsontTable(table);
    json.data.forEach((result) => {

        const card = document.createElement("div");
        card.classList = "authtable-body";
        const content = `
            <div class="authtable">
            <div class="authtable-header" id="authtableCards">
            <img src="${result.url}" class="authtableImage">
          
            </div>
        
              <div class="authtable-body">
        
                <h5>${result.Title}</h5>
                <p>${result.content}</p>
            
              </div>
         
          </div>
          `;
      
          table.innerHTML += content;
      });
      return table
}    

export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    const parientDiv=document.createElement('div');
    parientDiv.classList.add('employee-block');

    if (countries) {
        //parientDiv.append(await createSelectMap(countries.href));
       parientDiv.append(await createTable(countries.href,null));
        countries.replaceWith(parientDiv);
        
    }

  }
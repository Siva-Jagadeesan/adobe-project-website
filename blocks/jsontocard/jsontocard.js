async function createCardFromJson(jsonURL) {
  const pathname = new URL(jsonURL);
  const bodyClassName = document.getElementsByTagName('body');
  const resp = await fetch(pathname);
  const json = await resp.json();

  const cardParent = document.createElement('div');
  json.data.forEach((result) => {
    const card = document.createElement('div');
    card.classList = 'jsontocard-body';
    if (result.image && result.image.includes('default-meta-image')) {
      result.image = 'https://main--adobe-project-website--siva-jagadeesan.aem.page/assets/image/climbingnewzealand.jpeg';
    }
    const content = `
            <div class="jsontocard">
            <div class="jsontocard-header" id="jsontocardCards">
            <img src="${bodyClassName[0].classList[0] === 'magazine' ? result.image : result.url}" class="jsontocardImage">
            </div>
              <div class="jsontocard-body">
                <h5>${result.Title}</h5>
                <p>${bodyClassName[0].classList[0] === 'magazine' ? result.description : result.content}</p>
              </div>
          </div>
          `;

    cardParent.innerHTML += content;
  });
  return cardParent;
}

export default async function decorate(block) {
  const jsondata = block.querySelector('a[href$=".json"]');
  const parentDiv = document.createElement('div');
  parentDiv.classList.add('json-block');

  if (jsondata) {
    parentDiv.append(await createCardFromJson(jsondata.href));
    jsondata.replaceWith(parentDiv);
  }
}

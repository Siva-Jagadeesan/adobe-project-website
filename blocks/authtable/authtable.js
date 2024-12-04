async function createTable(jsonURL, val) {
  let pathname = null;
  if (val) {
    pathname = jsonURL;
  } else {
    pathname = new URL(jsonURL);
  }

  const bodyClassName = document.getElementsByTagName('body');
  const resp = await fetch(pathname);
  const json = await resp.json();

  const table = document.createElement('div');
  json.data.forEach((result) => {
    const card = document.createElement('div');
    card.classList = 'authtable-body';
    if (result.image && result.image.includes('default-meta-image')) {
      result.image = 'https://main--adobe-project-website--siva-jagadeesan.aem.page/assets/image/climbingnewzealand.jpeg';
    }
    const content = `
            <div class="authtable">
            <div class="authtable-header" id="authtableCards">
            <img src="${bodyClassName[0].classList[0] === 'magazine' ? result.image : result.url}" class="authtableImage">
            </div>
              <div class="authtable-body">
                <h5>${result.Title}</h5>
                <p>${bodyClassName[0].classList[0] === 'magazine' ? result.description : result.content}</p>
              </div>
          </div>
          `;

    table.innerHTML += content;
  });
  return table;
}

export default async function decorate(block) {
  const countries = block.querySelector('a[href$=".json"]');
  const parientDiv = document.createElement('div');
  parientDiv.classList.add('employee-block');

  if (countries) {
    parientDiv.append(await createTable(countries.href, null));
    countries.replaceWith(parientDiv);
  }
}

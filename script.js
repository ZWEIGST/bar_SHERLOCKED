const recipes = JSON.parse(api);
const box = document.querySelector('.top--box');

function template(content__product) {
    return {
        tag: 'div',
        cls: 'content--product',
        content:[
            {
                tag: 'div',
                cls: 'content--product-image',
                attrs: {
                    style: `background-image: url(${content__product.image_url})`,
                }
            },
            {
                tag: 'div',
                cls: 'content--product-text',
                content: [
                    {
                        tag: 'h1',
                        cls: 'content--product-text-name',
                        content: `${content__product.name}`,
                    },
                    {
                        tag: 'h2',
                        cls: 'content--product-text-tagline',
                        content: `${content__product.tagline}`,
                    },
                    {
                        tag: 'h3',
                        cls: 'content--product-text-abv',
                        content: `alc: ${content__product.abv}`,
                    },
                    {
                        tag: 'h4',
                        cls: 'content--product-text-description',
                        content: `${content__product.description}`,
                    }
                ]
            }
        ]
    }
}
box.appendChild(templateEngine(recipes.map(template)));



function templateEngine(block) {
    if ( block === undefined ||  block === null ||  block === false) {
        return document.createTextNode('');
    }
    if ( typeof block === 'string' || typeof block === 'number' || typeof block === true) {
        return document.createTextNode(block);
    }
    if (Array.isArray(block)) {
        const fragment = document.createDocumentFragment();

        block.forEach(element => {
            fragment.appendChild(templateEngine(element));
        });

        return fragment;
    }

    const result = document.createElement(block.block);

    if (block.cls) {
        const classes = [].concat(block.cls);
        classes.forEach(cls => {
            result.classList.add(cls);
        });
    }

    if (block.attrs) {
        const keys = Object.keys(block.attrs);

        keys.forEach(key => {
            result.setAttribute(key, block.attrs[key]);
        });
    }

    result.appendChild(templateEngine(block.content));

    return result;
}



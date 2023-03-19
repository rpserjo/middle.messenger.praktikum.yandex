import Block from './Block';

/*
export function render(query, block) {
    const root = document.querySelector(query);

    // Можно завязаться на реализации вашего класса Block
    root.appendChild(block.getContent());

    block.dispatchComponentDidMount();

    return root;
}
*/

const render = (query: string, block: Block): HTMLElement => {
    const root: HTMLElement = document.querySelector(query);
    //root.innerHTML = '';
    //root.appendChild(block.getContent());
    root.replaceChildren(block.getContent());
    block.dispatchComponentDidMount();
    return root;
};

export default render;

import Block from './Block';

const render = (query: string, block: Block): HTMLElement => {
    const root: HTMLElement = document.querySelector(query);
    //root.innerHTML = '';
    //root.appendChild(block.getContent());
    root.replaceChildren(block.getContent());
    block.dispatchComponentDidMount();
    return root;
};

export default render;

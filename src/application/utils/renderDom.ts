import Block from '../Block';

const render = (query: string, block: Block<TProps>): HTMLElement => {
    const root: HTMLElement = document.querySelector(query) as HTMLElement;
    root.replaceChildren(block.getContent());
    block.dispatchComponentDidMount();
    return root;
};

export default render;

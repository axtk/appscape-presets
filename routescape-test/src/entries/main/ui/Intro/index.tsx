import {useRef} from 'react';
import {useRouteLinks} from 'routescape';
import {Counter} from '../Counter';

export const Intro = () => {
    let containerRef = useRef<HTMLElement | null>(null);

    useRouteLinks(containerRef, 'a');

    return (
        <main ref={containerRef}>
            <h1>Intro</h1>
            <p>This is demo content. Lorem ipsum dolor, quam velit, tincidunt vitae suscipit nullam.</p>
            <p>This <a href="/about">HTML link</a> is converted to a route link.</p>
            <Counter/>
        </main>
    );
}

export default Intro;

import type {MouseEventHandler} from 'react';
import {A, useRoute} from 'routescape';

export const Nav = () => {
    let [route, withRoute] = useRoute();

    let handlePreventedClick: MouseEventHandler = event => {
        event.preventDefault();
        console.log('preventDefault');
    };

    return (
        <nav>
            <p>
                {withRoute('/',
                    <strong>Intro</strong>,
                    <A href="/">Intro</A>
                )}
                {' | '}
                {withRoute('/about',
                    <strong>About</strong>,
                    <A href="/about">About</A>
                )}
                {' | '}
                {withRoute('/x',
                    <strong>MW stop</strong>,
                    <A href="/x">MW stop</A>
                )}
                {' | '}
                {withRoute('/x2',
                    <strong>preventDefault</strong>,
                    <A href="/x2" onClick={handlePreventedClick}>preventDefault</A>
                )}
                {' | '}
                {withRoute('/intro',
                    <strong>Intro redirect</strong>,
                    <A href="/intro">Intro redirect</A>
                )}
                {' | '}
                <button onClick={() => { route.assign('/'); }}>
                    Home
                </button>
            </p>
        </nav>
    );
};
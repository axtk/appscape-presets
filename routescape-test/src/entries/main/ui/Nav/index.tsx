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
                    <span>Intro</span>,
                    <A href="/">Intro</A>
                )}
                {' | '}
                {withRoute('/about',
                    <span>About</span>,
                    <A href="/about">About</A>
                )}
                {' | '}
                {withRoute('/x',
                    <span>MW stop</span>,
                    <A href="/x">MW stop</A>
                )}
                {' | '}
                {withRoute('/x2',
                    <span>preventDefault</span>,
                    <A href="/x2" onClick={handlePreventedClick}>preventDefault</A>
                )}
                {' | '}
                {withRoute('/intro',
                    <span>Intro redirect</span>,
                    <A href="/intro">Intro redirect</A>
                )}
                {' | '}
                {withRoute('/about',
                    <span>About replace</span>,
                    <A href="/about" data-navigation-mode="replace">About replace</A>
                )}
                {' | '}
                <button onClick={() => { route.assign('/'); }}>
                    Home
                </button>
            </p>
        </nav>
    );
};
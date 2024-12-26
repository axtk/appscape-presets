import {Suspense, useCallback, useContext, useState} from 'react';
import {useStore} from 'groundstate';
import {useRoute, useNavigationComplete, useNavigationStart} from 'routescape';
import {AppContext} from '../AppContext';
import {Intro} from '../Intro/lazy';
import {About} from '../About/lazy';
import {Nav} from '../Nav';
import './index.css';

export const Content = () => {
    let [route, withRoute] = useRoute();
    let [{routescapeVersion}] = useStore(useContext(AppContext), false);
    let [hasUnsavedChanges, setUnsavedChanges] = useState(false);

    let baseTitle = 'Router test';
    let suspenseFallback = <main><p>Loading...</p></main>;

    console.log('Content render', [route.href]);

    let handleCheckboxChange = useCallback(() => {
        setUnsavedChanges(value => !value);
    }, []);

    useNavigationStart(nextHref => {
        console.log('Content nav start', [route.href, nextHref]);
        if (nextHref === '/intro') {
            route.assign('/');
            return false;
        }
        if (nextHref === '/x')
            return false;
        if (hasUnsavedChanges)
            return false;
    }, [route, hasUnsavedChanges]);

    useNavigationComplete(href => {
        console.log('Content nav complete');
        switch (href) {
            case '/':
                document.title = `Intro / ${baseTitle}`;
                break;
            case '/about':
                document.title = `About / ${baseTitle}`;
                break;
        }
    }, []);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width"/>
                <title>{baseTitle}</title>
                <link rel="stylesheet" href="/-/main.css"/>
                <link type="image/x-icon" rel="icon" href="/favicon.svg"/>
            </head>
            <body>
                <Nav/>
                <main>
                    <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        checked={hasUnsavedChanges}
                        autoComplete="off"
                    /> Unsaved
                </main>
                {withRoute('/', (
                    <Suspense fallback={suspenseFallback}>
                        <Intro/>
                    </Suspense>
                ))}
                {withRoute('/about', (
                    <Suspense fallback={suspenseFallback}>
                        <About/>
                    </Suspense>
                ))}
                <footer>
                    <hr/>
                    <p><code>routescape: {routescapeVersion}</code></p>
                </footer>
            </body>
        </html>
    );
};

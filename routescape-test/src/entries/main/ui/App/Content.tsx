import {Suspense, useCallback, useEffect, useState} from 'react';
import {useRoute} from 'routescape';
import {Intro} from '../Intro/lazy';
import {About} from '../About/lazy';
import {Nav} from '../Nav';
import './index.css';

export const Content = () => {
    let [route, withRoute] = useRoute();
    let [hasUnsavedChanges, setUnsavedChanges] = useState(false);

    let baseTitle = 'Router test';
    let suspenseFallback = <main><p>Loading...</p></main>;

    console.log('Content render', [route.href]);

    let handleCheckboxChange = useCallback(() => {
        setUnsavedChanges(value => !value);
    }, []);

    useEffect(() => {
        return route.use(nextHref => {
            console.log('Content Effect mw', [route.href, nextHref]);
            if (nextHref === '/intro') {
                route.assign('/');
                return false;
            }
            if (nextHref === '/x')
                return false;
            if (hasUnsavedChanges)
                return false;
        });
    }, [route, hasUnsavedChanges]);

    useEffect(() => {
        let setTitle = () => {
            if (route.matches('/'))
                document.title = `Intro / ${baseTitle}`;
            else if (route.matches('/about'))
                document.title = `About / ${baseTitle}`;
        };

        setTitle();

        return route.subscribe(setTitle);
    }, [route]);

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
            </body>
        </html>
    );
};

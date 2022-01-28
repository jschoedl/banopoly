import Head from 'next/head'
import '../styles.css'


export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Head>
                <title>Banopoly</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#000000"/>
                <meta
                    name="description"
                    content="Play MONOPOLY using the Banano cryptocurrency."
                />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

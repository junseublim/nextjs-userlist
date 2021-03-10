import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

const NotFound = () => {

    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 3000);
    }, []);
    return ( 
        <div className="not-found">
            <h1>Oooops....</h1>
            <h2>That page Cannot Be Found</h2>
            <h2>You will be redirected to homepage soon</h2>
        </div>
    );
}
 
export default NotFound;
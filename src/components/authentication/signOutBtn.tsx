// Button calls NextAuth signout function
import React, {FC} from 'react';
import {signOut, useSession} from 'next-auth/react';
import styles from '../CRUD-page/crudNav.module.css';

const SignOutBtn: FC = () => {
    const {status} = useSession();

    return (
        <button
            className={styles.signOutBtn}
            onClick={status ? () => signOut() : undefined}
            disabled={!status}
        >
            {status ? 'Sign out' : 'Disabled'}
        </button>
    );
};

export default SignOutBtn;



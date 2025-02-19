import React, {FC} from 'react';
import HomeButton from "../homeButton";
import SignOutBtn from "../authentication/signOutBtn";
import layout from '../../styles/navbar.module.css'
import styles from './crudNav.module.css'

const CrudPageNav: FC = () => {
    return (
        <nav className={layout.navBarContainer}>
            <HomeButton/>
            <h2 className={styles.header}>
                Dette er bare en testside, og er ikke en del av det endelige produktet.
            </h2>
            <SignOutBtn/>
        </nav>
    );
};

export default CrudPageNav;
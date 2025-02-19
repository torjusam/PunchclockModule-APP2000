import React, {FC} from 'react';
import SearchBar from './searchBar';
import NotifIcon from '../../assets/notif.svg';
import HelpIcon from '../../assets/helpIco.svg';
import styles from '../../styles/navbar.module.css'

const HomePageNav: FC = () => {
    return (
        <nav className={styles.navBarContainer}>
            <SearchBar/>
            <div className={styles.iconContainer}>
                <NotifIcon className={styles.notifIcon}/>
                <HelpIcon className={styles.helpIcon}/>
            </div>
        </nav>
    );
};

export default HomePageNav;
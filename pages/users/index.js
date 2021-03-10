import styles from '../../styles/Users.module.css';
import Link from 'next/link';

export const getStaticProps = async () => {

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    return {
        props: {
            users: data
        }
    }
};

const Users = ({users}) => {
    return (  
        <div>
        <h1>All users</h1>
        {
            users.map(item => (
                <Link key={item.id} href={`/users/${item.id}`}>
                    <a className={styles.single}>
                        <h3>{item.name}</h3>
                    </a>
                </Link>
            ))
        }
        </div>
    );
}
 
export default Users;
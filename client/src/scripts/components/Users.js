import { h } from 'hyperapp'

const Users = ({ users, active, logout }) => (
    <section class="users">
        {users.map(({ avatar, email }) => (
            <div class="user">
                {avatar && <img src={avatar} alt="avatar" title={email} class="user-avatar" />}
            </div>
        ))}
        {active && <a href="#" class="logout" onclick={() => logout()}>Logout</a>}
    </section>
)

export default Users

import { h } from 'hyperapp'

const SignIn = ({ email, password, updateEmail, updatePassword, submit, button, message, toggle, pending, error }) => (
    <form class="signin-form" onsubmit={(e) => submit(e)}>
        <div class="container">
            <input type="text" value={email} onkeyup={(e) => updateEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onkeyup={(e) => updatePassword(e.target.value)} placeholder="Password" />
            <button type="submit" disabled={!email || !password || pending}>{button}</button>
            {(!pending && !error) && <p class="info"><a onclick={() => toggle()}>{message}</a></p>}
            {pending && <p class="info">Processing...</p>}
            {error && <p class="error">{error}</p>}
        </div>
    </form>
)

export default SignIn

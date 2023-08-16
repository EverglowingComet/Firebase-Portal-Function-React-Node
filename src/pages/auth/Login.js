import { useSelector, useDispatch } from "react-redux"
import { clearAuth, setAuth } from "store/user";

export function Login() {
    const dispatch = useDispatch();
    const user = useSelector( (state) => state.user.value);

    return (
        <div>
            <h3>Login</h3>
            <p>{user ? user.username : "No Login"}</p>
            <button onClick={e=> {
                dispatch(setAuth({
                    uid: "xxx",
                    username: "comet",
                }))
            }}>Test</button>
            <p>{user ? user.username : "No Login"}</p>
            <button onClick={e=> {
                dispatch(clearAuth())
            }}>Clear</button>
        </div>
    )
}
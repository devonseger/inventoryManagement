import LoginForm from "../components/LoginForm";
import { isAuthenticated } from "../util/auth";

export default function Login() {
    return (
        isAuthenticated()? <p>You are already logged in.</p> : <LoginForm />
    );
}

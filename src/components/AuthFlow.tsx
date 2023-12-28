
import { env } from "process";

export default function AuthFlow() {
  const CALLBACK_URL = "https://ridesight.znschaffer.com"
  return (<>

    <h1>Sign In With Strava</h1>
    <a href={`http://www.strava.com/oauth/authorize?client_id=118783&response_type=code&redirect_uri=${CALLBACK_URL}/map&approval_prompt=force&scope=activity:read_all`}>Log In</a>
  </>)
}

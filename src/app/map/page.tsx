"use client"
import MapContainer from "@/components/MapContainer";
import { getAccessToken, getActivities } from "@/lib/strava";
import { useRouter, useSearchParams } from "next/navigation";
import { hasCookie, setCookie, getCookie } from "cookies-next"
import { env } from "process";
import { useEffect, useState } from "react";

export default function Map() {
  const router = useRouter()
  const [activities, setActivities] = useState<any[]>([])
  const code = useSearchParams().get("code") ?? ""
  useEffect(() => {
    if (localStorage.getItem("activities") == null) {
      if (!hasCookie("strava_auth_token") && !hasCookie("strava_refresh_token")) {
        getAccessToken(code).then((auth) => {
          console.log(auth.access_token)
          setCookie("strava_auth_token", auth.access_token, { expires: new Date(auth.expires_at * 1000) })
          setCookie("strava_refresh_token", auth.refresh_token)
          setCookie("strava_athlete_id", auth.athlete.id)
          getActivities(auth.access_token, auth.athlete.id).then((resp) => {
            setActivities(resp)
          })
        })
      } else if (hasCookie("strava_auth_token")) {
        let token = getCookie("strava_auth_token") ?? ""
        let id = getCookie("strava_athlete_id") ?? ""
        getActivities(token, id).then((resp) => {
          setActivities(resp)
        })
      } else {
        // refresh access token with refresh token

      }
    } else {
      setActivities(JSON.parse(localStorage.getItem("activities") ?? ""))
    }
  }, [])

  return (<>
    <MapContainer activities={activities} />
  </>)
}

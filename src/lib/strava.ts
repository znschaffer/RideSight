import got from "got"
import ky from "ky";

const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_STRAVA_CLIENT_SECRET;
const refreshToken = process.env.NEXT_PUBLIC_STRAVA_REFRESH_TOKEN;
import { decode } from "@googlemaps/polyline-codec"

const TOKEN_ENDPOINT = "https://www.strava.com/oauth/token";
const ATHLETES_ENDPOINT = "https://www.strava.com/api/v3/athletes"
const ACTIVITY_ENDPOINT = "https://www.strava.com/api/v3/activities"

export const getAccessToken = async (code: string) => {
  const body = JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    grant_type: "authorization_code",
  });


  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body,
  });

  return response.json();
};

export const getActivities = async (access_token: string, userId: string) => {
  const response = await fetch(
    `${ATHLETES_ENDPOINT}/${userId}/activities?access_token=${access_token}`
  );

  const json = await response.json();

  const publicActivities = json.filter(
    (activity: any) => activity.visibility === "everyone"
  );

  let activities = []
  for (const activity of publicActivities) {
    activities.push(await getActivity(activity, access_token))
  }

  localStorage.setItem("activities", JSON.stringify(activities))
  return activities

};

const getActivity = async (activity: any, access_token: string) => {
  const data = await ky.get(
    `${ACTIVITY_ENDPOINT}/${activity.id}?include_all_efforts=true`, {
    headers: { "Authorization": `Bearer ${access_token}` }
  }).json<any>()
  const encoded_polyline = data.map.polyline
  if (encoded_polyline) {
    data.map = decode(encoded_polyline)
    data.map = data.map.map((latlng: any[]) => [latlng[1], latlng[0]])
  }
  console.log(data)
  return data
}

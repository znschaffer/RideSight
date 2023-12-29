import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { env } from "process";

export default function AuthFlow() {
  const CALLBACK_URL = "https://ridesight.znschaffer.com";
  return (
    <div className="flex w-full h-full flex-col p-10  outline-black col-span-7 justify-center items-center align-center">
      <Card className="w-fit m-auto">
        <CardHeader>
          <CardTitle>Sign In With Strava</CardTitle>
          <CardDescription>Import Your Ride Data</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Button asChild className="m-auto">
              <Link
                href={`http://www.strava.com/oauth/authorize?client_id=118783&response_type=code&redirect_uri=${CALLBACK_URL}/map&approval_prompt=force&scope=activity:read_all`}
              >
                Log In
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

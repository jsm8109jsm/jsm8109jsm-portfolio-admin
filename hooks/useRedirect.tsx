import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useRedirect() {
  const router = useRouter();
  const [mount, setMount] = useState(false);
  const _session_key = `firebase:authUser:${process.env.NEXT_PUBLIC_API_KEY}:[DEFAULT]`;

  useEffect(() => {
    setMount(true);
    return () => setMount(false);
  }, []);
  if (mount && !sessionStorage.getItem(_session_key)) {
    router.push("/");
  }
}

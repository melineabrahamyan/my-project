"use server";

import { cookies } from "next/headers";

export async function getCookie(name: any) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(name);

  return cookieValue ?? "";
}

export async function deleteCookie(name: any) {
  (await cookies()).delete(name);
}

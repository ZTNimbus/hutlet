"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import supabase from "./supabase";
import { getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function createBooking(bookingData, formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const newBooking = {
    ...bookingData,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 500),
    status: "unconfirmed",
    guestId: session.user.guestId,
    isPaid: false,
    hasBreakfast: false,
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created.");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thank-you");
}

export async function updateProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const nationalId = formData.get("nationalId");
  const nationalityAndFlag = formData.get("nationality");

  const [nationality, countryFlag] = nationalityAndFlag.split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalId))
    throw new Error("Invalid national ID.");

  const updatedGuest = {
    nationality,
    countryFlag,
    nationalId,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedGuest)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated.");

  revalidatePath("/account/profile");
}

export async function deleteBooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not authorized to delete this booking.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const session = await auth();

  const bookingId = formData.get("bookingId");
  const numGuests = formData.get("numGuests");
  const observations = formData.get("observations");

  const booking = await getBooking(bookingId);

  if (booking.guestId !== session.user.guestId)
    throw new Error("You are not authorized to edit this booking.");

  const updatedFields = {
    numGuests,
    observations: observations.slice(0, 500),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations");
  revalidatePath("/account/reservations/edit/" + bookingId);

  redirect("/account/reservations");
}

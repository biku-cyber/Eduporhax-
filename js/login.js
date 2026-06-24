import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const form = document.getElementById("loginForm");

form?.addEventListener("submit", async (e) => {

  e.preventDefault();

  const btn = form.querySelector("button");

  btn.disabled = true;
  btn.textContent = "প্ৰৱেশ কৰা হৈছে...";

  try {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("স্বাগতম!");

    window.location.href = "courses.html";

  } catch (error) {

    let msg = "প্ৰৱেশ কৰিব পৰা নগ'ল";

    switch (error.code) {

      case "auth/user-not-found":
        msg = "একাউণ্ট পোৱা নগ'ল";
        break;

      case "auth/wrong-password":
        msg = "পাছৱৰ্ড ভুল";
        break;

      case "auth/invalid-credential":
        msg = "ইমেইল বা পাছৱৰ্ড ভুল";
        break;

      case "auth/invalid-email":
        msg = "ইমেইল সঠিক নহয়";
        break;
    }

    alert(msg);

  } finally {

    btn.disabled = false;
    btn.textContent = "প্ৰৱেশ কৰক";
  }
});

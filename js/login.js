import { auth } from "./firebase-config.js";

import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

const form = document.getElementById("loginForm");

form?.addEventListener("submit", async (e) => {

  e.preventDefault();

  const btn = form.querySelector("button");

  try {

    btn.disabled = true;
    btn.textContent = "প্ৰৱেশ কৰা হৈছে...";

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;

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

      case "auth/invalid-credential":
        msg = "ইমেইল বা পাছৱৰ্ড ভুল";
        break;

      case "auth/invalid-email":
        msg = "ইমেইল ঠিকনা সঠিক নহয়";
        break;

      case "auth/too-many-requests":
        msg = "বহুত চেষ্টা কৰা হৈছে, কিছু সময় পিছত চেষ্টা কৰক";
        break;
    }

    alert(msg);

  } finally {

    btn.disabled = false;
    btn.textContent = "প্ৰৱেশ কৰক";

  }
});

import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const form = document.getElementById("signupForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button");
  btn.disabled = true;
  btn.textContent = "একাউণ্ট সৃষ্টি হৈছে...";

  try {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(result.user, {
      displayName: name
    });

    await setDoc(
      doc(db, "users", result.user.uid),
      {
        uid: result.user.uid,
        name,
        email,
        xp: 0,
        streak: 0,
        rank: "Beginner",
        createdAt: serverTimestamp()
      }
    );

    alert("একাউণ্ট সফলভাৱে সৃষ্টি কৰা হ'ল!");

    window.location.href = "login.html";

  } catch (error) {

    let msg = "কিবা ভুল হৈছে";

    switch (error.code) {

      case "auth/email-already-in-use":
        msg = "এই ইমেইল আগতেই ব্যৱহৃত হৈছে";
        break;

      case "auth/weak-password":
        msg = "পাছৱৰ্ড কমেও 6 অক্ষৰৰ হওঁক";
        break;

      case "auth/invalid-email":
        msg = "ইমেইল ঠিকনা সঠিক নহয়";
        break;
    }

    alert(msg);

  } finally {

    btn.disabled = false;
    btn.textContent = "একাউণ্ট সৃষ্টি কৰক";
  }
});

import { auth, db } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const form = document.getElementById("signupForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button");

  try {
    btn.disabled = true;
    btn.textContent = "একাউণ্ট সৃষ্টি হৈছে...";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await updateProfile(userCredential.user, {
      displayName: name
    });

    await setDoc(
      doc(db, "users", userCredential.user.uid),
      {
        uid: userCredential.user.uid,
        name,
        email,
        xp: 0,
        streak: 0,
        createdAt: serverTimestamp()
      }
    );

    alert("একাউণ্ট সফলভাৱে সৃষ্টি কৰা হ'ল!");
    window.location.href = "login.html";

  } catch (error) {

    let msg = "কিবা ভুল হৈছে";

    switch (error.code) {
      case "auth/email-already-in-use":
        msg = "এই ইমেইল আগতেই ব্যৱহাৰ হৈছে";
        break;

      case "auth/weak-password":
        msg = "পাছৱৰ্ড কমেও ৬ অক্ষৰৰ হওঁক";
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

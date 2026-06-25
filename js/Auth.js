import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js";

/*
|--------------------------------------------------------------------------
| AUTO LOGIN + PROTECTED PAGES
|--------------------------------------------------------------------------
*/

const protectedPages = [
  "courses.html",
  "dashboard.html"
];

const currentPage =
  window.location.pathname.split("/").pop();

onAuthStateChanged(auth, (user) => {

  /* ---------- Protected Pages ---------- */

  if (
    protectedPages.includes(currentPage) &&
    !user
  ) {
    window.location.href = "login.html";
    return;
  }

  /* ---------- Login/Signup Redirect ---------- */

  if (
    user &&
    (
      currentPage === "login.html" ||
      currentPage === "signup.html"
    )
  ) {
    window.location.href = "courses.html";
    return;
  }

  /* ---------- Navbar User Info ---------- */

  const navActions =
    document.querySelector(".nav-actions");

  if (user && navActions) {

    navActions.innerHTML = `
      <span class="user-email">
        ${user.displayName || user.email}
      </span>

      <button
        class="btn btn-ghost"
        id="logoutBtn">
        Logout
      </button>
    `;

    document
      .getElementById("logoutBtn")
      ?.addEventListener("click", async () => {

        try {

          await signOut(auth);

          window.location.href =
            "pages/login.html";

        } catch (err) {

          console.error(err);

        }

      });
  }
});

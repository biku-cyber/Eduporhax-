<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAZ56iI-eHs4kU1MGR9FtHEPtY7RMCeP1g",
    authDomain: "porha-hub.firebaseapp.com",
    projectId: "porha-hub",
    storageBucket: "porha-hub.firebasestorage.app",
    messagingSenderId: "1076784019480",
    appId: "1:1076784019480:web:1c820d3a6767f218bceb6d",
    measurementId: "G-41CYM9L4PE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

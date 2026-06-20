const fs = require('fs');

let content = fs.readFileSync('lap_uk.html', 'utf8');

// Remove all import statements
content = content.replace(/import\s+.*?from\s+['"].*?['"];?/gs, '');

const header = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Laporan Unit Kerja</title>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap');
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body>
  <div id="root"></div>

  <!-- Firebase Scripts (Compat Version) -->
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>

  <!-- React & Other Scripts -->
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://unpkg.com/lucide-react@latest"></script>

  <script type="text/babel">
    const { useState, useEffect, useMemo, useRef } = React;
    const { 
      Search, Trash2, Edit3, ExternalLink, X, Upload, Loader2, Settings, 
      Table: TableIcon, LayoutGrid, FileSpreadsheet, FilePlus2, CheckCircle2, 
      Archive, RotateCcw, Calendar, Layers, Briefcase, User, PlusCircle, 
      StickyNote, MessageSquareText, Lock, Unlock, Download, Database, 
      UploadCloud, AlertTriangle, FileText 
    } = LucideReact;

    // Use window.parent.__firebase_config if available, otherwise try local var
    let fbConfigRaw = '{}';
    if (typeof window !== 'undefined' && window.parent && window.parent.__firebase_config) {
      fbConfigRaw = window.parent.__firebase_config;
    } else if (typeof __firebase_config !== 'undefined') {
      fbConfigRaw = __firebase_config;
    }
    const firebaseConfig = typeof fbConfigRaw === 'string' ? JSON.parse(fbConfigRaw) : fbConfigRaw;
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const auth = firebase.auth();
    const db = firebase.firestore();
    
    let appIdStr = 'arsip-dinsos-sragen-v2';
    if (typeof window !== 'undefined' && window.parent && window.parent.__app_id) {
      appIdStr = window.parent.__app_id;
    } else if (typeof __app_id !== 'undefined') {
      appIdStr = __app_id;
    }
    const appId = appIdStr;

    const getReportsCollection = () => db.collection('artifacts').doc(appId).collection('public').doc('data').collection('reports');
`;

const footer = `
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
`;

// Replace firebase init section
content = content.replace(/const firebaseConfig.*?const appId = .*?;/s, '');

// Auth conversions
content = content.replace(/signInWithCustomToken\(auth, (.*?)\)/g, 'auth.signInWithCustomToken($1)');
content = content.replace(/signInAnonymously\(auth\)/g, 'auth.signInAnonymously()');
content = content.replace(/onAuthStateChanged\(auth, setUser\)/g, 'auth.onAuthStateChanged(setUser)');
content = content.replace(/typeof __initial_auth_token !== 'undefined' && __initial_auth_token/g, '(typeof window !== "undefined" && window.parent && window.parent.__initial_auth_token) || (typeof __initial_auth_token !== "undefined" && __initial_auth_token)');
content = content.replace(/__initial_auth_token/g, '(window.parent.__initial_auth_token || __initial_auth_token)');

// Firestore conversions
content = content.replace(/const q = query\(collection\(db, 'artifacts', appId, 'public', 'data', 'reports'\)\);/g, 'const q = getReportsCollection();');
content = content.replace(/const unsubscribe = onSnapshot\(q, \(snapshot\)/g, 'const unsubscribe = q.onSnapshot((snapshot)');

content = content.replace(/const colRef = collection\(db, 'artifacts', appId, 'public', 'data', 'reports'\);/g, 'const colRef = getReportsCollection();');
content = content.replace(/await addDoc\(colRef, (.*?)\);/g, 'await colRef.add($1);');
content = content.replace(/await updateDoc\(doc\(db, 'artifacts', appId, 'public', 'data', 'reports', editingId\), payload\);/g, 'await getReportsCollection().doc(editingId).update(payload);');
content = content.replace(/await updateDoc\(doc\(db, 'artifacts', appId, 'public', 'data', 'reports', targetId\), (.*?)\);/g, 'await getReportsCollection().doc(targetId).update($1);');
content = content.replace(/await deleteDoc\(doc\(db, 'artifacts', appId, 'public', 'data', 'reports', targetId\)\);/g, 'await getReportsCollection().doc(targetId).delete();');

content = content.replace(/const batch = writeBatch\(db\);/g, 'const batch = db.batch();');
content = content.replace(/const docRef = doc\(collection\(db, 'artifacts', appId, 'public', 'data', 'reports'\)\);/g, 'const docRef = getReportsCollection().doc();');

// export default function App
content = content.replace(/export default function App/g, 'function App');

const finalHTML = header + content + footer;

fs.writeFileSync('lap_uk.html', finalHTML);
console.log('Conversion completed.');

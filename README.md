# ISTRUZIONI PER APK
- nella cartella "globalVariables" si trova un file con all'interno una variabile globale contenente un url.
  Una volta dockerizzato il backend sostituire "localhost" con il proprio indirizzo ip
- inserire "Logo" come icona dell'app
- buildare apk

## Per manifest
- aggiungere android:usesCleartextTraffic="true" nel tag application
- aggiungere come tag uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"
- aggiungere come tag uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"
- aggiungere nel tag activity android:windowSoftInputMode="stateVisible|adjustPan"
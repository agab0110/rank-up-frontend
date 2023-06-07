# ISTRUZIONI PER APK
- sostituire nei services, al posto di "localhost" l'indirizzo ip del proprio pc
- buildare apk

## Per manifest
- aggiungere android:usesCleartextTraffic="true" nel tag application
- aggiungere come tag uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"
- aggiungere come tag uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"
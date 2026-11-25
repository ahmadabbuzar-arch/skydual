SKYDUEL - Multiplayer + Damage System
=====================================

PEHLI BAAR (sirf ek kaam):
  Node.js install karo (https://nodejs.org, LTS version).

CHALANE KE LIYE:
  Windows  : START_WINDOWS.bat par double-click
  Mac/Linux: ./START_MAC_LINUX.sh
  (pehli baar ye khud "npm install" kar lega, internet chahiye)

KHELNE KE LIYE:
  1. Browser me kholo: http://localhost:3000
  2. Akele khelna ho to "Solo" dabao (bots ke saath, damage system yahin chalta hai).
  3. Multiplayer: ek banda "Create new" dabaye, jo room code aaye wo doston ko de,
     dost "Join" dabaye.

DOSTON KE SAATH:
  - Same Wi-Fi: dost http://<tumhare-PC-ka-IP>:3000 kholein
    (IP: Windows me cmd -> ipconfig, "IPv4 Address")
  - Internet par: "ngrok http 3000" chalao ya Render/Railway par deploy karo,
    jo link mile wo sab kholein.

NOTE:
  Gun/missile/pankh tootna abhi SIRF Solo mode me hai.
  Multiplayer me abhi sab ek saath ud sakte hain, ek doosre ko hit nahi kar sakte.

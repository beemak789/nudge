//get location info
//fetch tasks from firestore
//make call to locations

//approach

//OTHER
  //notification status for each user: on/off (activated via snooze/ignore)

//USER
  //list: bra, bread
  //close to VS, pings you, you go, check it off
  //then get another ping later when near grocery
  //if they ignore, shouldn't keep sending

//PROCESS
  //send location every few minutes
  //server recieves location, finds closest store for each item
  //once we recieve server information back, we then decide whether the server response warrants a push notif, based on priority and distance away.
  //timing for diff priorities is different

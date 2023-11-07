console.log("logout");
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getDatabase, ref, set,get ,child} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

var fav=0,facclick=false;
setTimeout(()=>{
  if(localStorage.getItem("favnumber")=="")
  {console.log(localStorage.getItem("favnumber"));
    fav=parseInt(localStorage.getItem("favnumber"))
  fav--;
  }
  else{
    console.log("fav not receve");
  }
  
},1000)
var off= document.getElementById("off")
var favcount=0;
const firebaseConfig = {
  apiKey: "AIzaSyBRm6jaYF-0ojUxkd7JLBqmA6Le3V50skg",
  authDomain: "minipro-7555a.firebaseapp.com",
  databaseURL: "https://minipro-7555a-default-rtdb.firebaseio.com",
  projectId: "minipro-7555a",
  storageBucket: "minipro-7555a.appspot.com",
  messagingSenderId: "896087347515",
  appId: "1:896087347515:web:d478707e5d44080ff7e71e",
  measurementId: "G-GTJY445TTE"
};
  var email ,pass,imgurl,password,tital,viid,aktemp,temp;
  var av=""
  try {
    temp=localStorage.getItem("email").substring(0,7);
  aktemp=localStorage.getItem("email");
  console.log(temp,aktemp);
  } catch (e) {
    console.log(e);
  }

 var fdata;
console.log(document.getElementById("off"));
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const database = getDatabase(app);
  off.addEventListener("click",()=>{
    console.log("logout");
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("logout button is prass ");
        window.open("index.html","_self");
        //localStorage.clear()
      }).catch((error) => {
        // An error happened.
      });
  })

  try{
    const dbref=ref(database);
    
    get(child(dbref,temp+"/playlist")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());    
        fdata=JSON.stringify(snapshot.val())   
        localStorage.setItem("fav",JSON.stringify(snapshot.val()))
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.log(error);
    });
   
    
  }
  catch(e)
  {
console.log(e);
  }


  document.getElementById("favbut").addEventListener("click",()=>{
   
    facclick=!facclick
    if(facclick)
   {
    
   
        setTimeout(() => {
          email=localStorage.getItem("email");
          imgurl=localStorage.getItem("imgurl");
          tital=localStorage.getItem("tital");
          viid=localStorage.getItem("viid");
         
        }, 1000);
        setTimeout(() => {
          try{
            
            set(ref(database, `${email.substring(0,7)}/playlist/`+fav  ), {
              viid: viid,
              email: email,
              imgurl : imgurl,
              tital:tital
            });
          }
          catch(e)
          {
    console.log(e);
          }
         
        }, 2000);
        fav=fav+1;
   }
  })
  


  document.getElementById("Playlist").addEventListener("click", () => {
    try{
      const dbref=ref(database);
      console.log(fav);
      get(child(dbref,temp+"/playlist")).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());        
          localStorage.setItem("fav",JSON.stringify(snapshot.val()))
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
     
      
    }
    catch(e)
    {
console.log(e);
    }
    })
    try {
     av= sessionStorage.getItem("avtor")
     if(av.length!=0)
     {
      console.log("from session");
      var im=document.createElement("img")
     im.src=`avtar/${av}`
     console.log(`avtar/${av}`);
     im.width="50"
     im.height="50"
     im.id="imdp"
     document.getElementById("imgboxsho").appendChild(im)
     console.log(localStorage.getItem("email").substring(0,7));

     try {
      set(ref(database, `${localStorage.getItem("email").substring(0,7)}/avator`  ), {
       dp:av
      });
    } catch (e) {
      console.log("unable to save",e);
    }

     }

     
    
    } catch (e) {
      console.log(e,"dp save problem");
      const dbref=ref(database);
      console.log("push dp");
      get(child(dbref, `${localStorage.getItem("email").substring(0,7)}/avator`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().dp);   
          var im=document.createElement("img")
          im.src=`avtar/${snapshot.val().dp}`
          console.log(`${snapshot.val().dp}`);
          im.width="50"
          im.height="50"
          im.id="imdp"
          document.getElementById("imgboxsho").appendChild(im)     
         
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
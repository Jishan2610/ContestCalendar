
let alldataofupcoming = [];

//FUNCTIONS

//CONTEST DURATION
function getcontestduration(seconds) {
  seconds = Number(seconds);//number is an interface
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay;
}

//CONTEST END TIME

function getcontestendtime(endtime) {
  let utcDate = endtime; // ISO-8601 formatted date returned from server
  let localDate = new Date(utcDate);
  let year = localDate.getFullYear();
  let month = localDate.getMonth() + 1;
  let dt = localDate.getDate();
  let hours = localDate.getHours();
  let minutes =
    localDate.getMinutes() > 0
      ? localDate.getMinutes() > 10
        ? localDate.getMinutes()
        : "0" + localDate.getMinutes()
      : "00";

  var weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  let day = weekday[localDate.getDay()];
  let result =
    "END :   " +
    day +
    " " +
    dt +
    "/" +
    month +
    "/" +
    year +
    "   " +
    hours +
    ":" +
    minutes;
  return result;
}

//DATE OF START
function getdateofstart(start_time) {
  let utcDate = start_time;
  let localDate = new Date(utcDate);
  let year = localDate.getFullYear();
  let month = localDate.getMonth() + 1;
  let dt = localDate.getDate();

  var weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  let day = weekday[localDate.getDay()];
  let res = day + " " + dt + "/" + month + "/" + year;
  return res;
}

function gettimeofstart_forgcalender(start_time) {
  let utcDate = start_time; // ISO-8601 formatted date returned from server
  let localDate = new Date(utcDate);
  let hours =
    localDate.getHours() > 0
      ? localDate.getHours() >= 10
        ? localDate.getHours()
        : "0" + localDate.getHours()
      : "00";
  let minutes =
    localDate.getMinutes() > 0
      ? localDate.getMinutes() >= 10
        ? localDate.getMinutes()
        : "0" + localDate.getMinutes()
      : "00";

  let result = "" + hours + minutes + "00";
  return result;
}
function getdateofstartforgcalender(start_time) {
  let utcDate = start_time;
  let localDate = new Date(utcDate);
  let year = localDate.getFullYear();
  let month = localDate.getMonth() + 1;
  let dt = localDate.getDate();

  month = month > 9 ? month : "0" + month;
  dt = dt > 9 ? dt : "0" + dt;
  // let res = "" + dt + month + year;
  let res = "" + year + month + dt;
  return res;
}

function gcalenderlinkofevent(CNAME, SDATE, STIME, EDATE, ETIME, LINKOFC) {
  let result =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
    CNAME +
    "&dates=" +
    SDATE +
    "T" +
    STIME +
    "/" +
    EDATE +
    "T" +
    ETIME +
    "&location=" +
    LINKOFC +
    "&pli=1&uid=&sf=true&output=xml#eventpage_6";
  //return result.replace(/[^\w\s]/gi, '');
  return result.replace(/#/g, "%23");

  // return `https://www.google.com/calendar/render?action=TEMPLATE&text=${CNAME}&dates=${calendarTime}&location=${this.url}&pli=1&uid=&sf=true&output=xml#eventpage_6`
}
function gettimeofstart(start_time) {
  let utcDate = start_time; // ISO-8601 formatted date returned from server
  let localDate = new Date(utcDate);
  let hours =
    localDate.getHours() > 0
      ? localDate.getHours() >= 10
        ? localDate.getHours()
        : "0" + localDate.getHours()
      : "00";
  let minutes =
    localDate.getMinutes() > 0
      ? localDate.getMinutes() >= 10
        ? localDate.getMinutes()
        : "0" + localDate.getMinutes()
      : "00";

  let result = hours + ":" + minutes;
  return result;
}

getcontestdetails();

async function getcontestdetails() {
  
  const response = await fetch("https://kontests.net/api/v1/all");
  const data = await response.json();

  alldataofupcoming = data.filter((element) => {
    if (element.status === "BEFORE" && parseInt(element.duration) <= 2678400)
      return element;
  });
  //the data will be sorted
  //alldataofupcoming.sort((a,b) => (a.start_time > b.start_time) ? 1 : ((b.last_nom > a.last_nom) ? -1 : 0))
  //console.log(alldataofupcoming) ;      //just for debugging
  localStorage.setItem("alldataofupcoming", JSON.stringify(alldataofupcoming));
  

  let hashMap = new Map();
  for (let ele of alldataofupcoming) {
    let key = ele.site;
    if (!hashMap.has(key)) {
      hashMap.set(key, ele);
      if (key == "CodeForces") {
        build("item2", ele, "./img/cf.png");
      } else if (key == "CodeChef") {
        build("item1", ele, "./img/cc.png");
      } else if (key == "AtCoder") {
        build("item3", ele, "./img/ac.png");
      } else if (key == "LeetCode") {
        build("item4", ele, "./img/lc.png");
      }
      // console.log(ele);
    }
  }
  //for(let ele of hashMap)console.log(ele);//just for debugging
  //  let val=hashMap.get('CodeForces');
  //  console.log(getcontestduration(val.duration)+" contest duration ");
  //  console.log(getcontestendtime(val.end_time)+" contest end time ");
  //  console.log(getdateofstart(val.start_time)+" contest start time ");
  //  console.log(gettimeofstart_forgcalender(val.start_time)+" time of start for google calender ");
  //CodeForcesdocument is not defined
  //    if (typeof window !== 'undefined') {
  //     console.log('You are on the browser')
  //   } else {
  //     console.log('You are on the server')
  //   }

  //document..appendChild(new_a);
  //    console.log(CF.url);
  //    let a2=document.createElement("A");
  //    a2.innerText="CF";
  //    a2.setAttribute("href",CF.url);
  //    document.getElementsByClassName("item2").innerHTML=a2;

  function build(item, ele, src) {
    let upcominginfo = document.getElementsByClassName(item)[0];
    let outerdiv = document.createElement("DIV");
    outerdiv.setAttribute("class", "single-contest-detail-container");
    //div1
    let innerdiv1 = document.createElement("DIV");
    innerdiv1.setAttribute("class", "imageandheading");
    let imgofcontest = document.createElement("IMG");
    imgofcontest.setAttribute("src", src);
    imgofcontest.setAttribute("alt", "contest-image");
    imgofcontest.setAttribute("class", "contest-logo");
    let headingofcontest = document.createElement("H3");
    let linkofcontest = ele.url;
    let anchor = document.createElement("A");
    anchor.setAttribute("href", linkofcontest);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("class", "linkofcontest");
    anchor.appendChild(headingofcontest);
    headingofcontest.setAttribute("class", "nameofcontest");
    headingofcontest.innerHTML = ele.name;
    innerdiv1.appendChild(imgofcontest);
    innerdiv1.appendChild(anchor);

    //div2
    let innerdiv2 = document.createElement("DIV");
    innerdiv2.setAttribute("class", "startandend");
    //starttime
    let starttime = document.createElement("DIV");
    starttime.setAttribute("class", "starttime");
    let startdate = document.createElement("H3");
    startdate.setAttribute("class", "date");
    startdate.innerHTML = getdateofstart(ele.start_time);
    let timeofstart = document.createElement("H4");
    timeofstart.setAttribute("class", "time");
    timeofstart.classList.add("extratimestyleofstart");
    timeofstart.innerHTML = gettimeofstart(ele.start_time);
    let start=document.createElement("h3");
    start.setAttribute("class","st");
    start.innerText="Start :";
    let values1=document.createElement("DIV");
    values1.setAttribute("class","val");
    values1.appendChild(startdate);
    values1.appendChild(timeofstart);
    starttime.appendChild(start);
    starttime.appendChild(values1);

    //endtime
    let endtime = document.createElement("DIV");
    endtime.setAttribute("class", "endtime");
    let enddate = document.createElement("H3");
    enddate.setAttribute("class", "date");
    enddate.innerHTML = getdateofstart(ele.end_time);
    let timeofend = document.createElement("H4");
    timeofend.setAttribute("class", "time");
    timeofend.classList.add("extratimestyleofend");
    timeofend.innerHTML = gettimeofstart(ele.end_time);
    // endtime.appendChild(enddate);
    // endtime.appendChild(timeofend);
    let end=document.createElement("h3");
    end.setAttribute("class","ed");
    end.innerText="End :";
    let values2=document.createElement("DIV");
    values2.setAttribute("class","val2");
    values2.appendChild(enddate);
    values2.appendChild(timeofend);
    endtime.appendChild(end);
    endtime.appendChild(values2);

    //  calender
    let imgofcalenderdiv = document.createElement("DIV");
    imgofcalenderdiv.setAttribute("class", "calender-logo-div");
    // image
    let imgofcalender = document.createElement("IMG");
    imgofcalender.setAttribute("src", "./img/gCalImg.png");
    imgofcalender.setAttribute("alt", "calender-image");
    imgofcalender.setAttribute("class", "calender-logo");
    // a
    let linktogcalender = document.createElement("A");
    linktogcalender.setAttribute(
      "href",
      gcalenderlinkofevent(
        ele.name,
        getdateofstartforgcalender(ele.start_time),
        gettimeofstart_forgcalender(ele.start_time),
        getdateofstartforgcalender(ele.end_time),
        gettimeofstart_forgcalender(ele.end_time),
        //linkofcontest
        ele.url
      )
    );
    linktogcalender.setAttribute("target", "_blank");
    linktogcalender.appendChild(imgofcalender);

    imgofcalenderdiv.appendChild(linktogcalender);

    innerdiv2.appendChild(starttime);
    innerdiv2.appendChild(endtime);
    innerdiv2.appendChild(imgofcalenderdiv);

    //outerdiv
    outerdiv.appendChild(innerdiv1);
    outerdiv.appendChild(innerdiv2);
    upcominginfo.appendChild(outerdiv);

    // let hr = document.createElement("HR");
    // upcominginfo.appendChild(hr);
  }

  
}

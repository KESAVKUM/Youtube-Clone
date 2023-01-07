var keyWordsArray=["All","Javacsript","CSS","Html","Java","Python","A.R.Rahman","Melodies","Love","Tamil Songs"];
var searchApiData,apiVideodata;
var channelApiData,allPlayListsofChannel;
var a="new name a";
var apikeysList=["AIzaSyBygMDDMWAPrfxyugPS1bf9OiE0VQ-MkAU","AIzaSyCHUI8NKVy1_9EDbolbqvO6i_XxdIygnos"];
var apikey = apikeysList[0];
var videolisturl1 = "https://youtube.googleapis.com/youtube/v3/videos";
var partvideourl1= "?part=snippet&part=statistics&part=player&chart=mostPopular&maxResults=20&regionCode=IN&key=";
var dvideourl=videolisturl1+partvideourl1+apikey;


loadDefaultPage();


function loadDefaultPage(){

    loadKeywordButtons(keyWordsArray);
    loadVideoContent(dvideourl);


}


function loadKeywordButtons(keyArray){

    var buttonsWrapperEl=document.createElement("div");
    buttonsWrapperEl.classList.add("rac","search-key-wrapper");

    
    for(let i=0;i<keyArray.length;i++){
        var buttonEl=document.createElement("button");
        buttonEl.setAttribute("type","button");
        buttonEl.style.backgroundColor="#f2f2f2";
        buttonEl.classList.add("search-key-word","btn","m-2");
       
        
        buttonEl.innerHTML=`${keyArray[i]}`;

        buttonsWrapperEl.append(buttonEl);
    }

    var alreadyAppended=document.getElementsByClassName("rac");
    if(alreadyAppended){
          for(let ele of alreadyAppended){
            ele.remove();
        }
    }

    document.getElementById("right-panel").append(buttonsWrapperEl);


}

async function loadVideoContent(url){

    let result= await fetch(url);
    apiVideodata= await result.json();
    console.log("default url is",url);

console.log(apiVideodata);

/* LOOP */
var contentwrapperEl=document.createElement("div");
contentwrapperEl.classList.add("rac","content-wrapper","d-flex","flex-wrap","justify-content-center");
    for(let i=0;i<apiVideodata.items.length;i++){
    
        let videothumbnail_url=apiVideodata.items[i].snippet.thumbnails.high.url;
        // console.log("video-thumbnail",apiVideodata.items[i].snippet.thumbnails.high.url);
         let video_title=apiVideodata.items[i].snippet.title;
        // console.log(apiVideodata.items[i].snippet.title);
    
        let video_id = apiVideodata.items[i].id;
        // console.log(video_id);

        let channel_id= apiVideodata.items[i].snippet.channelId;
        // console.log(channel_id);

        let views = apiVideodata.items[i].statistics.viewCount;

        let liked=apiVideodata.items[i].statistics.likeCount;

        // console.log(apiVideodata.items[i].statistics.viewCount);

        let channel_title =apiVideodata.items[i].snippet.channelTitle;
        var cardwrapperdivEl= document.createElement("div");
        cardwrapperdivEl.classList.add("card-wrapper");
    
    
        cardwrapperdivEl.innerHTML=`
        <div class="section1">     
            <img id=${video_id} onclick="playVideo(this.id)" class="video-thumbnail" src=${videothumbnail_url} alt="video-thumbnail" srcset="">
        </div>
                                     
        <div class="section2 row">
            <div class="logowrap col-3 ">     
                <img id="channel-logo" width="36px" height="36px" src="https://www.pngfind.com/pngs/m/669-6699373_vaanavil-tv-channel-logo-hd-png-download.png" alt="channel-logo" srcset="">
            </div>
            <div class="contentwrap col-9">               
                <div class="video-title"> ${video_title} </div>
                <div onclick="displayChannelDetails(this.id)" class="channel-name" id=${channel_id} >${channel_title} </div>
                
            <div class="addinfo">
                ${views} views * ${liked} likes 
            </div>                        
        
        </div>`;
    
    contentwrapperEl.append(cardwrapperdivEl);
    
    
    }

   
    document.getElementById("right-panel").append(contentwrapperEl);


}
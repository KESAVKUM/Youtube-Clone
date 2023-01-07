function displayChannelDetails(channel_id){
    console.log("hi channel id is",channel_id);  
      
    let url = `https://youtube.googleapis.com/youtube/v3/channels?part=brandingSettings&part=contentDetails&part=contentOwnerDetails&part=id&part=localizations&part=snippet&part=statistics&part=status&part=topicDetails&id=${channel_id}&maxResults=20&key=${apikey}`;
    console.log("channel-info url is,", url);
    
    getChannelInfo(url);

    async function getChannelInfo(url){

        console.log("async call start");
    
        let res = await fetch(url);
        channelApiData= await res.json();
        console.log(a);
         console.log("in async channelApiData is", channelApiData);


         
    for(let i=0;i<channelApiData.items.length;i++){

        if(channel_id === channelApiData.items[i].id){
            console.log("channel id matched, i is",i);
        } 
        else{
            console.log("channel id not matched");
        }
   }
 
   let channelBannerURL;
    if(channelApiData.items[0].brandingSettings.image.bannerExternalUrl){
        channelBannerURL= channelApiData.items[0].brandingSettings.image.bannerExternalUrl;
    }
    else{
        channelBannerURL="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
    }

    let channel_logo_url=channelApiData.items[0].snippet.thumbnails.high.url;
    let channel_name=channelApiData.items[0].snippet.title;
    let subscriberCount=channelApiData.items[0].statistics.subscriberCount;
    

    var channelInfoContainerEl=document.createElement("div");
    channelInfoContainerEl.classList.add("container-fluid","channel-info-wrapper","rac");
    channelInfoContainerEl.setAttribute("id","channel-info-container");

    channelInfoContainerEl.innerHTML=`  <div  class="w-100">
            <img style="object-fit: cover;" width="100%" height="200px"  src=${channelBannerURL} alt="channel-back-image" srcset="">
        </div>
        <div class="channel-line d-flex justify-content-between">
            <div class="name-logo d-inline-flex align-items-center">
                <img width="50px" height="50px" src= ${channel_logo_url} alt="channel-logo" srcset="">
                
                    <div class="channel-info-w">
                        <p class="fs-h3 fw-bold m-0"> ${channel_name}</p>
                        <p class="text-secondary m-0"> ${subscriberCount}  subscribers</p>   
                    </div>
                   
            </div>
            <button class="btn btn-dark">Subscribe</button>
        </div>
        <div class="d-flex justify-content-center page-nav-wrapper">
            <button class="m-2 px-4 btn fw-bold btn-primary">ABOUT</button>
            <button onclick="displayPlayListsofChannel(this.id)" class=" btn-primary m-2 px-4 btn fw-bold" id=${channel_id}>PLAYLISTS </button>
           <button class="m-2 px-4 btn btn-primary fw-bold">HOME </button>
           <button class="m-2 px-4 btn btn-primary fw-bold">VIDEOS </button>          
           <button class="m-2 px-4 btn btn-primary fw-bold">COMMUNITY </button>
           <button class="m-2 px-4 btn btn-primary fw-bold">CHANNELS </button>
      
            <button class="px-4 btn material-symbols-outlined search-icon">search</button>
        </div>`;


        var alreadyAppended=document.getElementsByClassName("rac");
        if(alreadyAppended){
              for(let ele of alreadyAppended){
                ele.remove();
            }
        }
        
        document.getElementById("right-panel").append(channelInfoContainerEl);

    
    }

    console.log("after async call channel-api data is",channelApiData);


   
  }




async function displayPlayListsofChannel(cid){



    url =`https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&part=id&part=localizations&part=player&part=snippet&part=status&channelId=${cid}&maxResults=20&key=${apikey}`;

    let res = await fetch(url);
    allPlayListsofChannel= await res.json();
     
     console.log("play list of channel data is", allPlayListsofChannel);
    



console.log("play list of channel data is", allPlayListsofChannel);


var listContainerEl= document.createElement("div");
listContainerEl.classList.add("list-container","container-fluid","rac-channel","d-flex","flex-wrap");

for(let i=0;i<allPlayListsofChannel.items.length;i++){
    let thumbnail_url=allPlayListsofChannel.items[i].snippet.thumbnails.high.url;
let list_title=allPlayListsofChannel.items[i].snippet.title;
let videos_count=allPlayListsofChannel.items[i].contentDetails.itemCount;

var singlecontainerEl=document.createElement("div");
singlecontainerEl.classList.add("s-container","d-flex","flex-column","col-3");

singlecontainerEl.innerHTML=` 
<img onclick="playPlaylist(this.id)" id=${allPlayListsofChannel.items[i].id} src=${thumbnail_url} alt="thumbnail-url" srcset="">
<p class="mb-0 fw-bold ps-4">${list_title}</p>
<p class="mb-0 ps-4">${videos_count} Videos</p>`;

listContainerEl.append(singlecontainerEl);

}

var alreadyAppended=document.getElementsByClassName("rac-channel");
if(alreadyAppended){
      for(let ele of alreadyAppended){
        ele.remove();
    }
}


document.getElementById("channel-info-container").append(listContainerEl);



}
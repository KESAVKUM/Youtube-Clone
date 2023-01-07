function searchQuery(){
  
    searchvalue=document.getElementById("input-search").value;
 
console.log("search string is",searchvalue);
var searchurl2="https://youtube.googleapis.com/youtube/v3/search";
var parturl2= `?part=snippet&channelType=any&maxResults=20&order=relevance&q=${searchvalue}&regionCode=IN&safeSearch=none&type=video&key=`;
var searchurl=searchurl2+parturl2+apikey;

 displayResultData(searchurl);

}

async function displayResultData(url){
console.log("final search url is", url);

let res = await fetch(url);
searchApiData = await res.json();
console.log("search api dtat is", searchApiData);

var searchResultcontainerEl= document.createElement("div");
searchResultcontainerEl.setAttribute("id","searchResultcontainerEl");
searchResultcontainerEl.classList.add("rac", "searchresultcontainer","container-fluid");
for(let i=0;i<searchApiData.items.length;i++){

let video_thumbnail_url = searchApiData.items[i].snippet.thumbnails.high.url;
let channel_image_url="https://static.rfstat.com/renderforest/images/v2/landing-pics/youtube-logo/card-4.jpg";
let video_description = searchApiData.items[i].snippet.description;
let channel_name = searchApiData.items[i].snippet.channelTitle;
let s_video_title=searchApiData.items[i].snippet.title;
let video_id1=searchApiData.items[i].id.videoId;
let channel_id1=searchApiData.items[i].snippet.channelId;

// console.log(video_id1);
var resultContainerEl=document.createElement("div");
resultContainerEl.classList.add("mb-3");
resultContainerEl.innerHTML =`
<div class="row">
    <div class="col-sm-12 col-md-4 search-video-imagew">       
        <img onclick="playSearchVideo(this.id)" id=${video_id1} src=${video_thumbnail_url} alt="video thumbnail url" srcset="">
    </div>
    <div class="search-content-wrapper col-sm-12 col-md-8 d-flex flex-column justify-content-evenly">
        <p class="fw-bold fs-4" >${s_video_title} </p>         
        <div class="channel-w d-flex align-items-center">
            <img src=${channel_image_url} alt="channel image">
            <p onclick="displayChannelDetails(this.id)" id=${channel_id1} class="fs-6 ms-3" >${channel_name}</p>
        </div>    
        <p>${video_description}</p>
    </div>
</div>`;

searchResultcontainerEl.append(resultContainerEl);

}  

var alreadyAppended=document.getElementsByClassName("rac");
if(alreadyAppended){
   for(let ele of alreadyAppended){
     ele.remove();
 }
}


document.getElementById("right-panel").append(searchResultcontainerEl);
}
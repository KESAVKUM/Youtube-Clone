function playSearchVideo(vid){
    console.log("video id is",vid);

    let videoObj=getVideoDetails(vid);
    console.log("video Obj is", videoObj);

    var resultwEl= document.createElement("div");
    resultwEl.classList.add("row","container-fluid","rac");

    // var rContainerEl=document.createElement("div");
    // rContainerEl.classList.add("mt-3","container-fluid","d-flex");

    var rlContainerEl=document.createElement("div");
    rlContainerEl.classList.add("col-9");


    var videoContainerEl=document.createElement("div");
    videoContainerEl.classList.add("vcontainer");
    videoContainerEl.innerHTML=videoObj.frame;

    var videoDetailsContainerEl=document.createElement("div");
    videoDetailsContainerEl.classList.add("vdcontainer");

    videoDetailsContainerEl.innerHTML=`<h5>${videoObj.video_title}</h5>
    <div class="d-flex justify-content-evenly">
        <div class="d-inline-flex align-items-center">
            <img width="50px" height="50px" src=${videoObj.channel_logo} alt="channel-logo">
            <p class="vc-name">${videoObj.channel_name}</p>
        </div>
        <button class="btn btn-secondary col-2">Join</button>
        <button class="btn btn-secondary col-2">Subscribe</button>
        <button class="btn btn-secondary col-1 material-symbols-outlined col"> thumb_up</button>            
        <button class="btn btn-secondary col-1 material-symbols-outlined col">thumb_down_off</button>
        <button class="btn btn-secondary col-1 material-symbols-outlined col">share</button>
    </div>`;

    rlContainerEl.append(videoContainerEl,videoDetailsContainerEl);

    
    var rrContainerEl =document.createElement("div");
    rrContainerEl.classList.add("rrcontainer","col-3");

    for(let i=0;i<searchApiData.items.length;i++){

        let video_id=searchApiData.items[i].id.videoId;
        let thumbnail_url=searchApiData.items[i].snippet.thumbnails.high.url;
        let video_title=searchApiData.items[i].snippet.title;
        let channel_name=searchApiData.items[i].snippet.channelTitle;
        let channel_id2=searchApiData.items[i].snippet.channelId;

        var othervideocontainerEl=document.createElement("div");
        othervideocontainerEl.classList.add("othervc");
        
        othervideocontainerEl.innerHTML=`      
        <div class="other-v-image-w">
             <img onclick="playSearchVideo(this.id)" width="280px" height="200px" id="${video_id}" src=${thumbnail_url} alt="other-video-image" srcset="">
        </div>
    
        <div class="other-v-content-w">
         <p class="text-center mb-0">${video_title}</p>
         <p onclick="displayChannelDetails(this.id)" id="${channel_id2}" class="text-end  text-secondary mb-0 ms-2">${channel_name}</p>
        </div>`;

        rrContainerEl.append(othervideocontainerEl);
        
    }
   
    resultwEl.append(rlContainerEl,rrContainerEl);

    var alreadyAppended=document.getElementsByClassName("rac");
    if(alreadyAppended){
          for(let ele of alreadyAppended){
            ele.remove();
        }
    }

    document.getElementById("right-panel").append(resultwEl);




}

function getVideoDetails(vid){

    for(let i=0;i<searchApiData.items.length;i++){

        if(searchApiData.items[i].id.videoId===vid){

            return {video_title : searchApiData.items[i].snippet.title,
                    channel_name : searchApiData.items[i].snippet.channelTitle,
                    frame : `<iframe width="750" height="400" src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
                    channel_logo:"https://mpng.subpng.com/20200216/py/transparent-icon-youtube-logo-youtube-copyright-strike-kacperniszonampaposs-profile-anilist5eb0d45ea51fa2.7624506715886470066764.jpg"
                    }
        }
    }
        
}
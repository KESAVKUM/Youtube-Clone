function playPlaylist(pid){


    console.log("playlist id is", pid);
    var alreadyAppended=document.getElementsByClassName("rac");
    if(alreadyAppended){
          for(let ele of alreadyAppended){
            ele.remove();
        }
    }

    frame=`<iframe width="80%" height="500px" src="http://www.youtube.com/embed/videoseries?list=${pid}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    var videoContainerEl=document.createElement("div");
    videoContainerEl.classList.add("vcontainer","rac","rac-channel");
    videoContainerEl.innerHTML=frame;

    document.getElementById("right-panel").append(videoContainerEl);

}


function playVideo(vid){
    console.log("video id is", vid);
    var alreadyAppended=document.getElementsByClassName("rac","rac-channel");
    if(alreadyAppended){
          for(let ele of alreadyAppended){
            ele.remove();
        }
    }

    frame=` <iframe width="640" height="400" src="https://www.youtube.com/embed/${vid}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    var videoContainerEl=document.createElement("div");
    videoContainerEl.classList.add("vcontainer","rac","rac-channel");
    videoContainerEl.innerHTML=frame;

    document.getElementById("right-panel").append(videoContainerEl);


}
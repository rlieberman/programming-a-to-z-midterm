
var input;
var bttn;
var searchTerm;

var startNum = 1; //keeps track of where we are starting so we can make multiple API calls
var allURLS = []; //create an empty array that will hold all the image URLs, stores results from multiple API calls


function setup() {
  noCanvas();

  var prompt = createElement('h1','Enter a word or phrase to search for an image');
  prompt.style('font-size', '50px');

  //create my search field
  input = createInput(' ');
 
  //create my search button
  bttn = createButton('search');
  bttn.class('search');
  bttn.mousePressed(imageSearch);

}


function imageSearch(){

  searchTerm = input.value(); //my search term which i will send to the google image api

  // var my_key = 'AIzaSyACNm4n5QB1TVHFOAzZg96cVdD3trozg4E'; //currently with shiffman's key
 var my_key = 'AIzaSyBdeOzPYln1iX1B4lJrgeBFbrqzsx8Cj2A'; 


 //we need to make 10 different API calls (to get 100 images)
 //this loop will first make us 10 different urls and then call loadJSON 10 times
 // //startNum will increment by 10 each time

  for (var i=0; i<2; i++) { 
    var query = "https://www.googleapis.com/customsearch/v1?key=" + my_key + "&searchType=image&imgSize=large&imgType=photo" +  "&cx=017113430126644414771:wwhvz3sxr2q" + "&q=" + searchTerm  + "&num=10&start=" + startNum + "&imgSize=large";
    var url = encodeURI(query); //encode url if you get multiple search terms
    // console.log(url);
    loadJSON(url, gotData); //make 10 calls to the API, each with a different URL

    startNum = startNum+10;

  }

}


function gotData(data){

  // console.log(data.items);

  var imgInfo = data.items; //imgInfo array of objects -- each image is an object with metadata

  //for every image, grab the link from the object print out all the links
  for (var i = 0; i < imgInfo.length; i++) {

     var imgURL = imgInfo[i].link; //create a variable to hold the image URL

     createP(imgURL);
     // var imgThumbnail = createImg(imgURL);
     // imgThumbnail.size(100,100);

     allURLS.push(imgURL);  //store all the URLs in that array
  }
  
  console.log(allURLS);


}











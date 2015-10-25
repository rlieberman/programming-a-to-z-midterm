var graphics; //var to hold the offscreen (graphics) + onscreen canvas
var canvas;

var w; //set the width and height of the canvas in the browser and offscreen canvas for accessing pixels
var h;

var tileSize = 50; //size of our tiles, eventually will be dynamically controlled by a slider or form
var colNum; //variables to hold column and row numbers
var rowNum;

var imgURLS = []; //array to hold the URLS
var imgElements = []; //array to hold all the images as DOM elements


function preload(){
  imgURLS = loadStrings('guys.txt'); //for now, load image URLS from a text file so we don't overload the api
    
}

var canvas;

function setup() {

  w = 400; //set w and h so our on-screen and off-screen canvases will mirror each other
  h = 300;

  colNum = w/tileSize; //number of columns and rows, depending on tileSize
  rowNum = h/tileSize;


  canvas = createCanvas(w,h); //onscreen canvas
  canvas.position(20, 20); 
  devicePixelScaling(false);
  background(215);

  //set up the underlying grid and display it for now
  for (var x = 0;  x< colNum; x++) { 
    for (var y= 0; y< rowNum; y++){
      stroke(200);
      line (x*tileSize, 0, x*tileSize, h);
      line(0, y*tileSize, w, y*tileSize);
    }
  }


//STEP 1: make DOM elements for all of the images in the array of URLS
  for (var i=0; i<imgURLS.length-1; i++) { 
    var imgElt = createImg("images/" + imgURLS[i]);
    imgElements.push(imgElt); //
    // imgElt.hide();
    // console.log(imgElt.elt.currentSrc, i);

  }
  // console.log(imgElements);

//STEP 2: for every square in our grid, we're going to create an image tile from our DOM elements and draw it to the on screen canvas
 
  var i = 0; //variable to keep track of what image we're on in the array of images
  for (var x =0; x < colNum; x++) { //for every column
    for (var y =0; y < rowNum; y++) { //for every row
      processImage(imgElements[i], x, y); //created this function because of the callbacks in a loop problem -- to revisit later
      i++;  //go to the next image in the array
      if (i === imgElements.length) { 
        i = 0;
      }
      console.log(imgElements[i], x, y);
    }
  }

}

   

function processImage(imgElt, x, y) {

  //function makeTile(){
    //for every image in the array of image DOM elements
    //first we draw the image to an offscreen canvas
    
    var graphics = createGraphics(w, h); //draw the graphics canvas at the same dimensions as the canvas in the browser so they mirror each other
    graphics.image(imgElt, 0, 0, graphics.width, graphics.height);
    console.log(imgElt);

    x = x*tileSize; //take a tile and assign it to a place in the canvas in our browser
    y = y*tileSize;
    mycopy(graphics, x, y, tileSize, tileSize, x, y, tileSize, tileSize);


   //}

}



function mycopy(s, sx, sy, sw, sh, dx, dy, dw, dh) { //shiffman's custom copy function since native p5 copy() function is broken

  var ctx = canvas.elt.getContext('2d');
  ctx.drawImage(s.elt, sx, sy, sw, sh, dx, dy, dw, dh);

}
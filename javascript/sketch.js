//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded


let age;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  noLoop();

  fetch("./json/age.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    age = data.age;

    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  
  background(255);
  text('Austria age breakdown (2018)', 50, 30); 
 
}

function drawChart(){

  // Compute maximum amount (for normalization)
  let maxval = 0; 
  for (let i=0; i<age.length; i++) {
    if ( age[i].amount > maxval) {
      maxval = age[i].amount;
    }
  }

  let spacing = 10 ;//spacing between the bars
  // Display chart
  for (let i=0; i<age.length; i++) {

    let item = age[i];
    
    let rWidth = width/(age.length+2); //add 2 so there is space either side of the chart
    let rX = map(i, 0, age.length, rWidth, width-rWidth); //map range includes the space on either side
    let rY = height-rWidth; 
    let rHeight = 0-map(item.amount, 0, maxval, 0, height-(rWidth*2)); // map height so spacing on top + bottom match side spacing 
    
    noStroke(); 
    fill(item.color);
    rect(rX+spacing/2, rY, rWidth-spacing, rHeight); 

    fill(0); 
    textAlign(CENTER, TOP); 
    text(item.ingredient, rX+rWidth/2-1, rY+10);
  }  

}
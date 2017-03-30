String.prototype.replaceAt=function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
}


var init_str = 'we arefamily';
var str = init_str;
MAX_LEN = 12;
    var pos = 6; //start from 2nd row
    var initial_state = true;
    var resetState = false;

    var timer;
    var timeout_short = 1000;
    var timeout_long = 7000;

    function repeat(c, n)
    {
    	for (var e = ''; e.length < n;)
    		e += c;

      return e;
    }
    function timerOn(t)
    {
     clearTimeout(timer)
     timer = setTimeout(function() {
      resetChar();
    }, t);
   }

   function delChar()
   {
    if(initial_state)
    {
      initial_state=false;
      pos=11;
    }
    
    if (pos >= 0) // && pos < 5) || (pos >= 6 && pos < 12))
{
  str = str.replaceAt(pos, ' ');
  pos--;

}
drawString(str);
}

function setChar(s)
{
  if(initial_state)
  {
    initial_state=false;
    str = repeat(' ', 12);
    pos = -1;
  } 

  pos++;

  if (pos >= MAX_LEN)
  {
    pos = 6;
    str = str.substr(6, 6) + repeat(' ', 6);
  }

  str = str.replaceAt(pos, s);


    	//console.log(pos, s, str);

    	drawString(str)
    }

    function randomString(length) {
     var result = '';
     chars = 'abcdefghijklmnopqrstuvwxyz';
     for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
       return result;
   }


   function resetChar() {

     if (!resetState)
     {
    		resetState = true; //first time
       linepos = (pos + 1)%6;

       prefix = randomString(6-linepos);
			//prefix = repeat('X', 6-linepos); //filling with X's
			reset_str = prefix + init_str;
			reset_str = reset_str.split('');
   }

   setChar(reset_str.shift());

   if (str == init_str)
   {
    initial_state = true;
  }
  else
  {
    timerOn(timeout_short);
  }

}

function bodyKeydown(a)
{
  if (a.keyCode == 8)
  {
    resetState = false;
    delChar();
    timerOn(timeout_long);
  }
}

function bodyKeypress(a)
{
  resetState = false;

  var cc = a.charCode;
  var keyOK = false;

  s = String.fromCharCode(cc);
  
  if ((cc > 96 && cc < 123) || cc == 32) // in 'a-z', or space
  {
    keyOK = true;
  }
  else if (cc in hcf)
  {
    s=hcf[cc];  
    keyOK = true;
  }


  console.log(s, a.charCode)
  
  if (keyOK)
  {
    setChar(s);   
    timerOn(timeout_long);
  }
}


function drawString(str)
{
  var str = str.toUpperCase();

  var imgs = document.getElementById("imgs");
  imgs.innerText = "";

  currCount = {};

  for (i=0;i<str.length; i++)
  {
            var g  = 1; //glyph index: eg. A1, A2, ... Ag

            var c = str.charAt(i);

            if (c != ' ')
            {
            	if (currCount[c]>=0) //exist
            	{
            		currCount[c]++;
            	}
            	else
            	{
            		currCount[c] = 0;
            	}
            	g = 1 + (currCount[c] % letterCount[c]);
            	console.log(c,g);
            }
            else
            {
              c = ''; // fix: space filename is 1.gif 
            }

            var x = document.createElement("IMG");

            x.setAttribute("src", "gifs/" + c + g + ".gif");
            imgs.appendChild(x);

          }
        }
        drawString(str)

/*

    var images = {};
    var max_ind={};

    loadImages(function(){
        edValueKeyPress();
    });

    function loadImages(callback) {
    

        var loadedImages = 0;
        var numImages = 0;
        // get num of sources

        //var az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var az = "ABC";//BCDEFGHIJKLMNOPQRSTUVWXYZ";


        for(var src in az) {
            a=az[src]
            images[a] = [];
            max_ind[a] = 0;

            for (var i=1; i<10; i++)
            {
                images[a][i] = new Image();
                images[a][i].onload = function(a, b, c) {
                    max_ind[a]++;
                };
                images[a][i].src = a + i + ".gif";

            }

        }
    }

    */

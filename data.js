
var data = [
  {
    "latitude": "40.684922",
    "longitude": "-73.922862"
  },
  {
    "latitude": "40.685215",
    "longitude": "-73.920502"
  },
  {
    "latitude": "40.685526",
    "longitude": "-73.917746"
  },
  {
    "latitude": "40.684792",
    "longitude": "-73.917594"
  },
  {
    "latitude": "40.684028",
    "longitude": "-73.917540"
  },
  {
    "latitude": "40.683315",
    "longitude": "-73.917374"
  },
  {
    "latitude": "40.682554",
    "longitude": "-73.917182"
  },
  {
    "latitude": "40.682278",
    "longitude": "-73.919888"
  },
  {
    "latitude": "40.681955",
    "longitude": "-73.922433"
  },
  {
    "latitude": "40.681505",
    "longitude": "-73.925757"
  },
  {
    "latitude": "40.681268",
    "longitude": "-73.928466"
  },
  {
    "latitude": "40.680911",
    "longitude": "-73.931644"
  },
  {
    "latitude": "40.680915",
    "longitude": "-73.931642"
  },
  {
    "latitude": "40.682397",
    "longitude": "-73.931950"
  },
  {
    "latitude": "40.682055",
    "longitude": "-73.934774"
  },
  {
    "latitude": "40.682862",
    "longitude": "-73.935045"
  },
  {
    "latitude": "40.685649",
    "longitude": "-73.935628"
  },
  {
    "latitude": "40.685381",
    "longitude": "-73.938514"
  },
]

loopThroughArray(data, function (arrayElement) {
  console.log(arrayElement);
}, 3000);

function loopThroughArray(array, callback, interval) {
    var newLoopTimer = new LoopTimer(function (time) {
        if (array.length){
          var element = array.shift();
          callback(element, time - start);
        }
      }, interval);
    var start = newLoopTimer.start();
}

// Timer
function LoopTimer(render, interval) {
    var timeout;
    var lastTime;

    this.start = startLoop;
    this.stop = stopLoop;

    // Start Loop
    function startLoop() {
        timeout = setTimeout(createLoop, 0),
        lastTime = Date.now();
        return lastTime;
    }

    // Stop Loop
    function stopLoop() {
        clearTimeout(timeout);
        return lastTime;
    }

    // The actual loop
    function createLoop() {
        var thisTime = Date.now();
        var loopTime = thisTime - lastTime;
        var delay = Math.max(interval - loopTime, 0);
        timeout = setTimeout(createLoop, delay);
        lastTime = thisTime + delay;
        render(thisTime);
    }
}


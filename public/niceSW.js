let id;

function launch() {
  id = setInterval(() => {
    postMessage(Math.random());
  }, 500);
}

let going = true;

launch();

onmessage = function (e) {
  going = !going;
  if (!going) {
    clearInterval(id);
  } else {
    launch();
  }
};

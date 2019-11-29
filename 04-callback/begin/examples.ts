function forEachExample() {
  let index = 0;
  ingredients.forEach(name => {
    console.log(`${index} - ${name}`);
  });
}

function setTimeoutExample() {
  console.clear();
  console.log('Me: How are you?');
  setTimeout(() => {
    console.log('You: I am fine, thank you! How are you?');
    setTimeout(() => {
      console.log('Me: Well, thanks!');
    }, 1500);
  }, 1500);
}

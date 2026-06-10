const fetchmedia = async () => {
  const res = await fetch('https://6a23007fb1f86057657a3754--preeminent-kheer-e41022.netlify.app/assets/index-B0T0F9ls.js');
  const js = await res.text();
  const jpgs = js.match(/"([^"]+\.(?:jpg|png|mp4|webp))"/g);
  console.log(JSON.stringify(jpgs, null, 2));
};
fetchmedia();

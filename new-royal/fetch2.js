const fetchmedia = async () => {
  const res = await fetch('https://6a2395e31f4734afb2d41d2a--astonishing-pie-522cfa.netlify.app/assets/index-B-jksNrm.js');
  const js = await res.text();
  const jpgs = js.match(/"([^"]+\.(?:jpg|png|mp4|webp))"/g);
  console.log(JSON.stringify(jpgs, null, 2));
};
fetchmedia();

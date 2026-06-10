const fetchmedia = async () => {
  const res = await fetch('https://salon-95dg.vercel.app/');
  const html = await res.text();
  const srcs = html.match(/src="([^"]+)"/g);
  const poster = html.match(/poster="([^"]+)"/g);
  const bg = html.match(/url\(([^)]+)\)/g);
  console.log(JSON.stringify({srcs, poster, bg}, null, 2));
};
fetchmedia();

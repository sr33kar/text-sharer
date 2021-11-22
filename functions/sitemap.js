exports.handler = function(event, context, callback) {
  var xml_content = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `<url><loc>http://text-sharer.netlify.com/</loc></url>`,
    `<url><loc>http://text-sharer.netlify.com/privacy_policy</loc></url>`,
    "</urlset>"
  ];

  callback(null, {
    statusCode: 200,
    headers: { "Content-Type": "text/xml" },
    body: xml_content.join("\n")
  });
};
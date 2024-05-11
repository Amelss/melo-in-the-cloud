export default function handler(req, res) {
    const { slug } = req.query
    console.log("slug:", slug);
    res.setPreviewData({})
    res.redirect(`/blogs/${slug}?preview=true`)
}
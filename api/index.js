// api/index.js
export default (req, res) => {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'Hello from Vercel Serverless!' });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};
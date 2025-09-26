export default async (req, context) => {
    console.log('[[example called]]');
    return new Response("response from netlify_function");
};
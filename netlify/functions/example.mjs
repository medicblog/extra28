export default async (req, context) => {
    console.log('context :');
    console.log(context);
    return new Response("response from netlify_function");
};